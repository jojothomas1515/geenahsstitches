"use client";

import Image from "next/image";
import Logo from "@/public/geenah_stitches_logo_no_bg.png";
import Link from "next/link";
import { MouseEvent, useEffect, useRef } from "react";
const Header = () => {
  function closeButton(ev: MouseEvent<HTMLButtonElement>) {
    const firstChild = ev.currentTarget.firstChild as HTMLElement;
    const mobileNav = ev.currentTarget.nextSibling as HTMLElement;
    if (firstChild.classList.contains("active")) {
      firstChild.classList.remove("active");
      mobileNav.classList.remove("h-100");
    } else {
      firstChild.classList.add("active");
      mobileNav.classList.add("h-100");
    }
  }

  function closeNav(ev: MouseEvent<HTMLElement>) {
    const mobileNav = ev.currentTarget;
    const menuButton = ev.currentTarget.previousSibling
      ?.firstChild as HTMLElement;
    mobileNav.classList.remove("h-100");
    menuButton.classList.remove("active");
  }

  return (
    <header className="fixed top-0 px-20 py-10 sm:py-5 sm:px-10 bg-amber-100 w-full z-10">
      <div className="flex justify-center md:justify-between ">
        <div className="logo-container  w-[200px]">
          <Link href={"/"}>
            <Image src={Logo} alt="Geenah's Stitches Logo" />
          </Link>
        </div>
        <nav className="hidden lg:flex gap-5">
          <Link href="/">Home</Link>{" "}
          {/* <input type="checkbox" name="" id="dsdj" className="peer hidden"/> */}
          <Link href="/collections">Collections</Link>
          <Link href="/academy">Our Academy</Link>
          <Link href="consultation">Consultation</Link>
          <Link href="/store">Our Store</Link>
          <Link href="/about">About Us</Link>
        </nav>

        <button
          onClick={closeButton}
          className="nav-btn absolute right-4 top-[50%] -translate-y-[50%] cursor-pointer lg:hidden w-10 h-5"
        >
          {/* <MenuIcon className={""} /> */}
          {/* <CgMenu className="text-4xl" />
          <CgClose className="text-4xl hidden" /> */}
          <div className=""></div>
        </button>
        <nav
          onClick={closeNav}
          className="lg:hidden flex flex-col absolute  top-[100%] bg-amber-100 left-0 right-0 h-0 overflow-hidden transition-all px-4 text-center gap-2.5 z-10"
        >
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
