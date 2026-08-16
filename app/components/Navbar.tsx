"use client";

import { useState, useEffect } from "react";
import { Moon, Sun, Home, FolderKanban, User, Briefcase, Mail } from "lucide-react";
import { useTheme } from "next-themes";
import { Dock, DockIcon, DockItem, DockLabel } from "@/components/ui/dock";

const navItems = [
  { name: "Home", href: "#home", icon: Home },
  { name: "Projects", href: "#projects", icon: FolderKanban },
  { name: "About", href: "#about", icon: User },
  { name: "Experience", href: "#experience", icon: Briefcase },
  { name: "Contact", href: "#contact", icon: Mail },
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
      <div className="pointer-events-auto">
        <Dock className="items-end pb-3 bg-white/10 dark:bg-black/20 backdrop-blur-md border border-white/20 dark:border-white/10 shadow-lg">
          {navItems.map((item) => (
            <DockItem
              key={item.name}
              href={item.href}
              className="aspect-square rounded-full bg-white/20 dark:bg-black/30 hover:bg-white/40 dark:hover:bg-black/50 transition-colors"
            >
              <DockLabel>{item.name}</DockLabel>
              <DockIcon>
                <item.icon className="w-5 h-5 text-slate-700 dark:text-slate-200" />
              </DockIcon>
            </DockItem>
          ))}
          
          <div className="w-px h-10 bg-slate-300 dark:bg-slate-700 mx-2 self-center" />
          
          <DockItem
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="aspect-square rounded-full bg-white/20 dark:bg-black/30 hover:bg-white/40 dark:hover:bg-black/50 transition-colors"
          >
            <DockLabel>Theme</DockLabel>
            <DockIcon>
              {mounted && theme === "dark" ? (
                <Sun className="w-5 h-5 text-slate-700 dark:text-slate-200" />
              ) : (
                <Moon className="w-5 h-5 text-slate-700 dark:text-slate-200" />
              )}
            </DockIcon>
          </DockItem>
        </Dock>
      </div>
    </div>
  );
}
