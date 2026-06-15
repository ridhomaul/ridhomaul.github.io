"use client";

import Image from "next/image";
// 1. Tambahkan import useState di sini
import { useState } from "react";
import { motion, Variants } from "framer-motion";
import {
  SiLaravel, SiPhp, SiPostgresql, SiMysql, SiDocker,
  SiTypescript, SiNextdotjs, SiReact, SiTailwindcss, SiFramer,
  SiPython, SiFigma, SiCanva, SiInstagram, SiWhatsapp, SiLinkerd, SiX
} from "react-icons/si";
import { Video, Camera, Mic } from "lucide-react";

// --- DATA PROFIL & PROYEK ASLI ---
const projects = [
  {
    title: "Milenner Platform",
    description: "Platform manajemen konten tim media sosial berbasis web dengan fitur Kanban board, multi-tenancy, dan performa tinggi.",
    image: "/project-scheduler.svg",
    year: "2026",
    tags: ["Laravel 12", "PHP 8.4", "PostgreSQL", "Kanban"],
  },
  {
    title: "MileniaNews Content Production",
    description: "Perencanaan, penyuntingan, dan produksi lebih dari 600 konten media digital dengan strategi distribusi yang terukur.",
    image: "/project-monitoring.svg",
    year: "2024 - 2026",
    tags: ["Content Planning", "Video Editing", "Media Strategy"],
  },
  {
    title: "Personal Portfolio v2",
    description: "Desain portofolio personal dengan pendekatan minimalis-editorial, performa optimal, dan animasi interaktif.",
    image: "/project-cloud.svg",
    year: "2026",
    tags: ["Next.js 14", "Tailwind v4", "Framer Motion"],
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
      "instalasi Sistem Operasi (Windows/Linux) dan perangkat lunak esensial sesuai standar kebutuhan perusahaan.",
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

// Data deretan Ikon Teknologi (Dibersihkan dari data ganda)
const techIcons = [
  { name: "PHP", Icon: SiPhp },
  { name: "Laravel", Icon: SiLaravel },
  { name: "PostgreSQL", Icon: SiPostgresql },
  { name: "MySQL", Icon: SiMysql },
  { name: "Docker", Icon: SiDocker },
  { name: "Python", Icon: SiPython },
  { name: "TypeScript", Icon: SiTypescript },
  { name: "Next.js", Icon: SiNextdotjs },
  { name: "React", Icon: SiReact },
  { name: "Tailwind CSS", Icon: SiTailwindcss },
  { name: "Framer Motion", Icon: SiFramer },
  { name: "Figma", Icon: SiFigma },
  { name: "Video Editing", Icon: Video },
  { name: "Camera Person", Icon: Camera },
  { name: "Canva", Icon: SiCanva },
];

// --- VARIAN ANIMASI ---
const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8, ease: "easeOut" } }
};

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

export default function Home() {
  // 2. Tambahkan state isFlipped untuk mengontrol putaran foto
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    // Memindahkan id="home" ke tag utama pembungkus seluruh halaman
    <div id="home" className="overflow-clip relative w-full">
      <main>

        {/* --- 1. HERO SECTION (DIBUAT STICKY DI BELAKANG) --- */}
        {/* Menghapus id="home" dari tag ini */}
        <div className="sticky top-0 w-full min-h-screen flex items-center z-0">
          <section className="mx-auto grid w-full max-w-7xl content-center items-center gap-12 px-6 pt-24 pb-40 lg:grid-cols-2 lg:gap-20 lg:pt-24 lg:pb-32">
            <motion.div initial="hidden" animate="visible" variants={fadeIn}>
              <h1 className="font-heading text-5xl font-medium uppercase leading-none tracking-tight md:text-7xl text-[#1A1A1A] dark:text-white transition-colors">
                Engineering robust web &<br /> high impact media <br /> strategies.
              </h1>
              <p className="mt-5 max-w-lg text-lg font-normal text-slate-600 dark:text-slate-400 transition-colors">
                Focused on developing clean and scalable applications or websites, as well as managing high-impact digital media strategies.
              </p>
              <div className="mt-4 flex flex-wrap gap-4">
                <motion.a
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  href="/CV-Ridho-Maulana.pdf"
                  download="CV-Ridho-Maulana.pdf"
                  className="rounded border border-[#1A1A1A] dark:border-white px-8 py-3 text-sm font-semibold tracking-wider uppercase text-[#1A1A1A] dark:text-white hover:bg-[#1A1A1A] dark:hover:bg-white hover:text-white dark:hover:text-[#1A1A1A] transition-all"
                >
                  DOWNLOAD CV
                </motion.a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{
                y: -12,
                rotate: 1,
                transition: { type: "spring", stiffness: 300, damping: 20 }
              }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex justify-end cursor-pointer"
            >
              <div className="w-full max-w-md overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1A1A1A] p-2 shadow-sm transition-all duration-300 hover:shadow-2xl hover:shadow-slate-200/50 dark:hover:shadow-black/50">
                <Image
                  src="/profile1.png"
                  alt="Refined digital visualization"
                  width={640}
                  height={640}
                  priority
                  className="w-full aspect-square object-cover grayscale transition-all duration-500 hover:grayscale-0 rounded-lg"
                />
              </div>
            </motion.div>
          </section>
        </div>

        {/* --- 2. KONTEN BAWAH (YANG AKAN MENUTUPI HERO SECTION) --- */}
        <div className="relative z-10 w-full bg-[#FAF8F5] dark:bg-[#121212] transition-colors duration-300 rounded-t-[2.5rem] md:rounded-t-[4rem] shadow-[0_-20px_50px_rgba(0,0,0,0.05)] dark:shadow-[0_-20px_50px_rgba(0,0,0,0.4)] pb-24 border-t border-slate-200 dark:border-slate-800/50">

          {/* ABOUT ME SECTION */}
          <section id="about" className="mx-auto max-w-7xl px-6 py-24 pt-32">
            <div className="grid gap-16 lg:grid-cols-[1.2fr_auto_1fr] items-start">

              {/* Kolom Kiri: Greeting, Intro, dan Deskripsi */}
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="max-w-xl">
                <h2 className="font-heading text-5xl font-medium text-[#1A1A1A] dark:text-white mb-6 leading-tight transition-colors">
                  Hi, I&apos;m <br /> Ridho Maulana.
                </h2>
                <p className="font-medium text-lg text-slate-600 dark:text-slate-300 mb-7 transition-colors">
                  As a Full-Stack Developer with strong roots in the digital media industry, I see software development as more than just lines of code. It is about creating an ecosystem that connects systems with people.
                </p>
                <div className="space-y-4 font-medium text-base text-slate-600 dark:text-slate-400 leading-relaxed transition-colors">
                  <p>
                    My specialization lies in designing robust backend architectures, primarily within the Laravel ecosystem, combined with clean and intuitive user interfaces.
                  </p>
                  <p>
                    This dual background allows me to see the bigger picture of a product. From leading the execution of thousands of pieces of content at MileniaNews to building the Milenner project governance platform from the ground up, I bring media sensitivity into programming logic to design solutions that are technically scalable and relevant to the audience.
                  </p>
                </div>
              </motion.div>

              {/* Kolom Tengah: Divider Vertikal */}
              <div className="hidden lg:block w-px h-full min-h-[400px] bg-slate-200 dark:bg-slate-800 mx-4 transition-colors"></div>

              {/* Kolom Kanan: Visual dan Galeri Ikon */}
              <div className="flex flex-col relative w-full items-center">

                {/* --- 3. FOTO PROFIL BULAT DENGAN EFEK FLIP --- */}
                {/* Pembungkus 3D Perspective */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="relative z-10 w-full max-w-[280px] mb-12 cursor-pointer group"
                  // 3a. Tambahkan Event Click untuk menukar status flip
                  onClick={() => setIsFlipped(!isFlipped)}
                  // Berikan perspective agar efek 3D terasa
                  style={{ perspective: "1000px" }}
                >
                  {/* Wadah yang diputar oleh Framer Motion */}
                  <motion.div
                    className="relative w-full h-full"
                    style={{ transformStyle: "preserve-3d" }} // Wajib untuk efek 3D anak
                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                  >

                    {/* --- SISI DEPAN (Foto Profil Asli) --- */}
                    <div
                      className="rounded-full overflow-hidden border-8 border-white dark:border-[#121212] shadow-lg shadow-slate-100 dark:shadow-black transition-colors"
                      style={{ backfaceVisibility: "hidden" }} // Sembunyikan saat membelakangi pengguna
                    >
                      <Image
                        src="/profile1.png"
                        alt="Digital Portrait Visual"
                        width={400}
                        height={400}
                        className="w-full aspect-square object-cover grayscale transition-all duration-500 group-hover:grayscale-0 rounded-full p-1"
                      />
                    </div>

                    {/* --- SISI BELAKANG (GIF Baru) --- */}
                    {/* Diposisikan absolute dan diputar 180deg terlebih dahulu */}
                    <div
                      className="absolute inset-0 rounded-full overflow-hidden border-8 border-white dark:border-[#121212] shadow-lg shadow-slate-100 dark:shadow-black transition-colors bg-white dark:bg-[#1A1A1A] flex items-center justify-center p-2"
                      style={{
                        backfaceVisibility: "hidden",
                        transform: "rotateY(180deg)"
                      }}
                    >
                      <Image
                        // 3b. Pastikan Anda menambahkan file GIF ini ke folder public/
                        src="/GIF1.gif"
                        alt="Fun profile animation"
                        width={400}
                        height={400}
                        className="w-full aspect-square object-cover rounded-full"
                      />
                    </div>
                  </motion.div>
                </motion.div>

                {/* Galeri Ikon Teknologi */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="w-full relative z-10"
                >
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-8 text-center transition-colors">Technology Stack</p>

                  <div className="flex flex-wrap justify-center gap-6 sm:gap-8 max-w-sm mx-auto">
                    {techIcons.map((tool) => (
                      <div
                        key={tool.name}
                        className="group relative flex flex-col items-center justify-center cursor-crosshair"
                      >
                        <tool.Icon className="w-8 h-8 text-slate-300 dark:text-slate-600 transition-all duration-300 group-hover:text-[#1A1A1A] dark:group-hover:text-white group-hover:scale-110 group-hover:-translate-y-1" />

                        {/* Tooltip Label */}
                        <span className="absolute -bottom-6 text-[10px] font-bold uppercase tracking-wider text-[#1A1A1A] dark:text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                          {tool.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* PROJECTS SECTION */}
          <section id="projects" className="mx-auto max-w-7xl px-6 py-24">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="mb-16">
              <h2 className="font-heading text-4xl font-medium uppercase text-[#1A1A1A] dark:text-white transition-colors">Selected Projects</h2>
              <div className="mt-2 h-0.5 w-16 bg-slate-300 dark:bg-slate-700 transition-colors"></div>
            </motion.div>

            <div className="grid gap-x-8 gap-y-16 md:grid-cols-2 xl:grid-cols-3">
              {projects.map((project, idx) => (
                <motion.article
                  key={project.title}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex flex-col group"
                >
                  <div className="overflow-hidden bg-white dark:bg-[#1A1A1A] border border-slate-200 dark:border-slate-800 rounded-lg p-2 shadow-2xs transition-colors">
                    <Image
                      src={project.image}
                      alt={`Thumbnail ${project.title}`}
                      width={560}
                      height={320}
                      className="aspect-video w-full object-cover rounded group-hover:scale-[1.02] transition-transform duration-500"
                    />
                  </div>
                  <div className="flex flex-1 flex-col pt-6">
                    <h3 className="font-heading text-3xl font-medium text-[#1A1A1A] dark:text-white transition-colors">{project.title}</h3>
                    <p className="text-slate-400 dark:text-slate-500 text-sm font-medium mt-1 mb-3 transition-colors">{project.year}</p>
                    <p className="text-slate-600 dark:text-slate-400 font-medium text-sm mb-4 line-clamp-2 transition-colors">{project.description}</p>
                    <div className="mb-6 flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span key={tag} className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded transition-colors">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <a href="#contact" className="mt-auto inline-block text-xs font-bold uppercase tracking-widest text-[#1A1A1A] dark:text-white hover:text-slate-500 dark:hover:text-slate-400 transition-colors border-b border-black dark:border-white w-fit pb-0.5">
                      View Case Study
                    </a>
                  </div>
                </motion.article>
              ))}
            </div>
          </section>

          {/* EXPERIENCE SECTION */}
          <section id="experience" className="mx-auto max-w-7xl px-6 py-24 border-t border-slate-200 dark:border-slate-800 transition-colors">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
              <h2 className="font-heading text-4xl font-medium uppercase text-[#1A1A1A] dark:text-white mb-12 transition-colors">Experience</h2>
              <div className="grid gap-12 md:grid-cols-2">
                {experiences.map((item) => (
                  <div key={item.title} className="flex gap-6 border-l-2 border-slate-200 dark:border-slate-800 pl-6 py-2 hover:border-black dark:hover:border-white transition-colors duration-300">
                    <div className="w-1/3">
                      <p className="text-lg font-bold text-[#1A1A1A] dark:text-white leading-tight transition-colors">{item.title}</p>
                      <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 mt-1.5 transition-colors">{item.period}</p>
                    </div>
                    <div className="w-2/3">
                      <p className="font-semibold text-sm text-slate-500 dark:text-slate-400 mb-3 uppercase tracking-wider transition-colors">{item.place}</p>
                      <ul className="ml-4 list-disc space-y-2 text-sm font-medium text-slate-600 dark:text-slate-400 marker:text-[#1A1A1A] dark:marker:text-white transition-colors">
                        {item.details.map((detail) => (
                          <li key={detail}>{detail}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </section>

          {/* CONTACT SECTION */}
          <section id="contact" className="mx-auto max-w-7xl px-6 py-24 border-t border-slate-200 dark:border-slate-800 transition-colors">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
              <h2 className="font-heading text-4xl font-medium uppercase text-[#1A1A1A] dark:text-white mb-12 transition-colors">Let's </h2>
              <div className="grid gap-12 md:grid-cols-[1fr_2fr]">
                <p className="font-medium text-slate-600 dark:text-slate-400 leading-relaxed transition-colors">
                  Interested in discussing web code architecture, platform collaboration, or simply exchanging ideas? Let’s start a conversation.
                </p>
                <form className="grid gap-4" aria-label="Form kontak portofolio" onSubmit={(e) => e.preventDefault()}>
                  <input name="name" type="text" placeholder="Name" className="p-3.5 border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1A1A1A] dark:text-white rounded-md text-sm font-medium transition-colors" />
                  <input name="email" type="email" placeholder="Email" className="p-3.5 border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1A1A1A] dark:text-white rounded-md text-sm font-medium transition-colors" />
                  <textarea name="message" rows={4} placeholder="Message" className="p-3.5 border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1A1A1A] dark:text-white rounded-md text-sm font-medium transition-colors" />
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    type="submit"
                    className="rounded border border-[#1A1A1A] dark:border-white bg-[#1A1A1A] dark:bg-white text-white dark:text-[#1A1A1A] px-12 py-3.5 text-xs font-bold uppercase tracking-widest hover:bg-black dark:hover:bg-slate-200 transition-all w-fit cursor-pointer shadow-xs"
                  >
                    SEND MESSAGE
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </section>

          {/* FOOTER SECTION */}
          <footer className="mx-auto max-w-7xl px-6 py-8 transition-colors">
            <div className="flex flex-col md:flex-row justify-center items-center gap-6">

              <div className="flex items-center gap-6">
                <a
                  href="https://www.instagram.com/maulani.sudjatmiko/?__pwa=1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 dark:text-slate-500 hover:text-[#1A1A1A] dark:hover:text-white hover:scale-110 transition-all duration-300"
                  aria-label="Instagram"
                >
                  <SiInstagram className="w-5 h-5" />
                </a>

                <a
                  href="https://wa.me/629818775467"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 dark:text-slate-500 hover:text-[#1A1A1A] dark:hover:text-white hover:scale-110 transition-all duration-300"
                  aria-label="WhatsApp"
                >
                  <SiWhatsapp className="w-5 h-5" />
                </a>

                <a
                  href="https://www.linkedin.com/in/ridho-maulana-073aaa386/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 dark:text-slate-500 hover:text-[#1A1A1A] dark:hover:text-white hover:scale-110 transition-all duration-300"
                  aria-label="LinkedIn"
                >
                  <SiLinkerd className="w-5 h-5" />
                </a>

                <a
                  href="https://x.com/mekibelang?s=21"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 dark:text-slate-500 hover:text-[#1A1A1A] dark:hover:text-white hover:scale-110 transition-all duration-300"
                  aria-label="X (Twitter)"
                >
                  <SiX className="w-4 h-4" />
                </a>
              </div>

            </div>
          </footer>
        </div>

      </main>
    </div>
  );
}