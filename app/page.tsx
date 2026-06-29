"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  SiLaravel, SiPhp, SiPostgresql, SiMysql, SiDocker,
  SiTypescript, SiNextdotjs, SiReact, SiTailwindcss, SiGreensock,
  SiPython, SiFigma, SiCanva, SiInstagram, SiWhatsapp, SiGithub, SiLinkerd
} from "react-icons/si";
import { Video, Camera, ExternalLink, ArrowUpRight } from "lucide-react";
import Preloader from "./components/Preloader";

// Anime.js Micro-Interaction Hooks
import { useButtonInteraction } from "./hooks/useButtonInteraction";
import { useCardInteraction } from "./hooks/useCardInteraction";
import { useCursorReflection } from "./hooks/useCursorReflection";

// Register ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

// ===== DATA =====

const projects = [
  {
    title: "Milenner Platform",
    description:
      "Platform manajemen konten tim media sosial berbasis web dengan fitur Kanban board, multi-tenancy, dan performa tinggi.",
    image: "/project1.png",
    year: "2026",
    tags: ["Laravel 12", "PHP 8.4", "PostgreSQL", "Kanban"],
    contribution:
      "Merancang arsitektur sistem dari nol, membangun fitur Kanban board real-time, dan mengimplementasikan sistem multi-tenancy.",
    challenge:
      "Mengelola state management yang kompleks untuk Kanban board dengan drag-and-drop antar kolom secara real-time.",
    demoUrl: "#",
    repoUrl: "#",
  },
  {
    title: "MileniaNews Content Production",
    description:
      "Perencanaan, penyuntingan, dan produksi lebih dari 600 konten media digital dengan strategi distribusi yang terukur.",
    image: "/project-monitoring.svg",
    year: "2024 – 2026",
    tags: ["Content Planning", "Video Editing", "Media Strategy"],
    contribution:
      "Memimpin tim konten, menyusun editorial calendar, dan mengeksekusi produksi video dari pre-production hingga distribusi.",
    challenge:
      "Menjaga konsistensi output harian dengan tim kecil sambil mempertahankan kualitas konten yang tinggi.",
    demoUrl: null,
    repoUrl: null,
  },
  {
    title: "Personal Portfolio v2",
    description:
      "Desain portofolio personal dengan pendekatan minimalis, performa optimal, dan animasi interaktif menggunakan GSAP & Anime.js.",
    image: "/project-cloud.svg",
    year: "2026",
    tags: ["Next.js 14", "Tailwind v4", "GSAP", "Anime.js"],
    contribution:
      "Membangun seluruh frontend dari desain hingga deployment, termasuk design system dan micro-interactions.",
    challenge:
      "Menciptakan animasi yang halus tanpa mengorbankan performa Lighthouse di atas 90.",
    demoUrl: "#",
    repoUrl: "https://github.com/ridhomaul",
  },
];

const experiences = [
  {
    title: "Full-Stack Developer & Researcher",
    place: "MileniaNews & Universitas Bina Sarana Informatika",
    period: "2026",
    details: [
      "Merancang aplikasi manajemen proyek media sosial menggunakan Metode Waterfall.",
      "Mengembangkan arsitektur backend kokoh dengan integrasi database relasional.",
    ],
  },
  {
    title: "Digital Media Specialist (Intern)",
    place: "MileniaNews",
    period: "2024 – Present",
    details: [
      "Bertanggung jawab sebagai Content Planner, Editor, dan Camera Person.",
      "Berhasil memproduksi dan mendistribusikan lebih dari 2000 konten digital.",
    ],
  },
  {
    title: "IT Support",
    place: "Gedung Bidakara, Jakarta",
    period: "2022",
    details: [
      "Instalasi, konfigurasi, dan pemeliharaan perangkat karyawan.",
      "Instalasi Sistem Operasi dan perangkat lunak sesuai standar perusahaan.",
    ],
  },
  {
    title: "Encryption Data Rekam Medis",
    place: "Universitas Bina Sarana Informatika",
    period: "2025",
    details: [
      "Mengimplementasikan sistem enkripsi untuk keamanan data medis pada platform web.",
    ],
  },
];

const techStack = {
  Frontend: [
    { name: "React", Icon: SiReact, color: "#61DAFB" },
    { name: "Next.js", Icon: SiNextdotjs, color: "" },
    { name: "TypeScript", Icon: SiTypescript, color: "#3178C6" },
    { name: "Tailwind CSS", Icon: SiTailwindcss, color: "#06B6D4" },
    { name: "GSAP", Icon: SiGreensock, color: "#88CE02" },
  ],
  Backend: [
    { name: "PHP", Icon: SiPhp, color: "#777BB4" },
    { name: "Laravel", Icon: SiLaravel, color: "#FF2D20" },
    { name: "Python", Icon: SiPython, color: "#3776AB" },
  ],
  Database: [
    { name: "PostgreSQL", Icon: SiPostgresql, color: "#4169E1" },
    { name: "MySQL", Icon: SiMysql, color: "#4479A1" },
  ],
  Tools: [
    { name: "Docker", Icon: SiDocker, color: "#2496ED" },
    { name: "Figma", Icon: SiFigma, color: "#F24E1E" },
    { name: "Canva", Icon: SiCanva, color: "#00C4CC" },
    { name: "Video Editing", Icon: Video, color: "#EF4444" },
    { name: "Camera Person", Icon: Camera, color: "#737373" },
  ],
};

const socialLinks = [
  { href: "https://www.instagram.com/maulani.sudjatmiko", icon: SiInstagram, label: "Instagram" },
  { href: "https://www.linkedin.com/in/ridho-maulana-073aaa386/", icon: SiLinkerd, label: "LinkedIn" },
  { href: "https://wa.me/629818775467", icon: SiWhatsapp, label: "WhatsApp" },
  { href: "https://github.com/ridhomaul", icon: SiGithub, label: "GitHub" },
];

// ===== COMPONENT =====

export default function Home() {
  const [introFinished, setIntroFinished] = useState(false);
  const container = useRef<HTMLDivElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setReducedMotion(mediaQuery.matches);

    const listener = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener("change", listener);
    return () => mediaQuery.removeEventListener("change", listener);
  }, []);

  // Anime.js Micro-Interactions
  useButtonInteraction(reducedMotion);
  useCardInteraction(reducedMotion);
  useCursorReflection(reducedMotion);

  // ===== GSAP ANIMATIONS =====
  useGSAP(
    () => {
      if (!introFinished) return;

      // Hero Reveal
      const heroTl = gsap.timeline({ defaults: { ease: "power3.out", duration: 0.5 } });
      heroTl
        .fromTo(".hero-tag", { opacity: 0, y: 20 }, { opacity: 1, y: 0 })
        .fromTo(".hero-title", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6 }, "-=0.3")
        .fromTo(".hero-desc", { opacity: 0, y: 20 }, { opacity: 1, y: 0 }, "-=0.3")
        .fromTo(".hero-cta", { opacity: 0, y: 20 }, { opacity: 1, y: 0 }, "-=0.2")
        .fromTo(".hero-social", { opacity: 0 }, { opacity: 1, duration: 0.4 }, "-=0.1");

      // Scroll Progress Bar
      gsap.to(".scroll-progress-bar", {
        scaleX: 1,
        ease: "none",
        scrollTrigger: { scrub: 0.1, start: "top top", end: "bottom bottom" },
      });

      // Generic Section Reveal
      const sections = gsap.utils.toArray(".reveal-section") as HTMLElement[];
      sections.forEach((sec) => {
        gsap.fromTo(
          sec,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power3.out",
            scrollTrigger: { trigger: sec, start: "top 85%", toggleActions: "play none none reverse" },
          }
        );
      });

      // Project Cards Stagger
      gsap.fromTo(
        ".project-card",
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: { trigger: ".projects-container", start: "top 80%" },
        }
      );

      // Tech Stack Items Stagger
      gsap.fromTo(
        ".tech-item",
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.3,
          stagger: 0.05,
          ease: "power2.out",
          scrollTrigger: { trigger: ".tech-container", start: "top 85%" },
        }
      );

      // Experience Timeline Draw
      gsap.fromTo(
        ".timeline-line",
        { height: 0 },
        {
          height: "100%",
          ease: "none",
          scrollTrigger: {
            trigger: ".experience-container",
            start: "top center",
            end: "bottom center",
            scrub: true,
          },
        }
      );

      // Experience Items Fade
      const expItems = gsap.utils.toArray(".exp-item") as HTMLElement[];
      expItems.forEach((item) => {
        gsap.fromTo(
          item,
          { opacity: 0, x: -20 },
          {
            opacity: 1,
            x: 0,
            duration: 0.3,
            ease: "power2.out",
            scrollTrigger: { trigger: item, start: "top 85%" },
          }
        );
      });

      // Contact Fade
      gsap.fromTo(
        "#contact > div",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: { trigger: "#contact", start: "top 85%" },
        }
      );
    },
    { scope: container, dependencies: [introFinished] }
  );

  return (
    <>
      {!introFinished && <Preloader onComplete={() => setIntroFinished(true)} />}

      {/* Scroll Progress */}
      <div className="scroll-progress-bar fixed top-0 left-0 h-[2px] bg-[var(--color-accent)] z-[9999] origin-left scale-x-0 pointer-events-none" />

      <div id="home" className="overflow-clip relative w-full" ref={container}>
        <main>
          {/* ===== HERO SECTION ===== */}
          <section className="relative w-full min-h-screen flex items-center">
            <div className="mx-auto w-full max-w-[1200px] px-6 md:px-12 pt-32 pb-24 lg:pt-40">
              <div className="max-w-3xl">
                <p className="hero-tag text-[var(--color-accent)] text-sm font-semibold tracking-widest uppercase mb-6">
                  Full-Stack Developer & Media Specialist
                </p>
                <h1 className="hero-title font-[family-name:var(--font-geist)] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold leading-[1.1] tracking-tight mb-6">
                  Building clean, scalable
                  <br />
                  web solutions.
                </h1>
                <p className="hero-desc text-[var(--color-text-secondary)] text-lg md:text-xl leading-relaxed max-w-xl mb-10">
                  Focused on developing robust applications and managing high-impact digital media strategies that connect systems with people.
                </p>

                <div className="hero-cta flex flex-wrap items-center gap-4 mb-12">
                  <a
                    href="/CV-Ridho-Maulana.pdf"
                    download="CV-Ridho-Maulana.pdf"
                    className="anime-button group relative inline-flex items-center justify-center rounded-[var(--radius)] bg-[var(--color-text-primary)] px-8 py-3.5 text-sm font-semibold tracking-wide text-[var(--color-bg)] transition-all duration-200 hover:opacity-90 overflow-hidden"
                  >
                    <span className="relative z-10">Download CV</span>
                  </a>
                  <a
                    href="#contact"
                    className="anime-button inline-flex items-center justify-center rounded-[var(--radius)] border border-[var(--color-border)] px-8 py-3.5 text-sm font-semibold tracking-wide transition-all duration-200 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
                  >
                    Get in Touch
                  </a>
                </div>

                <div className="hero-social flex items-center gap-5">
                  {socialLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={link.label}
                      className="text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors duration-200"
                    >
                      <link.icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ===== FEATURED PROJECTS ===== */}
          <section id="projects" className="py-24 md:py-32">
            <div className="projects-container mx-auto max-w-[1200px] px-6 md:px-12">
              <div className="reveal-section mb-16">
                <p className="text-[var(--color-accent)] text-sm font-semibold tracking-widest uppercase mb-3">
                  Portfolio
                </p>
                <h2 className="font-[family-name:var(--font-geist)] text-3xl md:text-4xl font-semibold">
                  Featured Projects
                </h2>
              </div>

              <div className="space-y-20 md:space-y-32">
                {projects.map((project, idx) => (
                  <article
                    key={project.title}
                    className="anime-card project-card group"
                  >
                    {/* Project Image */}
                    <div className="relative w-full aspect-video md:aspect-[2.2/1] overflow-hidden rounded-[var(--radius)] bg-[var(--color-surface)] border border-[var(--color-border)] shadow-[var(--shadow-sm)] mb-8">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                      />
                    </div>

                    {/* Project Content */}
                    <div className="grid gap-8 md:grid-cols-[1.5fr_1fr] md:gap-12">
                      <div>
                        <div className="flex items-center gap-3 mb-4">
                          <span className="text-[var(--color-accent)] text-sm font-semibold">
                            {project.year}
                          </span>
                          <span className="w-px h-4 bg-[var(--color-border)]" />
                          <div className="flex flex-wrap gap-2">
                            {project.tags.map((tag) => (
                              <span
                                key={tag}
                                className="text-xs font-semibold text-[var(--color-text-secondary)] bg-[var(--color-surface)] border border-[var(--color-border)] px-3 py-1 rounded-[var(--radius-sm)]"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>

                        <h3 className="font-[family-name:var(--font-geist)] text-2xl md:text-3xl font-semibold mb-3 group-hover:text-[var(--color-accent)] transition-colors duration-200">
                          {project.title}
                        </h3>
                        <p className="text-[var(--color-text-secondary)] leading-relaxed mb-6">
                          {project.description}
                        </p>

                        {/* Links */}
                        <div className="flex items-center gap-4">
                          {project.demoUrl && (
                            <a
                              href={project.demoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="anime-button inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-accent)] hover:underline underline-offset-4"
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
                              className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors duration-200"
                            >
                              <SiGithub className="w-4 h-4" />
                              Repository
                            </a>
                          )}
                        </div>
                      </div>

                      {/* Contribution & Challenge */}
                      <div className="space-y-6">
                        <div>
                          <p className="text-xs font-semibold tracking-widest uppercase text-[var(--color-text-secondary)] mb-2">
                            Contribution
                          </p>
                          <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                            {project.contribution}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs font-semibold tracking-widest uppercase text-[var(--color-text-secondary)] mb-2">
                            Challenge
                          </p>
                          <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                            {project.challenge}
                          </p>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* ===== ABOUT SECTION ===== */}
          <section id="about" className="py-24 md:py-32 border-t border-[var(--color-border)]">
            <div className="reveal-section mx-auto max-w-[1200px] px-6 md:px-12">
              <div className="grid gap-12 md:gap-16 lg:grid-cols-[1fr_1.2fr] items-center">
                {/* Profile Image */}
                <div className="relative w-full max-w-md mx-auto lg:mx-0">
                  <div className="overflow-hidden rounded-[var(--radius)] shadow-[var(--shadow-md)]">
                    <Image
                      src="/profile1.png"
                      alt="Ridho Maulana"
                      width={500}
                      height={500}
                      className="w-full aspect-square object-cover"
                    />
                  </div>
                </div>

                {/* About Text */}
                <div>
                  <p className="text-[var(--color-accent)] text-sm font-semibold tracking-widest uppercase mb-3">
                    About
                  </p>
                  <h2 className="font-[family-name:var(--font-geist)] text-3xl md:text-4xl font-semibold mb-8">
                    A developer who thinks
                    <br />
                    like a media strategist.
                  </h2>

                  <div className="space-y-5 text-[var(--color-text-secondary)] leading-relaxed">
                    <p>
                      As a Full-Stack Developer with strong roots in the digital media industry, I see software development as more than just lines of code. It&apos;s about creating an ecosystem that connects systems with people.
                    </p>
                    <p>
                      My specialization lies in designing robust backend architectures, primarily within the Laravel ecosystem, combined with clean and intuitive user interfaces.
                    </p>
                    <p>
                      From leading the execution of thousands of pieces of content at MileniaNews to building the Milenner project governance platform from the ground up, I bring media sensitivity into programming logic to design solutions that are technically scalable and relevant to the audience.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ===== TECH STACK SECTION ===== */}
          <section className="py-24 md:py-32 border-t border-[var(--color-border)]">
            <div className="tech-container reveal-section mx-auto max-w-[1200px] px-6 md:px-12 mb-12">
              <h2 className="font-[family-name:var(--font-geist)] text-3xl md:text-4xl font-semibold">
                Tech Stack
              </h2>
            </div>

            {/* Marquee Container */}
            <div className="relative w-full overflow-hidden flex flex-col gap-8 md:gap-12" style={{ maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)", WebkitMaskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)" }}>
              
              {/* Top Row (Moves Left) */}
              <div className="animate-marquee gap-10 md:gap-14 pl-10 md:pl-14">
                {[...Object.values(techStack).flat().slice(0, Math.ceil(Object.values(techStack).flat().length / 2)), ...Object.values(techStack).flat().slice(0, Math.ceil(Object.values(techStack).flat().length / 2))].map((tool, idx) => (
                  <div
                    key={`top-${tool.name}-${idx}`}
                    className="tech-item flex items-center gap-3 flex-shrink-0 group cursor-default"
                  >
                    <tool.Icon
                      className={`w-6 h-6 md:w-7 md:h-7 transition-transform duration-200 group-hover:scale-110 ${!tool.color ? "text-[var(--color-text-primary)]" : ""}`}
                      style={tool.color ? { color: tool.color } : {}}
                    />
                    <span className="text-sm font-medium text-[var(--color-text-secondary)] group-hover:text-[var(--color-text-primary)] transition-colors duration-200 whitespace-nowrap">
                      {tool.name}
                    </span>
                  </div>
                ))}
              </div>

              {/* Bottom Row (Moves Right) */}
              <div className="animate-marquee-reverse gap-10 md:gap-14 pl-10 md:pl-14">
                {[...Object.values(techStack).flat().slice(Math.ceil(Object.values(techStack).flat().length / 2)), ...Object.values(techStack).flat().slice(Math.ceil(Object.values(techStack).flat().length / 2))].map((tool, idx) => (
                  <div
                    key={`bottom-${tool.name}-${idx}`}
                    className="tech-item flex items-center gap-3 flex-shrink-0 group cursor-default"
                  >
                    <tool.Icon
                      className={`w-6 h-6 md:w-7 md:h-7 transition-transform duration-200 group-hover:scale-110 ${!tool.color ? "text-[var(--color-text-primary)]" : ""}`}
                      style={tool.color ? { color: tool.color } : {}}
                    />
                    <span className="text-sm font-medium text-[var(--color-text-secondary)] group-hover:text-[var(--color-text-primary)] transition-colors duration-200 whitespace-nowrap">
                      {tool.name}
                    </span>
                  </div>
                ))}
              </div>

            </div>
          </section>

          {/* ===== EXPERIENCE SECTION ===== */}
          <section id="experience" className="py-24 md:py-32 border-t border-[var(--color-border)]">
            <div className="reveal-section mx-auto max-w-[1200px] px-6 md:px-12">
              <p className="text-[var(--color-accent)] text-sm font-semibold tracking-widest uppercase mb-3">
                Career
              </p>
              <h2 className="font-[family-name:var(--font-geist)] text-3xl md:text-4xl font-semibold mb-16">
                Experience
              </h2>

              <div className="experience-container relative max-w-3xl mx-auto">
                {/* Timeline Line */}
                <div className="absolute left-0 md:left-6 top-0 bottom-0 w-px bg-[var(--color-border)]">
                  <div className="timeline-line w-full bg-[var(--color-accent)] origin-top" />
                </div>

                <div className="space-y-10">
                  {experiences.map((item) => (
                    <div
                      key={item.title}
                      className="exp-item relative pl-8 md:pl-16"
                    >
                      {/* Timeline Node */}
                      <div className="absolute left-[-4px] md:left-[20px] top-1.5 w-[9px] h-[9px] rounded-full bg-[var(--color-bg)] border-2 border-[var(--color-accent)] z-10" />

                      <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius)] p-6 shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] transition-shadow duration-200">
                        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-3">
                          <h3 className="font-[family-name:var(--font-geist)] text-lg font-semibold">
                            {item.title}
                          </h3>
                          <span className="text-xs font-semibold text-[var(--color-accent)]">
                            {item.period}
                          </span>
                        </div>
                        <p className="text-sm font-medium text-[var(--color-text-secondary)] mb-4">
                          {item.place}
                        </p>
                        <ul className="space-y-2">
                          {item.details.map((detail, dIdx) => (
                            <li
                              key={dIdx}
                              className="flex items-start gap-2 text-sm text-[var(--color-text-secondary)] leading-relaxed"
                            >
                              <span className="mt-2 w-1 h-1 rounded-full bg-[var(--color-accent)] flex-shrink-0" />
                              {detail}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ===== CONTACT SECTION ===== */}
          <section id="contact" className="py-24 md:py-32 border-t border-[var(--color-border)]">
            <div className="mx-auto max-w-[1200px] px-6 md:px-12">
              <div className="max-w-2xl mx-auto text-center">
                <p className="text-[var(--color-accent)] text-sm font-semibold tracking-widest uppercase mb-3">
                  Contact
                </p>
                <h2 className="font-[family-name:var(--font-geist)] text-3xl md:text-5xl font-semibold mb-6">
                  Let&apos;s build something together.
                </h2>
                <p className="text-[var(--color-text-secondary)] text-lg leading-relaxed mb-10">
                  Interested in discussing web architecture, platform collaboration, or simply exchanging ideas? Let&apos;s start a conversation.
                </p>

                <div className="flex flex-wrap items-center justify-center gap-6 mb-12">
                  <a
                    href="mailto:ridho@example.com"
                    className="anime-button inline-flex items-center gap-2 rounded-[var(--radius)] bg-[var(--color-accent)] text-white px-8 py-3.5 text-sm font-semibold transition-all duration-200 hover:opacity-90"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                    Send Email
                  </a>
                  <a
                    href="https://www.linkedin.com/in/ridho-maulana-073aaa386/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="anime-button inline-flex items-center gap-2 rounded-[var(--radius)] border border-[var(--color-border)] px-8 py-3.5 text-sm font-semibold transition-all duration-200 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
                  >
                    <SiLinkerd className="w-4 h-4" />
                    LinkedIn
                  </a>
                  <a
                    href="https://github.com/ridhomaul"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="anime-button inline-flex items-center gap-2 rounded-[var(--radius)] border border-[var(--color-border)] px-8 py-3.5 text-sm font-semibold transition-all duration-200 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
                  >
                    <SiGithub className="w-4 h-4" />
                    GitHub
                  </a>
                </div>

                {/* Optional Contact Form */}
                <form
                  className="grid gap-4 max-w-lg mx-auto text-left"
                  aria-label="Contact form"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      name="name"
                      type="text"
                      placeholder="Name"
                      className="p-4 border border-[var(--color-border)] bg-[var(--color-surface)] rounded-[var(--radius)] text-sm font-medium transition-colors duration-200"
                    />
                    <input
                      name="email"
                      type="email"
                      placeholder="Email"
                      className="p-4 border border-[var(--color-border)] bg-[var(--color-surface)] rounded-[var(--radius)] text-sm font-medium transition-colors duration-200"
                    />
                  </div>
                  <textarea
                    name="message"
                    rows={5}
                    placeholder="Message"
                    className="p-4 border border-[var(--color-border)] bg-[var(--color-surface)] rounded-[var(--radius)] text-sm font-medium transition-colors duration-200 resize-none"
                  />
                  <button
                    type="submit"
                    className="anime-button group relative overflow-hidden rounded-[var(--radius)] bg-[var(--color-text-primary)] text-[var(--color-bg)] px-8 py-3.5 text-sm font-semibold transition-all duration-200 hover:opacity-90 w-full sm:w-fit cursor-pointer"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </section>

          {/* ===== FOOTER ===== */}
          <footer className="py-8 border-t border-[var(--color-border)]">
            <div className="mx-auto max-w-[1200px] px-6 md:px-12 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-xs font-medium text-[var(--color-text-secondary)]">
                © 2026 Ridho Maulana. All rights reserved.
              </p>
              <p className="text-xs font-medium text-[var(--color-text-secondary)]">
                Built with Next.js, GSAP & Anime.js
              </p>
            </div>
          </footer>
        </main>
      </div>
    </>
  );
}