import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "outline";
  size?: "default" | "lg";
};

export function Button({ className, variant = "default", size = "default", ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-full font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50",
        variant === "default" ? "bg-[var(--acid)] text-[var(--background)] hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(214,237,97,0.22)]" : "border border-border bg-transparent text-foreground hover:-translate-y-0.5 hover:border-[var(--acid)] hover:text-[var(--acid)]",
        size === "lg" ? "min-h-12 px-6 text-sm" : "min-h-10 px-4 text-xs",
        className,
      )}
      {...props}
    />
  );
}
