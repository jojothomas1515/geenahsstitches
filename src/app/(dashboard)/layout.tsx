import { Metadata } from "next";
import { Lato } from "next/font/google";
import "../(main)/globals.css";
import AdminHeader from "@/components/dashboard/admin/Header";


const lato = Lato({
    subsets: ["latin"],
    weight: ["100", "300", "400", "700", "900"],
});

export const metadata: Metadata = {
    title: {
        default: "Geenahs Stitches - Admin Dashboard",
        template: "GS Admin Dashboard - %s"
    },
    keywords: ["Geenahs Stitches", "Fashion", "Atelier", "Bespoke Tailoring", "Elegant Designs", "Timeless Fashion", "Made Just For You"],
    description: "Welcome to our fashion atelier — where style meets craftsmanship. Explore bespoke tailoring, elegant designs, and timeless fashion made just for you.",
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={`${lato.className} antialiased bg-background-dark flex`}>
                <AdminHeader />
                {children}
            </body>
        </html>
    );
}