import type { Metadata } from "next";
import "./globals.css";

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
        className={` antialiased selection:bg-primary/20 selection:text-primary transition-colors`}
      >
        {children}
      </body>
    </html>
  );
}
