"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.01, rootMargin: "0px 0px 180px 0px" }
    );

    observer.observe(el);
    const revealIfInViewport = () => {
      const bounds = el.getBoundingClientRect();
      if (bounds.top < window.innerHeight + 180 && bounds.bottom > -40) {
        setVisible(true);
        observer.disconnect();
      }
    };
    const frame = window.requestAnimationFrame(revealIfInViewport);

    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        "reveal-item transition-all duration-900 ease-[cubic-bezier(0.16,1,0.3,1)]",
        visible ? "is-visible translate-y-0 opacity-100" : "translate-y-6 opacity-100",
        className
      )}
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
    >
      {children}
    </div>
  );
}
