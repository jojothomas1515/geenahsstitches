"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

// ─── Helpers ──────────────────────────────────────────────────────────────────

async function getSessionOrThrow() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) throw new Error("Unauthorized");
  return session;
}

async function getOrCreateCart(userId: string) {
  let cart = await prisma.cart.findUnique({ where: { userId } });
  if (!cart) {
    cart = await prisma.cart.create({ data: { userId } });
  }
  return cart;
}

// ─── Actions ──────────────────────────────────────────────────────────────────

export async function getCart() {
  const session = await getSessionOrThrow();
  const cart = await prisma.cart.findUnique({
    where: { userId: session.user.id },
    include: {
      cartItems: {
        include: {
          product: {
            include: {
              productImages: true,
            },
          },
        },
        orderBy: { id: "desc" },
      },
    },
  });
  return cart;
}

export async function addToCart(productId: string, quantity: number = 1) {
  const session = await getSessionOrThrow();
  const cart = await getOrCreateCart(session.user.id);

  // Check if item already exists in cart
  const existingItem = await prisma.cartItem.findFirst({
    where: { cartId: cart.id, productId },
  });

  if (existingItem) {
    await prisma.cartItem.update({
      where: { id: existingItem.id },
      data: { quantity: existingItem.quantity + quantity },
    });
  } else {
    await prisma.cartItem.create({
      data: {
        cartId: cart.id,
        productId,
        quantity,
      },
    });
  }

  revalidatePath("/cart");
  revalidatePath("/store");
  return { success: true };
}

export async function updateCartItemQuantity(
  cartItemId: string,
  quantity: number
) {
  await getSessionOrThrow();

  if (quantity <= 0) {
    await prisma.cartItem.delete({ where: { id: cartItemId } });
  } else {
    await prisma.cartItem.update({
      where: { id: cartItemId },
      data: { quantity },
    });
  }

  revalidatePath("/cart");
  return { success: true };
}

export async function removeFromCart(cartItemId: string) {
  await getSessionOrThrow();

  await prisma.cartItem.delete({ where: { id: cartItemId } });

  revalidatePath("/cart");
  return { success: true };
}

export async function getCartItemCount() {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) return 0;

    const cart = await prisma.cart.findUnique({
      where: { userId: session.user.id },
      include: { _count: { select: { cartItems: true } } },
    });

    return cart?._count.cartItems ?? 0;
  } catch {
    return 0;
  }
}

export async function syncGuestCart(
  items: { productId: string; quantity: number }[]
) {
  const session = await getSessionOrThrow();
  const cart = await getOrCreateCart(session.user.id);

  for (const item of items) {
    const existing = await prisma.cartItem.findFirst({
      where: { cartId: cart.id, productId: item.productId },
    });

    if (existing) {
      await prisma.cartItem.update({
        where: { id: existing.id },
        data: { quantity: existing.quantity + item.quantity },
      });
    } else {
      await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId: item.productId,
          quantity: item.quantity,
        },
      });
    }
  }

  revalidatePath("/cart");
  revalidatePath("/store");
  return { success: true };
}

export async function getProductsByIds(ids: string[]) {
  if (ids.length === 0) return [];
  return prisma.product.findMany({
    where: { id: { in: ids } },
    include: { productImages: true },
  });
}
