"use client";

import Reveal from "./Reveal";
import { useI18n } from "@/lib/i18n";

const LEADS = [
  { n: "Ahmet K.", d: "fs2_r1", st: "fs2_s1", cls: "new", av: "A" },
  { n: "Selin Y.", d: "fs2_r2", st: "fs2_s2", cls: "ok", av: "S" },
  { n: "Murat D.", d: "fs2_r3", st: "fs2_s3", cls: "appt", av: "M" },
];

const PIPE = [
  { k: "fs3_p1", w: "94%", c: "412" },
  { k: "fs3_p2", w: "68%", c: "296" },
  { k: "fs3_p3", w: "36%", c: "154" },
  { k: "fs3_p4", w: "15%", c: "48" },
];

const BARS = [30, 44, 38, 56, 70, 62, 92];

export default function Features() {
  const { t } = useI18n();

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
          {/* 1 — Proven system: 100M+ TL, growth chart */}
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
              <svg className="bchart" viewBox="0 0 560 140" preserveAspectRatio="none" aria-hidden>
                <defs>
                  <linearGradient id="fsg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="rgba(212,175,55,0.45)" />
                    <stop offset="100%" stopColor="rgba(212,175,55,0)" />
                  </linearGradient>
                </defs>
                {[28, 66, 104].map((y) => (
                  <line key={y} x1="0" y1={y} x2="560" y2={y} stroke="rgba(245,234,211,0.07)" strokeWidth="1" />
                ))}
                <path
                  d="M0,118 C50,112 80,96 130,98 C180,100 210,78 260,72 C310,66 340,74 390,54 C440,36 490,30 560,14"
                  fill="none"
                  stroke="#e7cf82"
                  strokeWidth="2.4"
                />
                <path
                  d="M0,118 C50,112 80,96 130,98 C180,100 210,78 260,72 C310,66 340,74 390,54 C440,36 490,30 560,14 L560,140 L0,140 Z"
                  fill="url(#fsg)"
                />
                {[
                  [130, 98],
                  [260, 72],
                  [390, 54],
                  [548, 17],
                ].map(([x, y]) => (
                  <circle key={x} cx={x} cy={y} r="3.4" fill="#0b0f2e" stroke="#e7cf82" strokeWidth="2" />
                ))}
              </svg>
              <span className="bchart-label">{t("fs1_chart")}</span>
            </div>
          </Reveal>

          {/* 2 — Lead generation: live inbox mock */}
          <Reveal className="bcard b5" delay={0.06}>
            <div className="bhead-row">
              <h3>{t("fs2_t")}</h3>
              <span className="bbadge">{t("fs2_badge")}</span>
            </div>
            <p>{t("fs2_d")}</p>
            <div className="leadlist">
              {LEADS.map((l) => (
                <div className="leadrow" key={l.n}>
                  <span className="av">{l.av}</span>
                  <div className="ld">
                    <b>{l.n}</b>
                    <small>{t(l.d)}</small>
                  </div>
                  <em className={`st ${l.cls}`}>{t(l.st)}</em>
                </div>
              ))}
            </div>
          </Reveal>

          {/* 3 — CRM: pipeline mock */}
          <Reveal className="bcard b4" delay={0.04}>
            <h3>{t("fs3_t")}</h3>
            <p>{t("fs3_d")}</p>
            <div className="pipe">
              {PIPE.map((p) => (
                <div className="prow" key={p.k}>
                  <span>{t(p.k)}</span>
                  <div className="pbar">
                    <i style={{ width: p.w }} />
                  </div>
                  <b>{p.c}</b>
                </div>
              ))}
            </div>
          </Reveal>

          {/* 4 — Social: growth bars */}
          <Reveal className="bcard b4" delay={0.08}>
            <h3>{t("fs4_t")}</h3>
            <p>{t("fs4_d")}</p>
            <div className="sgrow">
              <div className="sbig grad">+240%</div>
              <span className="slabel">{t("fs4_m")}</span>
            </div>
            <div className="sbars" aria-hidden>
              {BARS.map((h, i) => (
                <i key={i} style={{ height: `${h}%` }} />
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
            <div className="thumbs" aria-hidden>
              <div className="thumb">
                <i>▶</i>
                <em>0:38</em>
              </div>
              <div className="thumb t2">
                <i>▶</i>
                <em>1:12</em>
              </div>
              <div className="thumb t3">
                <i>▶</i>
                <em>0:52</em>
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
