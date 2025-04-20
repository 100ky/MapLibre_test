// Import typů a fontů z Next.js a globálního CSS
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// Inicializace fontů Geist (sans a mono)
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Metadata aplikace (název a popis)
export const metadata: Metadata = {
  title: "Mapa spaloven ČR",
  description: "Interaktivní mapa spaloven odpadu v České republice",
};

// Hlavní layout komponenta aplikace
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Všechny podřízené komponenty budou zde vykresleny */}
        {children}
      </body>
    </html>
  );
}
// Konec souboru layout.tsx
