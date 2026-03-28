"use client";

import { useEffect, useState, useTransition } from "react";
import { useCart } from "@/context/CartProvider";
import { getProductsByIds } from "@/actions/cart.actions";
import Link from "next/link";
import Image from "next/image";
import { ShoppingBag, ChevronRight, Trash2, Minus, Plus, Package } from "lucide-react";
import type { Product } from "@/interfaces";

interface GuestProductItem {
  productId: string;
  quantity: number;
  product: Product;
}

export default function GuestCartContent() {
  const { guestItems, removeItem, updateQuantity, isLoading } = useCart();
  const [products, setProducts] = useState<GuestProductItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [, startTransition] = useTransition();

  useEffect(() => {
    if (guestItems.length === 0) {
      setProducts([]);
      setLoading(false);
      return;
    }

    const ids = guestItems.map((i) => i.productId);
    getProductsByIds(ids).then((prods) => {
      const mapped = guestItems
        .map((gi) => {
          const product = prods.find((p) => p.id === gi.productId);
          if (!product) return null;
          return { productId: gi.productId, quantity: gi.quantity, product: product as unknown as Product };
        })
        .filter(Boolean) as GuestProductItem[];
      setProducts(mapped);
      setLoading(false);
    });
  }, [guestItems]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="animate-pulse text-muted font-bold uppercase tracking-widest text-sm">Loading cart...</div>
      </div>
    );
  }

  const totalItems = products.reduce((s, i) => s + i.quantity, 0);
  const subtotal = products.reduce((s, i) => {
    const dp = i.product.price * (1 - i.product.discount / 100);
    return s + dp * i.quantity;
  }, 0);

  return (
    <>
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-muted mb-12">
        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
        <ChevronRight size={14} />
        <span className="text-primary">Cart</span>
      </div>

      <h1 className="text-4xl sm:text-6xl font-black text-basic leading-none tracking-tighter uppercase mb-12">
        Your Cart
      </h1>

      {products.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-32 space-y-8">
          <div className="p-8 bg-background border border-background-light rounded-full">
            <ShoppingBag size={48} className="text-muted opacity-30" />
          </div>
          <div className="text-center space-y-3">
            <h2 className="text-2xl font-black text-basic uppercase tracking-wider">Your cart is empty</h2>
            <p className="text-muted text-lg max-w-md">
              Looks like you haven&apos;t added anything to your cart yet. Browse our collection and find something you love.
            </p>
          </div>
          <Link
            href="/store"
            className="px-10 py-5 bg-primary text-basic font-black uppercase tracking-[0.2em] hover:bg-primary/90 transition-all shadow-xl shadow-primary/10 hover:-translate-y-1"
          >
            Explore Store
          </Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="flex-1">
            <div className="hidden sm:flex justify-between text-[10px] font-black text-muted uppercase tracking-widest pb-4 border-b border-background-light">
              <span>Product</span>
              <div className="flex gap-16">
                <span>Quantity</span>
                <span>Total</span>
                <span className="w-8" />
              </div>
            </div>
            {products.map((item) => {
              const discountedPrice = item.product.price * (1 - item.product.discount / 100);
              const rowSubtotal = discountedPrice * item.quantity;
              return (
                <div key={item.productId} className={`flex flex-col sm:flex-row gap-6 py-8 border-b border-background-light ${isLoading ? "opacity-60" : ""} transition-opacity`}>
                  <Link href={`/store/${item.product.id}`} className="relative w-full sm:w-28 aspect-square bg-background-light shrink-0 overflow-hidden group">
                    {item.product.productImages?.[0] ? (
                      <Image src={item.product.productImages[0].url} alt={item.product.name} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted"><Package size={32} strokeWidth={1} /></div>
                    )}
                  </Link>
                  <div className="flex-1 flex flex-col sm:flex-row gap-4 justify-between">
                    <div className="space-y-2">
                      <Link href={`/store/${item.product.id}`} className="text-sm font-black text-basic uppercase tracking-wider hover:text-primary transition-colors">
                        {item.product.name}
                      </Link>
                      <div className="flex items-end gap-2">
                        <span className="text-lg font-black text-primary tracking-tight">₦{discountedPrice.toLocaleString()}</span>
                        {item.product.discount > 0 && (
                          <span className="text-xs text-muted line-through font-semibold">₦{item.product.price.toLocaleString()}</span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="flex items-center border border-background-light">
                        <button type="button" onClick={() => startTransition(() => updateQuantity(item.productId, Math.max(1, item.quantity - 1)))} disabled={isLoading || item.quantity <= 1} className="px-3 py-2 text-muted hover:text-basic transition-colors disabled:opacity-30 disabled:cursor-not-allowed">
                          <Minus size={14} />
                        </button>
                        <span className="px-4 py-2 font-black text-xs text-basic min-w-[40px] text-center">{item.quantity}</span>
                        <button type="button" onClick={() => startTransition(() => updateQuantity(item.productId, Math.min(item.product.quantity, item.quantity + 1)))} disabled={isLoading || item.quantity >= item.product.quantity} className="px-3 py-2 text-muted hover:text-basic transition-colors disabled:opacity-30 disabled:cursor-not-allowed">
                          <Plus size={14} />
                        </button>
                      </div>
                      <span className="text-lg font-black text-basic tracking-tight min-w-[100px] text-right">₦{rowSubtotal.toLocaleString()}</span>
                      <button onClick={() => startTransition(() => removeItem(item.productId))} disabled={isLoading} className="p-2 text-muted hover:text-red-500 transition-colors disabled:opacity-30" title="Remove item">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Summary */}
          <div className="lg:w-[380px]">
            <div className="bg-background border border-background-light p-8 space-y-6 sticky top-32">
              <h3 className="text-sm font-black text-basic uppercase tracking-widest border-b border-background-light pb-4">Order Summary</h3>
              <div className="space-y-4 text-sm">
                <div className="flex justify-between text-muted">
                  <span>Items ({totalItems})</span>
                  <span className="font-bold text-basic">₦{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-muted">
                  <span>Shipping</span>
                  <span className="font-bold text-basic italic text-xs">Calculated at checkout</span>
                </div>
              </div>
              <div className="border-t border-background-light pt-4 flex justify-between items-end">
                <span className="text-xs font-black text-basic uppercase tracking-widest">Total</span>
                <span className="text-2xl font-black text-primary tracking-tight">₦{subtotal.toLocaleString()}</span>
              </div>
              <Link href="/login?referrer=/cart" className="block w-full py-5 bg-primary text-basic font-black uppercase tracking-[0.2em] text-center hover:bg-primary/90 transition-all shadow-xl shadow-primary/10">
                Login to Checkout
              </Link>
              <Link href="/store" className="block text-center text-xs text-muted font-bold uppercase tracking-widest hover:text-primary transition-colors">
                Continue Shopping →
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
