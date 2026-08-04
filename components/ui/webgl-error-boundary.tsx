"use client";

import React from "react";

type Props = {
  children: React.ReactNode;
  fallback: React.ReactNode;
};

type State = {
  hasError: boolean;
};

/**
 * Catches failures from the WebGL-based AnimatedGradient (context creation
 * errors, shader compile errors, runtime GL errors) and swaps in a static
 * CSS gradient instead of taking down the page.
 */
export class WebGLErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    // Non-fatal: the gradient is decorative, so we just log and fall back.
    console.warn("AnimatedGradient failed, falling back to CSS gradient:", error);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}
