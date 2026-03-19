"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const ProductSchema = z.object({
    name: z.string().min(1, "Name is required"),
    price: z.coerce.number().min(1, "Price must be at least 1"),
    discount: z.coerce.number().min(0).max(100).default(0),
    image: z.string().url("Invalid image URL"),
    category: z.string().transform(val => val.split(",").map(s => s.trim()).filter(s => s !== "")),
    description: z.string().min(10, "Description must be at least 10 characters"),
    quantity: z.coerce.number().min(0, "Quantity cannot be negative"),
});

export type ProductActionState = {
    error?: string;
    success?: boolean;
    errors?: {
        name?: string[];
        price?: string[];
        discount?: string[];
        image?: string[];
        category?: string[];
        description?: string[];
        quantity?: string[];
    };
};

export async function getProducts() {
    try {
        return await prisma.product.findMany({
            orderBy: { name: "asc" },
        });
    } catch (error) {
        console.error("Failed to fetch products:", error);
        return [];
    }
}

export async function createProduct(prevState: ProductActionState, formData: FormData): Promise<ProductActionState> {
    const rawData = {
        name: formData.get("name"),
        price: formData.get("price"),
        discount: formData.get("discount"),
        image: formData.get("image"),
        category: formData.get("category"),
        description: formData.get("description"),
        quantity: formData.get("quantity"),
    };

    const validatedFields = ProductSchema.safeParse(rawData);

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    try {
        await prisma.product.create({
            data: validatedFields.data,
        });

        revalidatePath("/admin/dashboard/products");
        return { success: true };
    } catch (error) {
        console.error("Database Error:", error);
        return { error: "Failed to create product. Please try again." };
    }
}

export async function updateProduct(id: string, prevState: ProductActionState, formData: FormData): Promise<ProductActionState> {
    const rawData = {
        name: formData.get("name"),
        price: formData.get("price"),
        discount: formData.get("discount"),
        image: formData.get("image"),
        category: formData.get("category"),
        description: formData.get("description"),
        quantity: formData.get("quantity"),
    };

    const validatedFields = ProductSchema.safeParse(rawData);

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    try {
        await prisma.product.update({
            where: { id },
            data: validatedFields.data,
        });

        revalidatePath("/admin/dashboard/products");
        return { success: true };
    } catch (error) {
        console.error("Database Error:", error);
        return { error: "Failed to update product." };
    }
}

export async function deleteProduct(id: string) {
    try {
        await prisma.product.delete({
            where: { id },
        });
        revalidatePath("/admin/dashboard/products");
        return { success: true };
    } catch (error) {
        console.error("Database Error:", error);
        return { error: "Failed to delete product." };
    }
}
