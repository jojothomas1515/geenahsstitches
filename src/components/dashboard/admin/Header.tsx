import Image from "next/image";
import Link from "next/link";
import Logo from "@/public/geenah_stitches_logo_no_bg.png";
import { LayoutDashboard, Package, ShoppingCart, Users } from "lucide-react"
import NavLink from "@/components/dashboard/admin/Header/NavLink";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const navLinks = [
    { href: "/admin/dashboard", label: "Dashboard", icon: <LayoutDashboard size={20} /> },
    { href: "/admin/dashboard/products", label: "Products", icon: <Package size={20} /> },
    { href: "/admin/dashboard/orders", label: "Orders", icon: <ShoppingCart size={20} /> },
    { href: "/admin/dashboard/users", label: "Users", icon: <Users size={20} /> },
];


export default async function AdminHeader() {
    const session = await auth.api.getSession({ headers: await headers() });
    console.log(session)

    return (
        <header className="w-3/10  bg-background h-dvh p-5 ">
            <div className="w-full flex gap-10 p-5 flex-col mt-10">
                <div className="flex items-center gap-2">
                    <Link href={"/"}><Image src={Logo} alt="Logo" width={1000} height={1000} className="w-60!  dark:invert object-contain" /></Link>
                </div>


                <nav className="flex gap-5 flex-col">
                    {navLinks.map((link) => (
                        <NavLink key={link.href} href={link.href} label={link.label} icon={link.icon} />
                    ))}
                </nav>
            </div>
        </header>
    )
}