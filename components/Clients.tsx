"use client";

import { useI18n } from "@/lib/i18n";

// Placeholder client names — replace with real reference logos later.
const CLIENTS = [
  "Hat Naturel",
  "Via Vita",
  "AtaShading",
  "Simple Deal",
  "Modüler Fence",
  "Başak Çit",
  "Nova Yapı",
  "Aurora Homes",
];

export default function Clients() {
  const { t } = useI18n();
  const loop = [...CLIENTS, ...CLIENTS];

  return (
    <section className="clients" id="clients">
      <div className="clients-head">{t("clients_head")}</div>
      <div className="marquee">
        <div className="marquee-track">
          {loop.map((c, i) => (
            <div className="client-logo" key={i}>
              <span className="shield" />
              {c}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
