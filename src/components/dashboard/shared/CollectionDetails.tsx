"use client";

import { Package, ArrowLeft, Layers, Calendar, ShoppingBag, X, Loader2, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useTransition } from "react";
import { removeFromCollection } from "@/actions/collection.actions";
import AddProductToCollectionForm from "./collections/AddProductToCollectionForm";
import ProductForm from "../admin/products/ProductForm";
import type { Collection } from "@/interfaces";

interface CollectionDetailsProps {
    collection: Collection;
    backUrl: string;
}

export default function CollectionDetails({ collection, backUrl }: CollectionDetailsProps) {
    const [isPending, startTransition] = useTransition();
    const [showAddModal, setShowAddModal] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);

    const handleRemoveProduct = (productId: string) => {
        if (confirm("Are you sure you want to remove this product from the collection?")) {
            startTransition(async () => {
                const formData = new FormData();
                formData.append("collectionId", collection.id);
                formData.append("productId", productId);
                await removeFromCollection({}, formData);
            });
        }
    };

    return (
        <div className="flex flex-col gap-8">
            {/* Header / Back Navigation */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="flex items-center gap-4">
                    <Link
                        href={backUrl}
                        className="p-2 rounded-xl bg-background border border-background-dark text-muted hover:text-basic transition-all"
                    >
                        <ArrowLeft className="h-5 w-5" />
                    </Link>
                    <div>
                        <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest mb-1">
                            <Layers className="h-3.5 w-3.5" />
                            Collection
                        </div>
                        <h1 className="text-3xl font-bold text-basic">{collection.name}</h1>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setShowAddModal(true)}
                        className="flex items-center gap-2 px-5 py-2.5 bg-background border border-background-dark text-muted font-bold rounded-xl hover:text-basic transition-all text-sm"
                    >
                        <Plus className="h-4 w-4" />
                        Manage Products
                    </button>
                    <button
                        onClick={() => setShowCreateModal(true)}
                        className="flex items-center gap-2 px-5 py-2.5 bg-primary text-basic font-bold rounded-xl shadow-lg shadow-primary/20 hover:opacity-90 transition-all transform hover:-translate-y-0.5 text-sm"
                    >
                        <Plus className="h-4 w-4" />
                        Add New Product
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Collection Info Card */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-background p-6 rounded-2xl border border-background-dark shadow-sm">
                        <h3 className="text-sm font-bold text-muted uppercase tracking-wider mb-4">About this collection</h3>
                        <p className="text-basic leading-relaxed mb-6 whitespace-pre-wrap">
                            {collection.description}
                        </p>

                        <div className="space-y-4 pt-6 border-t border-background-dark">
                            <div className="flex items-center gap-3 text-sm">
                                <Calendar className="h-4 w-4 text-muted" />
                                <span className="text-muted">Created:</span>
                                <span className="font-medium text-basic">{new Date(collection.createdAt).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm">
                                <ShoppingBag className="h-4 w-4 text-muted" />
                                <span className="text-muted">Total Products:</span>
                                <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary font-bold text-xs">
                                    {(collection.products || []).length} Items
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Products List */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold text-basic flex items-center gap-2">
                            <Package className="h-5 w-5 text-primary" />
                            Associated Products
                        </h2>
                    </div>

                    {(collection.products || []).length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {(collection.products || []).map((product) => (
                                <div
                                    key={product.id}
                                    className="bg-background p-4 rounded-xl border border-background-dark shadow-sm flex gap-4 hover:border-primary/50 transition-colors group"
                                >
                                    <div className="relative h-20 w-20 rounded-lg overflow-hidden border border-background-dark shrink-0">
                                        {product.productImages[0] ? (
                                            <Image
                                                src={product.productImages[0].url}
                                                alt={product.name}
                                                fill
                                                className="object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                        ) : (
                                            <div className="h-full w-full bg-background-light flex items-center justify-center text-muted">
                                                <Package size={24} />
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0 flex flex-col justify-center">
                                        <h4 className="font-bold text-basic truncate mb-1">{product.name}</h4>
                                        <div className="flex items-center gap-2 mb-2">
                                            {product.category.slice(0, 2).map((cat, i) => (
                                                <span key={i} className="px-1.5 py-0.5 rounded bg-background-light text-[10px] text-muted font-semibold uppercase">
                                                    {cat}
                                                </span>
                                            ))}
                                        </div>
                                        <div className="flex items-center justify-between mt-auto pt-2">
                                            <span className="text-sm font-bold text-primary">₦{product.price.toLocaleString()}</span>
                                            <button
                                                onClick={() => handleRemoveProduct(product.id)}
                                                disabled={isPending}
                                                className="p-1.5 rounded-lg text-red-400 hover:text-red-500 hover:bg-red-50 transition-all opacity-0 group-hover:opacity-100 disabled:opacity-50"
                                                title="Remove from collection"
                                            >
                                                {isPending ? <Loader2 size={14} className="animate-spin" /> : <X size={14} />}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="py-20 bg-background rounded-2xl border border-background-dark border-dashed text-center">
                            <Package className="h-10 w-10 text-muted mx-auto mb-4 opacity-20" />
                            <p className="text-muted">No products have been added to this collection yet.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Add Product Modal */}
            {showAddModal && (
                <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <AddProductToCollectionForm 
                        collection={collection}
                        onClose={() => setShowAddModal(false)}
                        onSuccess={() => {
                            setShowAddModal(false);
                        }}
                    />
                </div>
            )}

            {/* Create Product Modal */}
            {showCreateModal && (
                <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <ProductForm 
                        initialCollectionId={collection.id}
                        onClose={() => setShowCreateModal(false)}
                        onSuccess={() => {
                            setShowCreateModal(false);
                        }}
                    />
                </div>
            )}
        </div>
    );
}
