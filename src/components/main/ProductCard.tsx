"use client";

import Image from "next/image";
import Link from "next/link";
import { Package } from "lucide-react";
import type { Product } from "@/interfaces";

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    return (
        <Link 
            href={`/store/${product.id}`}
            className="group/product bg-background border border-background-dark p-2 hover:border-primary/30 transition-all shadow-sm block"
        >
            <div className="relative aspect-3/4 overflow-hidden bg-background-light">
                {product.discount > 0 && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white text-[10px] font-bold px-2 py-1 z-10">
                        -{product.discount}%
                    </div>
                )}
                {product.productImages && product.productImages[0] ? (
                    <Image 
                        src={product.productImages[0].url}
                        alt={product.name}
                        fill
                        className="object-cover group-hover/product:scale-110 transition-transform duration-700"
                    />
                ) : (
                    <div className="h-full w-full flex items-center justify-center text-muted">
                        <Package size={40} strokeWidth={1} />
                    </div>
                )}
                <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover/product:opacity-100 transition-opacity" />
            </div>
            <div className="p-5 space-y-3">
                <h5 className="text-[10px] font-black text-basic/40 uppercase tracking-widest truncate">{product.name}</h5>
                <div className="flex justify-between items-end">
                    <div className="flex flex-col">
                        {product.discount > 0 ? (
                            <>
                                <p className="text-xl font-black text-primary leading-none tracking-tighter">₦{(product.price * (1 - product.discount / 100)).toLocaleString()}</p>
                                <p className="text-muted line-through text-xs font-semibold mt-1">₦{product.price.toLocaleString()}</p>
                            </>
                        ) : (
                            <p className="text-xl font-black text-basic leading-none tracking-tighter">₦{product.price.toLocaleString()}</p>
                        )}
                    </div>
                    <div className="w-8 h-px bg-primary/30 group-hover/product:w-12 transition-all duration-700" />
                </div>
            </div>
        </Link>
    );
}
