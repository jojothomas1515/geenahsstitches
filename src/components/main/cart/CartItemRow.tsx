"use client";

import { useState, useTransition } from "react";
import { updateCartItemQuantity, removeFromCart } from "@/actions/cart.actions";
import Image from "next/image";
import Link from "next/link";
import { Trash2, Minus, Plus, Package } from "lucide-react";
import type { CartItemDetail } from "@/interfaces";

interface CartItemRowProps {
  item: CartItemDetail;
}

export default function CartItemRow({ item }: CartItemRowProps) {
  const { product } = item;
  const [quantity, setQuantity] = useState(item.quantity);
  const [isPending, startTransition] = useTransition();
  const [isRemoving, setIsRemoving] = useState(false);

  const discountedPrice = product.price * (1 - product.discount / 100);
  const subtotal = discountedPrice * quantity;

  const handleQuantityChange = (newQty: number) => {
    setQuantity(newQty);
    startTransition(async () => {
      await updateCartItemQuantity(item.id, newQty);
    });
  };

  const handleRemove = () => {
    setIsRemoving(true);
    startTransition(async () => {
      await removeFromCart(item.id);
    });
  };

  if (isRemoving) return null;

  return (
    <div className={`flex flex-col sm:flex-row gap-6 py-8 border-b border-background-light ${isPending ? "opacity-60" : ""} transition-opacity`}>
      {/* Image */}
      <Link href={`/store/${product.id}`} className="relative w-full sm:w-28 aspect-square bg-background-light shrink-0 overflow-hidden group">
        {product.productImages?.[0] ? (
          <Image
            src={product.productImages[0].url}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted">
            <Package size={32} strokeWidth={1} />
          </div>
        )}
      </Link>

      {/* Details */}
      <div className="flex-1 flex flex-col sm:flex-row gap-4 justify-between">
        <div className="space-y-2">
          <Link href={`/store/${product.id}`} className="text-sm font-black text-basic uppercase tracking-wider hover:text-primary transition-colors">
            {product.name}
          </Link>
          <div className="flex items-end gap-2">
            <span className="text-lg font-black text-primary tracking-tight">
              ₦{discountedPrice.toLocaleString()}
            </span>
            {product.discount > 0 && (
              <span className="text-xs text-muted line-through font-semibold">
                ₦{product.price.toLocaleString()}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-6">
          {/* Quantity */}
          <div className="flex items-center border border-background-light">
            <button
              type="button"
              onClick={() => handleQuantityChange(Math.max(1, quantity - 1))}
              disabled={isPending || quantity <= 1}
              className="px-3 py-2 text-muted hover:text-basic transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <Minus size={14} />
            </button>
            <span className="px-4 py-2 font-black text-xs text-basic min-w-[40px] text-center">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => handleQuantityChange(Math.min(product.quantity, quantity + 1))}
              disabled={isPending || quantity >= product.quantity}
              className="px-3 py-2 text-muted hover:text-basic transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <Plus size={14} />
            </button>
          </div>

          {/* Subtotal */}
          <span className="text-lg font-black text-basic tracking-tight min-w-[100px] text-right">
            ₦{subtotal.toLocaleString()}
          </span>

          {/* Remove */}
          <button
            onClick={handleRemove}
            disabled={isPending}
            className="p-2 text-muted hover:text-red-500 transition-colors disabled:opacity-30"
            title="Remove item"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
