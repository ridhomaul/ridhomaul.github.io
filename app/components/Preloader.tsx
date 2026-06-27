"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const container = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  // Disable scroll while preloading
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  useGSAP(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = "auto";
        onComplete();
      }
    });

    // 1. Counter animation
    tl.to({ value: 0 }, {
      value: 100,
      duration: 2.2,
      onUpdate: function () {
        setProgress(Math.round(this.targets()[0].value));
      },
      ease: "power3.inOut"
    }, 0);

    // 2. Text stagger reveal
    const chars = textRef.current?.children;
    if (chars) {
      tl.fromTo(chars,
        { opacity: 0, y: 50, rotateX: -90 },
        { opacity: 1, y: 0, rotateX: 0, duration: 0.8, stagger: 0.08, ease: "back.out(1.7)" },
        "-=1.8"
      );
    }

    // 3. Squeeze text
    if (chars) {
      tl.to(chars, {
        letterSpacing: "0.1em",
        duration: 1,
        ease: "power2.inOut"
      }, "-=0.5");
    }

    // 4. Slide up the container
    tl.to(container.current, {
      yPercent: -100,
      duration: 1.2,
      ease: "power4.inOut",
      delay: 0.2
    });

  }, { scope: container });

  const introText = "RIDHOMAULANA";

  return (
    <div 
      ref={container}
      className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-[#0a0a0a] text-white"
    >
      {/* Background ambient glow */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/15 via-[#0a0a0a] to-[#0a0a0a]"></div>
      
      <div className="relative z-10 flex flex-col items-center gap-12">
        {/* Animated Text */}
        <div 
          ref={textRef} 
          className="flex text-3xl md:text-5xl lg:text-7xl font-heading tracking-[0.3em] font-medium uppercase overflow-hidden"
          style={{ perspective: "1000px" }}
        >
          {introText.split("").map((char, index) => (
            <span 
              key={index} 
              className="inline-block transform-style-3d origin-bottom"
            >
              {char}
            </span>
          ))}
        </div>

        {/* Loading Counter */}
        <div className="flex items-center gap-6">
          <div className="w-48 md:w-64 h-[2px] bg-white/10 relative overflow-hidden rounded-full">
            <div 
              className="absolute inset-y-0 left-0 bg-linear-to-r from-purple-500 to-blue-500 rounded-full" 
              style={{ width: `${progress}%`, transition: 'width 0.05s linear' }}
            />
          </div>
          <div ref={counterRef} className="font-sans text-xs md:text-sm font-bold tracking-widest tabular-nums w-12 text-right opacity-80">
            {progress}%
          </div>
        </div>
      </div>
    </div>
  );
}
