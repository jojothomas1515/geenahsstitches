"use client";

import { useActionState, useEffect, useState } from "react";
import { X, Loader2, Search, Check } from "lucide-react";
import { addManyToCollection, getCollectionById } from "@/actions/collection.actions";
import { getProducts } from "@/actions/product.actions";
import type { CollectionProductActionState, AddProductToCollectionFormProps, Product } from "@/interfaces";
import Image from "next/image";

const initialState: CollectionProductActionState = {};

export default function AddProductToCollectionForm({ collection, onClose, onSuccess }: AddProductToCollectionFormProps) {
    const [state, formAction, isPending] = useActionState(addManyToCollection, initialState);
    const [products, setProducts] = useState<Product[]>([]);
    const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [isLoadingProducts, setIsLoadingProducts] = useState(true);
    const [isLoadingCollection, setIsLoadingCollection] = useState(true);

    useEffect(() => {
        async function fetchData() {
            setIsLoadingProducts(true);
            setIsLoadingCollection(true);
            try {
                const [productsData, collectionData] = await Promise.all([
                    getProducts(),
                    getCollectionById(collection.id)
                ]);
                setProducts(productsData as Product[]);
                if (collectionData && collectionData.products) {
                    setSelectedProductIds(collectionData.products.map(p => p.id));
                }
            } catch (error) {
                console.error("Failed to fetch data:", error);
            } finally {
                setIsLoadingProducts(false);
                setIsLoadingCollection(false);
            }
        }
        fetchData();
    }, [collection.id]);

    useEffect(() => {
        if (state.success) {
            onSuccess();
        }
    }, [state.success, onSuccess]);

    const filteredProducts = products.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.some(c => c.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    const toggleProduct = (productId: string) => {
        setSelectedProductIds(prev => 
            prev.includes(productId) 
                ? prev.filter(id => id !== productId) 
                : [...prev, productId]
        );
    };

    const handleSubmit = (formData: FormData) => {
        formData.set("collectionId", collection.id);
        // Clear existing productIds in formData if any
        formData.delete("productId");
        // Append selected product IDs
        selectedProductIds.forEach(id => formData.append("productId", id));
        formAction(formData);
    };

    return (
        <div className="bg-background-light rounded-2xl shadow-2xl overflow-hidden border border-background-dark max-w-2xl w-full max-h-[90vh] flex flex-col">
            <div className="p-6 border-b border-background-dark flex justify-between items-center bg-background shrink-0">
                <div>
                    <h2 className="text-xl font-bold text-basic">Manage Products</h2>
                    <p className="text-sm text-muted">Add or remove products from &quot;{collection.name}&quot;</p>
                </div>
                <button
                    onClick={onClose}
                    className="p-2 hover:bg-background-dark rounded-full transition-colors text-muted hover:text-basic"
                >
                    <X className="h-5 w-5" />
                </button>
            </div>

            <div className="p-6 border-b border-background-dark bg-background/50">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
                    <input
                        type="text"
                        placeholder="Search products by name or category..."
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-background border border-background-dark text-sm text-basic focus:outline-none focus:ring-2 focus:ring-primary/50"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-3">
                {isLoadingProducts || isLoadingCollection ? (
                    <div className="flex flex-col items-center justify-center py-12 text-muted">
                        <Loader2 className="h-8 w-8 animate-spin mb-4" />
                        <p>Loading data...</p>
                    </div>
                ) : filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {filteredProducts.map((product) => {
                            const isSelected = selectedProductIds.includes(product.id);
                            return (
                                <button
                                    key={product.id}
                                    type="button"
                                    onClick={() => toggleProduct(product.id)}
                                    className={`flex items-center gap-3 p-3 rounded-xl border transition-all text-left ${
                                        isSelected 
                                            ? 'border-primary bg-primary/5 ring-1 ring-primary' 
                                            : 'border-background-dark bg-background hover:border-muted'
                                    }`}
                                >
                                    <div className="relative h-12 w-12 rounded-lg overflow-hidden border border-background-dark shrink-0">
                                        {product.productImages?.[0] ? (
                                            <Image
                                                src={product.productImages[0].url}
                                                alt={product.name}
                                                fill
                                                className="object-cover"
                                            />
                                        ) : (
                                            <div className="h-full w-full bg-background-light" />
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-semibold text-basic truncate">{product.name}</p>
                                        <p className="text-xs text-muted">₦{product.price.toLocaleString()}</p>
                                    </div>
                                    <div className={`h-6 w-6 rounded-full flex items-center justify-center border transition-colors ${
                                        isSelected 
                                            ? 'bg-primary border-primary text-white' 
                                            : 'border-background-dark text-transparent'
                                    }`}>
                                        <Check className="h-3.5 w-3.5" />
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                ) : (
                    <div className="py-12 text-center text-muted">
                        No products found matching your search.
                    </div>
                )}
            </div>

            {state.error && (
                <div className="mx-6 p-4 bg-red-50 text-red-500 rounded-xl text-sm border border-red-100 italic">
                    {state.error}
                </div>
            )}

            <div className="p-6 border-t border-background-dark bg-background shrink-0 flex items-center justify-between gap-4">
                <div className="text-sm text-muted">
                    <span className="font-bold text-primary">{selectedProductIds.length}</span> products selected
                </div>
                <div className="flex gap-3">
                    <button
                        type="button"
                        onClick={onClose}
                        className="py-2.5 px-6 rounded-xl font-bold bg-background-dark text-muted hover:text-basic transition-all"
                    >
                        Cancel
                    </button>
                    <form action={handleSubmit}>
                        <button
                            type="submit"
                            disabled={isPending}
                            className="py-2.5 px-6 rounded-xl font-bold bg-primary text-white hover:opacity-90 transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                            {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
                            Update Collection
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
