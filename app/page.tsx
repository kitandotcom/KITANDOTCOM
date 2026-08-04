import { AnimatedGradient } from "@/components/ui/animated-gradient";
import { WebGLErrorBoundary } from "@/components/ui/webgl-error-boundary";
import { BrowserWindow } from "@/components/ui/browser-window";
import { CaseCard } from "@/components/ui/case-card";
import { SkillCard } from "@/components/ui/skill-card";
import { ContactForm } from "@/components/ui/contact-form";
import { SiteNav } from "@/components/ui/site-nav";
import { RoleRotator } from "@/components/ui/role-rotator";
import { Reveal } from "@/components/ui/reveal";

const ROLES = ["Web Developer", "Game Developer", "Product Builder", "Entrepreneur"];

const CSS_GRADIENT_FALLBACK = (
  <div className="relative h-full w-full overflow-hidden">
    <div className="animate-blob-drift absolute -left-1/4 top-1/4 h-[60vh] w-[60vh] rounded-full bg-accent-violet/30 blur-[100px]" />
    <div className="animate-blob-drift absolute right-0 top-0 h-[50vh] w-[50vh] rounded-full bg-accent-teal/25 blur-[100px] [animation-delay:-7s]" />
    <div className="animate-blob-drift absolute bottom-0 left-1/3 h-[45vh] w-[45vh] rounded-full bg-accent-gold/20 blur-[100px] [animation-delay:-14s]" />
  </div>
);

const CASES = [
  {
    title: "Esquires' Legal",
    role: "Full-stack build & ongoing retainer",
    description:
      "Corporate site for a Nigerian law firm with international offices — single-page architecture, Supabase-backed bookings and blog, and a role-gated admin dashboard he maintains for the client.",
    tags: ["Vercel", "Supabase", "Resend"],
    href: "https://esquires-legal.vercel.app",
  },
  {
    title: "Immanuel Capital Partners",
    role: "Corporate website",
    description:
      "Live site for a Nigerian financial advisory firm serving MSMEs, corporates and DFIs — ten practice areas, leadership roster, and a dark financial-advisory timeline section.",
    tags: ["Vercel", "Editorial design"],
    href: "https://www.immanuelcapitalpartners.com",
  },
  {
    title: "Pocket Brain",
    role: "Product — personal finance PWA",
    description:
      "A Nigerian personal finance app that parses bank SMS alerts with Groq AI, handles subscriptions through Paystack, and installs as a PWA.",
    tags: ["Supabase", "Groq AI", "Paystack", "PWA"],
  },
  {
    title: "Kitan & Co.",
    role: "Founder",
    description:
      "A web development and design studio built around three service tiers, offering websites built to last.",
    tags: ["Studio", "Client work"],
  },
];

const SKILLS = [
  { name: "React / Next.js", detail: "App Router, server components" },
  { name: "TypeScript", detail: "Typed front end and API routes" },
  { name: "Supabase", detail: "Postgres, Auth, RLS, Storage, Webhooks" },
  { name: "Python", detail: "Scripting and backend logic" },
  { name: "Groq AI", detail: "LLM-powered parsing pipelines" },
  { name: "Paystack", detail: "Subscriptions and payments" },
  { name: "Roblox", detail: "RemoteEvents, DataStore, Marketplace" },
];

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Nav */}
      <SiteNav />

      {/* Hero */}
      <section className="relative flex min-h-screen items-center overflow-hidden">
        <div className="absolute inset-0">
          <WebGLErrorBoundary fallback={CSS_GRADIENT_FALLBACK}>
            <AnimatedGradient />
          </WebGLErrorBoundary>
        </div>
        <div className="absolute inset-0 bg-background/40" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent-teal">
            <RoleRotator roles={ROLES} />
          </p>
          <h1 className="mt-6 font-display text-5xl leading-tight text-foreground sm:text-7xl">
            I build products end to end,
            <br />
            <span className="italic text-accent-gold">from idea to shipped.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base text-muted-foreground">
            Nigeria-based developer and entrepreneur. I write the code, make
            the product calls, and ship — across client sites, web apps, and
            games.
          </p>
        </div>
      </section>

      {/* Work */}
      <section id="work" className="mx-auto w-full max-w-6xl px-6 py-28">
        <Reveal>
          <h2 className="font-display text-3xl text-foreground">Selected work</h2>
        </Reveal>
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {CASES.map((project, i) => (
            <Reveal key={project.title} delay={i * 80}>
              <CaseCard {...project} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Live previews */}
      <section id="live" className="mx-auto w-full max-w-5xl px-6 py-28">
        <Reveal>
          <h2 className="font-display text-3xl text-foreground">Live previews</h2>
        </Reveal>
        <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
          Switch tabs to preview two live client sites inline. If a site
          blocks embedding, this falls back to a direct link automatically.
        </p>
        <div className="mt-10">
          <BrowserWindow
            tabs={[
              {
                id: "esquires",
                label: "Esquires' Legal",
                url: "https://esquires-legal.vercel.app",
              },
              {
                id: "icp",
                label: "Immanuel Capital Partners",
                url: "https://www.immanuelcapitalpartners.com",
              },
            ]}
          />
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="mx-auto w-full max-w-6xl px-6 py-28">
        <Reveal>
          <h2 className="font-display text-3xl text-foreground">Stack</h2>
        </Reveal>
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {SKILLS.map((skill, i) => (
            <Reveal key={skill.name} delay={i * 50}>
              <SkillCard {...skill} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="mx-auto w-full max-w-2xl px-6 py-28">
        <Reveal>
          <h2 className="font-display text-3xl text-foreground">Get in touch</h2>
        </Reveal>
        <p className="mt-3 text-sm text-muted-foreground">
          Have a project in mind? Send a message and I&apos;ll reply by email.
        </p>
        <div className="mt-10">
          <ContactForm />
        </div>
      </section>

      <footer className="border-t border-border px-6 py-10 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Kitan Aderounmu. Built with Next.js.
      </footer>
    </div>
  );
}
