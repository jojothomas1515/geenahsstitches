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
        className={`sticky lg:fixed lg:left-5 lg:right-5 lg:top-5 top-0 z-10`}
      >
        {session && (
          session.user.role === "ADMIN" && (<>
            <div className="w-full bg-primary/75 text-basic p-2 py-1 lg:rounded flex items-center justify-center">
              <p>You are currently logged in as an admin</p><Link href="/admin/dashboard" className="ml-2 underline">Go to admin dashboard</Link>
            </div>
          </>)
          ||
          session.user.role === "STAFF" && (<>
            <div className="w-full bg-primary/75 text-basic p-2 py-1 lg:rounded flex items-center justify-center">
              <p>You are currently logged in as a staff</p><Link href="/staff/dashboard" className="ml-2 underline">Go to admin dashboard</Link>
            </div>
          </>)

        )}
        <div className="bg-primary lg:bg-primary/50  dark:bg-primary-dark lg:dark:bg-primary-dark/50 lg:backdrop-blur-sm w-full px-5 lg:px-5 py-5 sm:py-5 sm:px-5  shadow-md z-10 lg:rounded text-basic">
          <div className="flex items-center lg:justify-between w-full gap-2">
            <div className="logo-container  w-[200px]">
              <Link href={"/"}>
                <Image src={Logo} alt="Geenah's Stitches Logo" className="dark:invert-75" />
              </Link>
            </div>
            <DesktopNav NavLinks={NavLinks} />

            <div className="flex items-center gap-4 ml-auto lg:ml-0">
              <Link href="/cart">
                <ShoppingCart className="w-6 h-6" />
              </Link>
              <Link href="/account" style={{ anchorName: "--account" }}>
                <User className="w-6 h-6" />
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
