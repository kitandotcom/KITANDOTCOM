"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export type BrowserTab = {
  id: string;
  label: string;
  url: string;
};

const IFRAME_LOAD_TIMEOUT_MS = 4000;

type TabStatus = "loading" | "loaded" | "blocked";

/**
 * A glass "browser chrome" shell with real tabs. Each tab lazily mounts its
 * own iframe and tracks its own load status, so a blocked site only shows
 * its fallback message while its own tab is active — switching tabs never
 * stacks fallback messages from other tabs.
 */
export function BrowserWindow({ tabs }: { tabs: BrowserTab[] }) {
  const [activeId, setActiveId] = useState(tabs[0]?.id);
  const [statuses, setStatuses] = useState<Record<string, TabStatus>>(
    Object.fromEntries(tabs.map((tab) => [tab.id, "loading"]))
  );
  const timers = useRef<Record<string, ReturnType<typeof setTimeout>>>({});

  useEffect(() => {
    // Arm a "did it actually load" timeout for each tab. Sites that block
    // embedding (X-Frame-Options / frame-ancestors) generally never fire
    // the iframe's load event with real content, so a timeout is the most
    // reliable cross-browser signal available.
    tabs.forEach((tab) => {
      if (statuses[tab.id] === "loading" && !timers.current[tab.id]) {
        timers.current[tab.id] = setTimeout(() => {
          setStatuses((prev) =>
            prev[tab.id] === "loading"
              ? { ...prev, [tab.id]: "blocked" }
              : prev
          );
        }, IFRAME_LOAD_TIMEOUT_MS);
      }
    });
    return () => {
      Object.values(timers.current).forEach(clearTimeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabs]);

  const activeTab = tabs.find((tab) => tab.id === activeId) ?? tabs[0];
  const activeStatus = statuses[activeTab.id];

  const handleLoad = (tabId: string) => {
    clearTimeout(timers.current[tabId]);
    setStatuses((prev) => ({ ...prev, [tabId]: "loaded" }));
  };

  return (
    <div className="glass-panel overflow-hidden rounded-2xl">
      {/* Chrome bar */}
      <div className="flex items-center gap-3 border-b border-border px-4 py-3">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </div>
        <div className="ml-2 flex gap-1 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveId(tab.id)}
              className={cn(
                "rounded-md px-3 py-1 text-sm whitespace-nowrap transition-colors",
                tab.id === activeTab.id
                  ? "bg-muted text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <a
          href={activeTab.url}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-auto shrink-0 text-xs text-muted-foreground transition-colors hover:text-accent-teal"
        >
          Open full site ↗
        </a>
      </div>

      {/* Preview area */}
      <div className="relative aspect-[16/10] w-full bg-muted">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={cn(
              "absolute inset-0",
              tab.id === activeTab.id ? "block" : "hidden"
            )}
          >
            <iframe
              src={tab.url}
              title={tab.label}
              className="h-full w-full border-0"
              onLoad={() => handleLoad(tab.id)}
              loading={tab.id === activeTab.id ? "eager" : "lazy"}
            />
            {tab.id === activeTab.id && activeStatus === "blocked" && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-card px-6 text-center">
                <p className="font-display text-xl text-foreground">
                  {tab.label} can&apos;t be shown in a preview
                </p>
                <p className="max-w-sm text-sm text-muted-foreground">
                  This site blocks embedding, so it can only be viewed on its
                  own page.
                </p>
                <a
                  href={tab.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 rounded-full border border-border px-4 py-2 text-sm text-foreground transition-colors hover:border-accent-teal hover:text-accent-teal"
                >
                  Open {tab.label} ↗
                </a>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
