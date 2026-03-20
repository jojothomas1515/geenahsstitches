"use client";
import { Menu } from "lucide-react";
import NavLink from "./NavLink";
import { useState } from "react";

export default function Nav({ navLinks }: { navLinks: { href: string; label: string; icon: React.ReactNode }[] }) {
    const [open, setOpen] = useState(false);
    return (
        <>

            <div className="md:hidden">
                <button className="w-full flex items-center gap-2" onClick={() => setOpen(!open)}>
                    <span className="text-lg font-medium">Menu</span>
                    <Menu size={20} />
                </button>
            </div>
            <nav className={`absolute md:static gap-2 flex-col   ${open ? "flex" : "hidden"} md:flex bg-background nav-anc`}>
                {navLinks.map((link) =>
                (
                    <NavLink key={link.href} href={link.href} label={link.label} icon={link.icon} />
                ))}
            </nav>
        </>
    )
}