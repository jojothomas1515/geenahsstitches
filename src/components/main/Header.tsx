"use client";

import Image from "next/image";
import Logo from "@/public/geenah_stitches_logo_no_bg.png";
import Link from "next/link";
import MobileNav from "./header/MobileNav";
import DesktopNav from "./header/DesktopNav";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Session } from "@/lib/auth";
import { User, ShoppingCart } from "lucide-react";

const NavLinks = [
  { name: "Home", href: "/" },
  { name: "Collections", href: "/collections" },
  // { name: "Our Academy", href: "/academy" },
  { name: "Consultation", href: "/consultation" },
  { name: "Our Store", href: "/store" },
  { name: "Contact Us", href: "/contact" },
  { name: "About", href: "/about" },
];

const Header = ({ session }: { session: Session | null }) => {

  const [isSrolled, setIsSrolled] = useState(false);
  // initial window scroll position is 0
  let prevY = 0;

  function handleScroll() {
    // get the current scroll position
    const currentY = window.scrollY;

    // check that the current scroll position is different by 100 then hide the bar
    if (currentY - prevY >= 70) {
      setIsSrolled(true);
    }
    // checks that we're scrolling to the top
    else if (currentY - prevY <= -70 || currentY <= 80) {
      setIsSrolled(false);
    }
    if (currentY - prevY >= 70 || prevY - currentY >= 70) {
      console.log("prevY", prevY);
      console.log("currentY", currentY);
      prevY = currentY;
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <motion.header
        // initial={{ y: "-100%", position: "fixed" }}
        animate={{
          y: isSrolled ? "-110%" : "0%",
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`sticky lg:fixed lg:left-5 lg:right-5 lg:top-5 top-0 z-50`}
      >
        {session && (
          session.user.role === "ADMIN" && (
            <div className="w-full bg-primary text-white p-3 lg:rounded-t flex items-center justify-center text-[10px] font-bold uppercase tracking-widest">
              <p>LoggedIn: ADMIN</p>
              <Link href="/admin/dashboard" className="ml-4 underline hover:text-white/80 transition-colors">
                Control Panel
              </Link>
            </div>
          )
          ||
          session.user.role === "STAFF" && (
            <div className="w-full bg-primary text-white p-3 lg:rounded-t flex items-center justify-center text-[10px] font-bold uppercase tracking-widest">
              <p>LoggedIn: STAFF</p>
              <Link href="/staff/dashboard" className="ml-4 underline hover:text-white/80 transition-colors">
                Staff Dashboard
              </Link>
            </div>
          )
        )}
        <div className="bg-background lg:bg-background/50 lg:backdrop-blur-xl border border-background-dark/0 w-full px-8 py-5 shadow-2xl shadow-basic/5 lg:rounded-b text-basic">
          <div className="flex items-center lg:justify-between w-full gap-8">
            <div className="logo-container w-[180px] group transition-all duration-500 hover:scale-105">
              <Link href={"/"}>
                <Image src={Logo} alt="Geenah's Stitches Logo" className="dark:brightness-100 dark:invert" />
              </Link>
            </div>
            <DesktopNav NavLinks={NavLinks} />

            <div className="flex items-center gap-6 ml-auto lg:ml-0">
              <Link href="/cart" className="relative group">
                <ShoppingCart className="w-5 h-5 group-hover:text-primary transition-colors" />
                <span className="absolute -top-2 -right-2 bg-primary text-white text-[8px] font-black w-4 h-4 rounded-full flex items-center justify-center border-2 border-background">0</span>
              </Link>
              <Link href="/account" className="group">
                <User className="w-5 h-5 group-hover:text-primary transition-colors" />
              </Link>
            </div>

            <MobileNav NavLinks={NavLinks} />
          </div>
        </div>
      </motion.header>
    </>
  );
};

export default Header;
