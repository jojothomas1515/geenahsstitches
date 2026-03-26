import { getProductById } from "@/actions/product.actions";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight, ShoppingBag, ShieldCheck } from "lucide-react";
import ProductGallery from "@/components/main/ProductGallery";

interface ProductPageProps {
  params: {
    id: string;
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

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
              <button
                disabled={product.quantity === 0}
                className="flex-1 flex items-center justify-center gap-3 bg-background-light hover:bg-primary text-basic py-5 px-8 font-black uppercase tracking-[0.2em] transition-all shadow-xl hover:shadow-primary/20 hover:-translate-y-1 disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:bg-basic disabled:cursor-not-allowed group"
              >
                <ShoppingBag size={20} className="group-hover:-rotate-12 transition-transform" />
                Add to Cart
              </button>
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
      </div>
    </main>
  );
}
