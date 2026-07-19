"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Reveal from "./Reveal";
import { useI18n } from "@/lib/i18n";

const TYPE_KEYS = ["f_type_o1", "f_type_o2", "f_type_o3", "f_type_o4"];
const BUDGETS = ["₺25K – ₺50K", "₺50K – ₺100K", "₺100K+"];

/* Custom animated dropdown (replaces the native select popup) */
function Dropdown({
  options,
  value,
  onChange,
  placeholder,
}: {
  options: string[];
  value: number | null;
  onChange: (i: number) => void;
  placeholder: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onEsc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onEsc);
    };
  }, [open]);

  return (
    <div className={`dd${open ? " open" : ""}`} ref={ref}>
      <button type="button" className={`dd-trigger${value === null ? " ph" : ""}`} onClick={() => setOpen((o) => !o)}>
        <span>{value === null ? placeholder : options[value]}</span>
        <svg className="dd-caret" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      <AnimatePresence>
        {open && (
          <motion.ul
            className="dd-list"
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
          >
            {options.map((o, i) => (
              <li key={o}>
                <button
                  type="button"
                  className={`dd-opt${value === i ? " on" : ""}`}
                  onClick={() => {
                    onChange(i);
                    setOpen(false);
                  }}
                >
                  <span>{o}</span>
                  {value === i && <span className="dd-tick">✓</span>}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Contact() {
  const { t } = useI18n();
  const [sent, setSent] = useState(false);
  const [type, setType] = useState<number | null>(null);
  const [budget, setBudget] = useState<number | null>(null);

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      (e.target as HTMLFormElement).reset();
      setSent(false);
      setType(null);
      setBudget(null);
    }, 4200);
  };

  const points = [
    { k: "cta_p1", v: "info@futurera.digital", ic: "✉" },
    { k: "cta_p2", v: "+90 555 000 00 00", ic: "☎" },
    { k: "cta_p3", v: t("cta_p3v"), ic: "⌘" },
  ];

  return (
    <section className="section" id="contact">
      <div className="container">
        <Reveal>
          <div className="cta-banner">
            <div className="cglow" />
            <div className="cta-left">
              <div className="eyebrow">
                <span className="pip" />
                {t("cta_eyebrow")}
              </div>
              <h2 className="display">{t("cta_title")}</h2>
              <p className="lead">{t("cta_lead")}</p>
              <ul className="contact-points">
                {points.map((p) => (
                  <li key={p.k}>
                    <span className="ic">{p.ic}</span>
                    <span>
                      <b>{p.v}</b>
                      {t(p.k)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <form className="panel" onSubmit={submit}>
              <div className="panel-head">
                <span className="panel-step">01 — {t("f_step1")}</span>
              </div>

              <div className="field">
                <label>{t("f_company")}</label>
                <input type="text" required placeholder={t("f_company_ph")} />
              </div>
              <div className="field">
                <label>{t("f_person")}</label>
                <input type="text" required placeholder={t("f_person_ph")} />
              </div>
              <div className="field">
                <label>{t("f_email")}</label>
                <input type="email" required placeholder="ornek@sirket.com" />
              </div>
              <div className="field">
                <label>{t("f_phone")}</label>
                <input type="tel" placeholder="+90 5__ ___ __ __" />
              </div>

              <div className="field full">
                <label>{t("f_type")}</label>
                <Dropdown options={TYPE_KEYS.map((k) => t(k))} value={type} onChange={setType} placeholder={t("f_type_ph")} />
              </div>

              <div className="field full">
                <label>{t("f_budget")}</label>
                <Dropdown options={BUDGETS} value={budget} onChange={setBudget} placeholder={t("f_budget_ph")} />
              </div>

              <div className="field full">
                <label>{t("f_details")}</label>
                <textarea placeholder={t("f_details_ph")} />
              </div>

              <button type="submit" className="btn btn-primary form-submit">
                {t("f_submit")}
              </button>

              <AnimatePresence>
                {sent && (
                  <motion.div
                    className="form-success"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    <span className="fs-check">✓</span>
                    {t("f_success")}
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
