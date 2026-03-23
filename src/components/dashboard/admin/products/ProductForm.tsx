"use client";

import { useActionState, useEffect, useState, useRef } from "react";
import { X, Loader2, Upload, Trash2 } from "lucide-react";
import { createProduct, updateProduct } from "@/actions/product.actions";
import type { ProductActionState, ProductFormProps } from "@/interfaces";
import Image from "next/image";

const initialState: ProductActionState = {};

export default function ProductForm({ product, initialCollectionId, onClose, onSuccess }: ProductFormProps) {
    const action = product
        ? updateProduct.bind(null, product.id)
        : createProduct;

    const [state, formAction, isPending] = useActionState(action, initialState);

    // Track new files selected for upload
    const [newFiles, setNewFiles] = useState<File[]>([]);
    // Track existing images marked for deletion (when editing)
    const [deletedImageIds, setDeletedImageIds] = useState<string[]>([]);

    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (state.success) {
            onSuccess();
        }
    }, [state.success, onSuccess]);

    const handleFilesSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setNewFiles(prev => [...prev, ...Array.from(e.target.files!)]);
        }
        // Reset input so the same file can be re-selected
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const removeNewFile = (index: number) => {
        setNewFiles(prev => prev.filter((_, i) => i !== index));
    };

    const markExistingImageForDeletion = (imageId: string) => {
        setDeletedImageIds(prev => [...prev, imageId]);
    };

    const restoreExistingImage = (imageId: string) => {
        setDeletedImageIds(prev => prev.filter(id => id !== imageId));
    };

    // Existing images minus those marked for deletion
    const visibleExistingImages = product?.productImages.filter(img => !deletedImageIds.includes(img.id)) ?? [];
    const markedForDeletion = product?.productImages.filter(img => deletedImageIds.includes(img.id)) ?? [];

    // Custom submit handler to inject files + deletedImages into FormData
    const handleSubmit = (formData: FormData) => {
        // Append new image files
        for (const file of newFiles) {
            formData.append("images", file);
        }
        // Append deleted image IDs as JSON
        formData.set("deletedImages", JSON.stringify(deletedImageIds));

        // Append initialCollectionId if present (for direct creation in collection)
        if (initialCollectionId) {
            formData.set("collectionId", initialCollectionId);
        }

        formAction(formData);
    };

    return (
        <div className="bg-background-light rounded-2xl shadow-2xl overflow-hidden border border-background-dark max-w-2xl w-full max-h-[90vh] flex flex-col">
            <div className="p-6 border-b border-background-dark flex justify-between items-center bg-background shrink-0">
                <div>
                    <h2 className="text-xl font-bold text-basic">{product ? "Edit Product" : "Add New Product"}</h2>
                    <p className="text-sm text-muted">Fill in the product details below</p>
                </div>
                <button
                    onClick={onClose}
                    className="p-2 hover:bg-background-dark rounded-full transition-colors text-muted hover:text-basic"
                >
                    <X className="h-5 w-5" />
                </button>
            </div>

            <form action={handleSubmit} className="p-8 space-y-6 overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name */}
                    <div className="md:col-span-2">
                        <label htmlFor="name" className="block text-sm font-semibold text-basic mb-2 pl-1">
                            Product Name
                        </label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            defaultValue={product?.name}
                            className={`w-full px-4 py-3 rounded-xl bg-background border ${state.errors?.name ? 'border-red-500' : 'border-background-dark'} text-basic focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all`}
                            placeholder="e.g. Traditional Nigerian Dashiki"
                            required
                        />
                        {state.errors?.name && <p className="text-red-500 text-xs mt-1 pl-1">{state.errors.name[0]}</p>}
                    </div>

                    {/* Price */}
                    <div>
                        <label htmlFor="price" className="block text-sm font-semibold text-basic mb-2 pl-1">
                            Price (₦)
                        </label>
                        <input
                            id="price"
                            name="price"
                            type="number"
                            defaultValue={product?.price}
                            className={`w-full px-4 py-3 rounded-xl bg-background border ${state.errors?.price ? 'border-red-500' : 'border-background-dark'} text-basic focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all`}
                            placeholder="5000"
                            required
                            min="1"
                        />
                        {state.errors?.price && <p className="text-red-500 text-xs mt-1 pl-1">{state.errors.price[0]}</p>}
                    </div>

                    {/* Discount */}
                    <div>
                        <label htmlFor="discount" className="block text-sm font-semibold text-basic mb-2 pl-1">
                            Discount (%)
                        </label>
                        <input
                            id="discount"
                            name="discount"
                            type="number"
                            defaultValue={product?.discount ?? 0}
                            className={`w-full px-4 py-3 rounded-xl bg-background border ${state.errors?.discount ? 'border-red-500' : 'border-background-dark'} text-basic focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all`}
                            placeholder="0"
                            min="0"
                            max="100"
                        />
                        {state.errors?.discount && <p className="text-red-500 text-xs mt-1 pl-1">{state.errors.discount[0]}</p>}
                    </div>

                    {/* Quantity */}
                    <div>
                        <label htmlFor="quantity" className="block text-sm font-semibold text-basic mb-2 pl-1">
                            Stock Quantity
                        </label>
                        <input
                            id="quantity"
                            name="quantity"
                            type="number"
                            defaultValue={product?.quantity}
                            className={`w-full px-4 py-3 rounded-xl bg-background border ${state.errors?.quantity ? 'border-red-500' : 'border-background-dark'} text-basic focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all`}
                            placeholder="10"
                            required
                            min="0"
                        />
                        {state.errors?.quantity && <p className="text-red-500 text-xs mt-1 pl-1">{state.errors.quantity[0]}</p>}
                    </div>

                    {/* Categories */}
                    <div>
                        <label htmlFor="category" className="block text-sm font-semibold text-basic mb-2 pl-1">
                            Categories (comma separated)
                        </label>
                        <input
                            id="category"
                            name="category"
                            type="text"
                            defaultValue={product?.category.join(", ")}
                            className={`w-full px-4 py-3 rounded-xl bg-background border ${state.errors?.category ? 'border-red-500' : 'border-background-dark'} text-basic focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all`}
                            placeholder="Women, Native, Dress"
                            required
                        />
                        {state.errors?.category && <p className="text-red-500 text-xs mt-1 pl-1">{state.errors.category[0]}</p>}
                    </div>

                    {/* Product Images */}
                    <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-basic mb-2 pl-1">
                            Product Images
                        </label>

                        {/* Existing images (edit mode) */}
                        {visibleExistingImages.length > 0 && (
                            <div className="mb-3">
                                <p className="text-xs text-muted mb-2 pl-1">Current images</p>
                                <div className="flex flex-wrap gap-3">
                                    {visibleExistingImages.map(img => (
                                        <div key={img.id} className="relative group">
                                            <div className="h-20 w-20 rounded-lg overflow-hidden border border-background-dark">
                                                <Image src={img.url} alt={img.name} width={80} height={80} className="object-cover h-full w-full" />
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => markExistingImageForDeletion(img.id)}
                                                className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                                title="Remove image"
                                            >
                                                <X className="h-3 w-3" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Images marked for deletion (with undo) */}
                        {markedForDeletion.length > 0 && (
                            <div className="mb-3 p-3 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-200 dark:border-red-800">
                                <p className="text-xs text-red-600 dark:text-red-400 mb-2 font-medium">Marked for removal (will be deleted on save)</p>
                                <div className="flex flex-wrap gap-2">
                                    {markedForDeletion.map(img => (
                                        <button
                                            key={img.id}
                                            type="button"
                                            onClick={() => restoreExistingImage(img.id)}
                                            className="flex items-center gap-1 px-2 py-1 text-xs rounded-lg bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
                                            title="Click to undo"
                                        >
                                            <Trash2 className="h-3 w-3" />
                                            {img.name}
                                            <span className="underline ml-1">Undo</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* New file previews */}
                        {newFiles.length > 0 && (
                            <div className="mb-3">
                                <p className="text-xs text-muted mb-2 pl-1">New images to upload</p>
                                <div className="flex flex-wrap gap-3">
                                    {newFiles.map((file, i) => (
                                        <div key={i} className="relative group">
                                            <div className="h-20 w-20 rounded-lg overflow-hidden border border-background-dark bg-background">
                                                <Image
                                                    src={URL.createObjectURL(file)}
                                                    alt={file.name}
                                                    width={80}
                                                    height={80}
                                                    className="object-cover h-full w-full"
                                                />
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => removeNewFile(i)}
                                                className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                                title="Remove"
                                            >
                                                <X className="h-3 w-3" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* File picker button */}
                        <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="w-full flex items-center justify-center gap-2 px-4 py-4 rounded-xl border-2 border-dashed border-background-dark hover:border-primary/50 text-muted hover:text-basic transition-all bg-background"
                        >
                            <Upload className="h-5 w-5" />
                            <span className="text-sm font-medium">Click to add images</span>
                        </button>
                        <input
                            ref={fileInputRef}
                            type="file"
                            multiple
                            accept="image/*"
                            className="hidden"
                            onChange={handleFilesSelected}
                        />
                    </div>

                    {/* Description */}
                    <div className="md:col-span-2">
                        <label htmlFor="description" className="block text-sm font-semibold text-basic mb-2 pl-1">
                            Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            defaultValue={product?.description}
                            rows={4}
                            className={`w-full px-4 py-3 rounded-xl bg-background border ${state.errors?.description ? 'border-red-500' : 'border-background-dark'} text-basic focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none`}
                            placeholder="Describe the product details, fabric, and care instructions..."
                            required
                        ></textarea>
                        {state.errors?.description && <p className="text-red-500 text-xs mt-1 pl-1">{state.errors.description[0]}</p>}
                    </div>
                </div>

                {state.error && (
                    <div className="p-4 bg-red-50 text-red-500 rounded-xl text-sm border border-red-100 italic">
                        {state.error}
                    </div>
                )}

                <div className="pt-4 flex gap-4 shrink-0">
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
                        className="flex-2 py-3.5 px-4 rounded-xl font-bold bg-primary text-white hover:opacity-90 transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                        {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
                        {product ? "Save Changes" : "Create Product"}
                    </button>
                </div>
            </form>
        </div>
    );
}
