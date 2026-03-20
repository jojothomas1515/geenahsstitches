"use client"
import Link from 'next/link';
import Image from 'next/image';
import Logo from '@/public/geenah_stitches_logo_no_bg.png';
import { login } from '@/actions/auth.actions';
import { useActionState } from 'react';


const initialState: { error: string | null } = {
    error: null,
}


export default function LoginPage() {
    const [state, formAction] = useActionState(login, initialState);

    return (
        <div className="min-h-screen flex items-center justify-center bg-background-dark p-4 sm:p-8 font-sans">
            <div className="w-full max-w-md bg-background-light rounded-2xl shadow-2xl overflow-hidden border border-background-dark transition-all">

                {/* Header Block in dark background */}
                <div className="bg-background px-8 py-10 pb-2 text-center">
                    <div className="flex justify-center mb-6">
                        <Image
                            src={Logo}
                            alt="Geenahs Stitches Logo"
                            width={1000}
                            height={1000}
                            className="block w-4/5! dark:invert-75"
                        />
                    </div>
                    <h1 className="text-2xl font-bold text-basic mb-2 tracking-tight">Access Account</h1>
                    <p className="text-muted text-sm px-4">Sign in with your email and password to continue</p>
                </div>

                {/* Form Block in light background */}
                <div className="px-8 py-8 space-y-5 bg-background">
                    <form className="space-y-5" action={formAction}>
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-semibold text-basic mb-1.5 pl-1"
                            >
                                Email Address
                            </label>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                className="w-full px-4 py-3 rounded-xl bg-background-light border border-background-dark text-basic placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                placeholder="name@example.com"
                                required
                            />
                        </div>


                        <div>
                            <div className="flex items-center justify-between mb-1.5 px-1">
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-semibold text-basic"
                                >
                                    Password
                                </label>
                                <Link href="/forgot-password" className="text-sm font-medium text-muted hover:text-basic transition-colors">
                                    Forgot password?
                                </Link>
                            </div>
                            <input
                                id="password"
                                type="password"
                                name="password"
                                className="w-full px-4 py-3 rounded-xl bg-background-light border border-background-dark text-basic placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                placeholder="••••••••"
                                required
                            />
                        </div>


                        <div className="flex items-center pt-2 pl-1">
                            <input
                                id="remember"
                                type="checkbox"
                                name="remember-me"
                                className="h-4 w-4 bg-background border-background-dark rounded text-primary focus:ring-primary primary-primary transition-all cursor-pointer"
                            />
                            <label htmlFor="remember" className="ml-2 block text-sm text-muted cursor-pointer select-none">
                                Remember me for 30 days
                            </label>
                        </div>
                        {state.error && (
                            <p className="text-red-500 text-sm mt-2">{state.error}</p>
                        )}

                        <button
                            type="submit"
                            className="w-full py-3.5 px-4 mt-8 bg-background-light text-basic hover:bg-background-dark hover:text-basic font-bold rounded-xl shadow-[0px_4px_20px_rgba(0,0,0,0.05)] hover:shadow-none transition-all duration-200 border border-transparent hover:border-basic flex items-center justify-center gap-2"
                        >
                            Sign In
                        </button>
                    </form>

                    <div className="pt-6 border-t border-background-dark text-center">
                        <p className="text-sm text-muted">
                            Don&apos;t have an account?{' '}
                            <Link href="/register" className="font-semibold text-basic hover:underline transition-all">
                                Create one now
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
