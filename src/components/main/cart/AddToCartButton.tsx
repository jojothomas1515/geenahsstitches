"use client";

import { useState } from "react";
import { useCart } from "@/context/CartProvider";
import { ShoppingBag, Check, Minus, Plus } from "lucide-react";

interface AddToCartButtonProps {
  productId: string;
  stock: number;
}

export default function AddToCartButton({ productId, stock }: AddToCartButtonProps) {
  const { addItem, isLoading: cartLoading } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const isOutOfStock = stock === 0;

  const handleAdd = async () => {
    await addItem(productId, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      {/* Quantity Selector */}
      <div className="flex items-center border border-background-light">
        <button
          type="button"
          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          disabled={isOutOfStock || quantity <= 1}
          className="px-4 py-4 text-muted hover:text-basic transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <Minus size={16} />
        </button>
        <span className="px-6 py-4 font-black text-sm text-basic min-w-[50px] text-center">
          {quantity}
        </span>
        <button
          type="button"
          onClick={() => setQuantity((q) => Math.min(stock, q + 1))}
          disabled={isOutOfStock || quantity >= stock}
          className="px-4 py-4 text-muted hover:text-basic transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <Plus size={16} />
        </button>
      </div>

      {/* Add to Cart Button */}
      <button
        onClick={handleAdd}
        disabled={isOutOfStock || cartLoading}
        className={`flex-1 flex items-center justify-center gap-3 py-5 px-8 font-black uppercase tracking-[0.2em] transition-all shadow-xl hover:-translate-y-1 disabled:opacity-50 disabled:hover:translate-y-0 disabled:cursor-not-allowed group ${
          added
            ? "bg-green-600 text-white hover:bg-green-600 shadow-green-600/20"
            : "bg-background-light hover:bg-primary text-basic hover:shadow-primary/20"
        }`}
      >
        {cartLoading ? (
          <span className="animate-pulse">Adding...</span>
        ) : added ? (
          <>
            <Check size={20} />
            Added to Cart
          </>
        ) : (
          <>
            <ShoppingBag size={20} className="group-hover:-rotate-12 transition-transform" />
            Add to Cart
          </>
        )}
      </button>
    </div>
  );
}
