import { prisma } from "@/lib/prisma";
import ProductCard from "@/components/main/ProductCard";
import { notFound } from "next/navigation";
import { Package } from "lucide-react";
import { Product } from "@/interfaces";

interface CollectionDetailPageProps {
    params: {
        id: string;
    };
}

export default async function CollectionDetailPage({ params }: CollectionDetailPageProps) {
    const { id } = params;

    const collection = await prisma.collection.findUnique({
        where: { id },
        include: {
            products: {
                include: {
                    productImages: true,
                },
                orderBy: {
                    name: "asc",
                },
            },
        },
    });

    if (!collection) {
        notFound();
    }

    return (
        <main className="bg-background-dark min-h-screen">
            {/* Header / Intro */}
            <section className="bg-background-light text-basic py-40 px-6 sm:px-10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/4 h-full bg-primary/20 -skew-x-12 translate-x-1/2" />
                <div className="container mx-auto relative">
                    <div className="space-y-6">
                        <div className="inline-flex items-center gap-4">
                            <div className="w-12 h-px bg-primary" />
                            <span className="text-primary font-bold text-[10px] uppercase tracking-[0.4em]">Collection Detail</span>
                        </div>
                        <h1 className="text-7xl sm:text-9xl font-black mb-8 tracking-tighter uppercase leading-[0.85]">{collection.name}</h1>
                        <div className="max-w-3xl border-l-4 border-primary pl-10 py-2">
                            <p className="text-2xl sm:text-3xl text-basic/50 italic font-medium leading-tight">
                                &quot;{collection.description}&quot;
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Products Grid */}
            <section className="py-24 px-4 sm:px-10">
                <div className="container mx-auto">
                    <div className="flex justify-between items-center mb-16 border-b border-background-dark pb-8">
                        <div>
                            <p className="text-muted font-bold text-sm tracking-widest uppercase">
                                {(collection.products || []).length} Products Found
                            </p>
                        </div>
                        <div className="flex gap-4">
                            {/* Potential filters could go here */}
                        </div>
                    </div>

                    {(collection.products || []).length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                            {(collection.products || []).map((product) => (
                                <ProductCard key={product.id} product={product as Product} />
                            ))}
                        </div>
                    ) : (
                        <div className="py-32 text-center bg-background border border-background-dark border-dashed flex flex-col items-center justify-center rounded-none">
                            <Package size={64} className="text-muted mb-6 opacity-20" strokeWidth={1} />
                            <h2 className="text-2xl font-bold text-basic mb-2">Collection is Empty</h2>
                            <p className="text-muted italic max-w-md mx-auto">
                                We are currently selecting the perfect pieces for this collection. Please check back soon!
                            </p>
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
}
