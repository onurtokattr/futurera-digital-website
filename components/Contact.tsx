"use client";

import { useState } from "react";
import Reveal from "./Reveal";
import { useI18n } from "@/lib/i18n";

export default function Contact() {
  const { t } = useI18n();
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      (e.target as HTMLFormElement).reset();
      setSent(false);
    }, 4000);
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
              <div className="field">
                <label>{t("f_company")}</label>
                <input type="text" required />
              </div>
              <div className="field">
                <label>{t("f_person")}</label>
                <input type="text" required />
              </div>
              <div className="field">
                <label>{t("f_email")}</label>
                <input type="email" required />
              </div>
              <div className="field">
                <label>{t("f_phone")}</label>
                <input type="tel" />
              </div>
              <div className="field">
                <label>{t("f_type")}</label>
                <select>
                  <option>{t("f_type_o1")}</option>
                  <option>{t("f_type_o2")}</option>
                  <option>{t("f_type_o3")}</option>
                  <option>{t("f_type_o4")}</option>
                </select>
              </div>
              <div className="field">
                <label>{t("f_budget")}</label>
                <select>
                  <option>₺25K – ₺50K</option>
                  <option>₺50K – ₺100K</option>
                  <option>₺100K+</option>
                </select>
              </div>
              <div className="field full">
                <label>{t("f_details")}</label>
                <textarea placeholder={t("f_details_ph")} />
              </div>
              <button type="submit" className="btn btn-primary">
                🚀 {t("f_submit")}
              </button>
              <div className="form-note">{sent ? t("f_success") : ""}</div>
            </form>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
