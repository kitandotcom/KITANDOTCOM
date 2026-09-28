import { ArrowUpRight, ExternalLink, Layers3, Mail, MousePointer2, Sparkles } from "lucide-react";
import type { CSSProperties } from "react";
import { HeroBlock } from "@/components/ui/hero-block-shadcnui";
import { BrowserWindow } from "@/components/ui/browser-window";
import { ContactForm } from "@/components/ui/contact-form";
import { SiteNav } from "@/components/ui/site-nav";
import { Reveal } from "@/components/ui/reveal";

const CASES = [
  {
    title: "Esquires' Legal",
    role: "Full-stack build & ongoing retainer",
    description: "A high-trust legal platform with Supabase-backed bookings and blog content, plus a role-gated admin dashboard maintained after launch.",
    tags: ["Vercel", "Supabase", "Resend"],
    href: "https://esquires-legal.vercel.app",
    color: "#d6ed61",
    number: "01",
  },
  {
    title: "Immanuel Capital Partners",
    role: "Corporate website",
    description: "A considered digital home for a Nigerian financial advisory firm serving MSMEs, corporates, and DFIs across ten practice areas.",
    tags: ["Vercel", "Editorial design"],
    href: "https://www.immanuelcapitalpartners.com",
    color: "#80d5ce",
    number: "02",
  },
  {
    title: "Kitan & Co.",
    role: "Founder / studio",
    description: "A web development and design studio built around clear service tiers and digital products that remain useful after launch day.",
    tags: ["Studio", "Client work"],
    color: "#b49bff",
    number: "03",
  },
];

const SKILLS = [
  ["React / Next.js", "App Router, server components"],
  ["TypeScript", "Typed front end and API routes"],
  ["Supabase", "Postgres, Auth, RLS, Storage, Webhooks"],
  ["Python", "Scripting and backend logic"],
  ["Groq AI", "LLM-powered parsing pipelines"],
  ["Paystack", "Subscriptions and payments"],
  ["Roblox", "RemoteEvents, DataStore, Marketplace"],
];

export default function Home() {
  return (
    <div className="portfolio-shell">
      <SiteNav />
      <main>
        <section id="top"><HeroBlock /></section>

        <section className="intro-band"><div className="page-width intro-grid"><p className="section-label">01 / the premise</p><div><h2>Less “vibe coded.”<br /><em>More built to last.</em></h2><p>Every project is a small system: a point of view, a clear interaction, and enough technical depth to hold up when real people start using it.</p></div></div></section>

        <section id="work" className="work-section page-width"><div className="section-heading"><div><p className="section-label">02 / selected work</p><h2>Things I’ve<br /><em>shipped.</em></h2></div><span className="section-count">03 <small>projects</small></span></div><div className="case-grid">{CASES.map((project, index) => <Reveal key={project.title} delay={index * 70}><article className="case-card" style={{ "--case-accent": project.color } as CSSProperties}><div className="case-top"><span>{project.number}</span>{project.href && <a href={project.href} target="_blank" rel="noreferrer">View live <ExternalLink size={13} /></a>}</div><div className="case-glyph"><Layers3 size={20} /></div><h3>{project.title}</h3><p className="case-role">{project.role}</p><p className="case-description">{project.description}</p><div className="case-tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></article></Reveal>)}</div></section>

        <section id="live" className="live-section"><div className="page-width"><div className="section-heading live-heading"><div><p className="section-label">03 / see it in context</p><h2>Go ahead.<br /><em>Click around.</em></h2></div><p>These are live client builds, not screenshots. Switch between them, open the full sites, and see how the work behaves in the wild.</p></div><BrowserWindow tabs={[{ id: "esquires", label: "Esquires' Legal", url: "https://esquires-legal.vercel.app" }, { id: "icp", label: "Immanuel Capital Partners", url: "https://www.immanuelcapitalpartners.com" }]} /></div></section>

        <section id="skills" className="stack-section page-width"><div className="section-heading"><div><p className="section-label">04 / the toolkit</p><h2>Deep enough<br /><em>to ship.</em></h2></div><MousePointer2 size={20} className="section-icon" /></div><div className="stack-grid">{SKILLS.map(([name, detail], index) => <div className="stack-item" key={name}><span>0{index + 1}</span><strong>{name}</strong><small>{detail}</small></div>)}</div></section>

        <section id="contact" className="contact-section"><div className="page-width contact-grid"><div><p className="section-label">05 / next move</p><h2>Have a thing<br /><em>worth shipping?</em></h2><p className="contact-copy">Tell me what you’re making, where it’s stuck, or what it needs to become. I’ll reply with a useful next step — not a generic pitch.</p><a className="mail-link" href="mailto:hello@kitandotcom.com"><Mail size={16} /> hello@kitandotcom.com <ArrowUpRight size={15} /></a></div><div className="contact-form-wrap"><ContactForm /></div></div></section>
      </main>
      <footer className="site-footer page-width"><span className="footer-mark"><Sparkles size={14} /> Kitan Aderounmu</span><span>Built in Nigeria · {new Date().getFullYear()}</span><a href="#top">Back to top ↑</a></footer>
    </div>
  );
}
