"use client";

import Image from "next/image";
import { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  SiLaravel, SiPhp, SiPostgresql, SiMysql, SiDocker,
  SiTypescript, SiNextdotjs, SiReact, SiTailwindcss, SiGreensock,
  SiPython, SiFigma, SiCanva, SiInstagram, SiWhatsapp, SiLinkerd, SiX
} from "react-icons/si";
import { Video, Camera } from "lucide-react";
import Preloader from "./components/Preloader";

// Register ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

// --- DATA ---
const projects = [
  {
    title: "Milenner Platform",
    description: "Platform manajemen konten tim media sosial berbasis web dengan fitur Kanban board, multi-tenancy, dan performa tinggi.",
    image: "/ridhomaulana/project1.png",
    year: "2026",
    tags: ["Laravel 12", "PHP 8.4", "PostgreSQL", "Kanban"],
  },
  {
    title: "MileniaNews Content Production",
    description: "Perencanaan, penyuntingan, dan produksi lebih dari 600 konten media digital dengan strategi distribusi yang terukur.",
    image: "/ridhomaulana/project-monitoring.svg",
    year: "2024 - 2026",
    tags: ["Content Planning", "Video Editing", "Media Strategy"],
  },
  {
    title: "Personal Portfolio v2",
    description: "Desain portofolio personal dengan pendekatan minimalis-editorial, performa optimal, dan animasi interaktif.",
    image: "/ridhomaulana/project-cloud.svg",
    year: "2026",
    tags: ["Next.js 14", "Tailwind v4", "GSAP"],
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
    period: "2024 - Present",
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
      "Bertanggung jawab dalam melakukan instalasi, konfigurasi, dan pemeliharaan pada laptop atau pc karyawan.",
      "Instalasi Sistem Operasi (Windows/Linux) dan perangkat lunak esensial sesuai standar kebutuhan perusahaan.",
    ],
  },
  {
    title: "Encryption Data Rekam Medis",
    place: "Universitas Bina Sarana Informatika",
    period: "2025",
    details: [
      "Mengimplementasikan sistem enkripsi untuk keamanan data medis pada platform web",
    ],
  },
];

const techIcons = [
  { name: "PHP", Icon: SiPhp, color: "#777BB4" },
  { name: "Laravel", Icon: SiLaravel, color: "#FF2D20" },
  { name: "PostgreSQL", Icon: SiPostgresql, color: "#4169E1" },
  { name: "MySQL", Icon: SiMysql, color: "#4479A1" },
  { name: "Docker", Icon: SiDocker, color: "#2496ED" },
  { name: "Python", Icon: SiPython, color: "#3776AB" },
  { name: "TypeScript", Icon: SiTypescript, color: "#3178C6" },
  { name: "Next.js", Icon: SiNextdotjs, color: "" }, // Leaves standard dark mode inherit text color
  { name: "React", Icon: SiReact, color: "#61DAFB" },
  { name: "Tailwind CSS", Icon: SiTailwindcss, color: "#06B6D4" },
  { name: "GSAP", Icon: SiGreensock, color: "#88CE02" },
  { name: "Figma", Icon: SiFigma, color: "#F24E1E" },
  { name: "Video Editing", Icon: Video, color: "#FF0000" },
  { name: "Camera Person", Icon: Camera, color: "#888888" },
  { name: "Canva", Icon: SiCanva, color: "#00C4CC" },
];

export default function Home() {
  const [introFinished, setIntroFinished] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!introFinished) return;

    // --- HERO SECTION ANIMATION (CINEMATIC INTRO) ---
    const heroTimeline = gsap.timeline({ defaults: { ease: "power4.out" } });

    heroTimeline.fromTo(".hero-title-line",
      { y: 80, opacity: 0, scale: 1.1 },
      { y: 0, opacity: 1, scale: 1, duration: 1.2, stagger: 0.15 }
    )
    .fromTo(".hero-desc",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1 },
      "-=0.9" // Delay ~0.3s after title starts
    )
    .fromTo(".hero-button",
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.7)" },
      "-=0.6" // Delay ~0.6s after title starts
    )
    .fromTo(".hero-image",
      { opacity: 0, scale: 0.8, rotate: -5 },
      { opacity: 1, scale: 1, rotate: 0, duration: 1.5, ease: "expo.out" },
      "-=1.2"
    );

    // Subtle parallax effect on scroll for Hero
    gsap.to(".hero-image", {
      yPercent: 20,
      ease: "none",
      scrollTrigger: {
        trigger: "#home",
        start: "top top",
        end: "bottom top",
        scrub: 1
      }
    });

    // Floating effect for hero image
    gsap.to(".hero-image", {
      y: -15,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    // --- SCROLL PROGRESS INDICATOR ---
    gsap.to(".scroll-progress-bar", {
      scaleX: 1,
      ease: "none",
      scrollTrigger: {
        scrub: 0.1,
        start: "top top",
        end: "bottom bottom"
      }
    });

    // --- SCROLL ANIMATIONS ---
    
    // Big Transition Name Text
    gsap.fromTo(".big-transition-text",
      { opacity: 0, scale: 0.8, y: 50 },
      {
        opacity: 1, 
        scale: 1, 
        y: 0,
        duration: 1.5,
        ease: "expo.out",
        scrollTrigger: {
          trigger: ".big-transition-text",
          start: "top 85%",
        }
      }
    );

    // Sections Reveal
    const sections = gsap.utils.toArray(".reveal-section") as HTMLElement[];
    sections.forEach((sec) => {
      gsap.fromTo(sec, 
        { opacity: 0, y: 50 },
        {
          opacity: 1, 
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sec,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    // About Section Text Stagger Reveal
    gsap.fromTo(".about-text-p",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".about-text-container",
          start: "top 80%"
        }
      }
    );

    // Profile Image Slide & Fade
    gsap.fromTo(".about-image-container",
      { opacity: 0, x: 100 },
      {
        opacity: 1,
        x: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".about-image-container",
          start: "top 85%",
          scrub: 0.5 // Cinematic scrub
        }
      }
    );

    // Tech Stack Fade & Scale In
    gsap.fromTo(".tech-stack-container", 
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".tech-stack-container",
          start: "top 85%"
        }
      }
    );

    // Projects Stagger (Main Showcase)
    gsap.fromTo(".project-card",
      { opacity: 0, y: 100 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".projects-container",
          start: "top 80%"
        }
      }
    );

    // Experience Timeline Draw
    gsap.fromTo(".timeline-line",
      { height: 0 },
      {
        height: "100%",
        ease: "none",
        scrollTrigger: {
          trigger: ".experience-container",
          start: "top center",
          end: "bottom center",
          scrub: true
        }
      }
    );

    // Experience Items Fade
    const expItems = gsap.utils.toArray(".exp-item") as HTMLElement[];
    expItems.forEach((item) => {
      gsap.fromTo(item,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
          }
        }
      );
    });

    // Contact Section Minimal Fade
    gsap.fromTo("#contact > div",
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "#contact",
          start: "top 85%"
        }
      }
    );

  }, { scope: container, dependencies: [introFinished] });

  // Handle Flip GSAP animation manually since we removed Framer Motion here
  const flipContainer = useRef<HTMLDivElement>(null);
  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    gsap.to(flipContainer.current, {
      rotateY: isFlipped ? 0 : 180,
      duration: 0.8,
      ease: "power3.inOut"
    });
  };

  return (
    <>
      {!introFinished && <Preloader onComplete={() => setIntroFinished(true)} />}
      <div className="scroll-progress-bar fixed top-0 left-0 h-1 bg-linear-to-r from-purple-600 to-blue-500 z-9999 origin-left scale-x-0 pointer-events-none" />
      <div id="home" className="overflow-clip relative w-full" ref={container}>
        <main>
        {/* --- HERO SECTION --- */}
        <div className="relative w-full min-h-screen flex items-center z-10 bg-transparent">
          <section className="mx-auto grid w-full max-w-7xl content-center items-center gap-12 px-6 pt-32 pb-40 lg:grid-cols-2 lg:gap-20 lg:pt-32">
            <div className="flex flex-col">
              <h1 className="font-heading text-5xl font-medium uppercase leading-[1.1] tracking-tight md:text-7xl text-[#1A1A1A] dark:text-white transition-colors overflow-hidden">
                <div className="hero-title-line">Engineering robust web</div>
                <div className="hero-title-line">& high impact media</div>
                <div className="hero-title-line">strategies.</div>
              </h1>
              <p className="hero-desc mt-6 max-w-lg text-lg font-medium text-slate-600 dark:text-slate-400 transition-colors">
                Focused on developing clean and scalable applications or websites, as well as managing high-impact digital media strategies.
              </p>
              <div className="hero-button mt-8 flex flex-wrap gap-4">
                <a
                  href="/ridhomaulana/CV-Ridho-Maulana.pdf"
                  download="CV-Ridho-Maulana.pdf"
                  className="group relative inline-flex items-center justify-center rounded-full bg-[#1A1A1A] dark:bg-white px-8 py-3.5 text-sm font-bold tracking-wider uppercase text-white dark:text-[#1A1A1A] transition-all hover:shadow-[0_0_20px_rgba(26,26,26,0.3)] dark:hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:-translate-y-1 overflow-hidden"
                >
                  <span className="relative z-10">DOWNLOAD CV</span>
                  <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent dark:via-black/10 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                </a>
              </div>
            </div>

            <div className="flex justify-end lg:justify-center cursor-pointer">
              <div className="hero-image relative w-full max-w-md overflow-hidden rounded-2xl border border-white/20 dark:border-white/10 bg-white/40 dark:bg-black/20 p-2 shadow-[0_8px_32px_rgba(0,0,0,0.1)] backdrop-blur-xl transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/20">
                <Image
                  src="/ridhomaulana/profile1.png"
                  alt="Refined digital visualization"
                  width={640}
                  height={640}
                  priority
                  className="w-full aspect-square object-cover grayscale transition-all duration-700 hover:grayscale-0 hover:scale-105 rounded-xl"
                />
              </div>
            </div>
          </section>
        </div>

        {/* --- MAIN CONTENT OVERLAY (Glassmorphism effect) --- */}
        <div className="relative z-20 w-full bg-[#FAF8F5]/90 dark:bg-[#121212]/90 backdrop-blur-3xl transition-colors duration-300 rounded-t-[2.5rem] md:rounded-t-[4rem] shadow-[0_-20px_50px_rgba(0,0,0,0.05)] dark:shadow-[0_-20px_50px_rgba(0,0,0,0.4)] pb-24 border-t border-slate-200 dark:border-slate-800/50">

          {/* TRANSITION TEXT: GIANT NAME */}
          <div className="w-full flex justify-center pt-32 pb-8 px-6 overflow-hidden">
             <h2 className="big-transition-text font-heading text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-medium text-center text-[#1A1A1A] dark:text-white leading-[1.1] tracking-tighter">
                Hi, I&apos;m <br /> <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-600 to-blue-500 dark:from-purple-400 dark:to-blue-400">Ridho Maulana.</span>
             </h2>
          </div>

          {/* ABOUT ME SECTION */}
          <section id="about" className="reveal-section mx-auto max-w-7xl px-6 py-16 flex flex-col items-center">
            
            {/* Profile Flip Animation */}
            <div 
              className="about-image-container relative z-10 w-full max-w-[280px] mb-8 cursor-pointer group"
              onClick={handleFlip}
              style={{ perspective: "1000px" }}
            >
              <div 
                ref={flipContainer}
                className="relative w-full h-full transform-style-3d" 
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Sisi Depan */}
                <div 
                  className="rounded-full overflow-hidden border-[6px] border-white/50 dark:border-white/10 shadow-2xl backdrop-blur-sm transition-colors"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  <Image
                    src="/ridhomaulana/profile1.png"
                    alt="Digital Portrait Visual"
                    width={400}
                    height={400}
                    className="w-full aspect-square object-cover grayscale group-hover:grayscale-0 transition-all duration-500 rounded-full p-1"
                  />
                </div>

                {/* Sisi Belakang */}
                <div 
                  className="absolute inset-0 rounded-full overflow-hidden border-[6px] border-white/50 dark:border-white/10 shadow-2xl backdrop-blur-sm bg-white dark:bg-[#1A1A1A] flex items-center justify-center p-2"
                  style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                >
                  <Image
                    src="/ridhomaulana/GIF1.gif"
                    alt="Fun profile animation"
                    width={400}
                    height={400}
                    className="w-full aspect-square object-cover rounded-full"
                  />
                </div>
              </div>
            </div>

            {/* Tech Stack Marquee */}
            <div className="tech-stack-container w-[95vw] md:w-[70vw] relative z-10 overflow-hidden mx-auto pt-4 pb-10 mb-10 mask-image-[linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-8 text-center transition-colors">Technology Stack</p>
              
              <div className="animate-marquee gap-8 md:gap-12 pl-8 md:pl-12">
                {[...techIcons, ...techIcons].map((tool, idx) => (
                  <div key={idx} className="group relative flex flex-col items-center justify-center cursor-crosshair">
                    <tool.Icon 
                      className={`w-10 h-10 transition-all duration-300 group-hover:scale-110 ${!tool.color ? 'text-black dark:text-white' : ''}`} 
                      style={tool.color ? { color: tool.color } : {}}
                    />
                    <span className="absolute -bottom-6 text-[10px] font-bold uppercase tracking-wider bg-white/90 dark:bg-black/90 text-black dark:text-white px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-xl border border-slate-200/50 dark:border-slate-800/50 backdrop-blur-sm z-20">
                      {tool.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* About Text */}
            <div className="about-text-container max-w-3xl text-center">
              <p className="about-text-p font-medium text-lg md:text-xl text-slate-600 dark:text-slate-300 mb-7 transition-colors leading-relaxed">
                As a Full-Stack Developer with strong roots in the digital media industry, I see software development as more than just lines of code. It is about creating an ecosystem that connects systems with people.
              </p>
              <div className="space-y-4 font-medium text-base md:text-lg text-slate-500 dark:text-slate-400 leading-relaxed transition-colors">
                <p className="about-text-p">
                  My specialization lies in designing robust backend architectures, primarily within the Laravel ecosystem, combined with clean and intuitive user interfaces.
                </p>
                <p className="about-text-p">
                  This dual background allows me to see the bigger picture of a product. From leading the execution of thousands of pieces of content at MileniaNews to building the Milenner project governance platform from the ground up, I bring media sensitivity into programming logic to design solutions that are technically scalable and relevant to the audience.
                </p>
              </div>
            </div>

          </section>

          {/* PROJECTS SECTION */}
          <section id="projects" className="projects-container mx-auto max-w-7xl px-6 py-24">
            <div className="reveal-section mb-16">
              <h2 className="font-heading text-4xl font-medium uppercase text-[#1A1A1A] dark:text-white transition-colors">Selected Projects</h2>
              <div className="mt-4 h-1 w-20 bg-linear-to-r from-purple-500 to-blue-500 rounded-full"></div>
            </div>

            <div className="grid gap-x-8 gap-y-16 md:grid-cols-2 xl:grid-cols-3">
              {projects.map((project) => (
                <article key={project.title} className="project-card flex flex-col group cursor-pointer">
                  <div className="relative overflow-hidden bg-white/50 dark:bg-[#1A1A1A]/50 backdrop-blur-md border border-slate-200/50 dark:border-slate-800/50 rounded-2xl p-2 shadow-lg transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-purple-500/10 group-hover:-translate-y-2">
                    <div className="overflow-hidden rounded-t-2xl relative aspect-16/10">
                      <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <Image
                        src={project.image}
                        alt={project.title}
                        width={600}
                        height={400}
                        className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110"
                      />
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col pt-6 px-2">
                    <h3 className="font-heading text-3xl font-medium text-[#1A1A1A] dark:text-white transition-colors group-hover:text-purple-600 dark:group-hover:text-purple-400">{project.title}</h3>
                    <p className="text-purple-600 dark:text-purple-400 text-sm font-bold mt-2 mb-3">{project.year}</p>
                    <p className="text-slate-600 dark:text-slate-400 font-medium text-sm mb-4 line-clamp-2">{project.description}</p>
                    <div className="mb-6 flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span key={tag} className="text-[10px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 bg-slate-200/50 dark:bg-slate-800/50 px-3 py-1 rounded-full backdrop-blur-sm transition-colors border border-slate-300/50 dark:border-slate-700/50">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <a href="#contact" className="mt-auto inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#1A1A1A] dark:text-white hover:text-purple-600 dark:hover:text-purple-400 transition-colors w-fit group/btn">
                      View Case Study
                      <span className="transition-transform duration-300 group-hover/btn:translate-x-1">→</span>
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* EXPERIENCE SECTION */}
          <section id="experience" className="reveal-section mx-auto max-w-7xl px-6 py-24 border-t border-slate-200/50 dark:border-slate-800/50 transition-colors">
            <h2 className="font-heading text-4xl font-medium uppercase text-[#1A1A1A] dark:text-white mb-16 transition-colors text-center">Experience</h2>
            
            <div className="experience-container relative max-w-4xl mx-auto">
              {/* Central Timeline Line (Desktop) */}
              <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-slate-200 dark:bg-slate-800 transform md:-translate-x-1/2">
                <div className="timeline-line w-full bg-linear-to-b from-purple-500 to-blue-500 origin-top"></div>
              </div>

              <div className="space-y-12">
                {experiences.map((item, idx) => (
                  <div key={item.title} className={`exp-item relative flex flex-col md:flex-row gap-8 items-start md:items-center ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                    
                    {/* Timeline Node */}
                    <div className="absolute left-[-5px] md:left-1/2 top-2 md:top-1/2 w-3 h-3 rounded-full bg-white dark:bg-[#121212] border-2 border-purple-500 transform md:-translate-x-1/2 md:-translate-y-1/2 z-10 shadow-[0_0_10px_rgba(168,85,247,0.5)]"></div>
                    
                    {/* Content Box */}
                    <div className={`w-full md:w-1/2 pl-6 md:pl-0 ${idx % 2 === 0 ? 'md:pl-12 text-left' : 'md:pr-12 md:text-right'}`}>
                      <div className="bg-white/40 dark:bg-black/20 backdrop-blur-md border border-slate-200/50 dark:border-slate-800/50 p-6 rounded-2xl shadow-lg hover:shadow-xl hover:shadow-purple-500/5 transition-all duration-300">
                        <p className="text-xl font-bold text-[#1A1A1A] dark:text-white leading-tight transition-colors mb-2">{item.title}</p>
                        <p className="font-semibold text-sm text-purple-600 dark:text-purple-400 mb-1">{item.place}</p>
                        <p className="text-xs font-bold text-slate-400 dark:text-slate-500 mb-4">{item.period}</p>
                        <ul className={`list-none space-y-2 text-sm font-medium text-slate-600 dark:text-slate-400 transition-colors ${idx % 2 === 0 ? 'text-left' : 'md:text-right text-left'}`}>
                          {item.details.map((detail, dIdx) => (
                            <li key={dIdx} className="relative">
                              <span className="md:hidden absolute -left-4 top-1.5 w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700"></span>
                              {detail}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CONTACT SECTION */}
          <section id="contact" className="reveal-section mx-auto max-w-7xl px-6 py-32 border-t border-slate-200/50 dark:border-slate-800/50 transition-colors">
            <div className="bg-linear-to-br from-white/60 to-white/10 dark:from-[#1A1A1A]/60 dark:to-[#1A1A1A]/10 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-3xl p-10 md:p-16 shadow-2xl">
              <h2 className="font-heading text-5xl md:text-6xl font-medium text-[#1A1A1A] dark:text-white mb-8 transition-colors text-center md:text-left">Let&apos;s Connect.</h2>
              <div className="grid gap-12 md:grid-cols-[1fr_1.5fr] items-center">
                <p className="font-medium text-lg text-slate-600 dark:text-slate-400 leading-relaxed transition-colors text-center md:text-left">
                  Interested in discussing web code architecture, platform collaboration, or simply exchanging ideas? Let’s start a conversation.
                </p>
                <form className="grid gap-5" aria-label="Form kontak portofolio" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <input name="name" type="text" placeholder="Name" className="p-4 border border-slate-200/50 dark:border-slate-700/50 bg-white/50 dark:bg-[#121212]/50 backdrop-blur-sm dark:text-white rounded-xl text-sm font-medium transition-all focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
                    <input name="email" type="email" placeholder="Email" className="p-4 border border-slate-200/50 dark:border-slate-700/50 bg-white/50 dark:bg-[#121212]/50 backdrop-blur-sm dark:text-white rounded-xl text-sm font-medium transition-all focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
                  </div>
                  <textarea name="message" rows={5} placeholder="Message" className="p-4 border border-slate-200/50 dark:border-slate-700/50 bg-white/50 dark:bg-[#121212]/50 backdrop-blur-sm dark:text-white rounded-xl text-sm font-medium transition-all focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none" />
                  <button
                    type="submit"
                    className="group relative overflow-hidden rounded-xl bg-linear-to-r from-purple-600 to-blue-600 text-white px-12 py-4 text-sm font-bold uppercase tracking-widest transition-all hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] w-full md:w-fit cursor-pointer mt-2"
                  >
                    <span className="relative z-10">SEND MESSAGE</span>
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                  </button>
                </form>
              </div>
            </div>
          </section>

          {/* FOOTER SECTION */}
          <footer className="mx-auto max-w-7xl px-6 py-8 transition-colors">
            <div className="flex flex-col justify-center items-center gap-6">
              <div className="flex items-center gap-8">
                <a href="https://www.instagram.com/maulani.sudjatmiko" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-purple-500 hover:scale-125 transition-all duration-300">
                  <SiInstagram className="w-5 h-5" />
                </a>
                <a href="https://wa.me/629818775467" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-green-500 hover:scale-125 transition-all duration-300">
                  <SiWhatsapp className="w-5 h-5" />
                </a>
                <a href="https://www.linkedin.com/in/ridho-maulana-073aaa386/" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-blue-500 hover:scale-125 transition-all duration-300">
                  <SiLinkerd className="w-5 h-5" />
                </a>
                <a href="https://x.com/mekibelang" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-[#1A1A1A] dark:hover:text-white hover:scale-125 transition-all duration-300">
                  <SiX className="w-4 h-4" />
                </a>
              </div>
              <p className="text-xs font-semibold text-slate-400 tracking-wider">© 2026 RIDHO MAULANA. ALL RIGHTS RESERVED.</p>
            </div>
          </footer>
        </div>
      </main>
    </div>
    </>
  );
}