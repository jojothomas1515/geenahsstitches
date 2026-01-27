"use client";

import { AnimatePresence, motion, stagger } from "motion/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

export default function MobileNav({
  NavLinks,
}: {
  NavLinks?: Array<{ name: string; href: string }>;
}): React.JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  function toggleNav() {
    setIsOpen(!isOpen);
  }

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  return (
    <>
      <AnimatePresence>
        <motion.button
          initial={{ y: "-100%" }}
          animate={{ y: "0%" }}
          transition={{ duration: 0.5 }}
          onClick={toggleNav}
          className="md:hidden ml-auto rounded shadow p-2"
        >
          {isOpen ? (
            <motion.svg
              key={"1"}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              initial={{ y: "-50%", scaleY: 0 }}
              animate={{ y: "0%", scaleY: 1 }}
              transition={{ duration: 0.3 }}
              className={"h-6 w-6"}
            >
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </motion.svg>
          ) : (
            <motion.svg
              key={"2"}
              initial={{ y: "50%", scaleY: 0 }}
              animate={{ y: "0%", scaleY: 1 }}
              transition={{ duration: 0.3 }}
              className="h-6 w-6"
            >
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </motion.svg>
          )}
        </motion.button>
      </AnimatePresence>
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ y: "-100%" }}
            animate={{ y: "0%", height: "100dvh" }}
            exit={{ y: "-100%" }}
            transition={{
              duration: 0.3,
            }}
            className="md:hidden bg-secondary absolute w-full left-0 top-full -z-10"
          >
            <ul
              className="container px-4 flex gap-2 flex-col py-4 overflow-hidden"

            >
              {NavLinks &&
                NavLinks.map((link) => {
                  return (
                    <motion.li
                      initial={{ x: "-80%" }}
                      animate={{ x: "0%" }}
                      transition={{ duration: 0.3, delay: 0.1}}
                      key={link.href}
                      className=""
                      onClick={toggleNav}
                    >
                      <Link href={link.href} className="block p-2 py-1">
                        {link.name}
                      </Link>
                    </motion.li>
                  );
                })}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
