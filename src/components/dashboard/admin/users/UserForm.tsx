"use client";

import { useActionState, useEffect } from "react";
import { X, Loader2, User, Mail, Phone, Shield, Lock } from "lucide-react";
import { createUser, updateUser } from "@/actions/user.actions";
import { Role } from "@/generated/prisma/enums";
import type { UserActionState, UserFormProps } from "@/interfaces";

const initialState: UserActionState = {};

export default function UserForm({ user, onClose, onSuccess }: UserFormProps) {
    const action = user 
        ? updateUser.bind(null, user.id) 
        : createUser;

    const [state, formAction, isPending] = useActionState(action, initialState);

    useEffect(() => {
        if (state.success) {
            onSuccess();
        }
    }, [state.success, onSuccess]);

    return (
        <div className="bg-background-light rounded-2xl shadow-2xl overflow-hidden border border-background-dark max-w-lg w-full flex flex-col">
            <div className="p-6 border-b border-background-dark flex justify-between items-center bg-background shrink-0 text-basic">
                <div>
                    <h2 className="text-xl font-bold">{user ? "Edit User" : "Add New User"}</h2>
                    <p className="text-sm text-muted">Update account details and permissions</p>
                </div>
                <button 
                    onClick={onClose}
                    className="p-2 hover:bg-background-dark rounded-full transition-colors text-muted hover:text-basic"
                >
                    <X className="h-5 w-5" />
                </button>
            </div>

            <form action={formAction} className="p-8 space-y-6">
                <div className="space-y-5">
                    {/* Name */}
                    <div>
                        <label htmlFor="name" className="flex text-sm font-semibold text-basic mb-1.5 pl-1 items-center gap-2">
                            <User className="h-3.5 w-3.5 text-muted" /> Full Name
                        </label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            defaultValue={user?.name}
                            className={`w-full px-4 py-3 rounded-xl bg-background border ${state.errors?.name ? 'border-red-500' : 'border-background-dark'} text-basic focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all`}
                            placeholder="John Doe"
                            required
                        />
                        {state.errors?.name && <p className="text-red-500 text-xs mt-1 pl-1">{state.errors.name[0]}</p>}
                    </div>

                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="flex text-sm font-semibold text-basic mb-1.5 pl-1 items-center gap-2">
                            <Mail className="h-3.5 w-3.5 text-muted" /> Email Address
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            defaultValue={user?.email}
                            className={`w-full px-4 py-3 rounded-xl bg-background border ${state.errors?.email ? 'border-red-500' : 'border-background-dark'} text-basic focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all`}
                            placeholder="john@example.com"
                            required
                        />
                        {state.errors?.email && <p className="text-red-500 text-xs mt-1 pl-1">{state.errors.email[0]}</p>}
                    </div>

                    {/* Phone */}
                    <div>
                        <label htmlFor="phone" className="flex text-sm font-semibold text-basic mb-1.5 pl-1 items-center gap-2">
                            <Phone className="h-3.5 w-3.5 text-muted" /> Phone Number
                        </label>
                        <input
                            id="phone"
                            name="phone"
                            type="tel"
                            defaultValue={user?.phone}
                            className={`w-full px-4 py-3 rounded-xl bg-background border ${state.errors?.phone ? 'border-red-500' : 'border-background-dark'} text-basic focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all`}
                            placeholder="+234 800 000 0000"
                            required
                        />
                        {state.errors?.phone && <p className="text-red-500 text-xs mt-1 pl-1">{state.errors.phone[0]}</p>}
                    </div>

                    {/* Role */}
                    <div>
                        <label htmlFor="role" className="flex text-sm font-semibold text-basic mb-1.5 pl-1 items-center gap-2">
                            <Shield className="h-3.5 w-3.5 text-muted" /> Account Role
                        </label>
                        <select
                            id="role"
                            name="role"
                            defaultValue={user?.role || "USER"}
                            className={`w-full px-4 py-3 rounded-xl bg-background border ${state.errors?.role ? 'border-red-500' : 'border-background-dark'} text-basic focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all appearance-none cursor-pointer`}
                        >
                            {Object.values(Role).map((role) => (
                                <option key={role} value={role}>{role}</option>
                            ))}
                        </select>
                        {state.errors?.role && <p className="text-red-500 text-xs mt-1 pl-1">{state.errors.role[0]}</p>}
                    </div>

                    {/* Password - Only for new users */}
                    {!user && (
                        <div>
                            <label htmlFor="password" className="flex text-sm font-semibold text-basic mb-1.5 pl-1 items-center gap-2">
                                <Lock className="h-3.5 w-3.5 text-muted" /> Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                className={`w-full px-4 py-3 rounded-xl bg-background border ${state.errors?.password ? 'border-red-500' : 'border-background-dark'} text-basic focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all`}
                                placeholder="••••••••"
                                required={!user}
                            />
                            {state.errors?.password && <p className="text-red-500 text-xs mt-1 pl-1">{state.errors.password[0]}</p>}
                        </div>
                    )}
                </div>

                {state.error && (
                    <div className="p-4 bg-red-50 text-red-500 rounded-xl text-sm border border-red-100 flex items-center gap-2">
                        <X className="h-4 w-4 shrink-0" />
                        <span>{state.error}</span>
                    </div>
                )}

                <div className="pt-4 flex gap-4">
                    <button
                        type="button"
                        onClick={onClose}
                        className="flex-1 py-3.5 px-4 rounded-xl font-bold bg-background-dark text-muted hover:text-basic transition-all border border-background-dark"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={isPending}
                        className="flex-2 py-3.5 px-4 rounded-xl font-bold bg-primary text-basic hover:opacity-90 transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                        {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
                        {user ? "Update User" : "Create Account"}
                    </button>
                </div>
            </form>
        </div>
    );
}
