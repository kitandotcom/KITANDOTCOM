"use client";

import { Check, ChevronRight, Globe2, MapPin, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

const FX_REFERENCE = 1600;

const PLANS = [
  {
    id: "reactive",
    name: "Reactive maintenance",
    label: "When something breaks",
    ngn: 50000,
    featured: false,
    description: "A light-touch support layer for a site that is already up and running.",
    features: ["Uptime and error checks", "Glitches fixed as they arise", "Domain and hosting kept pointed correctly", "Email as needed — no guaranteed turnaround"],
  },
  {
    id: "active",
    name: "Light active management",
    label: "A little more momentum",
    ngn: 90000,
    featured: true,
    description: "A practical quarterly rhythm for a team that needs occasional hands-on help.",
    features: ["Up to 2 content updates per quarter", "Blog / Insights published on request", "Booking requests checked weekly", "Fixes within 5 business days, best effort", "Monthly backups + email support"],
  },
  {
    id: "full",
    name: "Active management",
    label: "The full retainer scope",
    ngn: 165000,
    featured: false,
    description: "Active ownership of the site after launch, with priority response and ongoing care.",
    features: ["Up to 6 content updates per quarter", "Blog / Insights management", "Booking monitoring + urgent flags within 24 hours", "Priority fixes within 3 business days", "Monthly backups + basic security monitoring", "Direct support line"],
  },
];

function formatNaira(value: number) {
  return new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", maximumFractionDigits: 0 }).format(value);
}

function formatDollar(value: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value / FX_REFERENCE);
}

export function PricingSection() {
  const [currency, setCurrency] = useState<"NGN" | "USD">("NGN");
  const [location, setLocation] = useState("Nigeria");

  useEffect(() => {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const language = navigator.language || "";
    const isNigeria = timezone.includes("Lagos") || language.toLowerCase().includes("-ng");
    setLocation(isNigeria ? "Nigeria" : "your region");
    setCurrency(isNigeria ? "NGN" : "USD");
  }, []);

  return (
    <section id="pricing" className="pricing-section">
      <div className="page-width">
        <div className="pricing-heading">
          <div><p className="section-label">04 / service menu</p><h2>Choose the care<br /><em>your site needs.</em></h2><p className="pricing-intro">Clear quarterly tiers, matched to the amount of attention your site actually needs. No hidden upgrade path.</p></div>
          <div className="pricing-controls"><div className="location-chip"><MapPin size={13} /> <span>Showing prices for {location}</span></div><div className="currency-toggle" role="group" aria-label="Choose pricing currency"><button className={currency === "NGN" ? "is-active" : ""} onClick={() => setCurrency("NGN")}>₦ NGN</button><button className={currency === "USD" ? "is-active" : ""} onClick={() => setCurrency("USD")}>$ USD</button></div><p className="fx-note"><Globe2 size={12} /> USD figures are approximate at ₦{FX_REFERENCE.toLocaleString()}/$.</p></div>
        </div>
        <div className="pricing-grid">
          {PLANS.map((plan, index) => <article className={`price-card ${plan.featured ? "is-featured" : ""}`} key={plan.id}><div className="price-card-top"><span className="price-index">0{index + 1}</span>{plan.featured && <span className="recommended"><Sparkles size={12} /> most flexible</span>}</div><p className="price-label">{plan.label}</p><h3>{plan.name}</h3><p className="price-description">{plan.description}</p><div className="price-value"><strong>{currency === "NGN" ? formatNaira(plan.ngn) : formatDollar(plan.ngn)}</strong><span>/ quarter</span></div><div className="price-divider" /><ul>{plan.features.map((feature) => <li key={feature}><Check size={14} /> {feature}</li>)}</ul><a href="#contact" className="price-cta">Ask about this tier <ChevronRight size={15} /></a></article>)}
        </div>
        <div className="pricing-footnote"><span>One-time website build fees are scoped separately.</span><span>Need a custom arrangement? <a href="#contact">Talk to Kitan <ChevronRight size={13} /></a></span></div>
      </div>
    </section>
  );
}
