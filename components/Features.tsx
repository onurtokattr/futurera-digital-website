"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import Reveal from "./Reveal";
import { useI18n } from "@/lib/i18n";

/* growth chart data — cumulative sales, M TL */
const CHART = [
  { l: "Q1 '23", v: 6 },
  { l: "Q2 '23", v: 14 },
  { l: "Q3 '23", v: 21 },
  { l: "Q4 '23", v: 33 },
  { l: "Q1 '24", v: 42 },
  { l: "Q2 '24", v: 58 },
  { l: "Q3 '24", v: 71 },
  { l: "Q4 '24", v: 86 },
  { l: "Q1 '25", v: 103 },
];
const CW = 560;
const CH = 140;
const CMAX = 110;
const pts = CHART.map((d, i) => ({
  ...d,
  x: (i / (CHART.length - 1)) * CW,
  y: CH - 14 - (d.v / CMAX) * (CH - 28),
}));
const linePath = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");
const areaPath = `${linePath} L${CW},${CH} L0,${CH} Z`;

const LEAD_POOL = [
  { n: "Ahmet K.", d: "fs2_r1", st: "fs2_s1", cls: "new", av: "A" },
  { n: "Selin Y.", d: "fs2_r2", st: "fs2_s2", cls: "ok", av: "S" },
  { n: "Murat D.", d: "fs2_r3", st: "fs2_s3", cls: "appt", av: "M" },
  { n: "Zeynep A.", d: "fs2_r2", st: "fs2_s1", cls: "new", av: "Z" },
  { n: "Emre T.", d: "fs2_r1", st: "fs2_s3", cls: "appt", av: "E" },
  { n: "Deniz B.", d: "fs2_r3", st: "fs2_s2", cls: "ok", av: "D" },
];

const PIPE = [
  { k: "fs3_p1", w: 94, c: 412 },
  { k: "fs3_p2", w: 68, c: 296 },
  { k: "fs3_p3", w: 36, c: 154 },
  { k: "fs3_p4", w: 15, c: 48 },
];

const BARS = [30, 44, 38, 56, 70, 62, 92];
const BAR_REACH = ["12K", "18K", "15K", "23K", "31K", "27K", "42K"];

export default function Features() {
  const { t } = useI18n();

  /* — live chart hover — */
  const [ci, setCi] = useState<number | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const chartInView = useInView(svgRef, { once: true, margin: "-60px" });

  const onChartMove = (e: React.MouseEvent) => {
    const r = svgRef.current?.getBoundingClientRect();
    if (!r) return;
    const x = ((e.clientX - r.left) / r.width) * CW;
    let best = 0;
    for (let i = 1; i < pts.length; i++) if (Math.abs(pts[i].x - x) < Math.abs(pts[best].x - x)) best = i;
    setCi(best);
  };

  /* — live lead feed — */
  const [leadIdx, setLeadIdx] = useState(0);
  const [leadCount, setLeadCount] = useState(128);
  useEffect(() => {
    const id = setInterval(() => {
      setLeadIdx((i) => (i + 1) % LEAD_POOL.length);
      setLeadCount((c) => c + 1);
    }, 4200);
    return () => clearInterval(id);
  }, []);
  const visibleLeads = [0, 1, 2].map((o) => LEAD_POOL[(leadIdx + o) % LEAD_POOL.length]);

  /* — reels scene cycle — */
  const [reel, setReel] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setReel((r) => (r + 1) % 3), 3600);
    return () => clearInterval(id);
  }, []);

  /* — bars / pipe hover — */
  const [pi, setPi] = useState<number | null>(null);
  const [bi, setBi] = useState<number | null>(null);

  const pipeRef = useRef<HTMLDivElement>(null);
  const pipeInView = useInView(pipeRef, { once: true, margin: "-40px" });
  const barsRef = useRef<HTMLDivElement>(null);
  const barsInView = useInView(barsRef, { once: true, margin: "-40px" });

  const hp = ci !== null ? pts[ci] : null;

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

        <div className="bento">
          {/* 1 — Proven system: live growth chart */}
          <Reveal className="bcard b7">
            <div className="bglow" />
            <span className="btag">{t("fs1_tag")}</span>
            <h3>{t("fs1_t")}</h3>
            <p>{t("fs1_d")}</p>
            <div className="bkpis">
              <div className="bkpi">
                <b className="grad">100M+</b>
                <span>{t("fs1_k1")}</span>
              </div>
              <div className="bkpi">
                <b className="grad">50K+</b>
                <span>{t("fs1_k2")}</span>
              </div>
              <div className="bkpi">
                <b className="grad">3</b>
                <span>{t("fs1_k3")}</span>
              </div>
            </div>
            <div className="bchart-wrap">
              <svg
                ref={svgRef}
                className={`bchart${chartInView ? " on" : ""}`}
                viewBox={`0 0 ${CW} ${CH}`}
                preserveAspectRatio="none"
                onMouseMove={onChartMove}
                onMouseLeave={() => setCi(null)}
                aria-hidden
              >
                <defs>
                  <linearGradient id="fsg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="rgba(212,175,55,0.45)" />
                    <stop offset="100%" stopColor="rgba(212,175,55,0)" />
                  </linearGradient>
                </defs>
                {[28, 66, 104].map((y) => (
                  <line key={y} x1="0" y1={y} x2={CW} y2={y} stroke="rgba(245,234,211,0.07)" strokeWidth="1" />
                ))}
                <path className="carea" d={areaPath} fill="url(#fsg)" />
                <path className="cline" d={linePath} fill="none" stroke="#e7cf82" strokeWidth="2.4" pathLength={1} />
                {hp && (
                  <g className="chover">
                    <line x1={hp.x} y1="8" x2={hp.x} y2={CH} stroke="rgba(212,175,55,0.35)" strokeWidth="1" strokeDasharray="3 4" />
                    <circle cx={hp.x} cy={hp.y} r="5.5" fill="rgba(212,175,55,0.25)" />
                    <circle cx={hp.x} cy={hp.y} r="3.4" fill="#0b0f2e" stroke="#e7cf82" strokeWidth="2" />
                  </g>
                )}
                {pts
                  .filter((_, i) => i % 2 === 0)
                  .map((p) => (
                    <circle key={p.x} className="cdot" cx={p.x} cy={p.y} r="3" fill="#0b0f2e" stroke="#e7cf82" strokeWidth="1.6" />
                  ))}
                <circle className="cpulse" cx={pts[pts.length - 1].x} cy={pts[pts.length - 1].y} r="4" fill="#e7cf82" />
              </svg>
              {hp && (
                <div
                  className="ctip"
                  style={{ left: `${(hp.x / CW) * 100}%`, top: `${(hp.y / CH) * 100}%` }}
                >
                  <b>{hp.v}M ₺</b>
                  <span>{hp.l}</span>
                </div>
              )}
              <span className="bchart-label">{t("fs1_chart")}</span>
            </div>
          </Reveal>

          {/* 2 — Lead generation: LIVE inbox feed */}
          <Reveal className="bcard b5" delay={0.06}>
            <div className="bhead-row">
              <h3>{t("fs2_t")}</h3>
              <span className="bbadge live">
                <i className="livedot" /> +{leadCount} {t("fs2_badge_unit")}
              </span>
            </div>
            <p>{t("fs2_d")}</p>
            <div className="leadlist">
              <AnimatePresence initial={false} mode="popLayout">
                {visibleLeads.map((l) => (
                  <motion.div
                    className="leadrow"
                    key={l.n}
                    layout
                    initial={{ opacity: 0, y: -18, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 14, scale: 0.96 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <span className="av">{l.av}</span>
                    <div className="ld">
                      <b>{l.n}</b>
                      <small>{t(l.d)}</small>
                    </div>
                    <em className={`st ${l.cls}`}>{t(l.st)}</em>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </Reveal>

          {/* 3 — CRM: animated pipeline w/ hover data */}
          <Reveal className="bcard b4" delay={0.04}>
            <h3>{t("fs3_t")}</h3>
            <p>{t("fs3_d")}</p>
            <div className="pipe" ref={pipeRef}>
              {PIPE.map((p, i) => (
                <div
                  className={`prow${pi === i ? " hov" : ""}`}
                  key={p.k}
                  onMouseEnter={() => setPi(i)}
                  onMouseLeave={() => setPi(null)}
                >
                  <span>{t(p.k)}</span>
                  <div className="pbar">
                    <i style={{ width: pipeInView ? `${p.w}%` : "0%", transitionDelay: `${i * 0.12}s` }} />
                    {pi === i && (
                      <em className="ptip">
                        {p.c} {t("fs3_unit")} · %{p.w}
                      </em>
                    )}
                  </div>
                  <b>{p.c}</b>
                </div>
              ))}
            </div>
          </Reveal>

          {/* 4 — Social: animated bars w/ hover reach */}
          <Reveal className="bcard b4" delay={0.08}>
            <h3>{t("fs4_t")}</h3>
            <p>{t("fs4_d")}</p>
            <div className="sgrow">
              <div className="sbig grad">+240%</div>
              <span className="slabel">{t("fs4_m")}</span>
            </div>
            <div className="sbars" ref={barsRef} aria-hidden>
              {BARS.map((h, i) => (
                <div
                  className={`sbar${bi === i ? " hov" : ""}`}
                  key={i}
                  onMouseEnter={() => setBi(i)}
                  onMouseLeave={() => setBi(null)}
                >
                  {bi === i && <em className="stip">{BAR_REACH[i]}</em>}
                  <i style={{ height: barsInView ? `${h}%` : "6%", transitionDelay: `${i * 0.07}s` }} />
                </div>
              ))}
            </div>
          </Reveal>

          {/* 5 — Automation: flow mock */}
          <Reveal className="bcard b4" delay={0.12}>
            <div className="bhead-row">
              <h3>{t("fs5_t")}</h3>
              <span className="bbadge live">⚡ {t("fs5_badge")}</span>
            </div>
            <p>{t("fs5_d")}</p>
            <div className="flow" aria-hidden>
              <span className="fnode">{t("fs5_f1")}</span>
              <span className="farr">→</span>
              <span className="fnode gold">{t("fs5_f2")}</span>
              <span className="farr">→</span>
              <span className="fnode">{t("fs5_f3")}</span>
            </div>
          </Reveal>

          {/* 6 — Content: video thumbs mock */}
          <Reveal className="bcard b5" delay={0.05}>
            <div className="bhead-row">
              <h3>{t("fs6_t")}</h3>
              <span className="bbadge">{t("fs6_badge")}</span>
            </div>
            <p>{t("fs6_d")}</p>
            <div className="reelbox" aria-hidden>
              <div className="reel">
                <div className="reel-progress">
                  {[0, 1, 2].map((i) => (
                    <i key={i} className={i === reel ? "on" : i < reel ? "done" : ""} />
                  ))}
                </div>
                <div className={`reel-scene s${reel}`}>
                  <span className="reel-tag" key={reel}>{t(`fs6_v${reel + 1}`)}</span>
                  <div className="reel-skyline" />
                </div>
                <div className="reel-side">
                  <div className="reel-act">
                    <i className="rheart">♥</i>
                    <em>{(12.4 + reel * 3.1).toFixed(1)}K</em>
                  </div>
                  <div className="reel-act">
                    <i>💬</i>
                    <em>{342 + reel * 120}</em>
                  </div>
                  <div className="reel-act">
                    <i>↗</i>
                    <em>{86 + reel * 40}</em>
                  </div>
                </div>
                <span className="fheart h1">♥</span>
                <span className="fheart h2">♥</span>
                <span className="fheart h3">♥</span>
                <div className="reel-bottom">
                  <b>@futurera.digital</b>
                  <div className="reel-music">
                    <span className="eq">
                      <i />
                      <i />
                      <i />
                      <i />
                    </span>
                    <em>{t("fs6_music")}</em>
                  </div>
                </div>
              </div>
              <div className="reel-stats">
                <div className="rstat">
                  <b className="grad">1.2M+</b>
                  <span>{t("fs6_m1")}</span>
                </div>
                <div className="rstat">
                  <b className="grad">%8.4</b>
                  <span>{t("fs6_m2")}</span>
                </div>
                <div className="rstat">
                  <b className="grad">40+</b>
                  <span>{t("fs6_m3")}</span>
                </div>
              </div>
            </div>
          </Reveal>

          {/* 7 — Website: browser mock */}
          <Reveal className="bcard b7" delay={0.09}>
            <div className="bglow" />
            <h3>{t("fs7_t")}</h3>
            <p>{t("fs7_d")}</p>
            <div className="browser" aria-hidden>
              <div className="bbar">
                <i />
                <i />
                <i />
                <span>proje-adi.com</span>
              </div>
              <div className="bpage">
                <div className="bcol">
                  <div className="skel w85" />
                  <div className="skel w60" />
                  <div className="skel w70" />
                  <div className="bcta">{t("fs7_btn")}</div>
                </div>
                <div className="bform">
                  <div className="skel full" />
                  <div className="skel full" />
                  <div className="skel w70" />
                  <div className="skel gold full" />
                </div>
              </div>
            </div>
            <span className="bnote">{t("fs7_note")}</span>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
