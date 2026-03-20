import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

export default async function AuthLayout({ children }: { children: React.ReactNode }): Promise<React.JSX.Element> {
    const session = await auth.api.getSession({ headers: await headers() });
    if (session) {
        if (session.user.role === "ADMIN") {
            redirect("/admin/dashboard");
        }
        else if (session.user.role === "USER") {
            redirect("/");
        }
        else if (session.user.role === "STAFF") {
            redirect("/staff/dashboard");
        }
    }
    return (
        <>
            {children}
        </>
    );
}