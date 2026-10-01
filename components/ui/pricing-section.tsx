"use client";

import { ChevronDown, ChevronRight, Globe2, MapPin } from "lucide-react";
import { useEffect, useState } from "react";

type Currency = "NGN" | "USD";
type Retainer = { name: string; ngn: number; usd: number; description: string; coverage: string[] };
type BuildTier = { id: string; name: string; ngn: number; usd: number; scope: string; timeline: string; featured?: boolean; retainers: Retainer[] };

type Market = { country: string; currency: Currency };

const BUILD_TIERS: BuildTier[] = [
  { id: "starter", name: "Starter", ngn: 25000, usd: 350, scope: "A focused one-page site for a clear offer, profile, or launch.", timeline: "5–7 days", retainers: [
    { name: "Reactive", ngn: 20000, usd: 150, description: "Keep the site online and handle small fixes when they appear.", coverage: ["Uptime and error checks", "Small fixes as needed", "Domain and hosting checks", "Email support as needed"] },
    { name: "Light Update", ngn: 35000, usd: 270, description: "A small quarterly content rhythm for a site that changes occasionally.", coverage: ["Up to 2 content updates per quarter", "Text, image, or link changes", "Basic link and form checks", "Email support with best-effort response"] },
  ] },
  { id: "essential", name: "Essential", ngn: 70000, usd: 950, scope: "Up to five pages with SEO basics, contact form, and a considered responsive build.", timeline: "10–14 days", featured: true, retainers: [
    { name: "Reactive", ngn: 40000, usd: 300, description: "A maintenance safety net for a completed site.", coverage: ["Uptime and error checks", "Small glitches fixed as they arise", "Hosting and domain checks", "Email support as needed"] },
    { name: "Standard", ngn: 65000, usd: 480, description: "Regular light-touch changes without a full management commitment.", coverage: ["Up to 2 content updates per quarter", "Blog or insights published on request", "Form and link checks", "Monthly backup check"] },
    { name: "Active", ngn: 90000, usd: 750, description: "A reliable quarterly rhythm for a site that needs ongoing attention.", coverage: ["Up to 4 content updates per quarter", "Blog and insights management", "Booking requests checked weekly", "Priority fixes within 5 business days"] },
  ] },
  { id: "professional", name: "Professional", ngn: 130000, usd: 2400, scope: "Up to ten pages with custom design, booking, editing access, and a stronger content system.", timeline: "3–4 weeks", retainers: [
    { name: "Standard", ngn: 75000, usd: 600, description: "Keep a more involved marketing site stable and current.", coverage: ["Up to 2 content updates per quarter", "Blog or insights publishing", "Booking and form checks", "Monthly backups"] },
    { name: "Active", ngn: 110000, usd: 900, description: "A hands-on rhythm for a business site that is actively used.", coverage: ["Up to 4 content updates per quarter", "Booking requests checked weekly", "Content and page improvements", "Priority fixes within 5 business days"] },
    { name: "Full Management", ngn: 150000, usd: 1350, description: "Active ownership of the site after launch, with priority response.", coverage: ["Up to 6 content updates per quarter", "Blog and insights management", "Urgent booking flags within 24 hours", "Priority fixes within 3 business days", "Security and backup monitoring"] },
  ] },
  { id: "premium", name: "Premium", ngn: 200000, usd: 5000, scope: "A full custom platform with dashboard, CMS, integrations, and a deeper product surface.", timeline: "4–6 weeks", retainers: [
    { name: "Standard", ngn: 100000, usd: 900, description: "Baseline care for a custom platform with multiple moving parts.", coverage: ["Platform health and error checks", "Up to 2 content updates per quarter", "Integration and form checks", "Monthly backups"] },
    { name: "Active", ngn: 150000, usd: 1350, description: "Ongoing product and content support for a live platform.", coverage: ["Up to 4 content updates per quarter", "CMS and integration support", "Booking or transaction monitoring", "Priority fixes within 5 business days"] },
    { name: "Full Management", ngn: 200000, usd: 1800, description: "The full care layer for a platform that needs an active technical partner.", coverage: ["Up to 6 content updates per quarter", "CMS and integrations managed", "Urgent flags within 24 hours", "Priority fixes within 3 business days", "Security, backups, and direct support line"] },
  ] },
];

function formatMoney(value: number, currency: Currency) { return new Intl.NumberFormat(currency === "NGN" ? "en-NG" : "en-US", { style: "currency", currency, maximumFractionDigits: 0 }).format(value); }
function monthly(value: number) { return Math.round(value / 3); }

function browserMarket(): Market {
  const timezone = typeof Intl !== "undefined" ? Intl.DateTimeFormat().resolvedOptions().timeZone : "";
  const language = typeof navigator !== "undefined" ? navigator.language.toLowerCase() : "";
  const isNigeria = timezone.includes("Lagos") || language.includes("-ng");
  const isUnitedStates = timezone.startsWith("America/") || language.includes("-us");
  return isNigeria ? { country: "Nigeria", currency: "NGN" } : isUnitedStates ? { country: "United States", currency: "USD" } : { country: "International", currency: "USD" };
}

export function PricingSection() {
  const [market, setMarket] = useState<Market>({ country: "International", currency: "USD" });
  useEffect(() => {
    let cancelled = false;
    const fallback = browserMarket();
    setMarket(fallback);
    fetch("https://ipapi.co/json/", { signal: AbortSignal.timeout(2500) })
      .then((response) => response.ok ? response.json() : Promise.reject(new Error("market lookup failed")))
      .then((data: { country_code?: string }) => {
        if (cancelled) return;
        const isNigeria = data.country_code === "NG";
        const isUnitedStates = data.country_code === "US";
        setMarket(isNigeria ? { country: "Nigeria", currency: "NGN" } : isUnitedStates ? { country: "United States", currency: "USD" } : fallback);
      })
      .catch(() => undefined);
    return () => { cancelled = true; };
  }, []);

  const { currency } = market;
  return <section id="pricing" className="pricing-section"><div className="page-width">
    <div className="pricing-heading"><div><p className="section-label">02 / build systems</p><h2>Choose the right<br /><em>starting point.</em></h2><p className="pricing-intro">Four build tiers, each with a small set of quarterly care options. Open a care option to see exactly what its fee covers.</p></div><div className="pricing-controls"><div className="location-chip"><MapPin size={13} /><span>Prices localized for {market.country}</span></div><div className="market-display" aria-live="polite"><span>Pricing market</span><strong>{market.country === "Nigeria" ? "Nigeria · ₦ NGN" : market.country === "United States" ? "United States · $ USD" : "International · $ USD"}</strong></div><p className="fx-note"><Globe2 size={12} /> USD pricing is independently set for the US market, not converted from naira.</p></div></div>
    <div className="pricing-grid pricing-grid-four">{BUILD_TIERS.map((tier, index) => <article className={`price-card build-tier-card ${tier.featured ? "is-featured" : ""}`} key={tier.id}>
      <div className="price-card-top"><span className="price-index">0{index + 1}</span>{tier.featured && <span className="recommended">recommended</span>}</div><h3>{tier.name}</h3><p className="tier-scope">{tier.scope}</p><div className="build-price"><strong>{formatMoney(currency === "NGN" ? tier.ngn : tier.usd, currency)}</strong><span>one-time build<br />{tier.timeline}</span></div>
      <div className="retainer-heading"><span>Quarterly care</span><span>{tier.retainers.length} options</span></div><div className="retainer-list">{tier.retainers.map((retainer) => <details className="retainer-detail" key={retainer.name}><summary><span><strong>{retainer.name}</strong><small>{formatMoney(currency === "NGN" ? retainer.ngn : retainer.usd, currency)} / quarter</small></span><ChevronDown size={15} /></summary><div className="retainer-copy"><p>{retainer.description}</p><ul>{retainer.coverage.map((item) => <li key={item}>{item}</li>)}</ul><small>Approx. {formatMoney(currency === "NGN" ? monthly(retainer.ngn) : monthly(retainer.usd), currency)} / month</small></div></details>)}</div><a href="#contact" className="price-cta">Ask about {tier.name} <ChevronRight size={15} /></a>
    </article>)}</div><div className="pricing-footnote"><span>Build fees are one-time. Care is optional and billed quarterly.</span><span>Need a custom scope? <a href="#contact">Talk to Kitan <ChevronRight size={13} /></a></span></div>
  </div></section>;
}
