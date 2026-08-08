"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import { SiGithub } from "react-icons/si";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export type Project = {
  title: string;
  description: string;
  image: string;
  year: string;
  tags: string[];
  contribution: string;
  challenge: string;
  demoUrl: string | null;
  repoUrl: string | null;
};

interface ProjectStackProps {
  projects: Project[];
}

export default function ProjectStack({ projects }: ProjectStackProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLElement | null)[]>([]);
  const activeIndexRef = useRef(0);
  const isAnimatingRef = useRef(false);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Background colors corresponding to projects
  const bgColors = [
    "rgba(147, 51, 234, 0.05)", // Purple
    "rgba(59, 130, 246, 0.05)", // Blue
    "rgba(6, 182, 212, 0.05)",  // Cyan
  ];

  // Arrange cards in the 3D stack
  const arrangeCards = (animated = true, duration = 0.6) => {
    const total = projects.length;
    const activeIndex = activeIndexRef.current;

    cardsRef.current.forEach((card, i) => {
      if (!card) return;

      // Calculate relative index in the stack
      // 0 means active (front), 1 means just behind, 2 means behind that, etc.
      let relativeIndex = i - activeIndex;
      if (relativeIndex < 0) {
        relativeIndex += total;
      }

      const isFront = relativeIndex === 0;

      // Stack offsets
      const scale = isFront ? 1 : Math.max(0, 1 - relativeIndex * 0.03);
      const y = isFront ? 0 : relativeIndex * 20;
      const zIndex = total - relativeIndex;

      // Content elements inside the card
      const contentElements = card.querySelectorAll(".project-content-stagger");

      if (animated) {
        gsap.to(card, {
          y,
          scale,
          zIndex,
          duration,
          ease: "power3.out",
        });

        if (isFront) {
          // Animate content of the new front card
          gsap.fromTo(
            contentElements,
            { y: 20, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.5,
              stagger: 0.1,
              ease: "power2.out",
              delay: 0.2, // Wait a bit for the card to settle
            }
          );
        } else {
          // Fade down content for background cards
          gsap.to(contentElements, {
            opacity: 0,
            y: 10,
            duration: 0.3,
            ease: "power2.inOut",
          });
        }
      } else {
        gsap.set(card, { y, scale, zIndex });
        if (isFront) {
          gsap.set(contentElements, { y: 0, opacity: 1 });
        } else {
          gsap.set(contentElements, { opacity: 0, y: 10 });
        }
      }
    });

    // Update background color
    if (backgroundRef.current) {
      gsap.to(backgroundRef.current, {
        backgroundColor: bgColors[activeIndex % bgColors.length],
        duration: 0.8,
        ease: "power2.inOut",
      });
    }
  };

  useGSAP(() => {
    // Initial arrangement
    arrangeCards(false);

    // ScrollTrigger to animate the initial entrance
    if (containerRef.current) {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top 70%",
        onEnter: () => {
          gsap.from(cardsRef.current, {
            y: 100,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
          });
        },
        once: true,
      });
    }
  }, { scope: containerRef });

  const nextCard = useCallback(() => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;
    if (!hasInteracted) setHasInteracted(true);

    const currentActive = cardsRef.current[activeIndexRef.current];
    if (!currentActive) {
        isAnimatingRef.current = false;
        return;
    }

    // Step 1: Animate the active card sliding down and back
    const tl = gsap.timeline({
      onComplete: () => {
        // Step 2: Update active index and arrange the rest
        activeIndexRef.current = (activeIndexRef.current + 1) % projects.length;
        setActiveIndex(activeIndexRef.current);
        arrangeCards(true, 0.6);
        
        // Reset the z-index of the old card immediately so it pops to the back cleanly
        gsap.set(currentActive, { zIndex: 0 });

        setTimeout(() => {
          isAnimatingRef.current = false;
        }, 600);
      },
    });

    // Subtly fade out the text of the active card before it moves
    const contentElements = currentActive.querySelectorAll(".project-content-stagger");
    tl.to(contentElements, {
      opacity: 0,
      y: 10,
      duration: 0.2,
      ease: "power2.in",
    }, 0);

    // The physical card animation
    tl.to(
      currentActive,
      {
        y: 100, // Move downward
        scale: 0.85,
        rotationZ: 2 + Math.random() * 2, // Rotate 2-4 degrees
        duration: 0.4,
        ease: "power2.in",
      },
      0
    );
  }, [hasInteracted, projects.length]);

  const prevCard = useCallback(() => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;
    if (!hasInteracted) setHasInteracted(true);

    // To go previous, the LAST card in the stack comes forward
    const total = projects.length;
    activeIndexRef.current = (activeIndexRef.current - 1 + total) % total;
    setActiveIndex(activeIndexRef.current);
    
    const newActive = cardsRef.current[activeIndexRef.current];
    if (!newActive) {
        isAnimatingRef.current = false;
        return;
    }

    // Prepare the new card from the back (bottom)
    gsap.set(newActive, {
      y: 100,
      scale: 0.85,
      rotationZ: -(2 + Math.random() * 2),
      zIndex: total + 1, // Bring to front visually
    });

    arrangeCards(true, 0.6);

    setTimeout(() => {
      isAnimatingRef.current = false;
    }, 600);
  }, [hasInteracted, projects.length]);

  // Navigate to specific card by index
  const goToCard = useCallback((targetIndex: number) => {
    if (isAnimatingRef.current || targetIndex === activeIndexRef.current) return;
    if (targetIndex > activeIndexRef.current) {
      nextCard();
    } else {
      prevCard();
    }
  }, [nextCard, prevCard]);

  // Keyboard accessibility
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ensure we are somewhat in view before stealing keys, or just let arrow keys work globally if requested
      if (e.key === "ArrowRight" || e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        nextCard();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        prevCard();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Mouse Interaction (Tilt & Reflection)
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>, index: number) => {
    // Only apply to active card
    if (index !== activeIndexRef.current) return;
    
    const card = cardsRef.current[index];
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -5; // max 5 deg
    const rotateY = ((x - centerX) / centerX) * 5; // max 5 deg

    gsap.to(card, {
      rotateX,
      rotateY,
      transformPerspective: 1000,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = (index: number) => {
    if (index !== activeIndexRef.current) return;
    
    const card = cardsRef.current[index];
    if (!card) return;

    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.6,
      ease: "power2.out",
    });
  };

  const handleMouseEnter = (index: number) => {
    if (index !== activeIndexRef.current) return;
    
    const card = cardsRef.current[index];
    if (!card) return;

    const reflection = card.querySelector(".glass-reflection");
    if (reflection) {
      gsap.fromTo(
        reflection,
        { x: "-100%", opacity: 0 },
        {
          x: "200%",
          opacity: 0.3,
          duration: 1.2,
          ease: "power2.inOut",
        }
      );
    }
  };

  return (
    <div 
      className="relative w-full py-10 md:py-20 overflow-hidden flex items-center justify-center min-h-[800px] perspective-1000" 
      ref={containerRef}
    >
      {/* Dynamic Background */}
      <div 
        ref={backgroundRef}
        className="absolute inset-0 z-0 radial-gradient-bg opacity-30 transition-colors duration-700 pointer-events-none"
        style={{
          background: "radial-gradient(circle at center, currentColor 0%, transparent 70%)"
        }}
      />

      {/* Stack Container */}
      <div className="relative w-full max-w-5xl mx-auto px-4 z-10 h-full flex items-center justify-center">
        {projects.map((project, idx) => (
          <article
            key={project.title}
            ref={(el) => {
                cardsRef.current[idx] = el;
            }}
            onClick={() => nextCard()}
            onMouseMove={(e) => handleMouseMove(e, idx)}
            onMouseLeave={() => handleMouseLeave(idx)}
            onMouseEnter={() => handleMouseEnter(idx)}
            className="anime-card absolute w-full max-w-[1000px] bg-surface border border-border rounded-(--radius) shadow-2xl p-6 md:p-8 cursor-pointer transform-origin-center will-change-transform"
            style={{ backfaceVisibility: "hidden" }}
          >
            {/* Glass Reflection Layer */}
            <div className="glass-reflection absolute inset-0 z-50 w-1/2 bg-linear-to-r from-transparent via-white to-transparent skew-x-[-25deg] mix-blend-overlay opacity-0 pointer-events-none" />

            <div className="grid gap-8 md:grid-cols-[1.5fr_1fr] md:gap-12 pointer-events-none">
              {/* Project Image */}
              <div className="relative w-full aspect-video md:aspect-[2.2/1] overflow-hidden rounded-md bg-surface border border-border shadow-(--shadow-sm)">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Project Content */}
              <div className="flex flex-col justify-center">
                <div className="project-content-stagger flex items-center gap-3 mb-4">
                  <span className="text-accent text-sm font-semibold">
                    {project.year}
                  </span>
                  <span className="w-px h-4 bg-border" />
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-semibold text-text-secondary bg-surface border border-border px-3 py-1 rounded-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <h3 className="project-content-stagger font-(family-name:--font-geist) text-2xl md:text-3xl font-semibold mb-3 transition-colors duration-200">
                  {project.title}
                </h3>
                <p className="project-content-stagger text-text-secondary leading-relaxed mb-6">
                  {project.description}
                </p>

                {/* Contribution & Challenge */}
                <div className="project-content-stagger space-y-4 mb-6">
                  <div>
                    <p className="text-xs font-semibold tracking-widest uppercase text-text-secondary mb-1">
                      Contribution
                    </p>
                    <p className="text-sm text-text-secondary leading-relaxed">
                      {project.contribution}
                    </p>
                  </div>
                  {project.challenge && (
                    <div>
                      <p className="text-xs font-semibold tracking-widest uppercase text-text-secondary mb-1">
                        Challenge
                      </p>
                      <p className="text-sm text-text-secondary leading-relaxed">
                        {project.challenge}
                      </p>
                    </div>
                  )}
                </div>

                {/* Links */}
                <div className="project-content-stagger flex items-center gap-4 mt-auto pointer-events-auto">
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="anime-button inline-flex items-center gap-2 text-sm font-semibold text-accent hover:underline underline-offset-4"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Live Demo
                    </a>
                  )}
                  {project.repoUrl && (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-text-secondary hover:text-text-primary transition-colors duration-200"
                    >
                      <SiGithub className="w-4 h-4" />
                      Repository
                    </a>
                  )}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={(e) => { e.stopPropagation(); prevCard(); }}
        className="hidden md:flex absolute left-2 lg:left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 items-center justify-center rounded-full bg-surface/80 dark:bg-surface/60 backdrop-blur-sm border border-border shadow-lg hover:bg-surface hover:scale-110 active:scale-95 transition-all duration-200 text-text-secondary hover:text-text-primary"
        aria-label="Previous project"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); nextCard(); }}
        className="hidden md:flex absolute right-2 lg:right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 items-center justify-center rounded-full bg-surface/80 dark:bg-surface/60 backdrop-blur-sm border border-border shadow-lg hover:bg-surface hover:scale-110 active:scale-95 transition-all duration-200 text-text-secondary hover:text-text-primary"
        aria-label="Next project"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Pagination Indicator */}
      <div className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3">
        <div className="flex items-center gap-4">
          {/* Dots */}
          <div className="flex items-center gap-2">
            {projects.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToCard(idx)}
                aria-label={`Go to project ${idx + 1}`}
                className={`rounded-full transition-all duration-300 ${
                  idx === activeIndex
                    ? "w-6 h-2 bg-accent shadow-[0_0_8px_rgba(139,92,246,0.5)]"
                    : "w-2 h-2 bg-text-secondary/30 hover:bg-text-secondary/60"
                }`}
              />
            ))}
          </div>
          {/* Counter */}
          <span className="text-xs font-semibold text-text-secondary tabular-nums">
            {activeIndex + 1} / {projects.length}
          </span>
        </div>

        {/* Interaction Hint */}
        <p
          className={`text-xs text-text-secondary/60 transition-opacity duration-700 ${
            hasInteracted ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        >
          Click card or use ← → arrow keys
        </p>
      </div>
    </div>
  );
}
