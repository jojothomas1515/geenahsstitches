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
            <div className="p-4">
                <h5 className="font-bold text-basic truncate mb-1">{product.name}</h5>
                <p className="text-primary font-black">₦{product.price.toLocaleString()}</p>
            </div>
        </Link>
    );
}
