"use client";

import { ArrowUpRight, Check, ExternalLink } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export type BrowserTab = { id: string; label: string; url: string };
type TabStatus = "loading" | "loaded" | "blocked";
const IFRAME_LOAD_TIMEOUT_MS = 4000;

export function BrowserWindow({ tabs }: { tabs: BrowserTab[] }) {
  const [activeId, setActiveId] = useState(tabs[0]?.id);
  const [statuses, setStatuses] = useState<Record<string, TabStatus>>(Object.fromEntries(tabs.map((tab) => [tab.id, "loading"])));
  const timers = useRef<Record<string, ReturnType<typeof setTimeout>>>({});
  const activeTab = tabs.find((tab) => tab.id === activeId) ?? tabs[0];
  const activeStatus = statuses[activeTab.id];

  useEffect(() => {
    tabs.forEach((tab) => {
      if (statuses[tab.id] === "loading" && !timers.current[tab.id]) {
        timers.current[tab.id] = setTimeout(() => setStatuses((prev) => prev[tab.id] === "loading" ? { ...prev, [tab.id]: "blocked" } : prev), IFRAME_LOAD_TIMEOUT_MS);
      }
    });
    return () => Object.values(timers.current).forEach(clearTimeout);
    // The tabs are stable for the lifetime of the portfolio page.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabs]);

  const handleLoad = (tabId: string) => {
    clearTimeout(timers.current[tabId]);
    setStatuses((prev) => ({ ...prev, [tabId]: "loaded" }));
  };

  return (
    <div className="live-browser">
      <div className="live-browser-toolbar">
        <div className="browser-lights"><span /><span /><span /></div>
        <div className="browser-address"><span>live preview / kitandotcom</span><Check size={12} /></div>
        <a href={activeTab.url} target="_blank" rel="noopener noreferrer" className="browser-open-top">Open full site <ArrowUpRight size={14} /></a>
      </div>
      <div className="live-browser-switcher">
        <div><span className="switcher-kicker">Choose a live site</span><strong>Click a project to preview it</strong></div>
        <div className="switcher-buttons">{tabs.map((tab, index) => <button key={tab.id} onClick={() => setActiveId(tab.id)} className={cn(activeTab.id === tab.id && "is-active")} aria-pressed={activeTab.id === tab.id}><span>0{index + 1}</span>{tab.label}<ArrowUpRight size={14} /></button>)}</div>
      </div>
      <div className="live-browser-viewport">
        {tabs.map((tab) => <div key={tab.id} className={cn("browser-frame", tab.id === activeTab.id ? "block" : "hidden")}><iframe src={tab.url} title={tab.label} className="h-full w-full border-0" onLoad={() => handleLoad(tab.id)} loading={tab.id === activeTab.id ? "eager" : "lazy"} />{tab.id === activeTab.id && activeStatus === "blocked" && <div className="browser-fallback"><ExternalLink size={22} /><strong>{tab.label} blocks inline preview</strong><p>Open the live site directly for the complete experience.</p><a href={tab.url} target="_blank" rel="noopener noreferrer">Open {tab.label} <ArrowUpRight size={15} /></a></div>}</div>)}
      </div>
      <div className="live-browser-footer"><span>Viewing: <strong>{activeTab.label}</strong></span><a href={activeTab.url} target="_blank" rel="noopener noreferrer">Open {activeTab.label} in a new tab <ArrowUpRight size={13} /></a></div>
    </div>
  );
}
