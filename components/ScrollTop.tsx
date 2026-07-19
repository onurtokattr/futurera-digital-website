"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";

export default function ScrollTop() {
  const [show, setShow] = useState(false);
  const { scrollYProgress } = useScroll();
  const dash = useSpring(scrollYProgress, { stiffness: 120, damping: 22, mass: 0.4 });

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          className="scrolltop"
          onClick={toTop}
          aria-label="Başa dön"
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.92 }}
        >
          <svg className="st-ring" viewBox="0 0 44 44" aria-hidden>
            <circle cx="22" cy="22" r="20" fill="none" stroke="rgba(245,234,211,0.12)" strokeWidth="2" />
            <motion.circle
              cx="22"
              cy="22"
              r="20"
              fill="none"
              stroke="url(#stgrad)"
              strokeWidth="2"
              strokeLinecap="round"
              pathLength={1}
              style={{ pathLength: dash }}
              transform="rotate(-90 22 22)"
            />
            <defs>
              <linearGradient id="stgrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#e7cf82" />
                <stop offset="100%" stopColor="#d4af37" />
              </linearGradient>
            </defs>
          </svg>
          <svg className="st-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <line x1="12" y1="19" x2="12" y2="5" />
            <polyline points="6 11 12 5 18 11" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
