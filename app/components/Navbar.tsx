"use client";

import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { RandomLetterSwap } from "@/components/ui/random-letter-swap";

const navItems = [
  { name: "Home", href: "#home" },
  { name: "Projects", href: "#projects" },
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  return (
    <div className="fixed top-6 inset-x-0 z-50 flex justify-center pointer-events-none">
      <nav className="pointer-events-auto flex items-center gap-6 px-8 py-3 bg-white/10 dark:bg-black/20 backdrop-blur-md border border-white/20 dark:border-white/10 rounded-full shadow-lg">
        <div className="flex items-center gap-6">
          {navItems.map((item) => (
            <a key={item.name} href={item.href} className="flex items-center">
              <RandomLetterSwap
                className="cursor-pointer font-semibold text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white transition-colors text-sm"
                label={item.name}
                staggerDuration={0.025}
                transition={{ duration: 0.6, type: "spring" }}
              />
            </a>
          ))}
        </div>

        <div className="w-px h-5 bg-slate-300 dark:bg-slate-700 mx-2" />

        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="p-2 text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white rounded-full transition-all duration-300"
          aria-label="Toggle theme"
        >
          {mounted && theme === "dark" ? (
            <Sun className="w-4 h-4 transition-transform duration-300 hover:rotate-45" />
          ) : (
            <Moon className="w-4 h-4 transition-transform duration-300 hover:-rotate-12" />
          )}
        </button>
      </nav>
    </div>
  );
}
