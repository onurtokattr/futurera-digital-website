"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";

export default function Loader() {
  const { t } = useI18n();
  const [pct, setPct] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let v = 0;
    const id = setInterval(() => {
      v += Math.random() * 16 + 6;
      if (v >= 100) {
        v = 100;
        clearInterval(id);
        setTimeout(() => setDone(true), 500);
      }
      setPct(Math.floor(v));
    }, 150);
    return () => clearInterval(id);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="loader"
          exit={{ opacity: 0, filter: "blur(10px)", scale: 1.02 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.img
            src="/logo-full.png"
            alt="Futurera Digital"
            animate={{ scale: [1, 1.04, 1], opacity: [0.85, 1, 0.85] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="loader-bar">
            <motion.span animate={{ width: `${pct}%` }} transition={{ ease: "linear" }} />
          </div>
          <div className="loader-pct">{t("loading")}</div>
          <div className="loader-num display grad">{pct}</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
