import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import Link from "next/link";
import { ArrowLeft, Settings, ShieldCheck, User } from "lucide-react";
import ProfileForm from "@/components/main/account/ProfileForm";
import PasswordForm from "@/components/main/account/PasswordForm";
import { redirect } from "next/navigation";

export default async function AccountSettingsPage() {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) redirect("/login?referrer=/account/settings");

    const user = await prisma.user.findUnique({
        where: { id: session.user.id },
        select: { name: true, email: true, phone: true },
    });

    if (!user) redirect("/login");

    return (
        <main className="min-h-screen bg-background text-basic pb-24">
            {/* Hero */}
            <section className="relative overflow-hidden bg-background-dark py-16 sm:py-22 border-b border-primary/10">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-linear-to-bl from-primary/10 to-transparent pointer-events-none" />
                <div className="max-w-4xl mx-auto px-6 relative z-10 space-y-4">
                    <Link
                        href="/account"
                        className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted hover:text-primary transition-colors"
                    >
                        <ArrowLeft className="w-3 h-3" /> Back to Account
                    </Link>
                    <h1 className="text-4xl sm:text-5xl font-black tracking-tighter italic">
                        Account <span className="text-primary not-italic">Settings</span>
                    </h1>
                    <p className="text-sm text-muted max-w-sm">
                        Manage your personal information and keep your account secure.
                    </p>
                </div>
            </section>

            <div className="max-w-4xl mx-auto px-6 py-12 space-y-10">
                {/* Profile Info Card */}
                <section className="bg-background-light border border-primary/20 rounded-3xl overflow-hidden shadow-xl shadow-basic/5">
                    <header className="flex items-center gap-3 px-8 py-6 border-b border-primary/10 bg-primary/5">
                        <div className="w-9 h-9 rounded-xl bg-primary/20 flex items-center justify-center">
                            <User className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                            <h2 className="text-sm font-black tracking-tight">Profile Information</h2>
                            <p className="text-[10px] text-muted font-medium">Update your name and phone number</p>
                        </div>
                        <div className="ml-auto">
                            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-muted bg-background px-3 py-1.5 rounded-full border border-primary/10">
                                {user.email}
                            </span>
                        </div>
                    </header>
                    <div className="p-8">
                        <ProfileForm name={user.name} phone={user.phone ?? ""} />
                    </div>
                </section>

                {/* Change Password Card */}
                <section className="bg-background-light border border-primary/20 rounded-3xl overflow-hidden shadow-xl shadow-basic/5">
                    <header className="flex items-center gap-3 px-8 py-6 border-b border-primary/10 bg-primary/5">
                        <div className="w-9 h-9 rounded-xl bg-basic/10 flex items-center justify-center">
                            <ShieldCheck className="w-4 h-4 text-basic" />
                        </div>
                        <div>
                            <h2 className="text-sm font-black tracking-tight">Change Password</h2>
                            <p className="text-[10px] text-muted font-medium">Keep your account secure with a strong password</p>
                        </div>
                    </header>
                    <div className="p-8">
                        <PasswordForm />
                    </div>
                </section>

                {/* Danger Zone */}
                <section className="border border-red-500/20 bg-red-500/5 rounded-3xl p-8">
                    <h3 className="text-sm font-black tracking-tight text-red-500/80 mb-1">Danger Zone</h3>
                    <p className="text-[11px] text-muted mb-6">
                        Need to delete your account? Contact our support team and we&apos;ll handle it promptly.
                    </p>
                    <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-red-500/70 hover:text-red-500 border border-red-500/20 hover:border-red-500/40 rounded-xl px-5 py-3 transition-all"
                    >
                        <Settings className="w-3 h-3" />
                        Contact Support to Delete Account
                    </Link>
                </section>
            </div>
        </main>
    );
}
