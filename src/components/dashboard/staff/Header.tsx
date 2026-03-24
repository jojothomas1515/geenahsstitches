import Image from "next/image";
import Link from "next/link";
import Logo from "@/public/geenah_stitches_logo_no_bg.png";
import { LayoutDashboard, Package, ShoppingCart, Layers } from "lucide-react"
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Nav from "../admin/Header/Nav";
import { redirect } from "next/navigation";

const navLinks = [
    { href: "/staff/dashboard", label: "Overview", icon: <LayoutDashboard size={20} /> },
    { href: "/staff/dashboard/products", label: "Inventory", icon: <Package size={20} /> },
    { href: "/staff/dashboard/orders", label: "Orders", icon: <ShoppingCart size={20} /> },
    { href: "/staff/dashboard/collections", label: "Collections", icon: <Layers size={20} /> },
];


export default async function StaffHeader() {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) {
        redirect("/login")
        return <></>
    };

    if (session.user.role === "ADMIN") {
        redirect("/admin/dashboard")
        return <></>
    };

    if (session.user.role === "USER") {
        redirect("/")
        return <></>
    };

    if (session.user.role === "STAFF") {
        return (
            <header className="w-full md:w-80 bg-background/40 backdrop-blur-2xl border-r border-background-light/20 md:h-dvh h-fit p-8 flex flex-col">
                <div className="flex flex-col gap-12 h-full">
                    {/* Logo Section */}
                    <div className="flex items-center justify-center md:justify-start">
                        <Link href={"/"} className="hover:opacity-80 transition-opacity">
                            <Image src={Logo} alt="Logo" width={100} height={40} className="w-32 dark:invert object-contain" />
                        </Link>
                    </div>

                    {/* Navigation */}
                    <div className="flex-1 overflow-y-auto -mx-4 px-4 scrollbar-hide">
                        <Nav navLinks={navLinks} />
                    </div>

                    {/* User Profile Section */}
                    <div className="mt-auto pt-8 border-t border-background-light/20">
                        <div className="flex items-center gap-4 bg-background-light/30 p-4 rounded-3xl border border-background-light/10">
                            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold text-lg">
                                {session.user.name.charAt(0)}
                            </div>
                            <div className="flex flex-col overflow-hidden">
                                <span className="text-sm font-black text-basic truncate">{session.user.name}</span>
                                <span className="text-[10px] font-bold text-primary uppercase tracking-widest">{session.user.role}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        )
    }
}
