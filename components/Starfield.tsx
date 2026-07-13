"use client";

import { useEffect, useRef } from "react";

type Star = {
  x: number;
  y: number;
  z: number; // depth 0..1 (parallax factor)
  r: number;
  a: number;
  ts: number; // twinkle speed
  ph: number; // phase
  flare: boolean;
};

// Real-looking stars: pre-rendered soft-glow sprites (round, with falloff),
// gentle twinkle, scroll parallax, and the occasional shooting star.
export default function Starfield() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    let w = 0;
    let h = 0;
    let stars: Star[] = [];
    let shoot: { x: number; y: number; vx: number; vy: number; life: number } | null = null;
    let nextShoot = performance.now() + 4500;
    let raf = 0;
    let scrollY = 0;

    // --- pre-render a star sprite (soft round glow, warm core) ---
    const makeSprite = (flare: boolean) => {
      const S = 64;
      const c = document.createElement("canvas");
      c.width = c.height = S;
      const g = c.getContext("2d")!;
      const grad = g.createRadialGradient(S / 2, S / 2, 0, S / 2, S / 2, S / 2);
      grad.addColorStop(0, "rgba(255,250,236,1)");
      grad.addColorStop(0.2, "rgba(245,234,211,0.85)");
      grad.addColorStop(0.5, "rgba(190,198,235,0.22)");
      grad.addColorStop(1, "rgba(190,198,235,0)");
      g.fillStyle = grad;
      g.fillRect(0, 0, S, S);
      if (flare) {
        g.globalCompositeOperation = "lighter";
        const lh = g.createLinearGradient(0, 0, S, 0);
        lh.addColorStop(0, "rgba(245,234,211,0)");
        lh.addColorStop(0.5, "rgba(245,234,211,0.75)");
        lh.addColorStop(1, "rgba(245,234,211,0)");
        g.fillStyle = lh;
        g.fillRect(0, S / 2 - 0.7, S, 1.4);
        const lv = g.createLinearGradient(0, 0, 0, S);
        lv.addColorStop(0, "rgba(245,234,211,0)");
        lv.addColorStop(0.5, "rgba(245,234,211,0.75)");
        lv.addColorStop(1, "rgba(245,234,211,0)");
        g.fillStyle = lv;
        g.fillRect(S / 2 - 0.7, 0, 1.4, S);
      }
      return c;
    };
    const sprite = makeSprite(false);
    const spriteFlare = makeSprite(true);

    const resize = () => {
      const dpr = Math.min(devicePixelRatio || 1, 2);
      w = innerWidth;
      h = innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round((w * h) / 3800);
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        z: 0.25 + Math.random() * 0.75,
        r: Math.pow(Math.random(), 2.4) * 1.6 + 0.35,
        a: 0.35 + Math.random() * 0.65,
        ts: 0.25 + Math.random() * 1.3,
        ph: Math.random() * Math.PI * 2,
        flare: Math.random() < 0.035,
      }));
    };
    resize();
    addEventListener("resize", resize);

    const onScroll = () => {
      scrollY = window.scrollY;
    };
    addEventListener("scroll", onScroll, { passive: true });

    const tick = (now: number) => {
      ctx.clearRect(0, 0, w, h);
      const t = now * 0.001;

      for (const s of stars) {
        const tw = 0.55 + 0.45 * Math.sin(t * s.ts + s.ph);
        const size = s.r * 9 * (s.flare ? 1.7 : 1);
        let y = (s.y - scrollY * 0.07 * s.z) % h;
        if (y < 0) y += h;
        ctx.globalAlpha = s.a * tw;
        ctx.drawImage(s.flare ? spriteFlare : sprite, s.x - size / 2, y - size / 2, size, size);
      }

      // --- shooting star, every ~5-12s ---
      if (!shoot && now > nextShoot) {
        shoot = {
          x: w * 0.15 + Math.random() * w * 0.7,
          y: Math.random() * h * 0.35,
          vx: -(3.4 + Math.random() * 2.4),
          vy: 1.6 + Math.random() * 1.4,
          life: 1,
        };
      }
      if (shoot) {
        shoot.x += shoot.vx * 3.2;
        shoot.y += shoot.vy * 3.2;
        shoot.life -= 0.017;
        const tail = 24;
        const g = ctx.createLinearGradient(shoot.x, shoot.y, shoot.x - shoot.vx * tail, shoot.y - shoot.vy * tail);
        g.addColorStop(0, "rgba(245,234,211,0.95)");
        g.addColorStop(1, "rgba(245,234,211,0)");
        ctx.globalAlpha = Math.max(shoot.life, 0);
        ctx.strokeStyle = g;
        ctx.lineWidth = 1.3;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(shoot.x, shoot.y);
        ctx.lineTo(shoot.x - shoot.vx * tail, shoot.y - shoot.vy * tail);
        ctx.stroke();
        if (shoot.life <= 0 || shoot.x < -80 || shoot.y > h + 80) {
          shoot = null;
          nextShoot = now + 5000 + Math.random() * 7000;
        }
      }

      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("resize", resize);
      removeEventListener("scroll", onScroll);
    };
  }, []);

  return <canvas ref={ref} className="starfield" aria-hidden />;
}
