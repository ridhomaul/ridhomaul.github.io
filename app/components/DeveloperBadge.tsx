"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SiReact, SiNextdotjs, SiTailwindcss, SiLaravel, SiGithub, SiLinkerd } from "react-icons/si";
import { Mail, SmartphoneNfc } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP);
}

export default function DeveloperBadge() {
  const containerRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  
  const [isFlipped, setIsFlipped] = useState(false);
  const isDragging = useRef(false);
  const startY = useRef(0);
  const currentY = useRef(0);
  const rotationTween = useRef<gsap.core.Tween | null>(null);

  useGSAP(() => {
    // 1. Entrance Animation (Slide down from above viewport)
    gsap.fromTo(
      containerRef.current,
      { y: -1000 },
      {
        y: 0,
        duration: 2,
        ease: "elastic.out(1, 0.4)",
        delay: 0.2, // Small delay for rendering
      }
    );

    // Initial slight swing sequence for natural feel
    gsap.fromTo(
      badgeRef.current,
      { rotationZ: -10 },
      {
        rotationZ: 0,
        duration: 2.5,
        ease: "elastic.out(1, 0.2)",
        delay: 0.3,
      }
    );
  }, { scope: containerRef });

  // 2. Mouse 3D Tilt
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging.current || !badgeRef.current) return;
    
    const rect = badgeRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10; // max 10 deg
    const rotateY = ((x - centerX) / centerX) * 10;

    if (rotationTween.current) rotationTween.current.kill();
    
    gsap.to(badgeRef.current, {
      rotateX,
      rotateY,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    if (isDragging.current || !badgeRef.current) return;

    if (rotationTween.current) rotationTween.current.kill();

    gsap.to(badgeRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.8,
      ease: "elastic.out(1, 0.5)",
    });

    // Subtly swing when mouse leaves fast
    gsap.to(badgeRef.current, {
      rotationZ: (Math.random() - 0.5) * 8, // slight swing
      duration: 0.3,
      ease: "power2.out",
      onComplete: () => {
        gsap.to(badgeRef.current, {
          rotationZ: 0,
          duration: 1.5,
          ease: "elastic.out(1, 0.3)",
        });
      }
    });
  };

  const handleMouseEnter = () => {
     // Reflection pass
     const reflection = badgeRef.current?.querySelector(".glass-reflection");
     if (reflection) {
       gsap.fromTo(
         reflection,
         { x: "-100%", opacity: 0 },
         { x: "200%", opacity: 0.2, duration: 1, ease: "power2.inOut" }
       );
     }
  };

  // 3. Drag & Pull interaction
  const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    isDragging.current = true;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
    startY.current = clientY - currentY.current;
    
    // Stop any ongoing container tweens
    gsap.killTweensOf(containerRef.current);
    
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
    document.addEventListener("touchmove", onMouseMove);
    document.addEventListener("touchend", onMouseUp);
  };

  const onMouseMove = (e: MouseEvent | TouchEvent) => {
    if (!isDragging.current) return;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
    
    let newY = clientY - startY.current;
    
    // Constrain pulling (only pull down, max 120px)
    if (newY < 0) newY = 0;
    if (newY > 120) newY = 120 + (newY - 120) * 0.2; // adding friction when stretched

    currentY.current = newY;
    gsap.set(containerRef.current, { y: currentY.current });
  };

  const onMouseUp = () => {
    isDragging.current = false;
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
    document.removeEventListener("touchmove", onMouseMove);
    document.removeEventListener("touchend", onMouseUp);

    // Snap back
    currentY.current = 0;
    gsap.to(containerRef.current, {
      y: 0,
      duration: 1.5,
      ease: "elastic.out(1, 0.4)",
    });

    // Swing effect on snap release
    if (badgeRef.current) {
      gsap.fromTo(
        badgeRef.current,
        { rotationZ: (Math.random() - 0.5) * 15 },
        {
          rotationZ: 0,
          duration: 2,
          ease: "elastic.out(1, 0.3)",
        }
      );
    }
  };

  // 4. Flip Interaction
  const toggleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  useEffect(() => {
    if (badgeRef.current) {
      const inner = badgeRef.current.querySelector(".badge-inner");
      if (inner) {
        gsap.to(inner, {
          rotateY: isFlipped ? 180 : 0,
          duration: 0.8,
          ease: "power3.inOut",
        });
      }
    }
  }, [isFlipped]);

  return (
    <div 
      ref={containerRef} 
      className="relative flex flex-col items-center justify-start h-[600px] w-full max-w-[340px] will-change-transform"
      style={{ perspective: "1500px" }}
    >
      {/* Lanyard Strap */}
      <div className="relative flex justify-center -mt-96 h-96 w-6 z-10 pointer-events-none">
        <div className="absolute w-full h-full bg-[#111] border-x border-white/10 overflow-hidden flex flex-col justify-end pb-8">
           {/* Hardware Clip */}
           <div className="absolute bottom-[-2px] left-1/2 -translate-x-1/2 w-4 h-6 bg-zinc-400 rounded-b-sm shadow-inner" />
           <div className="absolute bottom-[-14px] left-1/2 -translate-x-1/2 w-3 h-4 border-2 border-zinc-400 rounded-full" />
           
           {/* Repeating Text */}
           <div className="text-[8px] font-bold tracking-[0.2em] text-white/30 whitespace-nowrap -rotate-90 pb-4 origin-bottom translate-y-[200px]">
             RIDHO MAULANA • FULLSTACK DEVELOPER • RIDHO MAULANA • FULLSTACK DEVELOPER
           </div>
        </div>
      </div>

      {/* Interactive Badge Wrapper */}
      <div 
        className="relative z-20 mt-3 cursor-grab active:cursor-grabbing w-[300px] h-[440px] group transform-origin-top"
        ref={badgeRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown}
        onDoubleClick={toggleFlip}
      >
        {/* Soft radial glow behind badge */}
        <div className="absolute inset-0 bg-accent/20 blur-3xl rounded-full scale-90 -z-10 opacity-40 transition-opacity duration-300 group-hover:opacity-70 pointer-events-none" />

        <div 
          className="badge-inner relative w-full h-full will-change-transform transition-transform duration-300 group-hover:scale-[1.01]"
          style={{ transformStyle: "preserve-3d" }}
        >
          
          {/* FRONT SIDE */}
          <div 
            className="absolute inset-0 bg-[#0a0a0a] border border-white/10 rounded-[32px] overflow-hidden flex flex-col shadow-2xl"
            style={{ backfaceVisibility: "hidden" }}
          >
            {/* Glass reflection div */}
            <div className="glass-reflection absolute inset-0 z-50 w-full bg-linear-to-r from-transparent via-white/10 to-transparent skew-x-[-25deg] mix-blend-overlay opacity-0 pointer-events-none" />
            
            {/* Badge Header (Attachment point) */}
            <div className="h-32 w-full bg-[#111] relative border-b border-white/5 flex items-start justify-center pt-3">
              <div className="w-16 h-1.5 bg-black/60 rounded-full inset-shadow-sm border border-white/5" />
            </div>

            {/* Profile Photo */}
            <div className="flex justify-center -mt-14 z-10 relative pointer-events-none">
               <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-[#0a0a0a] bg-surface relative shadow-xl">
                 <Image src="/profile1.png" alt="Ridho Maulana" fill className="object-cover" />
               </div>
            </div>

            {/* Badge Content */}
            <div className="flex-1 flex flex-col items-center pt-5 px-6 pb-6 text-center select-none">
              <h2 className="text-2xl font-bold font-(family-name:--font-geist) text-white tracking-tight">RIDHO MAULANA</h2>
              <p className="text-accent font-semibold text-[11px] mt-1.5 tracking-widest uppercase">Fullstack Developer</p>
              
              <div className="mt-5 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] tracking-wider uppercase font-semibold rounded-full flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                Available for Work
              </div>

              <div className="mt-auto w-full flex items-end justify-between">
                <div className="text-left">
                  <p className="text-[9px] text-white/40 font-mono tracking-wider mb-1">ID NUMBER</p>
                  <p className="text-xs font-mono font-medium text-white/80 tracking-widest">DEV-2026</p>
                </div>
                
                <div className="flex flex-col items-end gap-2">
                  <SmartphoneNfc className="w-4 h-4 text-white/30" />
                  <div className="w-10 h-10 bg-white/5 rounded-md p-1 border border-white/10 flex items-center justify-center">
                    <div className="w-full h-full border border-white/20 border-dashed opacity-50 text-[6px] flex items-center justify-center text-center leading-none">QR</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Hint to flip */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[8px] text-white/20 uppercase tracking-widest pointer-events-none">
              Double Click to Flip
            </div>
          </div>

          {/* BACK SIDE */}
          <div 
            className="absolute inset-0 bg-[#0a0a0a] border border-white/10 rounded-[32px] overflow-hidden flex flex-col shadow-2xl p-6"
            style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
          >
            <div className="w-full h-full border border-white/5 rounded-2xl p-5 flex flex-col relative bg-[#111]">
              <h3 className="text-[10px] font-semibold text-white/80 uppercase tracking-widest mb-4 border-b border-white/10 pb-3 text-center">About Me</h3>
              
              <div className="flex flex-wrap gap-2 justify-center mb-6">
                <span className="px-2 py-1.5 bg-white/5 text-[10px] font-medium text-white/70 rounded-md border border-white/10 flex items-center gap-1.5"><SiLaravel className="text-[#FF2D20]" /> Laravel</span>
                <span className="px-2 py-1.5 bg-white/5 text-[10px] font-medium text-white/70 rounded-md border border-white/10 flex items-center gap-1.5"><SiNextdotjs /> Next.js</span>
                <span className="px-2 py-1.5 bg-white/5 text-[10px] font-medium text-white/70 rounded-md border border-white/10 flex items-center gap-1.5"><SiReact className="text-[#61DAFB]" /> React</span>
                <span className="px-2 py-1.5 bg-white/5 text-[10px] font-medium text-white/70 rounded-md border border-white/10 flex items-center gap-1.5"><SiTailwindcss className="text-[#06B6D4]" /> Tailwind</span>
              </div>

              <div className="flex-1" />

              <div className="flex flex-col gap-3 px-2">
                <a href="#" className="flex items-center gap-3 text-xs text-white/60 hover:text-white transition-colors"><SiGithub className="w-4 h-4"/> GitHub</a>
                <a href="#" className="flex items-center gap-3 text-xs text-white/60 hover:text-white transition-colors"><SiLinkerd className="w-4 h-4 text-[#0A66C2]"/> LinkedIn</a>
                <a href="#" className="flex items-center gap-3 text-xs text-white/60 hover:text-white transition-colors"><Mail className="w-4 h-4"/> Contact</a>
              </div>
            </div>
            
            <button 
              onClick={(e) => { e.stopPropagation(); toggleFlip(); }} 
              className="absolute bottom-2.5 left-1/2 -translate-x-1/2 text-[8px] font-semibold text-white/40 hover:text-white transition-colors tracking-widest uppercase"
            >
              Flip Back
            </button>
          </div>
          
        </div>
      </div>
    </div>
  );
}
