"use server";

import { prisma } from "@/lib/prisma";
import { Role } from "@/generated/prisma/enums";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { auth } from "@/lib/auth";
import type { UserActionState } from "@/interfaces";

const CreateUserSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(10, "Phone number must be at least 10 characters"),
    role: z.nativeEnum(Role),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

const UpdateUserSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(10, "Phone number must be at least 10 characters"),
    role: z.nativeEnum(Role),
});



export async function getUsers() {
    try {
        return await prisma.user.findMany({
            include: {
                _count: { select: { orders: true } },
            },
            orderBy: { createdAt: "desc" },
        });
    } catch (error) {
        console.error("Failed to fetch users:", error);
        return [];
    }
}

export async function createUser(prevState: UserActionState, formData: FormData): Promise<UserActionState> {
    const rawData = {
        name: formData.get("name"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        role: formData.get("role"),
        password: formData.get("password"),
    };

    const validatedFields = CreateUserSchema.safeParse(rawData);

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    const { name, email, phone, role, password } = validatedFields.data;

    try {
        // 1. Create account with better-auth
        await auth.api.signUpEmail({
            body: {
                name,
                email,
                phone,
                password,
                rememberMe: false,
            },
        });

        // 2. Update role if not default USER
        if (role !== "USER") {
            await prisma.user.update({
                where: { email },
                data: { role },
            });
        }

        revalidatePath("/admin/dashboard/users");
        return { success: true };
    } catch (error) {
        console.error("Auth/Database Error:", error);
        const message = error instanceof Error ? error.message : "Failed to create user. Email or phone might already exist.";
        return { error: message };
    }
}

export async function updateUser(id: string, prevState: UserActionState, formData: FormData): Promise<UserActionState> {
    const rawData = {
        name: formData.get("name"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        role: formData.get("role"),
    };

    const validatedFields = UpdateUserSchema.safeParse(rawData);

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    try {
        await prisma.user.update({
            where: { id },
            data: validatedFields.data,
        });

        revalidatePath("/admin/dashboard/users");
        return { success: true };
    } catch (error) {
        console.error("Database Error:", error);
        return { error: "Failed to update user." };
    }
}

export async function deleteUser(id: string) {
    try {
        await prisma.user.delete({
            where: { id },
        });
        revalidatePath("/admin/dashboard/users");
        return { success: true };
    } catch (error) {
        console.error("Database Error:", error);
        return { error: "Failed to delete user." };
    }
}
