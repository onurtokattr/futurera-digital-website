"use client";

import Reveal from "./Reveal";
import { useI18n } from "@/lib/i18n";

export default function About() {
  const { t } = useI18n();
  const metrics = [
    { b: "8+", k: "about_m1" },
    { b: "12", k: "about_m2" },
    { b: "₺10M+", k: "about_m3" },
    { b: "%98", k: "about_m4" },
  ];
  return (
    <section className="section" id="about">
      <div className="container about-grid">
        <div className="about-copy">
          <Reveal>
            <div className="eyebrow">
              <span className="pip" />
              {t("about_eyebrow")}
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="display" style={{ margin: "22px 0 26px" }}>
              {t("about_title")}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="lead">{t("about_p1")}</p>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="lead">{t("about_p2")}</p>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="about-metrics">
            {metrics.map((m) => (
              <div className="metric" key={m.k}>
                <b className="grad-text">{m.b}</b>
                <span>{t(m.k)}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
