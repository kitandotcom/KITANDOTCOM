"use client";

import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight, BriefcaseBusiness, Code2, Mail, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroBlock() {
  return (
    <section className="prompt-hero" aria-labelledby="hero-title">
      <div className="prompt-hero-grid" aria-hidden="true" />
      <div className="prompt-hero-glow prompt-hero-glow-one" aria-hidden="true" />
      <div className="prompt-hero-glow prompt-hero-glow-two" aria-hidden="true" />
      <div className="prompt-hero-content page-width">
        <motion.div initial={{ opacity: 1, y: 0 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <motion.div initial={{ scale: 1, opacity: 1 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.2, type: "spring", stiffness: 200 }} className="prompt-avatar" aria-hidden="true"><Sparkles size={30} /></motion.div>
          <motion.p initial={{ opacity: 1, y: 0 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.5 }} className="prompt-eyebrow">Kitan Aderounmu / independent builder</motion.p>
          <motion.h1 id="hero-title" initial={{ opacity: 1, y: 0 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.6 }}>From idea to interface<br /><em>to shipped.</em></motion.h1>
          <motion.p initial={{ opacity: 1, y: 0 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.6 }} className="prompt-lede">I craft beautiful, performant web applications, products, and game systems with modern technology — and the judgment to make them useful.</motion.p>
          <motion.div initial={{ opacity: 1, y: 0 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.6 }} className="prompt-actions">
            <Button size="lg" onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}><Mail size={16} /> Get in touch</Button>
            <Button size="lg" variant="outline" onClick={() => document.getElementById("work")?.scrollIntoView({ behavior: "smooth" })}>View projects <ArrowDown size={16} /></Button>
          </motion.div>
          <motion.div initial={{ opacity: 1 }} animate={{ opacity: 1 }} transition={{ delay: 0.65, duration: 0.6 }} className="prompt-socials">
            <a href="https://github.com/kitandotcom/KITANDOTCOM" target="_blank" rel="noreferrer" aria-label="GitHub"><Code2 size={17} /></a>
            <a href="https://www.linkedin.com/in/kitanaderounmu/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><BriefcaseBusiness size={17} /></a>
            <a href="mailto:hello@kitandotcom.com" aria-label="Email Kitan"><Mail size={17} /></a>
            <span>available for thoughtful builds <ArrowUpRight size={13} /></span>
          </motion.div>
        </motion.div>
        <motion.div initial={{ opacity: 1, x: 0 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.55, duration: 0.7 }} className="prompt-side-note" aria-label="Portfolio summary"><span className="prompt-side-index">00 / 05</span><strong>Idea → interface<br />→ shipped.</strong><p>Websites, products, and systems for people who care about the details.</p><div className="prompt-side-line" /></motion.div>
      </div>
      <motion.div initial={{ opacity: 1, y: 0 }} animate={{ opacity: 1, y: [0, 9, 0] }} transition={{ y: { delay: 1.5, duration: 1.5, repeat: Infinity } }} className="prompt-scroll"><span>scroll to explore</span><ArrowDown size={16} /></motion.div>
    </section>
  );
}
