import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight, ShieldCheck, Sparkles } from "lucide-react";
import ProductGallery from "@/components/main/ProductGallery";
import AddToCartButton from "@/components/main/cart/AddToCartButton";
import ProductCard from "@/components/main/ProductCard";
import type { Product } from "@/interfaces";

interface ProductPageProps {
  params: {
    id: string;
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;

  const product = await prisma.product.findUnique({
    where: { id },
    include: { productImages: true },
  });

  if (!product) {
    notFound();
  }

  // Fetch related products that share at least one category
  const relatedProducts = product.category.length > 0
    ? await prisma.product.findMany({
        where: {
          id: { not: product.id },
          category: { hasSome: product.category },
        },
        include: { productImages: true },
        take: 4,
        orderBy: { createdAt: "desc" },
      })
    : [];

  const discountedPrice = product.price * (1 - product.discount / 100);
  const hasDiscount = product.discount > 0;

  return (
    <main className="bg-background-dark min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4 sm:px-10">

        {/* Breadcrumb */}
        <div className="flex flex-wrap items-center gap-2 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-muted mb-12">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight size={14} />
          <Link href="/store" className="hover:text-primary transition-colors">Store</Link>
          <ChevronRight size={14} />
          <span className="text-primary truncate max-w-[200px]">{product.name}</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">

          {/* Image Gallery */}
          <div className="lg:w-1/2 flex flex-col gap-4">
            <ProductGallery
              images={product.productImages || []}
              productName={product.name}
              discount={product.discount}
            />
          </div>

          {/* Product Details */}
          <div className="lg:w-1/2 flex flex-col justify-center">

            <div className="mb-6 flex flex-wrap gap-2">
              {product.category.map((cat, idx) => (
                <span key={idx} className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest">
                  {cat}
                </span>
              ))}
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-basic leading-none tracking-tighter uppercase mb-6">
              {product.name}
            </h1>

            <div className="flex flex-wrap items-end gap-4 mb-10">
              <span className="text-4xl lg:text-5xl font-black text-primary tracking-tighter">
                ₦{discountedPrice.toLocaleString()}
              </span>
              {hasDiscount && (
                <span className="text-2xl text-muted font-bold line-through tracking-tight mb-1">
                  ₦{product.price.toLocaleString()}
                </span>
              )}
            </div>

            <p className="text-muted leading-relaxed text-lg mb-10 border-l-2 border-primary/30 pl-6 italic max-w-2xl">
              {product.description}
            </p>

            <div className="space-y-6 mb-12">
              <div className="flex items-center justify-between py-4 border-y border-background-light">
                <span className="font-bold text-sm text-basic uppercase tracking-widest">Availability</span>
                <span className={`font-black uppercase tracking-wider text-xs px-3 py-1 ${product.quantity > 0 ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                  {product.quantity > 0 ? `${product.quantity} In Stock` : 'Out of Stock'}
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <AddToCartButton productId={product.id} stock={product.quantity} />
            </div>

            <div className="grid grid-cols-1 gap-6 bg-background p-6 border border-background-light">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 text-primary rounded-full shrink-0">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <h4 className="text-xs font-black text-basic uppercase tracking-wider mb-1">Authentic Quality</h4>
                  <p className="text-[10px] text-muted leading-tight">100% genuine products with satisfaction guarantee</p>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-28">
            <div className="flex items-center gap-4 mb-12">
              <div className="p-2.5 bg-primary/10 text-primary rounded-full">
                <Sparkles size={18} />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary mb-1">You May Also Like</p>
                <h2 className="text-3xl sm:text-4xl font-black text-basic uppercase tracking-tighter leading-none">Related Items</h2>
              </div>
              <div className="hidden sm:block flex-1 h-px bg-background-light ml-6" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map((relProduct) => (
                <ProductCard key={relProduct.id} product={relProduct as unknown as Product} />
              ))}
            </div>
          </section>
        )}

      </div>
    </main>
  );
}
