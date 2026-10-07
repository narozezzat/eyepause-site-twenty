import type { Metadata, Viewport } from "next";
import { Archivo, IBM_Plex_Mono } from "next/font/google";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { site } from "@/config/site";
import { getRelease } from "@/lib/releases";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
  variable: "--font-archivo",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-plex-mono",
});

export const metadata: Metadata = {
  title: site.title,
  description: site.description,
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  colorScheme: "dark light",
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0c0e10" },
    { media: "(prefers-color-scheme: light)", color: "#f4f3ef" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const { version } = getRelease();
  return (
    <html lang="en" className={`${archivo.variable} ${plexMono.variable}`} suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <a
            className="fixed top-3 left-4 z-[100] inline-flex min-h-11 -translate-y-[200%] items-center bg-accent px-4 font-mono text-caption leading-none font-medium tracking-widest text-accent-fg uppercase no-underline focus-visible:translate-y-0 sm:left-6 lg:left-8"
            href="#main"
          >
            Skip to content
          </a>
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
            <SiteHeader />
            {children}
            <SiteFooter version={version} />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
