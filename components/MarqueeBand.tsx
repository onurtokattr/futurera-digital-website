"use client";

import { useI18n } from "@/lib/i18n";

// Giant outline-text marquee — a classic Awwwards section divider.
export default function MarqueeBand() {
  const { t } = useI18n();
  const words = [t("band_1"), t("band_2"), t("band_3"), t("band_4"), t("band_5")];
  const run = words.map((w, i) => (
    <span key={i} className={i % 2 === 0 ? "solid" : ""}>
      {w} <em>✦</em>
    </span>
  ));

  return (
    <div className="band" aria-hidden>
      <div className="band-track">
        {run}
        {run}
        {run}
      </div>
    </div>
  );
}
