import { getCart } from "@/actions/cart.actions";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";
import { ShoppingBag, ChevronRight } from "lucide-react";
import CartItemRow from "@/components/main/cart/CartItemRow";
import CartSummary from "@/components/main/cart/CartSummary";
import GuestCartContent from "@/components/main/cart/GuestCartContent";
import type { CartItemDetail } from "@/interfaces";

export default async function CartPage() {
  const session = await auth.api.getSession({ headers: await headers() });

  // Guest users — render localStorage-based cart
  if (!session) {
    return (
      <main className="bg-background-dark min-h-screen pt-32 pb-20">
        <div className="container mx-auto px-4 sm:px-10">
          <GuestCartContent />
        </div>
      </main>
    );
  }

  // Logged-in users — render DB cart
  const cart = await getCart();
  const items = (cart?.cartItems ?? []) as unknown as CartItemDetail[];

  return (
    <main className="bg-background-dark min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4 sm:px-10">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-muted mb-12">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight size={14} />
          <span className="text-primary">Cart</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black text-basic leading-none tracking-tighter uppercase mb-12">
          Your Cart
        </h1>

        {items.length === 0 ? (
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
            {/* Items */}
            <div className="flex-1">
              <div className="hidden sm:flex justify-between text-[10px] font-black text-muted uppercase tracking-widest pb-4 border-b border-background-light">
                <span>Product</span>
                <div className="flex gap-16">
                  <span>Quantity</span>
                  <span>Total</span>
                  <span className="w-8" />
                </div>
              </div>
              {items.map((item) => (
                <CartItemRow key={item.id} item={item} />
              ))}
            </div>

            {/* Summary */}
            <div className="lg:w-[380px]">
              <CartSummary items={items} />
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
