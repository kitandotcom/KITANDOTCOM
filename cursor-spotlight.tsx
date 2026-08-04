"use client";

import { useEffect, useRef } from "react";

/**
 * A soft radial glow that follows the pointer. Pure CSS var updates on
 * rAF-throttled mousemove — no re-renders, cheap even on long pages.
 * Hidden automatically on touch devices (no persistent pointer) and
 * respects prefers-reduced-motion.
 */
export function CursorSpotlight() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
    if (prefersReducedMotion || isCoarsePointer) return;

    let frame = 0;
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;

    const onMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!frame) {
        frame = requestAnimationFrame(() => {
          el.style.setProperty("--spot-x", `${targetX}px`);
          el.style.setProperty("--spot-y", `${targetY}px`);
          frame = 0;
        });
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-30 hidden sm:block"
      style={{
        background:
          "radial-gradient(600px circle at var(--spot-x, 50%) var(--spot-y, 50%), color-mix(in srgb, var(--accent-violet) 6%, transparent), transparent 70%)",
      }}
    />
  );
}
