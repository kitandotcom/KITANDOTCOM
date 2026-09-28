"use client";

import { Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const LINKS = [
  { id: "work", label: "Work" },
  { id: "live", label: "Live sites" },
  { id: "skills", label: "Toolkit" },
  { id: "contact", label: "Contact" },
];

export function SiteNav() {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const sections = LINKS.map((link) => document.getElementById(link.id)).filter((el): el is HTMLElement => el !== null);
    if (!sections.length) return;
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActive(visible.target.id);
    }, { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="portfolio-nav">
      <nav className="page-width nav-inner">
        <a href="#top" className="nav-brand"><span><Sparkles size={14} /></span><strong>KITAN</strong><small>builds things</small></a>
        <div className="nav-links">{LINKS.map((link) => <a key={link.id} href={`#${link.id}`} className={cn(active === link.id && "is-active")}>{link.label}<i /></a>)}</div>
        <a href="#contact" className="nav-cta">Let’s talk <span>↗</span></a>
      </nav>
    </header>
  );
}
