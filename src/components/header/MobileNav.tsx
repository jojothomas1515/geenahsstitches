"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";

const NavLinks = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Collections",
    href: "/collections",
  },
  {
    name: "Our Academy",
    href: "/academy",
  },
  {
    name: "Consultation",
    href: "/consultation",
  },
  {
    name: "Our Store",
    href: "/store",
  },
  {
    name: "Contact Us",
    href: "/contact",
  },
  {
    name: "About",
    href: "/about",
  },
];

export default function MobileNav(): React.JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  function toggleNav() {
    setIsOpen(!isOpen);
  }

  return (
    <>
      <button
        onClick={toggleNav}
        className="md:hidden ml-auto rounded shadow p-2"
      >
        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ y: "-100%" }}
            animate={{ y: "0%" }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.3 }}
            className="absolute bg-white w-full left-0 top-full -z-10"
          >
            <ul className="container px-4 flex gap-2 flex-col py-4 shadow">
              {NavLinks.map((link) => {
                return (
                  <li key={link.href} className="" onClick={toggleNav}>
                    <Link href={link.href} className="block p-2 py-1">{link.name}</Link>
                  </li>
                );
              })}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
