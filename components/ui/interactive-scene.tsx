"use client";

import { ArrowUpRight, Box, Code2, Gamepad2, Globe2, Sparkles } from "lucide-react";
import { useEffect, useRef, useState, type CSSProperties } from "react";

type SceneProject = {
  title: string;
  type: string;
  href?: string;
  color: string;
  icon: "globe" | "code" | "game" | "box";
};

const ICONS = { globe: Globe2, code: Code2, game: Gamepad2, box: Box };

export function InteractiveScene({ projects, onSelectProject }: { projects: SceneProject[]; onSelectProject?: (title: string) => void }) {
  const sceneRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;
    const handleMove = (event: PointerEvent) => {
      const rect = scene.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      setTilt({ x: y * -10, y: x * 14 });
    };
    const reset = () => setTilt({ x: 0, y: 0 });
    scene.addEventListener("pointermove", handleMove);
    scene.addEventListener("pointerleave", reset);
    return () => {
      scene.removeEventListener("pointermove", handleMove);
      scene.removeEventListener("pointerleave", reset);
    };
  }, []);

  const activeProject = projects[active];
  const ActiveIcon = ICONS[activeProject.icon];

  return (
    <div ref={sceneRef} className="scene-wrap" style={{ "--tilt-x": `${tilt.x}deg`, "--tilt-y": `${tilt.y}deg` } as CSSProperties}>
      <div className="scene-label scene-label-top"><span className="live-dot" /> interactive workspace / pointer enabled</div>
      <div className="scene-grid" aria-hidden="true" />
      <div className="scene-orbit orbit-a" aria-hidden="true" />
      <div className="scene-orbit orbit-b" aria-hidden="true" />
      <div className="scene-world">
        <div className="scene-core" style={{ background: activeProject.color }}>
          <div className="core-ring" />
          <div className="core-mark"><Sparkles size={21} /></div>
          <span>SHIP / 01</span>
        </div>
        {projects.map((project, index) => {
          const Icon = ICONS[project.icon];
          const positions = ["project-node node-one", "project-node node-two", "project-node node-three", "project-node node-four"];
          return (
            <button
              key={project.title}
              type="button"
              className={`${positions[index % positions.length]} ${index === active ? "is-active" : ""}`}
              onClick={() => {
                setActive(index);
                onSelectProject?.(project.title);
              }}
              aria-label={`Select ${project.title}`}
              aria-pressed={index === active}
              style={{ "--node-color": project.color } as CSSProperties}
            >
              <span className="node-line" />
              <span className="node-card"><span className="node-icon"><Icon size={15} /></span><span><strong>{project.title}</strong><small>{project.type}</small></span><ArrowUpRight size={14} /></span>
            </button>
          );
        })}
        <div className="scene-stamp stamp-left">N06°<br /><span>web / product / play</span></div>
        <div className="scene-stamp stamp-right">2026<br /><span>always shipping</span></div>
      </div>
      <div className="scene-detail">
        <div className="scene-detail-icon" style={{ background: activeProject.color }}><ActiveIcon size={18} /></div>
        <div><span>selected from the orbit</span><strong>{activeProject.title}</strong></div>
        <button type="button" className="scene-detail-jump" onClick={() => onSelectProject?.(activeProject.title)} aria-label={`View ${activeProject.title} project`}><span>View project</span><ArrowUpRight size={17} /></button>
      </div>
    </div>
  );
}
