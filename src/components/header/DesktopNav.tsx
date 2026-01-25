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
              className={
                pathName === link.href
                  ? "border-b-2 border-[var(--primary)]"
                  : "hover:border-b-2 hover:border-amber-300"
              }
            >
              {link.name}
            </Link>
          );
        })}
    </nav>
  );
}
