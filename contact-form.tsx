"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
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

    const { error } = await supabase
      .from("contact_messages")
      .insert({ name: name.trim(), email: email.trim(), message: message.trim() });

    if (error) {
      setStatus("error");
      setErrorMessage("Something went wrong sending that. Try again in a moment.");
      return;
    }

    setStatus("success");
    setName("");
    setEmail("");
    setMessage("");
  };

  if (status === "success") {
    return (
      <div className={cn("glass-panel rounded-2xl p-8 text-center", className)}>
        <p className="font-display text-2xl text-foreground">Message sent</p>
        <p className="mt-2 text-sm text-muted-foreground">
          Thanks for reaching out — I&apos;ll reply by email shortly.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("glass-panel flex flex-col gap-4 rounded-2xl p-8", className)}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5 text-sm">
          <span className="text-muted-foreground">Name</span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="rounded-lg border border-border bg-muted px-3 py-2 text-foreground outline-none focus:border-accent-violet"
            placeholder="Your name"
          />
        </label>
        <label className="flex flex-col gap-1.5 text-sm">
          <span className="text-muted-foreground">Email</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-lg border border-border bg-muted px-3 py-2 text-foreground outline-none focus:border-accent-violet"
            placeholder="you@example.com"
          />
        </label>
      </div>
      <label className="flex flex-col gap-1.5 text-sm">
        <span className="text-muted-foreground">Message</span>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={5}
          className="resize-none rounded-lg border border-border bg-muted px-3 py-2 text-foreground outline-none focus:border-accent-violet"
          placeholder="What are you looking to build?"
        />
      </label>

      {status === "error" && errorMessage && (
        <p className="text-sm text-red-400">{errorMessage}</p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-1 self-start rounded-full bg-accent-violet px-6 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {status === "submitting" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
