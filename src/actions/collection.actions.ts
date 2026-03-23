"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import type { CollectionActionState, CollectionProductActionState } from "@/interfaces";

const CollectionSchema = z.object({
    name: z.string().min(3, "Collection name must be at least 3 characters long"),
    description: z.string().min(10, "Collection description must be at least 10 characters long"),
});

const CollectionProductSchema = z.object({
    collectionId: z.string().min(1, "Collection ID is required"),
    productId: z.array(z.string()).min(1, "Product ID is required"),
});

const CollectionProductsSchema = z.object({
    collectionId: z.string().min(1, "Collection ID is required"),
    productsId: z.array(z.string()).min(1, "Product ID is required"),
})

export async function createCollection(prevState: CollectionActionState, formData: FormData): Promise<CollectionActionState> {
    const rawData = {
        name: formData.get("name"),
        description: formData.get("description"),
    };

    const validatedFields = CollectionSchema.safeParse(rawData);

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    try {
        const collection = await prisma.collection.create({
            data: validatedFields.data,
        });

        revalidatePath("/admin/dashboard/collections");
        return { success: true };
    } catch (error) {
        console.error("Database Error:", error);
        return { error: "Failed to create collection." };
    }
}

export async function addToCollection(prevState: CollectionProductActionState, formData: FormData): Promise<CollectionProductActionState> {
    const rawData = {
        collectionId: formData.get("collectionId"),
        productId: formData.get("productId"),
    };

    const validatedFields = CollectionProductSchema.safeParse(rawData);

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    try {
        const collection = await prisma.collection.update({
            where: {
                id: validatedFields.data.collectionId,
            },
            data: {
                products: {
                    connect: {
                        id: validatedFields.data.productId,
                    },
                },
            },
        });

        revalidatePath("/admin/dashboard/collections");
        return { success: true };
    } catch (error) {
        console.error("Database Error:", error);
        return { error: "Failed to add product to collection." };
    }
}

export async function removeFromCollection(prevState: CollectionProductActionState, formData: FormData): Promise<CollectionProductActionState> {
    const rawData = {
        collectionId: formData.get("collectionId"),
        productId: formData.get("productId"),
    };

    const validatedFields = CollectionProductSchema.safeParse(rawData);

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    try {
        await prisma.collection.update({
            where: {
                id: validatedFields.data.collectionId,
            },
            data: {

                products: {
                    disconnect: {
                        id: validatedFields.data.productId,
                    },

                },
            },
        });

        revalidatePath("/admin/dashboard/collections");
        return { success: true };
    } catch (error) {
        console.error("Database Error:", error);
        return { error: "Failed to remove product from collection." };
    }
}

export async function addManyToCollection(prevState: CollectionProductActionState, formData: FormData): Promise<CollectionProductActionState> {
    const rawData = {
        collectionId: formData.get("collectionId"),
        productsId: formData.getAll("productId"),
    };

    const validatedFields = CollectionProductsSchema.safeParse(rawData);

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    try {
        await prisma.collection.update({
            where: {
                id: validatedFields.data.collectionId,
            },
            data: {
                products: {
                    set: validatedFields.data.productsId.map((id) => ({
                        id,
                    })),
                },
            },
        });

        revalidatePath("/admin/dashboard/collections");
        return { success: true };
    } catch (error) {
        console.error("Database Error:", error);
        return { error: "Failed to add product to collection." };
    }
}


export async function getCollections() {
    try {
        const collections = await prisma.collection.findMany({
            include: {
                _count: {
                    select: { products: true }
                }
            },
            orderBy: {
                createdAt: "desc"
            }
        });
        return collections;
    } catch (error) {
        console.error("Database Error:", error);
        throw new Error("Failed to fetch collections.");
    }
}

export async function deleteCollection(id: string) {
    try {
        await prisma.collection.delete({
            where: { id },
        });
        revalidatePath("/admin/dashboard/collections");
        return { success: true };
    } catch (error) {
        console.error("Database Error:", error);
        return { error: "Failed to delete collection." };
    }
}

export async function getCollectionById(id: string) {
    try {
        const collection = await prisma.collection.findUnique({
            where: { id },
            include: {
                products: {
                    include: {
                        productImages: true
                    }
                }
            }
        });
        return collection;
    } catch (error) {
        console.error("Database Error:", error);
        throw new Error("Failed to fetch collection.");
    }
}

export async function updateCollection(id: string, prevState: CollectionActionState, formData: FormData): Promise<CollectionActionState> {
    const rawData = {
        name: formData.get("name"),
        description: formData.get("description"),
    };

    const validatedFields = CollectionSchema.safeParse(rawData);

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    try {
        await prisma.collection.update({
            where: { id },
            data: validatedFields.data,
        });

        revalidatePath("/admin/dashboard/collections");
        return { success: true };
    } catch (error) {
        console.error("Database Error:", error);
        return { error: "Failed to update collection." };
    }
}
