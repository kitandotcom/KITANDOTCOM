import type { Metadata } from "next";
import { DM_Mono, Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({ variable: "--font-manrope", subsets: ["latin"], weight: ["400", "500", "600", "700"] });
const dmMono = DM_Mono({ variable: "--font-dm-mono", subsets: ["latin"], weight: ["400", "500"] });

export const metadata: Metadata = {
  title: "KITAN [DEV.SH] — Full-Stack Developer & Systems Architect",
  description: "Portfolio of Kitan Aderounmu — an independent developer building websites, products, and game systems from idea to interface to shipped.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return <html lang="en" className={`${manrope.variable} ${dmMono.variable} h-full antialiased`}><body className="min-h-full flex flex-col bg-background text-foreground">{children}</body></html>;
}
