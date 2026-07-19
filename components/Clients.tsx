"use client";

import { useI18n } from "@/lib/i18n";

// Real client logos, normalized to uniform cream silhouettes (see scripts/process_logos.py).
const LOGOS = [
  "atashading",
  "hatnaturel",
  "viavita",
  "turyapdubai",
  "delmare",
  "vartur",
  "aven",
  "berr",
  "mervmix",
  "bayedi",
  "palmiye",
  "electrum",
  "vema",
  "basakcit",
  "simpledeal",
  "teoman",
  "bestar",
];

// Compact / icon-heavy marks that read small at the base height — bumped up.
const BIG = new Set(["palmiye", "electrum", "hatnaturel", "teoman", "bestar", "turyapdubai", "delmare"]);

export default function Clients() {
  const { t } = useI18n();
  const loop = [...LOGOS, ...LOGOS];

  return (
    <section className="clients" id="clients">
      <div className="clients-head">
        <span className="eyebrow">
          <span className="pip" />
          {t("clients_eyebrow")}
        </span>
        <h3>{t("clients_head")}</h3>
      </div>
      <div className="marquee">
        <div className="marquee-track">
          {loop.map((slug, i) => (
            <div className={`client-logo${BIG.has(slug) ? " big" : ""}`} key={i}>
              <img src={`/clients/${slug}.png`} alt={slug} loading="eager" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
