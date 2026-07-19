"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useI18n } from "@/lib/i18n";

const links = [
  { id: "services", key: "nav_services" },
  { id: "work", key: "nav_work" },
  { id: "about", key: "nav_about" },
  { id: "reviews", key: "nav_reviews" },
  { id: "contact", key: "nav_contact" },
];

export default function Navbar() {
  const { t, lang, setLang } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("hero");

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      // hide when scrolling down past the hero, reveal on any scroll up
      if (y > 500 && y > lastY + 6) setHidden(true);
      else if (y < lastY - 6 || y <= 500) setHidden(false);
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = ["hero", ...links.map((l) => l.id)];
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  const go = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className={`nav${scrolled ? " scrolled" : ""}${open ? " open" : ""}${hidden && !open ? " hide" : ""}`}>
      <button className="nav-brand" onClick={() => go("hero")}>
        <Image src="/logo-full.png" alt="Futurera Digital" width={92} height={71} className="brand-logo" priority />
      </button>

      <ul className="nav-links">
        {links.map((l) => (
          <li key={l.id}>
            <a className={active === l.id ? "active" : ""} onClick={() => go(l.id)}>
              <span className="nl-txt">{t(l.key)}</span>
            </a>
          </li>
        ))}
        <li className="nav-cta-m">
          <button className="btn btn-primary" onClick={() => go("contact")}>
            {t("nav_cta")}
          </button>
        </li>
      </ul>

      <div className="nav-right">
        <div className="lang">
          <button className={lang === "tr" ? "on" : ""} onClick={() => setLang("tr")}>
            TR
          </button>
          <button className={lang === "en" ? "on" : ""} onClick={() => setLang("en")}>
            EN
          </button>
        </div>
        <button className="btn btn-primary" onClick={() => go("contact")} style={{ padding: "10px 20px", fontSize: "0.82rem" }}>
          {t("nav_cta")}
        </button>
        <button className="burger" aria-label="Menu" onClick={() => setOpen((o) => !o)}>
          <span />
          <span />
          <span />
        </button>
      </div>
    </nav>
  );
}
