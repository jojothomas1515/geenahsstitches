"use client";

import Image from "next/image";
import Logo from "@/public/geenah_stitches_logo_no_bg.png";
import Link from "next/link";
import { MouseEvent, useRef } from "react";
import { usePathname } from "next/navigation";

const NavLinks = [
  { name: "Home", path: "/" },
  { name: "Collections", path: "/collections" },
  { name: "Our Academy", path: "/academy" },
  { name: "Consultation", path: "/consultation" },
  { name: "Our Store", path: "/store" },
  { name: "Contact Us", path: "/contact" },
  { name: "About", path: "/about" },
];

const Header = () => {
  const pathName = usePathname();

  const overlayRef = useRef(null);
  const navRef = useRef(null);
  const burgerRef = useRef(null);

  function closeButton(ev: MouseEvent<HTMLButtonElement>) {
    const firstChild = ev.currentTarget.firstChild as HTMLElement;
    const mobileNav = ev.currentTarget.nextSibling as HTMLElement;
    const overlay = overlayRef.current as unknown as HTMLDivElement;
    if (firstChild.classList.contains("active")) {
      firstChild.classList.remove("active");
      mobileNav.classList.remove("h-100");
      overlay.classList.add("hidden");
    } else {
      firstChild.classList.add("active");
      mobileNav.classList.add("h-100");
      overlay.classList.remove("hidden");
    }
  }

  function closeNav(ev: MouseEvent<HTMLElement>) {
    const overlay = overlayRef.current as unknown as HTMLDivElement;

    const mobileNav = ev.currentTarget;
    const menuButton = ev.currentTarget.previousSibling
      ?.firstChild as HTMLElement;
    mobileNav.classList.remove("h-100");
    menuButton.classList.remove("active");
    overlay.classList.add("hidden");
  }

  function touchOverlay(ev: MouseEvent<HTMLElement>) {
    const mobileNav = navRef.current as unknown as HTMLDivElement;
    const buttonDiv = burgerRef.current as unknown as HTMLDivElement;
    ev.currentTarget.classList.add("hidden");
    mobileNav.classList.remove("h-100");
    buttonDiv.classList.remove("active");
  }

  return (
    <>
      <div
        className="hidden fixed top-0 left-0 right-0 bottom-0 bg-black opacity-40 z-5"
        ref={overlayRef}
        onClick={touchOverlay}
      ></div>
      <header className="sticky top-0 px-20 py-5 sm:py-5 sm:px-10 bg-amber-100 w-full z-10">
        <div className="flex justify-center md:justify-between">
          <div className="logo-container  w-[200px]">
            <Link href={"/"}>
              <Image src={Logo} alt="Geenah's Stitches Logo" />
            </Link>
          </div>
          <nav className="hidden lg:flex gap-5">
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
          </nav>

          <button
            onClick={closeButton}
            className="nav-btn absolute right-4 top-[50%] -translate-y-[50%] cursor-pointer lg:hidden w-10 h-5"
          >
            {/* <MenuIcon className={""} /> */}
            {/* <CgMenu className="text-4xl" />
          <CgClose className="text-4xl hidden" /> */}
            <div className="" ref={burgerRef}></div>
          </button>
          <nav
            onClick={closeNav}
            ref={navRef}
            className="lg:hidden flex flex-col absolute  top-[100%] bg-amber-100 left-0 right-0 h-0 overflow-hidden transition-all px-4 text-center gap-2.5 z-10"
          >
            {NavLinks.map((link) => {
              return (
                <Link key={link.path} href={link.path}>
                  {link.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;
