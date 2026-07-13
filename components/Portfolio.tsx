"use client";

import Reveal from "./Reveal";
import { useI18n } from "@/lib/i18n";

const PROJECTS = [
  { t: "work_p1_t", c: "work_p1_c", span: "span-7" },
  { t: "work_p2_t", c: "work_p2_c", span: "span-5" },
  { t: "work_p3_t", c: "work_p3_c", span: "span-5" },
  { t: "work_p4_t", c: "work_p4_c", span: "span-7" },
  { t: "work_p5_t", c: "work_p5_c", span: "span-6" },
  { t: "work_p6_t", c: "work_p6_c", span: "span-6" },
];

export default function Portfolio() {
  const { t } = useI18n();
  return (
    <section className="section" id="work">
      <div className="container">
        <div className="sec-head">
          <Reveal>
            <div className="eyebrow">
              <span className="pip" />
              {t("work_eyebrow")}
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="display">{t("work_title")}</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="lead">{t("work_lead")}</p>
          </Reveal>
        </div>

        <div className="portfolio-grid">
          {PROJECTS.map((p, i) => (
            <Reveal key={i} delay={(i % 2) * 0.08} className={`proj ${p.span}${i % 3 === 0 ? " tall" : ""}`}>
              <div className="proj-img">GÖRSEL / 3D</div>
              <div className="proj-meta">
                <div>
                  <h3>{t(p.t)}</h3>
                  <span>{t(p.c)}</span>
                </div>
                <div className="proj-arrow">↗</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
