import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/app/components/Navbar";
import { ThemeProvider } from "@/app/components/ThemeProvider";
import AnimatedGradient from "@/components/ui/animated-gradient";

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
          <div className="fixed inset-0 -z-10 w-full h-full pointer-events-none">
            <AnimatedGradient config={{ preset: "Aurora" }} />
          </div>
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
