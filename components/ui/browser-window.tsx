"use client";

import { ArrowUpRight, Check, ExternalLink } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export type BrowserTab = {
  id: string;
  label: string;
  url: string;
  inlinePreview?: boolean;
  previewKicker?: string;
  previewDescription?: string;
};
type TabStatus = "loading" | "loaded" | "blocked";
const IFRAME_LOAD_TIMEOUT_MS = 15000;

export function BrowserWindow({ tabs }: { tabs: BrowserTab[] }) {
  const [activeId, setActiveId] = useState(tabs[0]?.id);
  const [statuses, setStatuses] = useState<Record<string, TabStatus>>(Object.fromEntries(tabs.map((tab) => [tab.id, tab.inlinePreview === false ? "blocked" : "loading"])));
  const timers = useRef<Record<string, ReturnType<typeof setTimeout>>>({});
  const activeTab = tabs.find((tab) => tab.id === activeId) ?? tabs[0];
  const activeStatus = statuses[activeTab.id];

  useEffect(() => {
    tabs.forEach((tab) => { if (tab.inlinePreview !== false && statuses[tab.id] === "loading" && !timers.current[tab.id]) timers.current[tab.id] = setTimeout(() => setStatuses((prev) => prev[tab.id] === "loading" ? { ...prev, [tab.id]: "blocked" } : prev), IFRAME_LOAD_TIMEOUT_MS); });
    return () => Object.values(timers.current).forEach(clearTimeout);
    // Tabs remain stable for this page.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabs]);

  const handleLoad = (tabId: string) => { clearTimeout(timers.current[tabId]); setStatuses((prev) => ({ ...prev, [tabId]: "loaded" })); };

  return <div className="live-browser"><div className="live-browser-toolbar"><div className="browser-lights"><span /><span /><span /></div><div className="browser-address"><span>live site / {activeTab.label}</span><Check size={12} /></div><a href={activeTab.url} target="_blank" rel="noopener noreferrer" className="browser-open-top">Open full site <ArrowUpRight size={14} /></a></div><div className="live-browser-switcher"><div className="switcher-heading"><span className="switcher-kicker">Selected work</span><strong>Choose a live site</strong></div><div className="switcher-buttons">{tabs.map((tab, index) => <button key={tab.id} onClick={() => setActiveId(tab.id)} className={cn(activeTab.id === tab.id && "is-active")} aria-pressed={activeTab.id === tab.id}><span>0{index + 1}</span>{tab.label}</button>)}</div></div><div className="live-browser-viewport">{tabs.map((tab) => <div key={tab.id} className={cn("browser-frame", tab.id === activeTab.id ? "block" : "hidden")}>{tab.inlinePreview !== false && <iframe src={tab.url} title={tab.label} className="h-full w-full border-0" onLoad={() => handleLoad(tab.id)} loading={tab.id === activeTab.id ? "eager" : "lazy"} />}{tab.id === activeTab.id && activeStatus === "loading" && <div className="browser-loading" role="status">Loading {tab.label}…</div>}{tab.id === activeTab.id && activeStatus === "blocked" && <div className="browser-fallback"><span className="browser-fallback-kicker">{tab.previewKicker ?? "Live site"}</span><strong>{tab.label}</strong><p>{tab.previewDescription ?? "This site blocks inline previews for security. Open it directly for the complete experience."}</p><a href={tab.url} target="_blank" rel="noopener noreferrer">Open {tab.label} <ArrowUpRight size={15} /></a></div>}</div>)}</div><div className="live-browser-footer"><span>Viewing: <strong>{activeTab.label}</strong></span><a href={activeTab.url} target="_blank" rel="noopener noreferrer">Open in a new tab <ArrowUpRight size={13} /></a></div></div>;
}
