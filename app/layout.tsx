import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/app/components/Navbar";
import { ThemeProvider } from "@/app/components/ThemeProvider";
import ThemeBackground from "@/app/components/ThemeBackground";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const outfit = Outfit({ variable: "--font-geist", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ridho Maulana | Full-Stack Developer & Media Specialist",
  description:
    "Personal portfolio of Ridho Maulana — Full-Stack Developer focused on building clean, scalable web applications and high-impact digital media strategies.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${inter.variable} ${outfit.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col font-sans relative transition-colors duration-300">
        <ThemeProvider>
          <ThemeBackground />
          <Navbar />
          <div className="relative z-10 flex-1 w-full h-full">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
