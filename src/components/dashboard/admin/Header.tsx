import Image from "next/image";
import Link from "next/link";
import Logo from "@/public/geenah_stitches_logo_no_bg.png";
import { LayoutDashboard, Package, ShoppingCart, Users, Layers } from "lucide-react"
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Nav from "./Header/Nav";
import { redirect } from "next/navigation";

const navLinks = [
    { href: "/admin/dashboard", label: "Dashboard", icon: <LayoutDashboard size={20} /> },
    { href: "/admin/dashboard/products", label: "Products", icon: <Package size={20} /> },
    { href: "/admin/dashboard/orders", label: "Orders", icon: <ShoppingCart size={20} /> },
    { href: "/admin/dashboard/collections", label: "Collections", icon: <Layers size={20} /> },
    { href: "/admin/dashboard/users", label: "Users", icon: <Users size={20} /> },
];


export default async function AdminHeader() {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) {
        redirect("/login")
        return <></>
    };

    if (session.user.role === "STAFF") {
        redirect("/staff/dashboard")
        return <></>
    };

    if (session.user.role === "USER") {
        redirect("/")
        return <></>
    };

    if (session.user.role === "ADMIN") {
        return (
            <header className="w-full md:w-3/10  bg-background md:h-dvh h-fit p-5 " style={{ anchorName: "--header" }}>
                <div className="w-full flex gap-10 md:p-5 md:flex-col md:justify-normal justify-between flex-row md:mt-10">
                    <div className="flex items-center gap-2">
                        <Link href={"/"}><Image src={Logo} alt="Logo" width={1000} height={1000} className="w-60!  dark:invert object-contain" /></Link>
                    </div>

                    <Nav navLinks={navLinks} />
                </div>
            </header>
        )
    }
}