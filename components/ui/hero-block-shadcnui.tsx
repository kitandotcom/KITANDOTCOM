"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowUpRight, BriefcaseBusiness, Code2, Mail, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroBlock() {
  const reduceMotion = useReducedMotion();
  const entrance = (delay: number) => reduceMotion ? { initial: false, animate: { opacity: 1, y: 0 } } : { initial: { opacity: 0, y: 18 }, animate: { opacity: 1, y: 0 }, transition: { delay, duration: 0.65, ease: [0.23, 1, 0.32, 1] as const } };

  return (
    <section className="prompt-hero" aria-labelledby="hero-title">
      <div className="prompt-hero-grid" aria-hidden="true" />
      <div className="prompt-hero-glow prompt-hero-glow-one" aria-hidden="true" />
      <div className="prompt-hero-glow prompt-hero-glow-two" aria-hidden="true" />
      <div className="prompt-hero-content page-width">
        <motion.div {...entrance(0)}>
          <motion.div {...(reduceMotion ? { initial: false } : { initial: { scale: 0.88, opacity: 0 }, animate: { scale: 1, opacity: 1 }, transition: { delay: 0.12, type: "spring", stiffness: 220, damping: 18 } })} className="prompt-avatar" aria-hidden="true"><Sparkles size={30} /></motion.div>
          <motion.p {...entrance(0.16)} className="prompt-eyebrow">Kitan Aderounmu / independent builder</motion.p>
          <motion.h1 {...entrance(0.24)} id="hero-title">From idea to interface<br /><em>to shipped.</em></motion.h1>
          <motion.p {...entrance(0.34)} className="prompt-hook">Bring your websites to life — and make them work harder.</motion.p>
          <motion.p {...entrance(0.42)} className="prompt-lede">I build clear websites, lead-generation systems, and custom digital products — then help you keep them useful after launch.</motion.p>
          <motion.div {...entrance(0.52)} className="prompt-actions">
            <Button size="lg" onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}><Mail size={16} /> Get in touch</Button>
            <Button size="lg" variant="outline" onClick={() => document.getElementById("work")?.scrollIntoView({ behavior: "smooth" })}>View projects <ArrowDown size={16} /></Button>
          </motion.div>
          <motion.div {...entrance(0.64)} className="prompt-socials">
            <a href="https://github.com/kitandotcom/KITANDOTCOM" target="_blank" rel="noreferrer" aria-label="GitHub"><Code2 size={17} /></a>
            <a href="https://www.linkedin.com/in/kitanaderounmu/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><BriefcaseBusiness size={17} /></a>
            <a href="mailto:aderounmuisrael6@gmail.com" aria-label="Email Kitan"><Mail size={17} /></a>
            <span>available for thoughtful builds <ArrowUpRight size={13} /></span>
          </motion.div>
        </motion.div>
        <motion.div {...entrance(0.56)} className="prompt-side-note" aria-label="Portfolio summary"><span className="prompt-side-index">00 / 05</span><strong>Idea → interface<br />→ shipped.</strong><p>Websites, products, and systems for people who care about the details.</p><div className="prompt-side-line" /></motion.div>
      </div>
      <motion.div initial={{ opacity: 1, y: 0 }} animate={{ opacity: 1, y: [0, 9, 0] }} transition={{ y: { delay: 1.5, duration: 1.5, repeat: Infinity } }} className="prompt-scroll"><span>scroll to explore</span><ArrowDown size={16} /></motion.div>
    </section>
  );
}
