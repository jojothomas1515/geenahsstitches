"use server";

import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/auth-guard";
import type { StaffDashboardStats } from "@/interfaces";

export async function getStaffDashboardStats(): Promise<StaffDashboardStats> {
    await requireRole("ADMIN", "STAFF");

    try {
        const [
            totalProducts,
            totalOrders,
            orderStatusCounts,
            revenueResult,
            recentOrders,
        ] = await Promise.all([
            prisma.product.count(),
            prisma.order.count(),
            prisma.order.groupBy({
                by: ["orderStatus"],
                _count: { _all: true },
            }),
            prisma.order.aggregate({ _sum: { totalAmount: true } }),
            prisma.order.findMany({
                take: 5,
                orderBy: { orderDate: "desc" },
                include: { user: { select: { name: true } } },
            }),
        ]);

        const statusMap = Object.fromEntries(
            orderStatusCounts.map((g) => [g.orderStatus, g._count._all])
        );

        return {
            totalProducts,
            totalOrders,
            pendingOrders: statusMap["PENDING"] ?? 0,
            processingOrders: statusMap["PROCESSING"] ?? 0,
            shippedOrders: statusMap["SHIPPED"] ?? 0,
            completedOrders: statusMap["DELIVERED"] ?? 0,
            cancelledOrders: statusMap["CANCELLED"] ?? 0,
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
        console.error("Failed to fetch staff dashboard stats:", error);
        return {
            totalProducts: 0,
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
