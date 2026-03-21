import Image from "next/image";
import Link from "next/link";
import Logo from "@/public/geenah_stitches_logo_no_bg.png";
import { LayoutDashboard, Package, ShoppingCart } from "lucide-react"
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Nav from "./Header/Nav";

const navLinks = [
    { href: "/staff/dashboard", label: "Dashboard", icon: <LayoutDashboard size={20} /> },
    { href: "/staff/dashboard/products", label: "Products", icon: <Package size={20} /> },
    { href: "/staff/dashboard/orders", label: "Orders", icon: <ShoppingCart size={20} /> },
];


export default async function StaffHeader() {
    const session = await auth.api.getSession({ headers: await headers() });
    console.log(session)

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
