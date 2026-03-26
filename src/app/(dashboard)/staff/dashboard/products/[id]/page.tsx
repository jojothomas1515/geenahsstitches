"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import {
    ArrowLeft,
    Loader2,
    Package,
    Tag,
    Layers,
    BarChart3,
    Percent,
    ChevronLeft,
    ChevronRight,
    Edit,
    Trash2,
} from "lucide-react";
import { getProductById } from "@/actions/product.actions";
import ProductForm from "@/components/dashboard/staff/products/ProductForm";
import type { Product } from "@/interfaces";

export default function StaffProductViewPage() {
    const params = useParams();
    const router = useRouter();
    const [product, setProduct] = useState<Product | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const [isFormOpen, setIsFormOpen] = useState(false);

    const fetchProduct = async () => {
        setIsLoading(true);
        try {
            const data = await getProductById(params.id as string);
            setProduct(data as Product | null);
        } catch (error) {
            console.error("Failed to fetch product:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params.id]);

    const handleEditSuccess = () => {
        setIsFormOpen(false);
        fetchProduct();
    };

    const nextImage = () => {
        if (product && product.productImages.length > 0) {
            setActiveImageIndex((prev) => (prev + 1) % product.productImages.length);
        }
    };

    const prevImage = () => {
        if (product && product.productImages.length > 0) {
            setActiveImageIndex((prev) => (prev - 1 + product.productImages.length) % product.productImages.length);
        }
    };

    if (isLoading) {
        return (
            <main className="w-full h-dvh flex items-center justify-center bg-background-light/30">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="h-10 w-10 text-primary animate-spin" />
                    <p className="text-muted font-medium">Loading product details...</p>
                </div>
            </main>
        );
    }

    if (!product) {
        return (
            <main className="w-full h-dvh flex items-center justify-center bg-background-light/30">
                <div className="text-center">
                    <Package className="h-16 w-16 text-muted mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-basic mb-2">Product Not Found</h2>
                    <p className="text-muted mb-6">The product you&apos;re looking for doesn&apos;t exist or has been removed.</p>
                    <button
                        onClick={() => router.push("/staff/dashboard/products")}
                        className="px-6 py-3 bg-primary text-basic font-bold rounded-xl hover:opacity-90 transition-all"
                    >
                        Back to Products
                    </button>
                </div>
            </main>
        );
    }

    const discountedPrice = product.discount > 0
        ? product.price * (1 - product.discount / 100)
        : product.price;

    return (
        <main className="w-full h-dvh p-6 md:p-10 overflow-y-scroll bg-background-light/30">
            <div className="max-w-6xl mx-auto">
                {/* Back button */}
                <button
                    onClick={() => router.push("/staff/dashboard/products")}
                    className="flex items-center gap-2 text-muted hover:text-basic font-medium mb-8 transition-colors group"
                >
                    <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                    Back to Products
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    {/* Image Gallery */}
                    <div className="space-y-4">
                        {/* Main Image */}
                        <div className="relative aspect-square rounded-2xl overflow-hidden border border-background-dark bg-background shadow-sm">
                            {product.productImages.length > 0 ? (
                                <>
                                    <Image
                                        src={product.productImages[activeImageIndex].url}
                                        alt={product.name}
                                        fill
                                        className="object-cover transition-all duration-300"
                                    />
                                    {product.productImages.length > 1 && (
                                        <>
                                            <button
                                                onClick={prevImage}
                                                className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-black/40 hover:bg-black/60 text-basic rounded-full transition-all backdrop-blur-sm"
                                            >
                                                <ChevronLeft className="h-5 w-5" />
                                            </button>
                                            <button
                                                onClick={nextImage}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-black/40 hover:bg-black/60 text-basic rounded-full transition-all backdrop-blur-sm"
                                            >
                                                <ChevronRight className="h-5 w-5" />
                                            </button>
                                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                                                {product.productImages.map((_, i) => (
                                                    <button
                                                        key={i}
                                                        onClick={() => setActiveImageIndex(i)}
                                                        className={`h-2 rounded-full transition-all ${i === activeImageIndex ? "w-6 bg-white" : "w-2 bg-white/50 hover:bg-white/80"}`}
                                                    />
                                                ))}
                                            </div>
                                        </>
                                    )}
                                    {product.discount > 0 && (
                                        <div className="absolute top-4 left-4 px-3 py-1.5 bg-red-500 text-basic text-xs font-bold rounded-full shadow-lg">
                                            -{product.discount}% OFF
                                        </div>
                                    )}
                                </>
                            ) : (
                                <div className="h-full w-full flex flex-col items-center justify-center text-muted">
                                    <Package className="h-20 w-20 mb-3 opacity-30" />
                                    <p className="text-sm">No images uploaded</p>
                                </div>
                            )}
                        </div>

                        {/* Thumbnail Strip */}
                        {product.productImages.length > 1 && (
                            <div className="flex gap-3 overflow-x-auto pb-2">
                                {product.productImages.map((img, i) => (
                                    <button
                                        key={img.id}
                                        onClick={() => setActiveImageIndex(i)}
                                        className={`relative h-20 w-20 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${i === activeImageIndex ? "border-primary shadow-md shadow-primary/20 scale-105" : "border-background-dark opacity-70 hover:opacity-100"}`}
                                    >
                                        <Image src={img.url} alt={img.name} fill className="object-cover" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Product Details */}
                    <div className="space-y-6">
                        {/* Header */}
                        <div>
                            <div className="flex flex-wrap gap-2 mb-3">
                                {product.category.map((cat, i) => (
                                    <span
                                        key={i}
                                        className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold"
                                    >
                                        {cat}
                                    </span>
                                ))}
                            </div>
                            <h1 className="text-3xl font-bold text-basic mb-2">{product.name}</h1>
                        </div>

                        {/* Price */}
                        <div className="bg-background p-6 rounded-2xl border border-background-dark">
                            <div className="flex items-baseline gap-4">
                                <span className="text-3xl font-bold text-primary">
                                    ₦{discountedPrice.toLocaleString()}
                                </span>
                                {product.discount > 0 && (
                                    <span className="text-lg text-muted line-through">
                                        ₦{product.price.toLocaleString()}
                                    </span>
                                )}
                            </div>
                            {product.discount > 0 && (
                                <p className="text-sm text-green-600 font-medium mt-1">
                                    You save ₦{(product.price - discountedPrice).toLocaleString()} ({product.discount}% off)
                                </p>
                            )}
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-background p-5 rounded-2xl border border-background-dark flex items-center gap-4">
                                <div className="h-10 w-10 bg-blue-50 text-blue-500 rounded-xl flex items-center justify-center">
                                    <Layers className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-muted uppercase tracking-wider">Stock</p>
                                    <p className={`text-xl font-bold ${product.quantity <= 5 ? "text-red-500" : "text-basic"}`}>
                                        {product.quantity}
                                    </p>
                                </div>
                            </div>
                            <div className="bg-background p-5 rounded-2xl border border-background-dark flex items-center gap-4">
                                <div className="h-10 w-10 bg-purple-50 text-purple-500 rounded-xl flex items-center justify-center">
                                    <Percent className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-muted uppercase tracking-wider">Discount</p>
                                    <p className="text-xl font-bold text-basic">{product.discount}%</p>
                                </div>
                            </div>
                            <div className="bg-background p-5 rounded-2xl border border-background-dark flex items-center gap-4">
                                <div className="h-10 w-10 bg-green-50 text-green-500 rounded-xl flex items-center justify-center">
                                    <Tag className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-muted uppercase tracking-wider">Categories</p>
                                    <p className="text-xl font-bold text-basic">{product.category.length}</p>
                                </div>
                            </div>
                            <div className="bg-background p-5 rounded-2xl border border-background-dark flex items-center gap-4">
                                <div className="h-10 w-10 bg-orange-50 text-orange-500 rounded-xl flex items-center justify-center">
                                    <BarChart3 className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-muted uppercase tracking-wider">Images</p>
                                    <p className="text-xl font-bold text-basic">{product.productImages.length}</p>
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="bg-background p-6 rounded-2xl border border-background-dark">
                            <h3 className="text-sm font-bold text-muted uppercase tracking-wider mb-3">Description</h3>
                            <p className="text-basic leading-relaxed whitespace-pre-line">{product.description}</p>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-4 pt-2">
                            <button
                                onClick={() => setIsFormOpen(true)}
                                className="flex-1 flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl font-bold bg-primary text-basic hover:opacity-90 transition-all shadow-lg shadow-primary/20"
                            >
                                <Edit className="h-4 w-4" />
                                Edit Product
                            </button>
                            <button
                                onClick={() => router.push("/staff/dashboard/products")}
                                className="py-3.5 px-6 rounded-xl font-bold bg-background-dark text-muted hover:text-basic transition-all border border-background-dark"
                            >
                                <Trash2 className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {/* Edit Product Modal */}
            {isFormOpen && product && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="w-full max-w-2xl animate-in zoom-in-95 duration-200">
                        <ProductForm
                            product={product}
                            onClose={() => setIsFormOpen(false)}
                            onSuccess={handleEditSuccess}
                        />
                    </div>
                </div>
            )}
        </main>
    );
}
