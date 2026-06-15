"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Home, Sparkles, Briefcase, User, Mail, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

const navItems = [
  { name: "Home", href: "#home", icon: Home },
  { name: "Projects", href: "#projects", icon: Briefcase },
  { name: "Experience", href: "#experience", icon: User },
  { name: "Contact", href: "#contact", icon: Mail },
];

export default function Navbar() {
  // Tambahkan state activeItem untuk mengingat menu yang sedang di-klik
  const [activeItem, setActiveItem] = useState("Home");
  const [hoveredItem, setHoveredItem] = useState("Home");
  
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <nav className="fixed top-8 left-1/2 -translate-x-1/2 z-50">
      <div className="flex items-center bg-white/80 dark:bg-[#1A1A1A]/80 border border-slate-200 dark:border-[#333] rounded-full p-1.5 shadow-[0_8px_30px_rgb(0,0,0,0.06)] backdrop-blur-lg transition-colors">
        
        <div 
          className="flex items-center gap-1 px-2 relative" 
          // Saat mouse pergi, kembalikan kapsul ke menu yang terakhir di-klik (activeItem)
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
                // Saat di-klik, perbarui ingatan menu yang aktif
                onClick={() => setActiveItem(item.name)}
                className={`relative flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  isHovered || isActive ? "text-[#1A1A1A] dark:text-black" : "text-slate-500 dark:text-slate-400 hover:text-[#1A1A1A] dark:hover:text-white"
                }`}
              >
                {isHovered && (
                  <motion.div
                    layoutId="nav-pill"
                    // Kapsul hijau stabilo
                    className="absolute inset-0 bg-[#5a00cf] dark:bg-[#5a00cf] rounded-full"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <item.icon className="relative z-10 w-4 h-4" />
                <span className="relative z-10 hidden sm:inline">{item.name}</span>
              </a>
            );
          })}
        </div>

        <div className="w-px h-5 bg-slate-200 dark:bg-[#333] mx-2"></div>
        
        <div className="flex items-center gap-2 pr-1">
          <button 
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-1.5 text-slate-500 dark:text-slate-400 hover:text-[#1A1A1A] dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#333] rounded-full transition-colors"
          >
            {mounted && theme === "dark" ? (
              <Sun className="w-4 h-4" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </button>
          
        </div>

      </div>
    </nav>
  );
}