import type { Metadata } from "next";
import { Cinzel, Hanken_Grotesk, Space_Grotesk, Space_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({ variable: "--font-space-grotesk", subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] });
const hankenGrotesk = Hanken_Grotesk({ variable: "--font-hanken-grotesk", subsets: ["latin"], weight: ["300", "400", "500", "600"] });
const spaceMono = Space_Mono({ variable: "--font-space-mono", subsets: ["latin"], weight: ["400", "700"] });
const cinzel = Cinzel({ variable: "--font-cinzel", subsets: ["latin"], weight: ["400", "600", "700"] });

export const metadata: Metadata = {
  title: "KITAN [DEV.SH] — Full-Stack Developer & Systems Architect",
  description: "Portfolio of Kitan Aderounmu — an independent developer building websites, products, and game systems from idea to interface to shipped.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${hankenGrotesk.variable} ${spaceMono.variable} ${cinzel.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-foreground">{children}</body>
    </html>
  );
}
