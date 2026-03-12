"use server";

import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { auth } from "@/lib/auth";

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});

// const registerSchema = z.object({
//     email: z.string().email(),
//     password: z.string().min(6),
//     confirmPassword: z.string().min(6),
// });

export async function login(state: { error: string | null }, formData: FormData) {
    const data = loginSchema.parse(formData);
    const result = await auth.api.signInEmail({
        body: {
            email: data.email,
            password: data.password,
            rememberMe: false,
        },


    });
    return { error: null };
}


// export async function register(state: { error: string | null }, formData: FormData) {
//     const data = loginSchema.parse(formData);
//     const result = await auth.api.signUpEmail({
//         body: {
//             email: data.email,
//             password: data.password,
//             rememberMe: false,
//         },


//     });
//     return { error: null };
// }