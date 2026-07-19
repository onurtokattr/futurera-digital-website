"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Reveal from "./Reveal";
import { useI18n } from "@/lib/i18n";

const TYPE_KEYS = ["f_type_o1", "f_type_o2", "f_type_o3", "f_type_o4"];
const BUDGETS = ["₺25K – ₺50K", "₺50K – ₺100K", "₺100K+"];

export default function Contact() {
  const { t } = useI18n();
  const [sent, setSent] = useState(false);
  const [type, setType] = useState(0);
  const [budget, setBudget] = useState(1);

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      (e.target as HTMLFormElement).reset();
      setSent(false);
      setType(0);
      setBudget(1);
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
                <div className="chips">
                  {TYPE_KEYS.map((k, i) => (
                    <button
                      type="button"
                      key={k}
                      className={`chip${type === i ? " on" : ""}`}
                      onClick={() => setType(i)}
                    >
                      {type === i && <span className="chip-tick">✓</span>}
                      {t(k)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="field full">
                <label>{t("f_budget")}</label>
                <div className="chips seg">
                  {BUDGETS.map((b, i) => (
                    <button
                      type="button"
                      key={b}
                      className={`chip${budget === i ? " on" : ""}`}
                      onClick={() => setBudget(i)}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              <div className="field full">
                <label>{t("f_details")}</label>
                <textarea placeholder={t("f_details_ph")} />
              </div>

              <button type="submit" className="btn btn-primary form-submit">
                🚀 {t("f_submit")}
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
