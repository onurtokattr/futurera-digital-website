"use client";

import Reveal from "./Reveal";
import { useI18n } from "@/lib/i18n";

const PROJECTS = [
  { t: "work_p2_t", c: "work_p2_c", span: "span-6", img: "/work/viavita.jpg", pos: "center" },
  { t: "work_p1_t", c: "work_p1_c", span: "span-6", img: "/work/hatnaturel.jpg", pos: "center" },
  { t: "work_p3_t", c: "work_p3_c", span: "span-5", img: "/work/atashading.jpg", pos: "center" },
  { t: "work_p4_t", c: "work_p4_c", span: "span-7" },
  { t: "work_merv_t", c: "work_merv_c", span: "span-12", img: "/work/mervmix.jpg", pos: "center", cls: "feature-fit" },
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
          {/* Featured — Delmare */}
          <Reveal className="proj span-12 feature">
            <img className="proj-photo" src="/work/delmare.jpg" alt="Delmare Collection" loading="lazy" />
            <div className="proj-meta">
              <div>
                <span className="proj-badge">{t("work_feat_badge")}</span>
                <h3>{t("work_feat_t")}</h3>
                <span className="proj-c">{t("work_feat_c")}</span>
                <div className="proj-tags">
                  <em>{t("work_feat_g1")}</em>
                  <em>{t("work_feat_g2")}</em>
                  <em>{t("work_feat_g3")}</em>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Featured — Vema Tuzla */}
          <Reveal className="proj span-12 feature feature-fit">
            <img className="proj-photo" src="/work/vema.jpg" alt="Vema Tuzla" loading="lazy" />
            <div className="proj-meta">
              <div>
                <span className="proj-badge">{t("work_vema_badge")}</span>
                <h3>{t("work_vema_t")}</h3>
                <span className="proj-c">{t("work_vema_c")}</span>
                <div className="proj-tags">
                  <em>{t("work_vema_g1")}</em>
                  <em>{t("work_vema_g2")}</em>
                  <em>{t("work_vema_g3")}</em>
                  <em>{t("work_vema_g4")}</em>
                </div>
              </div>
            </div>
          </Reveal>

          {PROJECTS.map((p, i) => (
            <Reveal key={i} delay={(i % 2) * 0.08} className={`proj ${p.span}${p.cls ? ` ${p.cls}` : i % 3 === 0 ? " tall" : ""}`}>
              {p.img ? (
                <img className="proj-photo" src={p.img} alt={t(p.t)} loading="lazy" style={{ objectPosition: p.pos }} />
              ) : (
                <div className="proj-img">GÖRSEL / 3D</div>
              )}
              <div className="proj-meta">
                <div>
                  <h3>{t(p.t)}</h3>
                  <span className="proj-c">{t(p.c)}</span>
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
