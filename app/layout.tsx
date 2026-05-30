import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar"
import WindParticles from "@/components/WindParticles";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AG - Akademi OSN Informatika",
  description: "Platform belajar OSN Informatika SMA - Dari OSN Kota hingga IOI. Algoritma, Struktur Data, dan Pemrograman Kompetitif.",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex text-slate-200" suppressHydrationWarning
        style={{ background: 'var(--bg)', color: 'var(--fg)' }}>
        <WindParticles />
        <Sidebar />
        <main className="flex-1 min-h-screen ml-0 md:ml-64 transition-all duration-300 relative z-10">
          {children}
        </main>
      </body>
    </html>
  );
}
