import { Splash } from "@/components/brand/Splash";
import { DownloadPanel } from "@/components/download/DownloadPanel";
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
    </>
  );
}
