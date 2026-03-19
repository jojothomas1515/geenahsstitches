"use server";

import { prisma } from "@/lib/prisma";
import { OrderStatus } from "@/generated/prisma/enums";
import { revalidatePath } from "next/cache";

export async function getOrders() {
    try {
        return await prisma.order.findMany({
            include: {
                user: { select: { name: true, email: true } },
                _count: { select: { orderItems: true } },
            },
            orderBy: { orderDate: "desc" },
        });
    } catch (error) {
        console.error("Failed to fetch orders:", error);
        return [];
    }
}

export async function updateOrderStatus(orderId: string, status: OrderStatus) {
    try {
        await prisma.order.update({
            where: { id: orderId },
            data: { orderStatus: status },
        });
        revalidatePath("/admin/dashboard/orders");
        return { success: true };
    } catch (error) {
        console.error("Failed to update order status:", error);
        return { error: "Failed to update order status." };
    }
}

export async function getOrderById(orderId: string) {
    try {
        return await prisma.order.findUnique({
            where: { id: orderId },
            include: {
                user: true,
                orderItems: {
                    include: {
                        product: true,
                    },
                },
            },
        });
    } catch (error) {
        console.error("Failed to fetch order details:", error);
        return null;
    }
}
