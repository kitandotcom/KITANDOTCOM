"use client";

import { useEffect, useRef } from "react";

export function ParallaxBackdrop() {
  const backdropRef = useRef<HTMLDivElement>(null);
  const orbRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const backdrop = backdropRef.current;
    const orb = orbRef.current;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!backdrop) return;

    let frame = 0;
    let orbAnimation: Animation | null = null;
    let readyTimer: number | null = null;
    let lastBounce = 0;
    let orbSize = 0;
    const measureOrb = () => {
      orbSize = orb?.offsetWidth ?? 0;
    };
    const update = () => {
      if (reduceMotion.matches || document.hidden) {
        backdrop.style.setProperty("--parallax-y", "0px");
        orbAnimation?.cancel();
        orb?.classList.remove("cooldown-ready");
        orb?.style.setProperty("display", "none");
        frame = 0;
        return;
      }
      orb?.style.setProperty("display", "block");
      const factor = window.innerWidth < 700 ? 0.035 : 0.075;
      const offset = Math.min(window.scrollY * factor, 150);
      const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      const progress = Math.min(window.scrollY / maxScroll, 1);
      const orbX = 16 + Math.sin(progress * Math.PI * 2.4) * 25;
      const orbY = 18 + ((progress * 58) % 58);
      const x = (window.innerWidth - orbSize) * (orbX / 100);
      const y = (window.innerHeight - orbSize) * (orbY / 100);
      backdrop.style.setProperty("--parallax-y", `${offset}px`);
      orb?.style.setProperty("--orb-x", `${x}px`);
      orb?.style.setProperty("--orb-y", `${y}px`);
      frame = 0;
    };
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        update();
        if (!orb || reduceMotion.matches || document.hidden) return;
        const now = performance.now();
        if (now - lastBounce < 420) return;
        lastBounce = now;
        orb.classList.add("cooldown-ready");
        if (readyTimer) window.clearTimeout(readyTimer);
        readyTimer = window.setTimeout(() => orb.classList.remove("cooldown-ready"), 260);
        orbAnimation?.cancel();
        orbAnimation = orb.animate(
          [
            { scale: ".9" },
            { scale: "1.16" },
            { scale: "1" },
          ],
          { duration: 520, easing: "cubic-bezier(.23, 1, .32, 1)" },
        );
      });
    };

    frame = window.requestAnimationFrame(() => {
      measureOrb();
      update();
    });
    window.addEventListener("scroll", onScroll, { passive: true });
    const onResize = () => {
      measureOrb();
      update();
    };
    window.addEventListener("resize", onResize, { passive: true });
    const onMotionPreferenceChange = () => update();
    reduceMotion.addEventListener("change", onMotionPreferenceChange);
    document.addEventListener("visibilitychange", update);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      reduceMotion.removeEventListener("change", onMotionPreferenceChange);
      document.removeEventListener("visibilitychange", update);
      if (frame) window.cancelAnimationFrame(frame);
      orbAnimation?.cancel();
      if (readyTimer) window.clearTimeout(readyTimer);
    };
  }, []);

  return <div ref={backdropRef} className="parallax-backdrop" aria-hidden="true"><span ref={orbRef} className="scroll-orb" /></div>;
}
