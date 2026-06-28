"use client";

import { useState, useEffect, useRef } from "react";
import { Home, Briefcase, User, Mail, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNavbarGlass } from "../hooks/useNavbarGlass";
import { useSvgFilter } from "../hooks/useSvgFilter";
import anime from "animejs";

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
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number | null>(null);
  
  const [isHoveringNav, setIsHoveringNav] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setMounted(true);
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    
    const listener = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, []);

  // Anime.js Hooks Integration
  const { navRef, handleItemHover, handleItemLeave } = useNavbarGlass(reducedMotion);
  const { filterRef, triggerRipple } = useSvgFilter(reducedMotion);

  useGSAP(() => {
    const showAnim = gsap.from(wrapperRef.current, { 
      yPercent: -150,
      paused: true,
      duration: 0.4,
      ease: "power3.out"
    }).progress(1);

    ScrollTrigger.create({
      start: "top top",
      end: "max",
      onUpdate: (self) => {
        if (self.direction === 1 && self.scroll() > 50) {
          showAnim.reverse(); 
        } else {
          showAnim.play(); 
        }
      }
    });
  }, { scope: wrapperRef });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (reducedMotion || !navRef.current) return;
    
    const rect = navRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (requestRef.current) cancelAnimationFrame(requestRef.current);
    
    requestRef.current = requestAnimationFrame(() => {
      navRef.current?.style.setProperty('--mouse-x', `${x}px`);
      navRef.current?.style.setProperty('--mouse-y', `${y}px`);
    });
  };

  const handleMouseLeave = () => {
    setIsHoveringNav(false);
    setHoveredItem(null);
    if (requestRef.current) {
      cancelAnimationFrame(requestRef.current);
    }
  };

  // Anime.js Sliding Pill logic
  const itemsRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const pillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reducedMotion || !pillRef.current) return;
    
    const activeIndex = navItems.findIndex(i => i.name === (hoveredItem || activeItem));
    const targetEl = itemsRef.current[activeIndex];
    
    if (targetEl && pillRef.current) {
      anime({
        targets: pillRef.current,
        left: targetEl.offsetLeft,
        width: targetEl.offsetWidth,
        opacity: 1,
        duration: 400,
        easing: 'easeOutElastic(1, .8)'
      });
    }
  }, [activeItem, hoveredItem, reducedMotion]);

  return (
    <div ref={wrapperRef} className="fixed top-6 inset-x-0 z-50 flex justify-center pointer-events-none perspective-[1000px]">
      
      <svg ref={filterRef} className="fixed w-0 h-0 pointer-events-none" aria-hidden="true" style={{ position: 'absolute' }}>
        <defs>
          <filter id="real-liquid-glass" x="-20%" y="-20%" width="140%" height="140%" colorInterpolationFilters="sRGB">
            <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="BLUR" />
            <feTurbulence type="fractalNoise" baseFrequency="0.01 0.015" numOctaves="3" result="NOISE" seed="42" />
            <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1.5 -0.2" in="NOISE" result="INTENSE_NOISE" />
            <feDisplacementMap in="BLUR" in2="INTENSE_NOISE" scale="40" xChannelSelector="R" yChannelSelector="G" result="REFRACTED" />
            
            <feOffset dx="4" dy="0" in="REFRACTED" result="R_SHIFT" />
            <feOffset dx="-4" dy="0" in="REFRACTED" result="B_SHIFT" />
            
            <feColorMatrix type="matrix" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" in="R_SHIFT" result="RED" />
            <feColorMatrix type="matrix" values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0" in="REFRACTED" result="GREEN" />
            <feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0" in="B_SHIFT" result="BLUE" />
            
            <feBlend mode="screen" in="RED" in2="GREEN" result="RG" />
            <feBlend mode="screen" in="RG" in2="BLUE" result="FINAL_RGB" />
            
            <feComponentTransfer in="FINAL_RGB" result="FINAL_GLASS">
              <feFuncR type="linear" slope="1.05" intercept="0.02" />
              <feFuncG type="linear" slope="1.05" intercept="0.02" />
              <feFuncB type="linear" slope="1.05" intercept="0.02" />
            </feComponentTransfer>
          </filter>
        </defs>
      </svg>

      <nav 
        ref={navRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHoveringNav(true)}
        onMouseLeave={handleMouseLeave}
        onClick={triggerRipple}
        className="pointer-events-auto relative flex items-center p-2 transition-all duration-500 rounded-full group cursor-pointer"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Layer 1: SVG Backdrop Filter */}
        <div 
          className="absolute inset-0 rounded-full pointer-events-none bg-white/5 dark:bg-[#0a0a0a]/10"
          style={{ 
            backdropFilter: 'url(#real-liquid-glass)',
            WebkitBackdropFilter: 'url(#real-liquid-glass)',
          }}
        />

        {/* Layer 2: Glass Thickness */}
        <div 
          className="absolute inset-0 rounded-full pointer-events-none border border-white/30 dark:border-white/10"
          style={{
            boxShadow: `
              inset 0 4px 12px -2px rgba(255,255,255,0.8),
              inset 0 -6px 15px -4px rgba(0,0,0,0.5),
              inset 3px 0 8px -2px rgba(255,255,255,0.4),
              inset -3px 0 8px -2px rgba(0,0,0,0.4),
              0 25px 50px -12px rgba(0,0,0,0.6)
            `
          }}
        />

        {/* Layer 3: Contoured Surface Specular */}
        <div 
          className="absolute inset-0 rounded-full pointer-events-none mix-blend-overlay opacity-90"
          style={{
            background: 'radial-gradient(150% 100% at 50% -20%, rgba(255,255,255,1) 0%, rgba(255,255,255,0.1) 35%, transparent 60%)'
          }}
        />
        
        {/* Layer 3b: Base Convex Gradient */}
        <div 
          className="absolute inset-0 rounded-full pointer-events-none opacity-80 mix-blend-normal"
          style={{
            background: 'linear-gradient(180deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.05) 15%, transparent 40%, rgba(0,0,0,0.15) 85%, rgba(0,0,0,0.5) 100%)'
          }}
        />

        {/* Layer 4: Chromatic Aberration Rim */}
        <div 
          className="absolute inset-0 rounded-full pointer-events-none mix-blend-screen opacity-70"
          style={{
            boxShadow: 'inset 2px 0 5px rgba(255,0,0,0.4), inset -2px 0 5px rgba(0,100,255,0.4)'
          }}
        />

        {/* Layer 5: Caustic Core */}
        <div 
          className="absolute inset-0 rounded-full pointer-events-none mix-blend-color-dodge opacity-60"
          style={{
            background: 'radial-gradient(120% 100% at 50% 100%, rgba(255,255,255,0.4) 0%, transparent 60%)'
          }}
        />

        {/* Layer 6: Dynamic Multi-layer Sweeping Reflections (Managed by Anime.js) */}
        {!reducedMotion && (
          <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
            <div className="anime-sweep-1 w-[50%] h-[150%] absolute -top-1/4 -left-[50%] bg-linear-to-r from-transparent via-white/70 to-transparent mix-blend-overlay blur-[1px] skew-x-[-30deg]" />
            <div className="anime-sweep-2 w-[80%] h-[150%] absolute -top-1/4 -left-[80%] bg-linear-to-r from-transparent via-white/30 to-transparent blur-[3px] skew-x-[-40deg]" />
          </div>
        )}

        {/* Layer 7: Mouse Reactive Internal Light */}
        {!reducedMotion && isHoveringNav && (
          <div 
            className="absolute inset-0 pointer-events-none rounded-full mix-blend-screen z-0 transition-opacity duration-300"
            style={{
              background: 'radial-gradient(100px circle at var(--mouse-x, 0) var(--mouse-y, 0), rgba(255,255,255,0.6), transparent 100%)',
            }}
          />
        )}

        {/* Sliding Pill using Anime.js */}
        <div 
          ref={pillRef}
          className="absolute top-2 bottom-2 bg-linear-to-r from-purple-500/90 to-blue-500/90 rounded-full shadow-[inset_0_2px_4px_rgba(255,255,255,0.5),inset_0_-2px_4px_rgba(0,0,0,0.3),0_0_15px_rgba(168,85,247,0.6)] border border-white/40 dark:border-white/20 z-0 opacity-0 pointer-events-none"
        >
          <div className="absolute inset-x-0 top-0 h-1/2 bg-linear-to-b from-white/50 to-transparent rounded-t-full pointer-events-none" />
        </div>

        {/* NAVIGATION ITEMS */}
        <div className="flex items-center gap-1.5 px-2 relative z-10">
          {navItems.map((item, idx) => {
            const isHovered = hoveredItem === item.name;
            const isActive = activeItem === item.name;

            return (
              <a
                key={item.name}
                href={item.href}
                // @ts-ignore
                ref={el => itemsRef.current[idx] = el}
                onMouseEnter={(e) => {
                  setHoveredItem(item.name);
                  handleItemHover(e.currentTarget);
                }}
                onMouseLeave={(e) => {
                  handleItemLeave(e.currentTarget);
                }}
                onClick={() => setActiveItem(item.name)}
                className={`relative flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                  isHovered || isActive 
                    ? "text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]" 
                    : "text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white drop-shadow-sm"
                }`}
              >
                <item.icon className={`relative w-4 h-4 transition-colors duration-300 z-20 ${isActive && !isHovered ? "text-purple-600 dark:text-purple-300" : ""}`} />
                <span className={`relative hidden sm:inline transition-colors duration-300 z-20 ${isActive && !isHovered ? "text-purple-600 dark:text-purple-300" : ""}`}>{item.name}</span>
              </a>
            );
          })}
        </div>

        <div className="w-px h-7 bg-slate-400/50 dark:bg-slate-500/50 mx-2 relative z-10 shadow-sm" />
        
        <div className="flex items-center gap-2 pr-1 relative z-10">
          <button 
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2.5 text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white rounded-full transition-all duration-300 relative group drop-shadow-sm"
            aria-label="Toggle theme"
            onMouseEnter={(e) => handleItemHover(e.currentTarget)}
            onMouseLeave={(e) => handleItemLeave(e.currentTarget)}
          >
            <div className="absolute inset-0 rounded-full bg-white/0 group-hover:bg-white/20 dark:group-hover:bg-white/10 transition-colors duration-300 pointer-events-none" />
            
            {mounted && theme === "dark" ? (
              <Sun className="w-4 h-4 relative z-10 transition-transform duration-300 group-hover:rotate-45" />
            ) : (
              <Moon className="w-4 h-4 relative z-10 transition-transform duration-300 group-hover:-rotate-12" />
            )}
          </button>
        </div>
      </nav>
    </div>
  );
}