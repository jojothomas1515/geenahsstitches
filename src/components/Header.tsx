"use client";

import Image from "next/image";
import Logo from "@/public/geenah_stitches_logo_no_bg.png";
import MenuIcon from "@/public/icons8-menu.svg"
import Link from "next/link";
const Header = () => {
  return (
    <header className="px-20 py-10 sm:py-5 sm:px-10 bg-amber-100 w-ufll relative">
      <div className="flex justify-center md:justify-between ">
        <div className="logo-container  w-[200px]">
          <Link href={"/"}>
            <Image src={Logo} alt="Geenah's Stitches Logo" />
          </Link>
        </div>
        <label htmlFor="dsdj">
          <MenuIcon
            className={
              "absolute right-4 top-[50%] -translate-y-[50%] cursor-pointer lg:hidden w-10"
            }
          />
        </label>
        <input type="checkbox" name="" id="dsdj" hidden className="peer"/>
        <nav className="hidden lg:flex gap-5">
          <Link href="/">Home</Link>
          <Link href="/collections">Collections</Link>
          <Link href="/academy">Our Academy</Link>
          <Link href="consultation">Consultation</Link>
          <Link href="/store">Our Store</Link>
          <Link href="/about">About Us</Link>
        </nav>

        <nav className="lg:hidden flex flex-col absolute  top-[100%] bg-amber-100 left-0 right-0 h-0 peer-checked:h-50 overflow-hidden transition-all px-4 text-center gap-2.5" >
          <Link href="/">Home</Link>
          <Link href="/collections">Collections</Link>
          <Link href="/academy">Our Academy</Link>
          <Link href="consultation">Consultation</Link>
          <Link href="/store">Our Store</Link>
          <Link href="/about">About Us</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
