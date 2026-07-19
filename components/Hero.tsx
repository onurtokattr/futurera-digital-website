"use client";

import { useEffect, useRef, useState, ReactNode } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useI18n } from "@/lib/i18n";

const line = {
  hidden: { opacity: 0, y: "112%" },
  show: (i: number) => ({
    opacity: 1,
    y: "0%",
    transition: { duration: 1.1, delay: 0.2 * i, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

/* Numbers that count up after the loader clears */
function CountUp({ to, decimals = 0, suffix = "" }: { to: number; decimals?: number; suffix?: string }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    const start = performance.now();
    const delay = 1400;
    const dur = 1900;
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, Math.max(0, (now - start - delay) / dur));
      setV(to * (1 - Math.pow(1 - t, 3)));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to]);
  return (
    <>
      {v.toFixed(decimals)}
      {suffix}
    </>
  );
}

/* Buttons gently pulled toward the cursor */
function Magnetic({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(0, { stiffness: 170, damping: 15 });
  const y = useSpring(0, { stiffness: 170, damping: 15 });
  return (
    <motion.div
      ref={ref}
      style={{ x, y, display: "inline-block" }}
      onMouseMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * 0.28);
        y.set((e.clientY - r.top - r.height / 2) * 0.34);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

export default function Hero() {
  const { t } = useI18n();
  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  // Quiet parallax: planet sinks, content lifts.
  const { scrollY } = useScroll();
  const eclipseY = useTransform(scrollY, [0, 900], [0, 170]);
  const contentY = useTransform(scrollY, [0, 900], [0, -60]);

  return (
    <section className="hero" id="hero">
      {/* Gold halo breathing behind the headline */}
      <div className="hero-halo" aria-hidden />

      {/* Planet horizon + orbiting satellite */}
      <motion.div className="eclipse" style={{ y: eclipseY }} aria-hidden>
        <div className="orbit" />
        <div className="orbit-rot" />
        <div className="eclipse-rim" />
        <div className="eclipse-body" />
        <div className="eclipse-edge" />
      </motion.div>

      <motion.div className="container hero-inner" style={{ y: contentY }}>
        <motion.div
          className="eyebrow"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.8 }}
        >
          <span className="pip" />
          {t("hero_eyebrow")}
        </motion.div>

        <h1 className="display">
          <span style={{ display: "block", overflow: "hidden" }}>
            <motion.span style={{ display: "block" }} custom={0} variants={line} initial="hidden" animate="show">
              {t("hero_l1")}
            </motion.span>
          </span>
          <span style={{ display: "block", overflow: "hidden" }}>
            <motion.span
              style={{ display: "block" }}
              className="grad shimmer"
              custom={1}
              variants={line}
              initial="hidden"
              animate="show"
            >
              {t("hero_l2")}
            </motion.span>
          </span>
        </h1>

        <motion.p
          className="lead"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.9 }}
        >
          {t("hero_lead")}
        </motion.p>

        <motion.div
          className="hero-cta"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.9 }}
        >
          <Magnetic>
            <button className="btn btn-primary" onClick={() => go("contact")}>
              {t("hero_cta1")} <span className="ic">→</span>
            </button>
          </Magnetic>
          <Magnetic>
            <button className="btn btn-ghost" onClick={() => go("work")}>
              {t("hero_cta2")}
            </button>
          </Magnetic>
        </motion.div>

        <motion.div
          className="hero-stats"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.9 }}
        >
          <div className="stat">
            <b className="grad">
              <CountUp to={120} suffix="+" />
            </b>
            <span>{t("stat1")}</span>
          </div>
          <div className="stat">
            <b className="grad">
              <CountUp to={3.4} decimals={1} suffix="×" />
            </b>
            <span>{t("stat2")}</span>
          </div>
          <div className="stat">
            <b className="grad">
              <CountUp to={40} suffix="+" />
            </b>
            <span>{t("stat3")}</span>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        className="hero-hud"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.35, duration: 1 }}
      >
        <span>◦ FUTURERA DIGITAL · SYS ONLINE</span>
        <button className="hud-center" onClick={() => go("services")} aria-label="Scroll down">
          {t("hero_scroll")} <span className="m" />
        </button>
        <span>LAT 41.0082° · LON 28.9784° · IST</span>
      </motion.div>
    </section>
  );
}
