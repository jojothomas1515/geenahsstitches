"use client";

import Link from "next/link";
import { ChevronRight, Package } from "lucide-react";
import type { Collection } from "@/interfaces";
import ProductCard from "./ProductCard";

interface FeaturedCollectionsProps {
    collections: Collection[];
}

export default function FeaturedCollections({ collections }: FeaturedCollectionsProps) {
    if (collections.length === 0) return null;

    return (
        <section className="py-20 bg-background-dark">
            <div className="container mx-auto px-4 sm:px-10">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h2 className="text-sm font-bold text-primary uppercase tracking-[0.2em] mb-3">Curated Selection</h2>
                        <h3 className="text-4xl font-black text-basic leading-tight">Our Collections</h3>
                    </div>
                    <Link
                        href="/collections"
                        className="group flex items-center gap-2 text-sm font-bold text-muted hover:text-primary transition-colors mb-2"
                    >
                        View All Collections
                        <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                <div className="space-y-20">
                    {collections.map((collection, index) => (
                        <div key={collection.id} className="group">
                            <div className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-center`}>
                                {/* Collection Info */}
                                <div className="lg:w-1/3 space-y-6">
                                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider">
                                        <Package size={12} />
                                        Collection
                                    </div>
                                    <h4 className="text-3xl font-bold text-basic">{collection.name}</h4>
                                    <p className="text-muted leading-relaxed line-clamp-4 italic">
                                        &quot;{collection.description}&quot;
                                    </p>
                                    <Link
                                        href={`/collections/${collection.id}`}
                                        className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-basic font-bold hover:bg-primary/90 transition-all shadow-xl shadow-primary/10 hover:-translate-y-1"
                                    >
                                        Explore Collection
                                        <ChevronRight size={18} />
                                    </Link>
                                </div>

                                {/* Products Grid/List */}
                                <div className="lg:w-2/3 w-full">
                                    <div className="flex overflow-x-auto snap-x snap-mandatory sm:grid sm:grid-cols-2 xl:grid-cols-3 gap-6 pb-4 sm:pb-0 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0 w-screen sm:w-auto">
                                        {(collection.products || []).length > 0 ? (
                                            (collection.products || []).slice(0, 3).map((product) => (
                                                <div key={product.id} className="snap-start shrink-0 w-[80vw] sm:w-auto">
                                                    <ProductCard product={product} />
                                                </div>
                                            ))
                                        ) : (
                                            <div className="col-span-full py-12 text-center bg-background border border-background-dark border-dashed w-full shrink-0">
                                                <Package size={40} className="text-muted mx-auto mb-3 opacity-20" />
                                                <p className="text-muted text-sm italic">New products coming soon to this collection...</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Divider for next collection */}
                            {index < collections.length - 1 && (
                                <div className="h-px w-full bg-linear-to-r from-transparent via-background-dark to-transparent mt-20" />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
