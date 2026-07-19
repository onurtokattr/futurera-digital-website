"use client";

import dynamic from "next/dynamic";
import Cursor from "@/components/Cursor";
import ScrollTop from "@/components/ScrollTop";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Clients from "@/components/Clients";
import MarqueeBand from "@/components/MarqueeBand";
import Features from "@/components/Features";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import About from "@/components/About";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Starfield = dynamic(() => import("@/components/Starfield"), { ssr: false });

export default function Home() {
  return (
    <>
      <Starfield />
      <div className="veil" />
      <div className="grain-fx" />
      <Cursor />
      <Navbar />
      <main>
        <Hero />
        <Clients />
        <Features />
        <Services />
        <MarqueeBand />
        <Portfolio />
        <About />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <ScrollTop />
    </>
  );
}
