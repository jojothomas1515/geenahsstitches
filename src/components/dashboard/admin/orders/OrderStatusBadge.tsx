"use client";

import { OrderStatus } from "@/generated/prisma/enums";

const statusStyles: Record<OrderStatus, string> = {
    PENDING: "bg-yellow-100 text-yellow-800 border-yellow-200",
    PROCESSING: "bg-blue-100 text-blue-800 border-blue-200",
    SHIPPED: "bg-purple-100 text-purple-800 border-purple-200",
    DELIVERED: "bg-green-100 text-green-800 border-green-200",
    CANCELLED: "bg-red-100 text-red-800 border-red-200",
};

export default function OrderStatusBadge({ status }: { status: OrderStatus }) {
    return (
        <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${statusStyles[status] || "bg-gray-100 text-gray-800 border-gray-200"}`}
        >
            {status}
        </span>
    );
}
