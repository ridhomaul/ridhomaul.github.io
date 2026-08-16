"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface Props {
  children?: ReactNode;
  fallback: ReactNode;
}

interface State {
  hasError: boolean;
}

export class WebGLErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("WebGL Error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}

export function WebGLFallback({ className }: { className?: string }) {
  return (
    <div className={cn("bg-black/90", className)} />
  );
}
