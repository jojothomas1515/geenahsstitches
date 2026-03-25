"use server";

import { prisma } from "@/lib/prisma";
import type { DashboardStats } from "@/interfaces";



export async function getDashboardStats(): Promise<DashboardStats> {
    try {
        const [
            totalProducts,
            totalUsers,
            totalOrders,
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
            prisma.order.count(),
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
            totalOrders,
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
    } catch (error) {
        console.error("Failed to fetch dashboard stats:", error);
        return {
            totalProducts: 0,
            totalUsers: 0,
            totalOrders: 0,
            pendingOrders: 0,
            processingOrders: 0,
            shippedOrders: 0,
            completedOrders: 0,
            cancelledOrders: 0,
            totalRevenue: 0,
            recentOrders: [],
        };
    }
}
