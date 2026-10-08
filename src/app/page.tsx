import { Splash } from "@/components/brand/Splash";
import { DownloadPanel } from "@/components/download/DownloadPanel";
import { MotionRuntime } from "@/components/motion/MotionRuntime";
import { Chapters } from "@/components/sections/Chapters";
import { Hero } from "@/components/sections/Hero";
import { getDownloads } from "@/lib/releases";

export default function Home() {
  const options = getDownloads();
  return (
    <>
      <Splash />
      <main id="main" tabIndex={-1}>
        <Hero />
        <Chapters />
        <DownloadPanel options={options} />
      </main>
      {/* Lives with the page, not the layout, so it runs after the page (behind loading.tsx) has hydrated and never rewrites text React still owns. */}
      <MotionRuntime />
    </>
  );
}
