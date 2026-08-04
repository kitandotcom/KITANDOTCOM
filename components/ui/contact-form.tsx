"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm({ className }: { className?: string }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setStatus("error");
      setErrorMessage("Fill in your name, email, and a message first.");
      return;
    }

    setStatus("submitting");
    setErrorMessage(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          message: message.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setErrorMessage(data?.error ?? "Something went wrong sending that.");
        return;
      }

      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      setStatus("error");
      setErrorMessage("Something went wrong sending that. Try again in a moment.");
    }
  };

  if (status === "success") {
    return (
      <div
        className={cn(
          "glass-panel animate-reveal flex flex-col items-center gap-3 rounded-2xl p-10 text-center",
          className
        )}
      >
        <svg
          viewBox="0 0 52 52"
          className="h-12 w-12 text-accent-teal"
          fill="none"
        >
          <circle
            cx="26"
            cy="26"
            r="24"
            stroke="currentColor"
            strokeWidth="2"
            className="checkmark-circle"
          />
          <path
            d="M15 27l7 7 15-15"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="checkmark-tick"
          />
        </svg>
        <p className="font-display text-2xl text-foreground">Message sent</p>
        <p className="text-sm text-muted-foreground">
          Thanks for reaching out — I&apos;ll reply by email shortly.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-2 text-xs text-muted-foreground underline decoration-dotted underline-offset-4 hover:text-foreground"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("glass-panel flex flex-col gap-4 rounded-2xl p-8", className)}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <FloatingField
          id="name"
          label="Name"
          type="text"
          value={name}
          onChange={setName}
        />
        <FloatingField
          id="email"
          label="Email"
          type="email"
          value={email}
          onChange={setEmail}
        />
      </div>
      <FloatingField
        id="message"
        label="Message"
        as="textarea"
        rows={5}
        value={message}
        onChange={setMessage}
      />

      {status === "error" && errorMessage && (
        <p className="text-sm text-red-400">{errorMessage}</p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="group relative mt-1 self-start overflow-hidden rounded-full bg-accent-violet px-6 py-2.5 text-sm font-medium text-background transition-transform duration-300 hover:scale-105 active:scale-95 disabled:opacity-60"
      >
        <span className="relative z-10">
          {status === "submitting" ? "Sending…" : "Send message"}
        </span>
        <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
      </button>
    </form>
  );
}

function FloatingField({
  id,
  label,
  value,
  onChange,
  type = "text",
  as = "input",
  rows,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  as?: "input" | "textarea";
  rows?: number;
}) {
  const [focused, setFocused] = useState(false);
  const floated = focused || value.length > 0;

  const sharedClassName = cn(
    "peer w-full rounded-lg border bg-muted px-3 pb-2 pt-5 text-foreground outline-none transition-colors",
    "border-border focus:border-accent-violet"
  );

  return (
    <div className="relative flex flex-col">
      {as === "textarea" ? (
        <textarea
          id={id}
          value={value}
          rows={rows}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={(e) => onChange(e.target.value)}
          className={cn(sharedClassName, "resize-none")}
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={(e) => onChange(e.target.value)}
          className={sharedClassName}
        />
      )}
      <label
        htmlFor={id}
        className={cn(
          "pointer-events-none absolute left-3 text-muted-foreground transition-all duration-200",
          floated ? "top-2 text-[11px]" : "top-3.5 text-sm"
        )}
      >
        {label}
      </label>
    </div>
  );
}
