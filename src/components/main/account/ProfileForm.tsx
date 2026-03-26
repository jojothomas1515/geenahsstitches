"use client";

import { useActionState, useRef } from "react";
import { updateProfile } from "@/actions/user.actions";
import type { ProfileActionState } from "@/actions/user.actions";
import { User, Phone, CheckCircle2, AlertCircle, Loader } from "lucide-react";

interface ProfileFormProps {
    name: string;
    phone: string;
}

const initialState: ProfileActionState = {};

export default function ProfileForm({ name, phone }: ProfileFormProps) {
    const [state, action, isPending] = useActionState(updateProfile, initialState);
    const formRef = useRef<HTMLFormElement>(null);

    return (
        <form ref={formRef} action={action} className="space-y-6">
            {/* Success / Error banners */}
            {state.success && (
                <div className="flex items-center gap-3 bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400 rounded-2xl px-5 py-4 text-sm font-medium">
                    <CheckCircle2 className="w-5 h-5 shrink-0" />
                    Profile updated successfully!
                </div>
            )}
            {state.error && (
                <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 rounded-2xl px-5 py-4 text-sm font-medium">
                    <AlertCircle className="w-5 h-5 shrink-0" />
                    {state.error}
                </div>
            )}

            {/* Name */}
            <div className="space-y-2">
                <label htmlFor="name" className="text-[10px] font-black uppercase tracking-widest text-muted flex items-center gap-2">
                    <User className="w-3 h-3" /> Full Name
                </label>
                <input
                    id="name"
                    name="name"
                    type="text"
                    defaultValue={name}
                    disabled={isPending}
                    className="w-full bg-background border border-primary/20 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:border-primary transition-colors placeholder:text-muted/40 disabled:opacity-50"
                    placeholder="Your full name"
                />
                {state.errors?.name && (
                    <p className="text-[11px] text-red-500 font-medium">{state.errors.name[0]}</p>
                )}
            </div>

            {/* Phone */}
            <div className="space-y-2">
                <label htmlFor="phone" className="text-[10px] font-black uppercase tracking-widest text-muted flex items-center gap-2">
                    <Phone className="w-3 h-3" /> Phone Number
                </label>
                <input
                    id="phone"
                    name="phone"
                    type="tel"
                    defaultValue={phone}
                    disabled={isPending}
                    className="w-full bg-background border border-primary/20 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:border-primary transition-colors placeholder:text-muted/40 disabled:opacity-50"
                    placeholder="e.g. 08012345678"
                />
                {state.errors?.phone && (
                    <p className="text-[11px] text-red-500 font-medium">{state.errors.phone[0]}</p>
                )}
            </div>

            <button
                type="submit"
                disabled={isPending}
                className="flex items-center justify-center gap-2 w-full sm:w-auto bg-primary text-basic font-black text-xs uppercase tracking-widest px-8 py-4 rounded-2xl hover:bg-primary/90 active:scale-95 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            >
                {isPending ? <Loader className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
                {isPending ? "Saving…" : "Save Changes"}
            </button>
        </form>
    );
}
