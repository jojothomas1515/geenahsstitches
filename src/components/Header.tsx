"use client";

import Image from "next/image";
import Logo from "@/public/geenah_stitches_logo_no_bg.png";
import Link from "next/link";
import MobileNav from "./header/MobileNav";
import DesktopNav from "./header/DesktopNav";
import { useEffect, useState } from "react";
import { motion } from "motion/react";

const NavLinks = [
  { name: "Home", href: "/" },
  { name: "Collections", href: "/collections" },
  // { name: "Our Academy", href: "/academy" },
  { name: "Consultation", href: "/consultation" },
  { name: "Our Store", href: "/store" },
  { name: "Contact Us", href: "/contact" },
  { name: "About", href: "/about" },
];

const Header = () => {
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
        className={`sticky md:fixed md:left-5 md:right-5 md:top-5 top-0 z-10`}
      >
        <div className="bg-primary md:bg-primary/50  dark:bg-primary-dark md:dark:bg-primary-dark/50 md:backdrop-blur-sm w-full px-5 md:px-20 py-5 sm:py-5 sm:px-10  shadow-md z-10 md:rounded text-basic">
          <div className="flex justify-center items-center md:justify-between w-full">
            <div className="logo-container  w-[200px]">
              <Link href={"/"}>
                <Image src={Logo} alt="Geenah's Stitches Logo" className="invert-75"/>
              </Link>
            </div>
            <DesktopNav NavLinks={NavLinks} />
            <MobileNav NavLinks={NavLinks} />
          </div>
        </div>
      </motion.header>
    </>
  );
};

export default Header;
