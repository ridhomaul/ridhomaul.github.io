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
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}