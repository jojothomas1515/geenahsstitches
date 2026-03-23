"use server";

import { prisma } from "@/lib/prisma";
import { uploadToBucket, deleteObject } from "@/lib/bucket";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import type { ProductActionState } from "@/interfaces";

const ProductSchema = z.object({
    name: z.string().min(1, "Name is required"),
    price: z.coerce.number().min(1, "Price must be at least 1"),
    discount: z.coerce.number().min(0).max(100).default(0),
    category: z.string().transform(val => val.split(",").map(s => s.trim()).filter(s => s !== "")),
    description: z.string().min(10, "Description must be at least 10 characters"),
    quantity: z.coerce.number().min(0, "Quantity cannot be negative"),
});


export async function getProducts() {
    try {
        return await prisma.product.findMany({
            orderBy: { name: "asc" },
            include: { productImages: true, collections: true },
        });
    } catch (error) {
        console.error("Failed to fetch products:", error);
        return [];
    }
}

export async function getProductById(id: string) {
    try {
        return await prisma.product.findUnique({
            where: { id },
            include: { productImages: true },
        });
    } catch (error) {
        console.error("Failed to fetch product:", error);
        return null;
    }
}

export async function createProduct(prevState: ProductActionState, formData: FormData): Promise<ProductActionState> {
    const rawData = {
        name: formData.get("name"),
        price: formData.get("price"),
        discount: formData.get("discount"),
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

    // Extract image files from formData
    const imageFiles = formData.getAll("images") as File[];
    const validImages = imageFiles.filter(f => f.size > 0);

    // Extract collectionId for direct addition
    const collectionId = formData.get("collectionId") as string | null;

    try {
        // Create the product first
        const product = await prisma.product.create({
            data: {
                ...validatedFields.data,
                collections: collectionId ? {
                    connect: { id: collectionId }
                } : undefined
            },
        });

        // Upload images to S3 and create ProductImage records
        if (validImages.length > 0) {
            const uploadResults = await Promise.all(
                validImages.map(file => uploadToBucket(file))
            );

            const imageRecords = uploadResults
                .filter((r): r is { url: string; key: string } => r !== null)
                .map(result => ({
                    name: result.key,
                    url: result.url,
                    productId: product.id,
                }));

            if (imageRecords.length > 0) {
                await prisma.productImage.createMany({ data: imageRecords });
            }
        }

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

    // Parse deleted image IDs (sent as JSON string from the form)
    const deletedImagesRaw = formData.get("deletedImages") as string | null;
    const deletedImageIds: string[] = deletedImagesRaw ? JSON.parse(deletedImagesRaw) : [];

    // Extract new image files
    const imageFiles = formData.getAll("images") as File[];
    const validImages = imageFiles.filter(f => f.size > 0);

    try {
        // Update product fields
        await prisma.product.update({
            where: { id },
            data: validatedFields.data,
        });

        // Delete removed images from S3 and DB
        if (deletedImageIds.length > 0) {
            const imagesToDelete = await prisma.productImage.findMany({
                where: { id: { in: deletedImageIds } },
            });

            await Promise.all(
                imagesToDelete.map(img => deleteObject(img.name))
            );

            await prisma.productImage.deleteMany({
                where: { id: { in: deletedImageIds } },
            });
        }

        // Upload new images
        if (validImages.length > 0) {
            const uploadResults = await Promise.all(
                validImages.map(file => uploadToBucket(file))
            );

            const imageRecords = uploadResults
                .filter((r): r is { url: string; key: string } => r !== null)
                .map(result => ({
                    name: result.key,
                    url: result.url,
                    productId: id,
                }));

            if (imageRecords.length > 0) {
                await prisma.productImage.createMany({ data: imageRecords });
            }
        }

        revalidatePath("/admin/dashboard/products");
        return { success: true };
    } catch (error) {
        console.error("Database Error:", error);
        return { error: "Failed to update product." };
    }
}

export async function deleteProduct(id: string) {
    try {
        // Fetch images so we can clean up S3 objects
        const images = await prisma.productImage.findMany({
            where: { productId: id },
        });

        await Promise.all(
            images.map(img => deleteObject(img.name))
        );

        // Cascade will auto-delete ProductImage rows
        await prisma.product.delete({ where: { id } });

        revalidatePath("/admin/dashboard/products");
        return { success: true };
    } catch (error) {
        console.error("Database Error:", error);
        return { error: "Failed to delete product." };
    }
}
