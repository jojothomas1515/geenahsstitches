import type { Metadata } from "next";
import { Lato, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/main/Header";
import Footer from "@/components/main/Footer";

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Geenahs Stitches",
  description:
    "Welcome to our fashion atelier — where style meets craftsmanship. Explore bespoke tailoring, elegant designs, and timeless fashion made just for you.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${lato.variable}! ${geistSans.variable} ${geistMono.variable} antialiased relative`}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
