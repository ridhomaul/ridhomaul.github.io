import type { Metadata } from "next";
import { Inter, Baskervville } from "next/font/google";
import "./globals.css";
import Navbar from "@/app/components/Navbar";
import { ThemeProvider } from "@/app/components/ThemeProvider"; // Import Provider kita

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const baskervville = Baskervville({ variable: "--font-baskervville", subsets: ["latin"], weight: ["400"] });

export const metadata: Metadata = {
  title: "Ridho Maulana | Full Stack Developer & Media Specialist",
  description: "Portofolio personal untuk Full Stack Developer, fokus pada solusi web yang elegan.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // SuppressHydrationWarning diperlukan oleh next-themes di tag html
    <html lang="id" className={`${inter.variable} ${baskervville.variable} h-full scroll-smooth antialiased`} suppressHydrationWarning>
      {/* Tambahkan dark:bg-[#121212] dan dark:text-white agar background otomatis hitam saat dark mode */}
      <body className="min-h-full flex flex-col bg-[#FAF8F5] text-[#1A1A1A] dark:bg-[#121212] dark:text-slate-100 font-sans relative transition-colors duration-300">
        <ThemeProvider>
          {/* Gradient Blobs untuk Latar Belakang */}
          <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
            <div className="absolute top-[-10%] left-[-10%] w-[40rem] h-[40rem] rounded-full bg-[#5a00cf]/10 dark:bg-[#5a00cf]/20 blur-[120px]" />
            <div className="absolute top-[20%] right-[-5%] w-[30rem] h-[30rem] rounded-full bg-blue-400/10 dark:bg-blue-600/20 blur-[100px]" />
            <div className="absolute bottom-[-10%] left-[20%] w-[35rem] h-[35rem] rounded-full bg-emerald-400/10 dark:bg-emerald-600/10 blur-[120px]" />
          </div>

          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}