"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Home, Briefcase, User, Mail, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const navItems = [
  { name: "Home", href: "#home", icon: Home },
  { name: "Projects", href: "#projects", icon: Briefcase },
  { name: "Experience", href: "#experience", icon: User },
  { name: "Contact", href: "#contact", icon: Mail },
];

export default function Navbar() {
  const [activeItem, setActiveItem] = useState("Home");
  const [hoveredItem, setHoveredItem] = useState("Home");
  
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  useGSAP(() => {
    // Hide navbar on scroll down, show on scroll up
    const showAnim = gsap.from(navRef.current, { 
      yPercent: -150,
      paused: true,
      duration: 0.3,
      ease: "power2.out"
    }).progress(1); // start shown

    ScrollTrigger.create({
      start: "top top",
      end: "max",
      onUpdate: (self) => {
        if (self.direction === 1 && self.scroll() > 50) {
          showAnim.reverse(); // hide
        } else {
          showAnim.play(); // show
        }
      }
    });
  }, { scope: navRef });

  return (
    <div ref={navRef} className="fixed top-6 inset-x-0 z-50 flex justify-center pointer-events-none">
      <nav 
        className="pointer-events-auto flex items-center bg-white/40 dark:bg-[#1a1a1a]/60 border border-white/40 dark:border-white/10 rounded-full p-1.5 shadow-[0_8px_32px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)] transition-colors backdrop-blur-xl"
      >
        
        <div 
          className="flex items-center gap-1 px-2 relative" 
          onMouseLeave={() => setHoveredItem(activeItem)}
        >
          {navItems.map((item) => {
            const isHovered = hoveredItem === item.name;
            const isActive = activeItem === item.name;

            return (
              <a
                key={item.name}
                href={item.href}
                onMouseEnter={() => setHoveredItem(item.name)}
                onClick={() => setActiveItem(item.name)}
                className={`relative flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  isHovered || isActive ? "text-white" : "text-slate-600 dark:text-slate-300 hover:text-[#1a1a1a] dark:hover:text-white"
                }`}
              >
                {isHovered && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-linear-to-r from-purple-500 to-blue-500 rounded-full shadow-lg"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <item.icon className={`relative z-10 w-4 h-4 ${isActive && !isHovered ? "text-purple-600 dark:text-purple-400" : ""}`} />
                <span className={`relative z-10 hidden sm:inline ${isActive && !isHovered ? "text-purple-600 dark:text-purple-400" : ""}`}>{item.name}</span>
              </a>
            );
          })}
        </div>

        <div className="w-px h-6 bg-slate-300 dark:bg-slate-700 mx-2"></div>
        
        <div className="flex items-center gap-2 pr-1">
          <button 
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 text-slate-600 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-all"
          >
            {mounted && theme === "dark" ? (
              <Sun className="w-4 h-4" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </button>
        </div>
      </nav>
    </div>
  );
}