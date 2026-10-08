import { PromoVideo } from "./PromoVideo";
export function Watch() {
  return (
    <section className="chapter" id="watch">
      <div className="chapter-head">
        <div className="chapter-no">
          <b>00</b>Watch
        </div>
        <h2>
          Two minutes.
          <br />
          Every feature.
        </h2>
        <p>
          A short tour of EyePause, narrated in English or Arabic. Pick a
          language and press play.
        </p>
      </div>
      <PromoVideo />
    </section>
  );
}
