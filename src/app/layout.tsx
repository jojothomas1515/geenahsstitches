import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";

const lato = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
  variable: "--font-lato",
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
        className={`${lato.className} antialiased selection:bg-primary/20 selection:text-primary transition-colors`}
      >
        {children}
      </body>
    </html>
  );
}
