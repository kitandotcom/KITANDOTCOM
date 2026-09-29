import { ArrowUpRight, ExternalLink, Layers3, Mail, MousePointer2, Sparkles } from "lucide-react";
import type { CSSProperties } from "react";
import { HeroBlock } from "@/components/ui/hero-block-shadcnui";
import { InteractiveScene } from "@/components/ui/interactive-scene";
import { BrowserWindow } from "@/components/ui/browser-window";
import { ContactForm } from "@/components/ui/contact-form";
import { PricingSection } from "@/components/ui/pricing-section";
import { SiteNav } from "@/components/ui/site-nav";
import { Reveal } from "@/components/ui/reveal";

const CASES = [
  { title: "Esquires' Legal", role: "Full-stack build & ongoing retainer", description: "A high-trust legal platform with Supabase-backed bookings and blog content, plus a role-gated admin dashboard maintained after launch.", tags: ["Vercel", "Supabase", "Resend"], href: "https://esquires-legal.vercel.app", color: "#e4b34f", number: "01" },
  { title: "Immanuel Capital Partners", role: "Corporate website", description: "A considered digital home for a Nigerian financial advisory firm serving MSMEs, corporates, and DFIs across ten practice areas.", tags: ["Vercel", "Editorial design"], href: "https://www.immanuelcapitalpartners.com", color: "#79aef2", number: "02" },
  { title: "Kitan & Co.", role: "Founder / studio", description: "A web development and design studio built around clear service tiers and digital products that remain useful after launch day.", tags: ["Studio", "Client work"], color: "#e4b34f", number: "03" },
];

const SKILLS = [["React / Next.js", "App Router, server components"], ["TypeScript", "Typed front end and API routes"], ["Supabase", "Postgres, Auth, RLS, Storage, Webhooks"], ["Python", "Scripting and backend logic"], ["Groq AI", "LLM-powered parsing pipelines"], ["Paystack", "Subscriptions and payments"], ["Roblox", "RemoteEvents, DataStore, Marketplace"]];

const SCENE_PROJECTS = [
  { title: "Esquires' Legal", type: "FULL-STACK BUILD", href: "https://esquires-legal.vercel.app", color: "#e4b34f", icon: "globe" as const },
  { title: "Immanuel Capital Partners", type: "CORPORATE WEBSITE", href: "https://www.immanuelcapitalpartners.com", color: "#79aef2", icon: "code" as const },
  { title: "Kitan & Co.", type: "FOUNDER / STUDIO", color: "#e4b34f", icon: "game" as const },
];

export default function Home() {
  return <div className="portfolio-shell">
    <SiteNav />
    <main>
      <section id="top"><HeroBlock /></section>
      <section className="category-rail"><div className="page-width category-items"><a href="#work"><span>01</span><strong>Websites</strong><small>Client builds</small></a><a href="#pricing"><span>02</span><strong>Care plans</strong><small>Quarterly support</small></a><a href="#live"><span>03</span><strong>Live sites</strong><small>Open and explore</small></a><a href="#skills"><span>04</span><strong>Toolkit</strong><small>How it’s made</small></a></div></section>
      <section className="workspace-section"><div className="page-width"><div className="workspace-heading"><div><p className="section-label">Interactive workspace</p><h2>Move through<br /><em>the work.</em></h2></div><p>Point, tilt, and select a build. The orbit stays reactive; the rest of the portfolio stays easy to browse.</p></div><InteractiveScene projects={SCENE_PROJECTS} /></div></section>
      <section className="statement-section"><div className="page-width statement-grid"><p className="section-label">A better way to browse a portfolio</p><div><h2>See what’s available.<br /><em>Pick what fits.</em></h2><p>Every build has a clear job. Every care plan has a clear boundary. Browse the work, compare the support options, and choose the next step without decoding a sales funnel.</p></div></div></section>
      <section id="work" className="work-section page-width"><div className="section-heading"><div><p className="section-label">01 / selected work</p><h2>Websites and products<br /><em>already in the wild.</em></h2></div><span className="section-count">03 <small>projects</small></span></div><div className="case-grid">{CASES.map((project, index) => <Reveal key={project.title} delay={index * 70}><article className="case-card" style={{ "--case-accent": project.color } as CSSProperties}><div className="case-top"><span>{project.number}</span>{project.href && <a href={project.href} target="_blank" rel="noreferrer">Open full site <ExternalLink size={13} /></a>}</div><div className="case-glyph"><Layers3 size={20} /></div><h3>{project.title}</h3><p className="case-role">{project.role}</p><p className="case-description">{project.description}</p><div className="case-tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></article></Reveal>)}</div></section>
      <PricingSection />
      <section id="live" className="live-section"><div className="page-width"><div className="section-heading live-heading"><div><p className="section-label">03 / live availability</p><h2>Open the work.<br /><em>See it behave.</em></h2></div><p>These are live client builds, not screenshots. Choose a site below, then use the direct link when you want the full experience.</p></div><BrowserWindow tabs={[{ id: "esquires", label: "Esquires' Legal", url: "https://esquires-legal.vercel.app" }, { id: "icp", label: "Immanuel Capital Partners", url: "https://www.immanuelcapitalpartners.com" }]} /></div></section>
      <section id="skills" className="stack-section page-width"><div className="section-heading"><div><p className="section-label">04 / the toolkit</p><h2>Deep enough<br /><em>to ship.</em></h2></div><MousePointer2 size={20} className="section-icon" /></div><div className="stack-grid">{SKILLS.map(([name, detail], index) => <div className="stack-item" key={name}><span>0{index + 1}</span><strong>{name}</strong><small>{detail}</small></div>)}</div></section>
      <section id="contact" className="contact-section"><div className="page-width contact-grid"><div><p className="section-label">05 / next move</p><h2>Have a thing<br /><em>worth shipping?</em></h2><p className="contact-copy">Tell me what you’re making, where it’s stuck, or which care tier sounds right. I’ll reply with a useful next step — not a generic pitch.</p><a className="mail-link" href="mailto:hello@kitandotcom.com"><Mail size={16} /> hello@kitandotcom.com <ArrowUpRight size={15} /></a></div><div className="contact-form-wrap"><ContactForm /></div></div></section>
    </main>
    <footer className="site-footer page-width"><span className="footer-mark"><Sparkles size={14} /> Kitan Aderounmu</span><span>Built in Nigeria · {new Date().getFullYear()}</span><a href="#top">Back to top ↑</a></footer>
  </div>;
}
