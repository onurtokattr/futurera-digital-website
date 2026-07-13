"use client";

import Reveal from "./Reveal";
import { useI18n } from "@/lib/i18n";

const SERVICES = [
  { num: "01", nameKey: "s1_name", descKey: "s1_desc", color: "#00d9ff" },
  { num: "02", nameKey: "s2_name", descKey: "s2_desc", color: "#a855f7" },
  { num: "03", nameKey: "s3_name", descKey: "s3_desc", color: "#d4af37" },
  { num: "04", nameKey: "s4_name", descKey: "s4_desc", color: "#10b981" },
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
            <Reveal key={s.num} delay={i * 0.06}>
              <div className="service-row" style={{ ["--c" as any]: s.color }}>
                <div className="num">{s.num}</div>
                <div className="name">{t(s.nameKey)}</div>
                <div className="desc">{t(s.descKey)}</div>
                <div className="orb" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
