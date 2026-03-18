"use server";

import { prisma } from "@/lib/prisma";

export interface DashboardStats {
    totalProducts: number;
    totalUsers: number;
    pendingOrders: number;
    processingOrders: number;
    shippedOrders: number;
    completedOrders: number;
    cancelledOrders: number;
    totalRevenue: number;
    recentOrders: {
        id: string;
        userName: string;
        totalAmount: number;
        orderStatus: string;
        orderDate: Date;
    }[];
}

export async function getDashboardStats(): Promise<DashboardStats> {
    const [
        totalProducts,
        totalUsers,
        pendingOrders,
        processingOrders,
        shippedOrders,
        completedOrders,
        cancelledOrders,
        revenueResult,
        recentOrders,
    ] = await Promise.all([
        prisma.product.count(),
        prisma.user.count(),
        prisma.order.count({ where: { orderStatus: "PENDING" } }),
        prisma.order.count({ where: { orderStatus: "PROCESSING" } }),
        prisma.order.count({ where: { orderStatus: "SHIPPED" } }),
        prisma.order.count({ where: { orderStatus: "DELIVERED" } }),
        prisma.order.count({ where: { orderStatus: "CANCELLED" } }),
        prisma.order.aggregate({ _sum: { totalAmount: true } }),
        prisma.order.findMany({
            take: 5,
            orderBy: { orderDate: "desc" },
            include: { user: { select: { name: true } } },
        }),
    ]);

    return {
        totalProducts,
        totalUsers,
        pendingOrders,
        processingOrders,
        shippedOrders,
        completedOrders,
        cancelledOrders,
        totalRevenue: revenueResult._sum.totalAmount ?? 0,
        recentOrders: recentOrders.map((order) => ({
            id: order.id,
            userName: order.user.name,
            totalAmount: order.totalAmount,
            orderStatus: order.orderStatus,
            orderDate: order.orderDate,
        })),
    };
}
