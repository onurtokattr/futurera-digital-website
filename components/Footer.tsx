"use client";

import Image from "next/image";
import { useI18n } from "@/lib/i18n";

const SOCIALS = [
  { name: "Instagram", href: "https://www.instagram.com/futurera.digital/" },
  { name: "LinkedIn", href: "https://www.linkedin.com/company/futurera-digital" },
];

export default function Footer() {
  const { t } = useI18n();
  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  const toTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="footer">
      <div className="container">
        {/* Giant wordmark */}
        <div className="footer-word display" aria-hidden>
          FUTURERA
        </div>

        <div className="footer-grid">
          <div className="footer-brand">
            <Image src="/logo-full.png" alt="Futurera Digital" width={80} height={62} className="brand-logo" />
            <p>{t("foot_tag")}</p>
            <div className="socials">
              {SOCIALS.map((s) => (
                <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer">
                  {s.name} <em>↗</em>
                </a>
              ))}
            </div>
          </div>

          <div className="footer-col">
            <h5>{t("foot_c1")}</h5>
            <a onClick={() => go("services")}>{t("s1_name")}</a>
            <a onClick={() => go("services")}>{t("s2_name")}</a>
            <a onClick={() => go("services")}>{t("s3_name")}</a>
            <a onClick={() => go("services")}>{t("s4_name")}</a>
          </div>

          <div className="footer-col">
            <h5>{t("foot_c2")}</h5>
            <a onClick={() => go("about")}>{t("nav_about")}</a>
            <a onClick={() => go("work")}>{t("nav_work")}</a>
            <a onClick={() => go("reviews")}>{t("nav_reviews")}</a>
            <a onClick={() => go("contact")}>{t("nav_contact")}</a>
          </div>

          <div className="footer-col">
            <h5>{t("foot_c3")}</h5>
            <a href="mailto:info@futurera.digital">info@futurera.digital</a>
            <a href="tel:+905550000000">+90 555 000 00 00</a>
            <a>{t("cta_p3v")}</a>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 Futurera Digital. {t("foot_rights")}</span>
          <button className="totop" onClick={toTop} aria-label="Back to top">
            ↑
          </button>
          <span>BUILT IN THE DIGITAL UNIVERSE ✦</span>
        </div>
      </div>
    </footer>
  );
}
