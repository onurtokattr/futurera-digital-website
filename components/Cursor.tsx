"use client";

import { useEffect, useRef } from "react";

// Awwwards-style custom cursor: instant gold dot + lagging ring that grows on interactive targets.
export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // only on fine pointers (desktop)
    if (!window.matchMedia("(pointer: fine)").matches) return;
    document.documentElement.classList.add("has-cursor");

    const dot = dotRef.current!;
    const ring = ringRef.current!;
    let x = innerWidth / 2, y = innerHeight / 2;
    let rx = x, ry = y;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      dot.style.transform = `translate(${x}px, ${y}px)`;
    };

    const onOver = (e: MouseEvent) => {
      const t = (e.target as HTMLElement).closest("a, button, .proj, .service-row, .testi, input, select, textarea");
      ring.classList.toggle("big", !!t);
    };

    const tick = () => {
      rx += (x - rx) * 0.16;
      ry += (y - ry) * 0.16;
      ring.style.transform = `translate(${rx}px, ${ry}px)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    addEventListener("mousemove", onMove, { passive: true });
    addEventListener("mouseover", onOver, { passive: true });
    return () => {
      removeEventListener("mousemove", onMove);
      removeEventListener("mouseover", onOver);
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("has-cursor");
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="cursor-ring" />
      <div ref={dotRef} className="cursor-dot" />
    </>
  );
}
