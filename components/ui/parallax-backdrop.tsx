"use client";

import { useEffect, useRef } from "react";

export function ParallaxBackdrop() {
  const backdropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const backdrop = backdropRef.current;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!backdrop) return;

    let frame = 0;
    const update = () => {
      if (reduceMotion.matches || document.hidden) {
        backdrop.style.setProperty("--parallax-y", "0px");
        frame = 0;
        return;
      }
      const factor = window.innerWidth < 700 ? 0.035 : 0.075;
      const offset = Math.min(window.scrollY * factor, 150);
      backdrop.style.setProperty("--parallax-y", `${offset}px`);
      frame = 0;
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    const onMotionPreferenceChange = () => update();
    reduceMotion.addEventListener("change", onMotionPreferenceChange);
    document.addEventListener("visibilitychange", update);
    return () => {
      window.removeEventListener("scroll", onScroll);
      reduceMotion.removeEventListener("change", onMotionPreferenceChange);
      document.removeEventListener("visibilitychange", update);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return <div ref={backdropRef} className="parallax-backdrop" aria-hidden="true" />;
}
