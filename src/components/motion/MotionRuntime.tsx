"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { heroTimer } from "@/hooks/useDemoTimer";
import {
  breathe,
  count,
  draw,
  flipOnChange,
  grow,
  GENTLE,
  nodes,
  reveal,
  trigger,
  vars,
} from "./engine";

/** The page's motion, played once after the splash. Skipped entirely under reduced motion. */
function choreograph() {
  const intro = gsap.timeline({ delay: 0.9 });
  intro
    .from(".edition > *", vars("fade", { stagger: 0.1 }))
    .from(".measure", vars("rise", { y: GENTLE.y * 1.4, stagger: 0.14 }), 0.1);
  nodes(".digits").forEach((el, i) =>
    intro.add(
      count(el, { duration: GENTLE.count * 0.8, ease: "power3.out" }),
      0.15 + i * 0.14,
    ),
  );
  intro
    .from(".hero-copy > *", vars("rise", { stagger: GENTLE.stagger }), 0.5)
    .from(".hero-bottom .desktop", vars("fade"), 0.6)
    .from(".popover", vars("pop"), 0.85)
    .from(".desktop-caption", vars("fade"), 1.3);
  // The bar fills from an empty cycle to the time already worked, like the real timer.
  heroTimer.animate(heroTimer.cycle, heroTimer.start, {
    duration: GENTLE.count,
    delay: 1.95,
    ease: "power2.inOut",
  });
  breathe(".progress i", intro.duration() + 0.5);

  nodes(".chapter-no").forEach((el) => reveal(el, "slide-in"));
  reveal("#the-break .chapter-head > :not(.chapter-no)");
  gsap
    .timeline({ scrollTrigger: trigger("#the-break .break-screen", "top 85%") })
    .from("#the-break .break-screen", vars("depth"))
    .from(
      ".break-center > h3, .break-center > p, .screen-top, .screen-bottom",
      vars("rise", { stagger: GENTLE.stagger * 1.4 }),
      "<0.3",
    )
    .from(
      "#tens, #ones",
      {
        rotationX: -90,
        opacity: 0,
        transformPerspective: 500,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        clearProps: "transform,opacity",
      },
      "<0.2",
    )
    .from(".break-caption", vars("fade"), "<0.3");

  reveal(".routine-left > :not(.chapter-no):not(.toast)");
  reveal(".routine-left .toast", "slide");
  reveal(".feature-row", "rise", { trigger: ".feature-row" });
  gsap
    .timeline({ scrollTrigger: trigger(".exercise", "top 85%") })
    .from(".exercise", vars("depth"))
    .add(draw(".exercise-figure svg > *"), "<0.3");

  reveal(".stats-copy > :not(.chapter-no)");
  gsap
    .timeline({ scrollTrigger: trigger(".stats", "top 85%") })
    .from(".stats", vars("depth"))
    .add(count(".stat-value span"), "<0.3")
    .add(grow(".chart .bar"), "<0.1");

  reveal(".download-section > :not(.chapter-no)");

  return flipOnChange("#tens, #ones");
}

/** Mounted with the page: choreography, the header's scrolled state, and timer glides. */
export function MotionRuntime() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const root = document.documentElement;
    const onScroll = () => {
      const scrolled = window.scrollY > 8;
      if (scrolled !== root.hasAttribute("data-scrolled"))
        root.toggleAttribute("data-scrolled", scrolled);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const lenis = new Lenis({
        duration: 1.05,
        smoothWheel: true,
        syncTouch: false,
        autoRaf: false,
      });
      const tick = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      lenis.on("scroll", ScrollTrigger.update);

      const onAnchorClick = (event: MouseEvent) => {
        if (
          event.defaultPrevented ||
          event.button !== 0 ||
          event.metaKey ||
          event.ctrlKey ||
          event.shiftKey ||
          event.altKey ||
          !(event.target instanceof Element)
        )
          return;
        const anchor = event.target.closest<HTMLAnchorElement>('a[href*="#"]');
        if (
          !anchor ||
          anchor.hasAttribute("download") ||
          (anchor.target && anchor.target !== "_self")
        )
          return;

        let url: URL;
        let id: string;
        try {
          url = new URL(anchor.href, window.location.href);
          id = decodeURIComponent(url.hash.slice(1));
        } catch {
          return;
        }
        if (
          url.origin !== window.location.origin ||
          url.pathname !== window.location.pathname ||
          url.search !== window.location.search ||
          !id
        )
          return;
        const target = document.getElementById(id);
        if (!target) return;

        event.preventDefault();
        // Measure from the live scroll position: Lenis's own copy can lag behind
        // a restored or native scroll. scroll-padding-top clears the sticky header.
        const pad = parseFloat(getComputedStyle(root).scrollPaddingTop) || 0;
        lenis.scrollTo(target.getBoundingClientRect().top + window.scrollY - pad);
        if (window.location.hash !== url.hash)
          window.history.pushState(null, "", url.hash);
        if (target.tabIndex < 0 && !target.hasAttribute("tabindex"))
          target.setAttribute("tabindex", "-1");
        target.focus({ preventScroll: true });
      };
      document.addEventListener("click", onAnchorClick);

      let glide: gsap.core.Tween | undefined;
      heroTimer.setGlide((from, to, paint, done, options) => {
        const proxy = { v: from };
        glide?.kill();
        paint(from);
        glide = gsap.to(proxy, {
          v: to,
          duration: options.duration ?? 0.9,
          delay: options.delay ?? 0,
          ease: options.ease ?? "power3.out",
          onUpdate: () => paint(Math.round(proxy.v)),
          onComplete: done,
          onInterrupt: done,
        });
      });
      const stopFlips = choreograph();
      return () => {
        document.removeEventListener("click", onAnchorClick);
        gsap.ticker.remove(tick);
        lenis.destroy();
        // Restore GSAP's defaults; this runtime owns the ticker configuration.
        gsap.ticker.lagSmoothing(500, 33);
        stopFlips();
        glide?.kill();
        heroTimer.setGlide(null);
      };
    });
    root.dataset.motion = "ready";
    ScrollTrigger.refresh();

    return () => {
      mm.revert();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);
  return null;
}
