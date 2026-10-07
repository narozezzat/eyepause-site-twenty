import { Splash } from "@/components/brand/Splash";
import { DownloadPanel } from "@/components/download/DownloadPanel";
import { Chapters } from "@/components/sections/Chapters";
import { Hero } from "@/components/sections/Hero";
import { Privacy } from "@/components/sections/Privacy";
import { getDownloads } from "@/lib/releases";

export default async function Home() {
  const options = await getDownloads();
  return (
    <>
      <Splash />
      <main id="main" tabIndex={-1}>
        <Hero />
        <Chapters />
        <Privacy />
        <DownloadPanel options={options} />
      </main>
    </>
  );
}
