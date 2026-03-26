"use client";

import { useActionState, useRef } from "react";
import { changePassword } from "@/actions/user.actions";
import type { PasswordActionState } from "@/actions/user.actions";
import { Lock, Eye, EyeOff, AlertCircle, Loader, ShieldCheck } from "lucide-react";
import { useState } from "react";

const initialState: PasswordActionState = {};

export default function PasswordForm() {
    const [state, action, isPending] = useActionState(changePassword, initialState);
    const formRef = useRef<HTMLFormElement>(null);
    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    // Reset form on success
    if (state.success && formRef.current) {
        formRef.current.reset();
    }

    return (
        <form ref={formRef} action={action} className="space-y-6">
            {/* Success / Error banners */}
            {state.success && (
                <div className="flex items-center gap-3 bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400 rounded-2xl px-5 py-4 text-sm font-medium">
                    <ShieldCheck className="w-5 h-5 shrink-0" />
                    Password changed successfully!
                </div>
            )}
            {state.error && (
                <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 rounded-2xl px-5 py-4 text-sm font-medium">
                    <AlertCircle className="w-5 h-5 shrink-0" />
                    {state.error}
                </div>
            )}

            {/* Current Password */}
            <div className="space-y-2">
                <label htmlFor="currentPassword" className="text-[10px] font-black uppercase tracking-widest text-muted flex items-center gap-2">
                    <Lock className="w-3 h-3" /> Current Password
                </label>
                <div className="relative">
                    <input
                        id="currentPassword"
                        name="currentPassword"
                        type={showCurrent ? "text" : "password"}
                        disabled={isPending}
                        className="w-full bg-background border border-primary/20 rounded-xl px-4 py-3 pr-12 text-sm font-medium focus:outline-none focus:border-primary transition-colors placeholder:text-muted/40 disabled:opacity-50"
                        placeholder="Enter current password"
                    />
                    <button
                        type="button"
                        onClick={() => setShowCurrent(v => !v)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-muted hover:text-primary transition-colors"
                    >
                        {showCurrent ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                </div>
                {state.errors?.currentPassword && (
                    <p className="text-[11px] text-red-500 font-medium">{state.errors.currentPassword[0]}</p>
                )}
            </div>

            {/* New Password */}
            <div className="space-y-2">
                <label htmlFor="newPassword" className="text-[10px] font-black uppercase tracking-widest text-muted flex items-center gap-2">
                    <Lock className="w-3 h-3" /> New Password
                </label>
                <div className="relative">
                    <input
                        id="newPassword"
                        name="newPassword"
                        type={showNew ? "text" : "password"}
                        disabled={isPending}
                        className="w-full bg-background border border-primary/20 rounded-xl px-4 py-3 pr-12 text-sm font-medium focus:outline-none focus:border-primary transition-colors placeholder:text-muted/40 disabled:opacity-50"
                        placeholder="At least 6 characters"
                    />
                    <button
                        type="button"
                        onClick={() => setShowNew(v => !v)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-muted hover:text-primary transition-colors"
                    >
                        {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                </div>
                {state.errors?.newPassword && (
                    <p className="text-[11px] text-red-500 font-medium">{state.errors.newPassword[0]}</p>
                )}
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
                <label htmlFor="confirmPassword" className="text-[10px] font-black uppercase tracking-widest text-muted flex items-center gap-2">
                    <Lock className="w-3 h-3" /> Confirm New Password
                </label>
                <div className="relative">
                    <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirm ? "text" : "password"}
                        disabled={isPending}
                        className="w-full bg-background border border-primary/20 rounded-xl px-4 py-3 pr-12 text-sm font-medium focus:outline-none focus:border-primary transition-colors placeholder:text-muted/40 disabled:opacity-50"
                        placeholder="Repeat new password"
                    />
                    <button
                        type="button"
                        onClick={() => setShowConfirm(v => !v)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-muted hover:text-primary transition-colors"
                    >
                        {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                </div>
                {state.errors?.confirmPassword && (
                    <p className="text-[11px] text-red-500 font-medium">{state.errors.confirmPassword[0]}</p>
                )}
            </div>

            <button
                type="submit"
                disabled={isPending}
                className="flex items-center justify-center gap-2 w-full sm:w-auto bg-basic text-background font-black text-xs uppercase tracking-widest px-8 py-4 rounded-2xl hover:bg-basic/80 active:scale-95 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            >
                {isPending ? <Loader className="w-4 h-4 animate-spin" /> : <ShieldCheck className="w-4 h-4" />}
                {isPending ? "Updating…" : "Change Password"}
            </button>
        </form>
    );
}
