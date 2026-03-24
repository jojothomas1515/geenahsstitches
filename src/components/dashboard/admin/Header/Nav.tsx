"use client";
import { Menu, LogOut } from "lucide-react";
import { logout } from "@/actions/auth.actions";
import NavLink from "./NavLink";
import { useState } from "react";

export default function Nav({ navLinks }: { navLinks: { href: string; label: string; icon: React.ReactNode }[] }) {
    const [open, setOpen] = useState(false);
    return (
        <>

            <div className="md:hidden flex items-center justify-between gap-4">
                <button className="flex items-center gap-2 flex-1" onClick={() => setOpen(!open)}>
                    <Menu size={20} />
                    <span className="text-lg font-medium">Menu</span>
                </button>
                <form action={logout}>
                    <button type="submit" className="p-2 text-muted hover:text-red-500 transition-colors">
                        <LogOut size={20} />
                    </button>
                </form>
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