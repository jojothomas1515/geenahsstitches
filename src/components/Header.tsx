"use client";

import Image from "next/image";
import Logo from "@/public/geenah_stitches_logo_no_bg.png";
import Link from "next/link";
import { MouseEvent, useRef } from "react";
import { usePathname } from "next/navigation";
import MobileNav from "./header/MobileNav";

const NavLinks = [
  { name: "Home", path: "/" },
  { name: "Collections", path: "/collections" },
  // { name: "Our Academy", path: "/academy" },
  { name: "Consultation", path: "/consultation" },
  { name: "Our Store", path: "/store" },
  { name: "Contact Us", path: "/contact" },
  { name: "About", path: "/about" },
];

const Header = () => {
  const pathName = usePathname();

  return (
    <>
      <header className="sticky top-0">
        <div className="bg-white w-full px-5 md:px-20 py-5 sm:py-5 sm:px-10  shadow-md z-10">
          <div className="flex justify-center items-center md:justify-between w-full">
            <div className="logo-container  w-[200px]">
              <Link href={"/"}>
                <Image src={Logo} alt="Geenah's Stitches Logo" />
              </Link>
            </div>
            {/* <nav className="hidden lg:flex gap-5">
            {NavLinks.map((link) => {
              return (
                <Link
                  key={link.path}
                  href={link.path}
                  className={
                    pathName === link.path
                      ? "border-b-2 border-[var(--primary)]"
                      : "hover:border-b-2 hover:border-amber-300"
                  }
                >
                  {link.name}
                </Link>
              );
            })}
          </nav> */}
            <MobileNav />
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
