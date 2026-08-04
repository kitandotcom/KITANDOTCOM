"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const LINKS = [
  { id: "work", label: "Work" },
  { id: "live", label: "Live previews" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

export function SiteNav() {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const sections = LINKS.map((l) => document.getElementById(l.id)).filter(
      (el): el is HTMLElement => el !== null
    );
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="fixed top-0 z-50 w-full border-b border-border/60 bg-background/70 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <span className="font-display text-lg text-foreground">
          Kitan Aderounmu
        </span>
        <div className="hidden gap-8 text-sm text-muted-foreground sm:flex">
          {LINKS.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={cn(
                "relative pb-1 transition-colors hover:text-foreground",
                active === link.id && "text-foreground"
              )}
            >
              {link.label}
              <span
                className={cn(
                  "absolute -bottom-px left-0 h-px w-full origin-left scale-x-0 bg-accent-teal transition-transform duration-300",
                  active === link.id && "scale-x-100"
                )}
              />
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}
