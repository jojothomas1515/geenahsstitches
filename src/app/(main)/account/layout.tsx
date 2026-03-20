import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function AccountLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) {
        redirect("/login?referrer=/account");
    }
    return (
        <main className="min-h-screen text-basic">
            {children}
        </main>
    )
}