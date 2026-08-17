"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import AnimatedGradient from "@/components/ui/animated-gradient";

export default function ThemeBackground() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // During SSR, we don't know the theme, so we can render the AnimatedGradient 
  // but keep it hidden until mounted to avoid hydration mismatch.
  // Actually, we can just render it with opacity-0 initially.
  
  return (
    <div 
      className={`fixed inset-0 -z-10 w-full h-full pointer-events-none transition-opacity duration-700 ${
        mounted && resolvedTheme === "dark" ? "opacity-100" : "opacity-0"
      }`}
    >
      <AnimatedGradient config={{ preset: "Aurora" }} />
    </div>
  );
}
