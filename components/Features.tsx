"use client";

import Reveal from "./Reveal";
import { useI18n } from "@/lib/i18n";

export default function Features() {
  const { t } = useI18n();
  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const small = [
    { t: "feat3_t", d: "feat3_d", ic: "◎" },
    { t: "feat4_t", d: "feat4_d", ic: "⚡" },
    { t: "feat5_t", d: "feat5_d", ic: "✦" },
  ];

  return (
    <section className="section" id="features">
      <div className="container">
        <div className="sec-head">
          <Reveal>
            <div className="eyebrow">
              <span className="pip" />
              {t("feat_eyebrow")}
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="display">{t("feat_title")}</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="lead">{t("feat_lead")}</p>
          </Reveal>
        </div>

        <div className="features-grid">
          <Reveal className="feature">
            <div className="glow" />
            <div>
              <h3>{t("feat1_t")}</h3>
              <p>{t("feat1_d")}</p>
            </div>
            <div>
              <svg className="chart" viewBox="0 0 520 120" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="fg1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="rgba(212,175,55,0.45)" />
                    <stop offset="100%" stopColor="rgba(212,175,55,0)" />
                  </linearGradient>
                </defs>
                <path
                  d="M0,96 C60,88 90,52 150,58 C210,64 240,104 300,92 C360,80 390,28 450,36 C486,41 506,54 520,50"
                  fill="none"
                  stroke="#d4af37"
                  strokeWidth="2.4"
                />
                <path
                  d="M0,96 C60,88 90,52 150,58 C210,64 240,104 300,92 C360,80 390,28 450,36 C486,41 506,54 520,50 L520,120 L0,120 Z"
                  fill="url(#fg1)"
                />
              </svg>
              <button className="btn btn-primary" style={{ marginTop: 20 }} onClick={() => go("contact")}>
                {t("feat1_cta")} <span className="ic">→</span>
              </button>
            </div>
          </Reveal>

          <Reveal className="feature" delay={0.08}>
            <div className="glow" />
            <div>
              <h3>{t("feat2_t")}</h3>
              <p>{t("feat2_d")}</p>
            </div>
            <div className="kpis">
              <div className="kpi">
                <b className="grad">3.4×</b>
                <span>{t("feat2_k1")}</span>
              </div>
              <div className="kpi">
                <b className="grad">%98</b>
                <span>{t("feat2_k2")}</span>
              </div>
              <div className="kpi">
                <b className="grad">24s</b>
                <span>{t("feat2_k3")}</span>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="features-row">
          {small.map((f, i) => (
            <Reveal key={f.t} className="feature" delay={i * 0.06}>
              <div>
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 14,
                    display: "grid",
                    placeItems: "center",
                    fontSize: "1.2rem",
                    color: "#d4af37",
                    background: "rgba(212,175,55,0.1)",
                    border: "1px solid rgba(212,175,55,0.2)",
                    marginBottom: 20,
                  }}
                >
                  {f.ic}
                </div>
                <h3>{t(f.t)}</h3>
                <p>{t(f.d)}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
