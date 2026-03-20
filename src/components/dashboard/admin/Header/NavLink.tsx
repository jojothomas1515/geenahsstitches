"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

function NavLink({ href, label, icon }: { href: string; label: string; icon: React.ReactNode }) {
    const pathname = usePathname();
    const isActive = pathname === href;
    return (
        <Link href={href} className={`text-lg font-medium flex items-center gap-2 p-2 rounded-md ${isActive ? "bg-primary text-white" : ""}`}>{icon} {label}</Link>
    )
}

export default NavLink;