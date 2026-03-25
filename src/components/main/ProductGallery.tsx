"use client";

import { useState } from "react";
import Image from "next/image";
import { Package } from "lucide-react";

interface ProductImage {
    url: string;
}

interface ProductGalleryProps {
    images: ProductImage[];
    productName: string;
    discount?: number;
}

export default function ProductGallery({ images, productName, discount = 0 }: ProductGalleryProps) {
    const [activeIndex, setActiveIndex] = useState(0);
    const hasDiscount = discount > 0;
    const hasImages = images && images.length > 0;

    return (
        <div className="w-full flex justify-center lg:justify-start">
            {/* Desktop View (hidden on screens smaller than lg) */}
            <div className="hidden lg:flex flex-col gap-4 w-full">
                <div className="relative aspect-3/4 w-full bg-background border border-background-light shadow-2xl overflow-hidden group">
                    {hasDiscount && (
                        <div className="absolute top-4 right-4 bg-red-500 text-white font-black text-xs px-3 py-1.5 uppercase tracking-widest z-10 shadow-lg">
                            -{discount}% OFF
                        </div>
                    )}
                    {hasImages ? (
                        <Image
                            src={images[activeIndex].url}
                            alt={`${productName} view ${activeIndex + 1}`}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-1000"
                            priority
                        />
                    ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-muted/30">
                            <Package size={80} strokeWidth={1} />
                            <span className="mt-4 font-bold uppercase tracking-widest text-xs">No Image Available</span>
                        </div>
                    )}
                </div>

                {/* Thumbnails desktop */}
                {images && images.length > 1 && (
                    <div className="grid grid-cols-4 gap-4">
                        {images.map((img, idx) => (
                            <button
                                key={idx}
                                onClick={() => setActiveIndex(idx)}
                                type="button"
                                className={`relative aspect-square bg-background border cursor-pointer hover:border-primary transition-colors overflow-hidden ${
                                    activeIndex === idx ? "border-primary shadow-lg shadow-primary/20 scale-105" : "border-background-light"
                                }`}
                                aria-label={`View image ${idx + 1}`}
                            >
                                <Image
                                    src={img.url}
                                    alt={`${productName} thumbnail ${idx + 1}`}
                                    fill
                                    className="object-cover hover:scale-110 transition-transform duration-500"
                                />
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Mobile View: Horizontal Scroll Snap Slideshow (hidden on lg and above) */}
            <div className="flex lg:hidden overflow-x-auto snap-x snap-mandatory gap-4 pb-4 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0 w-screen sm:w-full relative">
                 {hasImages ? (
                     images.map((img, idx) => (
                         <div key={idx} className="snap-center shrink-0 w-[85vw] sm:w-full relative aspect-3/4 border border-background-light shadow-xl overflow-hidden">
                             {hasDiscount && idx === 0 && (
                                 <div className="absolute top-4 right-4 bg-red-500 text-white font-black text-xs px-3 py-1.5 uppercase tracking-widest z-10 shadow-lg">
                                     -{discount}% OFF
                                 </div>
                             )}
                             <Image
                                 src={img.url}
                                 alt={`${productName} view ${idx + 1}`}
                                 fill
                                 className="object-cover"
                                 priority={idx === 0}
                             />
                         </div>
                     ))
                 ) : (
                     <div className="snap-center shrink-0 w-[85vw] sm:w-full relative aspect-3/4 bg-background border border-background-light shadow-2xl overflow-hidden flex flex-col items-center justify-center text-muted/30">
                         {hasDiscount && (
                             <div className="absolute top-4 right-4 bg-red-500 text-white font-black text-xs px-3 py-1.5 uppercase tracking-widest z-10 shadow-lg">
                                 -{discount}% OFF
                             </div>
                         )}
                         <Package size={80} strokeWidth={1} />
                         <span className="mt-4 font-bold uppercase tracking-widest text-xs">No Image Available</span>
                     </div>
                 )}
            </div>
        </div>
    );
}
