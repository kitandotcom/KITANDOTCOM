"use client";

import { ArrowUpRight, Box, Code2, Gamepad2, Globe2, Sparkles } from "lucide-react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
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
  const reduceMotion = useReducedMotion();
  const targetX = useMotionValue(0);
  const targetY = useMotionValue(0);
  const springX = useSpring(targetX, { stiffness: 130, damping: 22, mass: 0.65 });
  const springY = useSpring(targetY, { stiffness: 130, damping: 22, mass: 0.65 });
  const tiltX = useTransform(springX, (value) => `${value}deg`);
  const tiltY = useTransform(springY, (value) => `${value}deg`);

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;
    const handleMove = (event: PointerEvent) => {
      if (reduceMotion || event.pointerType === "touch") return;
      const rect = scene.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      targetX.set(y * -10);
      targetY.set(x * 14);
    };
    const reset = () => {
      targetX.set(0);
      targetY.set(0);
    };
    scene.addEventListener("pointermove", handleMove);
    scene.addEventListener("pointerleave", reset);
    return () => {
      scene.removeEventListener("pointermove", handleMove);
      scene.removeEventListener("pointerleave", reset);
    };
  }, [reduceMotion, targetX, targetY]);

  const activeProject = projects[active];
  const ActiveIcon = ICONS[activeProject.icon];

  return (
    <div ref={sceneRef} className="scene-wrap">
      <div className="scene-label scene-label-top"><span className="live-dot" /> interactive workspace / pointer enabled</div>
      <div className="scene-grid" aria-hidden="true" />
      <div className="scene-orbit orbit-a" aria-hidden="true" />
      <div className="scene-orbit orbit-b" aria-hidden="true" />
      <motion.div className="scene-world" style={{ "--tilt-x": tiltX, "--tilt-y": tiltY } as unknown as CSSProperties}>
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
      </motion.div>
      <div className="scene-detail">
        <div className="scene-detail-icon" style={{ background: activeProject.color }}><ActiveIcon size={18} /></div>
        <div><span>selected from the orbit</span><strong>{activeProject.title}</strong></div>
        <button type="button" className="scene-detail-jump" onClick={() => onSelectProject?.(activeProject.title)} aria-label={`View ${activeProject.title} project`}><span>View project</span><ArrowUpRight size={17} /></button>
      </div>
    </div>
  );
}
