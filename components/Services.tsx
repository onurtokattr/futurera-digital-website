"use client";

import Reveal from "./Reveal";
import { useI18n } from "@/lib/i18n";

const ICONS: Record<string, React.ReactNode> = {
  launch: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
  ),
  cube: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <path d="M3.27 6.96L12 12.01l8.73-5.05" />
      <path d="M12 22.08V12" />
    </svg>
  ),
  drone: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M23 7l-7 5 7 5V7z" />
      <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
    </svg>
  ),
  bolt: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  ),
};

const SERVICES = [
  { k: "s1", icon: "launch", chips: ["s1_c1", "s1_c2", "s1_c3"] },
  { k: "s2", icon: "cube", chips: ["s2_c1", "s2_c2", "s2_c3"] },
  { k: "s3", icon: "drone", chips: ["s3_c1", "s3_c2", "s3_c3"] },
  { k: "s4", icon: "bolt", chips: ["s4_c1", "s4_c2", "s4_c3"] },
];

export default function Services() {
  const { t } = useI18n();
  return (
    <section className="section" id="services">
      <div className="container">
        <div className="sec-head">
          <Reveal>
            <div className="eyebrow">
              <span className="pip" />
              {t("serv_eyebrow")}
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="display">{t("serv_title")}</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="lead">{t("serv_lead")}</p>
          </Reveal>
        </div>

        <div className="services-list">
          {SERVICES.map((s, i) => (
            <Reveal key={s.k} delay={i * 0.06}>
              <div className="srow">
                <div className="sicon">{ICONS[s.icon]}</div>
                <div className="smain">
                  <div className="sname">{t(`${s.k}_name`)}</div>
                  <div className="sdesc">{t(`${s.k}_desc`)}</div>
                  <div className="schips">
                    {s.chips.map((c) => (
                      <span key={c}>{t(c)}</span>
                    ))}
                  </div>
                </div>
                <div className="sarrow" aria-hidden>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
