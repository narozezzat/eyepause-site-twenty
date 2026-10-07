import type { Metadata, Viewport } from "next";
import { Archivo, IBM_Plex_Mono } from "next/font/google";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { site } from "@/config/site";
import { getRelease } from "@/lib/releases";
import { THEME_COLORS, themeInitScript } from "@/lib/theme";
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
    // Media-scoped for System; ThemeToggle repaints both for an explicit choice.
    { media: "(prefers-color-scheme: dark)", color: THEME_COLORS.dark },
    { media: "(prefers-color-scheme: light)", color: THEME_COLORS.light },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const { version } = getRelease();
  return (
    // The head script sets data-theme and color-scheme before hydration.
    <html
      lang="en"
      className={`${archivo.variable} ${plexMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* First in <head> and synchronous, so the stored theme applies before first paint. */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <div className="wrap">
          <SiteHeader />
          {children}
          <SiteFooter version={version} />
        </div>
      </body>
    </html>
  );
}
