"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function RoleRotator({
  roles,
  className,
}: {
  roles: string[];
  className?: string;
}) {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion || roles.length <= 1) return;

    const interval = setInterval(() => {
      setVisible(false);
      const swap = setTimeout(() => {
        setIndex((i) => (i + 1) % roles.length);
        setVisible(true);
      }, 300);
      return () => clearTimeout(swap);
    }, 2600);

    return () => clearInterval(interval);
  }, [roles.length]);

  return (
    <span
      className={cn(
        "inline-block min-w-[1ch] transition-all duration-300",
        visible ? "translate-y-0 opacity-100" : "-translate-y-1 opacity-0",
        className
      )}
    >
      {roles[index]}
    </span>
  );
}
