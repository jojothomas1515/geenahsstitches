"use server";

import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { z } from "zod";
import { headers } from "next/headers";

const loginSchema = z.object({
    email: z.email(),
    password: z.string().min(6),
});

const registerSchema = z.object({
    name: z.string().min(3),
    email: z.email(),
    password: z.string().min(6),
    phone: z.string().min(10),
    confirmPassword: z.string().min(6),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

export async function login(state: { error: string | null }, formData: FormData) {
    const header = await headers()
    const url = header.get("referer") as string
    const newUrl = new URL(url)
    const referrer = newUrl.searchParams.get("referrer")
    const data = loginSchema.safeParse(Object.fromEntries(formData.entries()));
    if (!data.success) {
        return { error: data.error.message };
    }
    try {
        const rememberMe = formData.get("remember-me") === "on";
        const res = await auth.api.signInEmail({
            body: {
                email: data.data.email,
                password: data.data.password,
                rememberMe,
            },
            headers: await headers(),
        });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Login failed";
        return { error: message };
    }
    return redirect(referrer || "/");
}


export async function register(state: { error: string | null }, formData: FormData) {
    const { name, email, password, phone, confirmPassword } = Object.fromEntries(formData.entries());
    const data = registerSchema.safeParse({ name, email, password, phone, confirmPassword });
    if (!data.success) {
        return { error: data.error.message };
    }
    try {
        await auth.api.signUpEmail({
            body: {
                name: data.data.name,
                email: data.data.email,
                phone: data.data.phone,
                password: data.data.password,
                rememberMe: false,
            },
        });
    }
    catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Login failed";
        return { error: message };
    }
    return redirect("/");
}