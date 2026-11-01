"use client";

import { useEffect } from "react";

/**
 * Draws the "J" monogram favicon to a canvas and, every few seconds, sweeps a
 * star-like glint across it — swapping the live <link rel="icon"> each frame of
 * the twinkle. Between twinkles it holds one static frame, so it costs almost
 * nothing. Pauses with the tab (requestAnimationFrame) and honours
 * prefers-reduced-motion by rendering a single still frame.
 */

const SIZE = 64; // favicon render resolution
const PERIOD = 4500; // ms between twinkles
const DURATION = 1100; // ms the twinkle lasts

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

/** A four-point sparkle (two crossing tapered rays + glow + core). */
function sparkle(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  reach: number,
  alpha: number,
) {
  if (alpha <= 0) return;
  ctx.save();
  ctx.translate(cx, cy);
  ctx.globalCompositeOperation = "lighter";

  // soft radial glow
  const glow = ctx.createRadialGradient(0, 0, 0, 0, 0, reach * 1.2);
  glow.addColorStop(0, `rgba(255,255,255,${0.9 * alpha})`);
  glow.addColorStop(0.4, `rgba(255,236,200,${0.35 * alpha})`);
  glow.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = glow;
  ctx.beginPath();
  ctx.arc(0, 0, reach * 1.2, 0, Math.PI * 2);
  ctx.fill();

  // four-point star rays
  ctx.fillStyle = `rgba(255,255,255,${alpha})`;
  const w = reach * 0.16;
  for (let i = 0; i < 2; i++) {
    ctx.rotate(Math.PI / 2);
    ctx.beginPath();
    ctx.moveTo(0, -reach);
    ctx.lineTo(w, 0);
    ctx.lineTo(0, reach);
    ctx.lineTo(-w, 0);
    ctx.closePath();
    ctx.fill();
  }
  ctx.restore();
}

export function AnimatedFavicon() {
  useEffect(() => {
    const canvas = document.createElement("canvas");
    canvas.width = SIZE;
    canvas.height = SIZE;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Our own icon link, placed last so it wins over the static one.
    const link = document.createElement("link");
    link.rel = "icon";
    link.type = "image/png";
    document.head.appendChild(link);

    const brand = () => {
      // read the live brand colour so it tracks the theme
      const hsl = getComputedStyle(document.documentElement)
        .getPropertyValue("--brand")
        .trim();
      return hsl || "27 99% 55%";
    };

    function draw(glint: number, t: number) {
      const c = ctx!;
      const [h, s, l] = brand()
        .split(/\s+/)
        .map((v) => parseFloat(v));
      c.clearRect(0, 0, SIZE, SIZE);

      // 3D body gradient
      const body = c.createLinearGradient(0, 0, SIZE, SIZE);
      body.addColorStop(0, `hsl(${h + 6} 100% ${Math.min(l + 8, 70)}%)`);
      body.addColorStop(0.5, `hsl(${h} ${s}% ${l}%)`);
      body.addColorStop(1, `hsl(${h - 9} ${Math.max(s - 5, 60)}% ${Math.max(l - 15, 28)}%)`);
      roundRect(c, 3, 3, 58, 58, 15);
      c.fillStyle = body;
      c.fill();

      // top gloss
      roundRect(c, 3, 3, 58, 34, 15);
      const gloss = c.createLinearGradient(0, 3, 0, 37);
      gloss.addColorStop(0, "rgba(255,255,255,0.5)");
      gloss.addColorStop(1, "rgba(255,255,255,0)");
      c.fillStyle = gloss;
      c.fill();

      // the "J", extruded for depth
      c.textAlign = "center";
      c.textBaseline = "alphabetic";
      c.font = "700 40px 'JetBrains Mono','Courier New',monospace";
      c.fillStyle = `hsl(${h - 11} 90% 30%)`;
      c.globalAlpha = 0.6;
      c.fillText("J", 34, 46);
      c.globalAlpha = 1;
      c.fillStyle = "#fff6e8";
      c.fillText("J", 32.5, 44.5);

      // a constant faint diagonal shimmer sweeping slowly
      roundRect(c, 3, 3, 58, 58, 15);
      c.save();
      c.clip();
      const sweep = ((t * 0.12) % 1.4) - 0.2; // 0..1 band position
      const bx = sweep * SIZE;
      const band = c.createLinearGradient(bx - 14, 0, bx + 14, SIZE);
      band.addColorStop(0, "rgba(255,255,255,0)");
      band.addColorStop(0.5, "rgba(255,255,255,0.12)");
      band.addColorStop(1, "rgba(255,255,255,0)");
      c.fillStyle = band;
      c.globalCompositeOperation = "lighter";
      c.fillRect(0, 0, SIZE, SIZE);
      c.restore();

      // the periodic star glint at the top-right
      const reach = 7 + glint * 13;
      sparkle(c, 47, 17, reach, glint);
    }

    function commit() {
      link.href = canvas.toDataURL("image/png");
    }

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      draw(0.4, 0); // a single, pretty, resting frame
      commit();
      return () => link.remove();
    }

    let raf = 0;
    const start = performance.now();
    let staticDrawn = false;

    const frame = (now: number) => {
      if (!document.hidden) {
        const phase = (now - start) % PERIOD;
        if (phase < DURATION) {
          const p = phase / DURATION;
          const glint = Math.sin(p * Math.PI); // ease 0 -> 1 -> 0
          draw(glint, now / 1000);
          commit();
          staticDrawn = false;
        } else if (!staticDrawn) {
          draw(0, now / 1000);
          commit();
          staticDrawn = true;
        }
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      link.remove();
    };
  }, []);

  return null;
}
