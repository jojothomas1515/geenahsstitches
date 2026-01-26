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

  function handleScroll() {
    console.log(window.scrollY);
    if (window.scrollY > 200) {
      setIsSrolled(true);
    } else {
      setIsSrolled(false);
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
          y: isSrolled ? "-100%" : "0%",
         
        }}
        // transition={{ duration: 0.5 }}
        className={`sticky md:fixed md:left-5 md:right-5 md:top-5 top-0 `}
      >
        <div className="bg-white md:bg-[rgba(255,255,255,.5)] md:backdrop-blur-xl w-full px-5 md:px-20 py-5 sm:py-5 sm:px-10  shadow-md z-10">
          <div className="flex justify-center items-center md:justify-between w-full">
            <div className="logo-container  w-[200px]">
              <Link href={"/"}>
                <Image src={Logo} alt="Geenah's Stitches Logo" />
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
