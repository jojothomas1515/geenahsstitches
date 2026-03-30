"use server";

import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/auth-guard";
import { Role } from "@/generated/prisma/enums";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
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

const UpdateProfileSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    phone: z.string().min(10, "Phone number must be at least 10 digits"),
});

const ChangePasswordSchema = z.object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z.string().min(6, "New password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Please confirm your new password"),
}).refine(data => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

export type ProfileActionState = {
    success?: boolean;
    error?: string;
    errors?: Partial<Record<"name" | "phone", string[]>>;
};

export type PasswordActionState = {
    success?: boolean;
    error?: string;
    errors?: Partial<Record<"currentPassword" | "newPassword" | "confirmPassword", string[]>>;
};

export async function getUsers() {
    await requireRole("ADMIN");
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
    await requireRole("ADMIN");
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
    await requireRole("ADMIN");
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
    await requireRole("ADMIN");
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

export async function updateProfile(
    prevState: ProfileActionState,
    formData: FormData
): Promise<ProfileActionState> {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) return { error: "Not authenticated." };

    const rawData = {
        name: formData.get("name"),
        phone: formData.get("phone"),
    };

    const validated = UpdateProfileSchema.safeParse(rawData);
    if (!validated.success) {
        return { errors: validated.error.flatten().fieldErrors };
    }

    try {
        await prisma.user.update({
            where: { id: session.user.id },
            data: validated.data,
        });
        revalidatePath("/account");
        revalidatePath("/account/settings");
        return { success: true };
    } catch (error) {
        console.error("Profile update error:", error);
        return { error: "Failed to update profile. Please try again." };
    }
}

export async function changePassword(
    prevState: PasswordActionState,
    formData: FormData
): Promise<PasswordActionState> {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) return { error: "Not authenticated." };

    const rawData = {
        currentPassword: formData.get("currentPassword"),
        newPassword: formData.get("newPassword"),
        confirmPassword: formData.get("confirmPassword"),
    };

    const validated = ChangePasswordSchema.safeParse(rawData);
    if (!validated.success) {
        return { errors: validated.error.flatten().fieldErrors };
    }

    try {
        await auth.api.changePassword({
            body: {
                currentPassword: validated.data.currentPassword,
                newPassword: validated.data.newPassword,
                revokeOtherSessions: false,
            },
            headers: await headers(),
        });
        return { success: true };
    } catch (error) {
        console.error("Password change error:", error);
        const message = error instanceof Error ? error.message : "Failed to change password.";
        return { error: message };
    }
}


