import Image from "next/image"
import Link from "next/link"
import Logo from "@/public/geenah_stitches_logo_no_bg.png"
import { LayoutDashboard, Package, ShoppingCart, Users } from "lucide-react"

export default function AdminHeader() {
    return (
        <header className="w-3/10  bg-background h-dvh p-5 ">
            <div className="w-full flex gap-10 p-5 flex-col mt-10">
                <div className="flex items-center gap-2">
                    <Link href={"/"}><Image src={Logo} alt="Logo" width={1000} height={1000} className="w-60!  dark:invert object-contain" /></Link>
                </div>


                <nav className="flex gap-5 flex-col">
                    <Link href="/admin/dashboard" className="text-lg font-medium flex items-center gap-2"><LayoutDashboard size={20} /> Dashboard</Link>
                    <Link href="/admin/dashboard/products" className="text-lg font-medium flex items-center gap-2"><Package size={20} /> Products</Link>
                    <Link href="/admin/dashboard/orders" className="text-lg font-medium flex items-center gap-2"><ShoppingCart size={20} /> Orders</Link>
                    <Link href="/admin/dashboard/customers" className="text-lg font-medium flex items-center gap-2"><Users size={20} /> Customers</Link>
                </nav>
            </div>
        </header>
    )
}