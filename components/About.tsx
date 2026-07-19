"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import Reveal from "./Reveal";
import { useI18n } from "@/lib/i18n";

const PILLARS = [
  {
    k: "about_pillar1",
    d: "about_pillar1_d",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21h18" />
        <path d="M5 21V7l8-4v18" />
        <path d="M19 21V11l-6-4" />
        <path d="M9 9v.01M9 12v.01M9 15v.01M9 18v.01" />
      </svg>
    ),
  },
  {
    k: "about_pillar2",
    d: "about_pillar2_d",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3v18h18" />
        <path d="M7 15l4-5 3 3 5-7" />
      </svg>
    ),
  },
  {
    k: "about_pillar3",
    d: "about_pillar3_d",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2 2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
  },
];

const METRICS = [
  { n: 8, prefix: "", suffix: "+", k: "about_m1" },
  { n: 12, prefix: "", suffix: "", k: "about_m2" },
  { n: 10, prefix: "₺", suffix: "M+", k: "about_m3" },
  { n: 98, prefix: "%", suffix: "", k: "about_m4" },
];

function CountUp({ to, prefix, suffix, run }: { to: number; prefix: string; suffix: string; run: boolean }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!run) return;
    let raf = 0;
    const start = performance.now();
    const dur = 1300;
    const tick = (now: number) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setV(Math.round(eased * to));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, to]);
  return (
    <b className="grad">
      {prefix}
      {v}
      {suffix}
    </b>
  );
}

export default function About() {
  const { t } = useI18n();
  const panelRef = useRef<HTMLDivElement>(null);
  const inView = useInView(panelRef, { once: true, margin: "-80px" });

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
            <h2 className="display" style={{ margin: "22px 0 24px" }}>
              {t("about_title")}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="lead">{t("about_p1")}</p>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="lead">{t("about_p2")}</p>
          </Reveal>

          <div className="about-pillars">
            {PILLARS.map((p, i) => (
              <Reveal className="pillar" key={p.k} delay={0.2 + i * 0.07}>
                <span className="pillar-ic">{p.icon}</span>
                <div>
                  <b>{t(p.k)}</b>
                  <span>{t(p.d)}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={0.1}>
          <div className="about-panel" ref={panelRef}>
            <div className="about-panel-glow" />
            <div className="about-panel-top">
              <span className="pip" />
              <span>{t("about_panel_label")}</span>
            </div>
            <div className="about-metrics">
              {METRICS.map((m) => (
                <div className="metric" key={m.k}>
                  <CountUp to={m.n} prefix={m.prefix} suffix={m.suffix} run={inView} />
                  <span>{t(m.k)}</span>
                </div>
              ))}
            </div>
            <div className="about-sign">
              <span className="orbit-dot" />
              {t("about_sign")}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
