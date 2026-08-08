"use client";

import React, { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink } from "lucide-react";
import { SiGithub } from "react-icons/si";

// Redefining Project type since we'll delete ProjectStack.tsx
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

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

interface BentoProjectsProps {
  projects: Project[];
}

export default function BentoProjects({ projects }: BentoProjectsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLElement | null)[]>([]);

  useGSAP(() => {
    if (containerRef.current) {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top 75%",
        onEnter: () => {
          gsap.fromTo(
            cardsRef.current,
            { y: 50, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              stagger: 0.2,
              ease: "power3.out",
            }
          );
        },
        once: true,
      });
    }
  }, { scope: containerRef });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>, index: number) => {
    const card = cardsRef.current[index];
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -3;
    const rotateY = ((x - centerX) / centerX) * 3;

    gsap.to(card, {
      rotateX,
      rotateY,
      transformPerspective: 1000,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = (index: number) => {
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
    const card = cardsRef.current[index];
    if (!card) return;

    const reflection = card.querySelector(".glass-reflection");
    if (reflection) {
      gsap.fromTo(
        reflection,
        { x: "-100%", opacity: 0 },
        {
          x: "200%",
          opacity: 0.15,
          duration: 1.2,
          ease: "power2.inOut",
        }
      );
    }
  };

  return (
    <div ref={containerRef} className="w-full relative z-10 perspective-1000 my-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 auto-rows-min">
        {projects.map((project, idx) => {
          const isLarge = idx === 0;
          
          return (
            <article
              key={project.title}
              ref={(el) => { cardsRef.current[idx] = el; }}
              onMouseMove={(e) => handleMouseMove(e, idx)}
              onMouseLeave={() => handleMouseLeave(idx)}
              onMouseEnter={() => handleMouseEnter(idx)}
              className={`anime-card group relative bg-surface border border-border rounded-(--radius) p-6 overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-accent/40 transform-origin-center will-change-transform ${
                isLarge ? "md:col-span-2 md:p-8" : ""
              }`}
              style={{ backfaceVisibility: "hidden", opacity: 0 }} // Start hidden for GSAP
            >
              {/* Glass Reflection Layer */}
              <div className="glass-reflection absolute inset-0 z-50 w-1/2 bg-linear-to-r from-transparent via-white to-transparent skew-x-[-25deg] mix-blend-overlay opacity-0 pointer-events-none" />
              
              <div className={`grid gap-6 ${isLarge ? "md:grid-cols-[1.2fr_1fr] md:gap-10 items-center" : "grid-rows-[auto_1fr]"}`}>
                {/* Image Section */}
                <div className={`relative w-full overflow-hidden rounded-md bg-surface border border-border shadow-(--shadow-sm) ${
                  isLarge ? "aspect-video md:aspect-[16/10]" : "aspect-[16/10]"
                }`}>
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Subtle overlay on image */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                </div>

                {/* Content Section */}
                <div className="flex flex-col h-full justify-center">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-text-primary text-sm font-semibold tracking-wide">
                      {project.year}
                    </span>
                    <span className="w-px h-4 bg-border" />
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-semibold text-text-secondary bg-surface border border-border px-2.5 py-0.5 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <h3 className="font-(family-name:--font-geist) text-2xl md:text-3xl font-semibold mb-3 group-hover:text-accent transition-colors duration-300">
                    {project.title}
                  </h3>
                  
                  <p className={`text-text-secondary leading-relaxed mb-6 ${isLarge ? "text-base" : "text-sm line-clamp-3"}`}>
                    {project.description}
                  </p>

                  {/* Contribution & Challenge - Show more info on large card */}
                  <div className="space-y-4 mb-8 mt-auto">
                    <div>
                      <p className="text-[10px] font-semibold tracking-widest uppercase text-text-secondary mb-1">
                        Contribution
                      </p>
                      <p className={`text-text-primary/80 leading-relaxed ${isLarge ? "text-sm" : "text-xs line-clamp-2"}`}>
                        {project.contribution}
                      </p>
                    </div>
                    {isLarge && project.challenge && (
                      <div>
                        <p className="text-[10px] font-semibold tracking-widest uppercase text-text-secondary mb-1">
                          Challenge
                        </p>
                        <p className="text-sm text-text-primary/80 leading-relaxed">
                          {project.challenge}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Links */}
                  <div className="flex items-center gap-4 mt-auto pt-4 border-t border-border/50">
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-text-primary hover:text-accent transition-colors duration-200"
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
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-text-secondary hover:text-text-primary transition-colors duration-200"
                      >
                        <SiGithub className="w-4 h-4" />
                        Repository
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
