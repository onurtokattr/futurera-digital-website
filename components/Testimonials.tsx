"use client";

import Reveal from "./Reveal";
import { useI18n } from "@/lib/i18n";

const ITEMS = [
  { q: "rev1", name: "Delmare Collection", role: "rev_r1", logo: "/clients/delmare.png" },
  { q: "rev2", name: "Vema Tuzla", role: "rev_r2", logo: "/clients/vema.png" },
  { q: "rev3", name: "Bayedi", role: "rev_r3", logo: "/clients/bayedi.png" },
];

export default function Testimonials() {
  const { t } = useI18n();
  return (
    <section className="section" id="reviews">
      <div className="container">
        <div className="sec-head">
          <Reveal>
            <div className="eyebrow">
              <span className="pip" />
              {t("rev_eyebrow")}
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="display">{t("rev_title")}</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="lead">{t("rev_lead")}</p>
          </Reveal>
        </div>

        <div className="testi-grid">
          {ITEMS.map((it, i) => (
            <Reveal key={i} delay={i * 0.08} className="testi">
              <div className="stars">★★★★★</div>
              <p>“{t(it.q)}”</p>
              <div className="who">
                <div className="av">
                  <img src={it.logo} alt={it.name} loading="lazy" />
                </div>
                <div>
                  <b>{it.name}</b>
                  <small>{t(it.role)}</small>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
