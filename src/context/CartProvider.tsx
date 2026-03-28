"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  addToCart,
  removeFromCart,
  updateCartItemQuantity,
  getCart,
  syncGuestCart,
} from "@/actions/cart.actions";
import type { Session } from "@/lib/auth";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface GuestCartItem {
  productId: string;
  quantity: number;
}

interface CartContextValue {
  /** Total distinct items in the cart */
  itemCount: number;
  /** Guest-only: the raw localStorage items */
  guestItems: GuestCartItem[];
  /** Add an item (guest or logged-in) */
  addItem: (productId: string, quantity: number) => Promise<void>;
  /** Remove an item by cartItemId (logged-in) or productId (guest) */
  removeItem: (id: string) => Promise<void>;
  /** Update quantity by cartItemId (logged-in) or productId (guest) */
  updateQuantity: (id: string, quantity: number) => Promise<void>;
  /** Whether a cart mutation is in progress */
  isLoading: boolean;
}

const CartContext = createContext<CartContextValue | null>(null);

// ─── LocalStorage Helpers ─────────────────────────────────────────────────────

const LS_KEY = "geenahsstitches_cart";

function readGuestCart(): GuestCartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(LS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeGuestCart(items: GuestCartItem[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(LS_KEY, JSON.stringify(items));
}

function clearGuestCart() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(LS_KEY);
}

// ─── Provider ─────────────────────────────────────────────────────────────────

export function CartProvider({
  session,
  initialCartItemCount = 0,
  children,
}: {
  session: Session | null;
  initialCartItemCount?: number;
  children: React.ReactNode;
}) {
  const isLoggedIn = !!session;
  const [guestItems, setGuestItems] = useState<GuestCartItem[]>([]);
  const [dbItemCount, setDbItemCount] = useState(initialCartItemCount);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSynced, setHasSynced] = useState(false);

  // Load guest cart from localStorage on mount
  useEffect(() => {
    if (!isLoggedIn) {
      setGuestItems(readGuestCart());
    }
  }, [isLoggedIn]);

  // Sync guest cart → DB on login
  useEffect(() => {
    if (isLoggedIn && !hasSynced) {
      const guest = readGuestCart();
      if (guest.length > 0) {
        setIsLoading(true);
        syncGuestCart(guest)
          .then(async () => {
            clearGuestCart();
            setGuestItems([]);
            // Refresh DB count
            const cart = await getCart();
            setDbItemCount(cart?.cartItems?.length ?? 0);
          })
          .finally(() => {
            setIsLoading(false);
            setHasSynced(true);
          });
      } else {
        setHasSynced(true);
      }
    }
  }, [isLoggedIn, hasSynced]);

  const itemCount = isLoggedIn ? dbItemCount : guestItems.length;

  // ── Add Item ───────────────────────────────────────────────────────────────

  const addItem = useCallback(
    async (productId: string, quantity: number) => {
      setIsLoading(true);
      try {
        if (isLoggedIn) {
          await addToCart(productId, quantity);
          const cart = await getCart();
          setDbItemCount(cart?.cartItems?.length ?? 0);
        } else {
          setGuestItems((prev) => {
            const existing = prev.find((i) => i.productId === productId);
            let updated: GuestCartItem[];
            if (existing) {
              updated = prev.map((i) =>
                i.productId === productId
                  ? { ...i, quantity: i.quantity + quantity }
                  : i
              );
            } else {
              updated = [...prev, { productId, quantity }];
            }
            writeGuestCart(updated);
            return updated;
          });
        }
      } finally {
        setIsLoading(false);
      }
    },
    [isLoggedIn]
  );

  // ── Remove Item ────────────────────────────────────────────────────────────

  const removeItemFn = useCallback(
    async (id: string) => {
      setIsLoading(true);
      try {
        if (isLoggedIn) {
          await removeFromCart(id);
          const cart = await getCart();
          setDbItemCount(cart?.cartItems?.length ?? 0);
        } else {
          // id = productId for guest
          setGuestItems((prev) => {
            const updated = prev.filter((i) => i.productId !== id);
            writeGuestCart(updated);
            return updated;
          });
        }
      } finally {
        setIsLoading(false);
      }
    },
    [isLoggedIn]
  );

  // ── Update Quantity ────────────────────────────────────────────────────────

  const updateQuantityFn = useCallback(
    async (id: string, quantity: number) => {
      setIsLoading(true);
      try {
        if (isLoggedIn) {
          await updateCartItemQuantity(id, quantity);
          const cart = await getCart();
          setDbItemCount(cart?.cartItems?.length ?? 0);
        } else {
          // id = productId for guest
          setGuestItems((prev) => {
            let updated: GuestCartItem[];
            if (quantity <= 0) {
              updated = prev.filter((i) => i.productId !== id);
            } else {
              updated = prev.map((i) =>
                i.productId === id ? { ...i, quantity } : i
              );
            }
            writeGuestCart(updated);
            return updated;
          });
        }
      } finally {
        setIsLoading(false);
      }
    },
    [isLoggedIn]
  );

  return (
    <CartContext.Provider
      value={{
        itemCount,
        guestItems,
        addItem,
        removeItem: removeItemFn,
        updateQuantity: updateQuantityFn,
        isLoading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
