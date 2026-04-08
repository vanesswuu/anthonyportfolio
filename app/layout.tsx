import type { Metadata } from "next";
import { Inter, Syne, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-body" });
const syne = Syne({ subsets: ["latin"], variable: "--font-heading" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-accent" });

export const metadata: Metadata = {
  title: "Anthony Leuterio | Real Estate Coaching",
  description: "Scale your real estate legacy with the Philippines' premier mentor.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${syne.variable} ${playfair.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
