"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const VERTEX_SRC = `
attribute vec2 a_position;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

// Three soft, drifting radial blobs (violet / teal / gold) blended over a
// near-black base. Kept deliberately simple (no noise octaves) so it stays
// cheap on low-end GPUs and reads as ambient atmosphere, not a light show.
const FRAGMENT_SRC = `
precision mediump float;
uniform vec2 u_resolution;
uniform float u_time;

vec3 blob(vec2 uv, vec2 center, float radius, vec3 color, float t) {
  vec2 drifted = center + vec2(sin(t * 0.15) * 0.12, cos(t * 0.12) * 0.10);
  float d = distance(uv, drifted);
  float glow = smoothstep(radius, 0.0, d);
  return color * glow;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  uv.x *= u_resolution.x / u_resolution.y;

  vec3 base = vec3(0.03, 0.03, 0.04);
  vec3 violet = vec3(0.545, 0.486, 0.965);
  vec3 teal = vec3(0.310, 0.820, 0.773);
  vec3 gold = vec3(0.910, 0.710, 0.388);

  float aspect = u_resolution.x / u_resolution.y;
  vec3 color = base;
  color += blob(uv, vec2(0.25 * aspect, 0.65), 0.55, violet, u_time) * 0.5;
  color += blob(uv, vec2(0.75 * aspect, 0.35), 0.5, teal, u_time + 40.0) * 0.4;
  color += blob(uv, vec2(0.55 * aspect, 0.8), 0.45, gold, u_time + 80.0) * 0.3;

  gl_FragColor = vec4(color, 1.0);
}
`;

function compileShader(
  gl: WebGLRenderingContext,
  type: number,
  source: string
): WebGLShader {
  const shader = gl.createShader(type);
  if (!shader) throw new Error("Unable to create shader");
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const info = gl.getShaderInfoLog(shader);
    gl.deleteShader(shader);
    throw new Error(`Shader compile error: ${info}`);
  }
  return shader;
}

/**
 * Ambient drifting gradient rendered with raw WebGL. Throws during render
 * (via `error` state) if context creation or shader compilation fails, so
 * the surrounding <WebGLErrorBoundary> can swap in the CSS fallback.
 */
export function AnimatedGradient({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = (canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl")) as WebGLRenderingContext | null;

    if (!gl) {
      setError(new Error("WebGL is not supported in this browser"));
      return;
    }

    let animationFrame: number;
    let program: WebGLProgram | null = null;

    try {
      const vertexShader = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SRC);
      const fragmentShader = compileShader(
        gl,
        gl.FRAGMENT_SHADER,
        FRAGMENT_SRC
      );

      program = gl.createProgram();
      if (!program) throw new Error("Unable to create GL program");
      gl.attachShader(program, vertexShader);
      gl.attachShader(program, fragmentShader);
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        throw new Error(
          `Program link error: ${gl.getProgramInfoLog(program)}`
        );
      }
      gl.useProgram(program);

      const positionBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
        gl.STATIC_DRAW
      );

      const positionLoc = gl.getAttribLocation(program, "a_position");
      gl.enableVertexAttribArray(positionLoc);
      gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

      const resolutionLoc = gl.getUniformLocation(program, "u_resolution");
      const timeLoc = gl.getUniformLocation(program, "u_time");

      const resize = () => {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = canvas.clientWidth * dpr;
        canvas.height = canvas.clientHeight * dpr;
        gl.viewport(0, 0, canvas.width, canvas.height);
      };
      resize();
      window.addEventListener("resize", resize);

      const start = performance.now();
      const render = () => {
        const t = (performance.now() - start) / 1000;
        gl.uniform2f(resolutionLoc, canvas.width, canvas.height);
        gl.uniform1f(timeLoc, t);
        gl.drawArrays(gl.TRIANGLES, 0, 6);
        animationFrame = requestAnimationFrame(render);
      };
      render();

      return () => {
        window.removeEventListener("resize", resize);
        cancelAnimationFrame(animationFrame);
        if (program) gl.deleteProgram(program);
      };
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
      return () => cancelAnimationFrame(animationFrame);
    }
  }, []);

  if (error) {
    // Thrown during render (not inside the effect) so WebGLErrorBoundary
    // can actually catch it and swap in the fallback.
    throw error;
  }

  return (
    <canvas
      ref={canvasRef}
      className={cn("h-full w-full", className)}
      aria-hidden="true"
    />
  );
}
