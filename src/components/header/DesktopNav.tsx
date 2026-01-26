"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DesktopNav({
  NavLinks,
}: {
  NavLinks?: Array<{ name: string; href: string }>;
}) {
  const pathName = usePathname();
  return (
    <nav className="hidden md:flex gap-5">
      {NavLinks &&
        NavLinks.map((link) => {
          return (
            <Link
              key={link.href}
              href={link.href}
              className={` relative after:w-0 after:left-0 after:h-0.5 after:content-['']  after:top-full after:absolute after:transition-all after:duration-500 hover:after:w-full ${
                pathName === link.href
                  ? "after:w-full after:bg-amber-300"
                  : " hover:after:w-full after:bg-black"
              }
              `}
            >
              {link.name}
            </Link>
          );
        })}
    </nav>
  );
}
