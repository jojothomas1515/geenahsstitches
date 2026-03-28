import Link from "next/link";
import type { CartItemDetail } from "@/interfaces";

interface CartSummaryProps {
  items: CartItemDetail[];
}

export default function CartSummary({ items }: CartSummaryProps) {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => {
    const discountedPrice = item.product.price * (1 - item.product.discount / 100);
    return sum + discountedPrice * item.quantity;
  }, 0);

  return (
    <div className="bg-background border border-background-light p-8 space-y-6 sticky top-32">
      <h3 className="text-sm font-black text-basic uppercase tracking-widest border-b border-background-light pb-4">
        Order Summary
      </h3>

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
        <span className="text-2xl font-black text-primary tracking-tight">
          ₦{subtotal.toLocaleString()}
        </span>
      </div>

      <button
        disabled
        className="w-full py-5 bg-primary text-basic font-black uppercase tracking-[0.2em] hover:bg-primary/90 transition-all shadow-xl shadow-primary/10 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Checkout Coming Soon
      </button>

      <Link
        href="/store"
        className="block text-center text-xs text-muted font-bold uppercase tracking-widest hover:text-primary transition-colors"
      >
        Continue Shopping →
      </Link>
    </div>
  );
}
