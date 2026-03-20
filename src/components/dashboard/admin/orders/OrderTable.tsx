"use client";

import { useState } from "react";
import { Search, Eye, MoreVertical, RefreshCw } from "lucide-react";
import OrderStatusBadge from "./OrderStatusBadge";
import { OrderStatus } from "@/generated/prisma/enums";

interface Order {
    id: string;
    orderDate: Date;
    totalAmount: number;
    orderStatus: OrderStatus;
    user: {
        name: string;
        email: string;
    };
    _count: {
        orderItems: number;
    };
}

interface OrderTableProps {
    orders: Order[];
    onViewDetails: (id: string) => void;
    onUpdateStatus: (id: string, status: OrderStatus) => void;
}

export default function OrderTable({ orders, onViewDetails, onUpdateStatus }: OrderTableProps) {
    const [searchQuery, setSearchQuery] = useState("");

    const filteredOrders = orders.filter((order) =>
        order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="bg-background rounded-2xl shadow-sm overflow-hidden border border-background-dark">
            <div className="p-6 border-b border-background-dark flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="relative w-full sm:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
                    <input
                        type="text"
                        placeholder="Search orders, customers..."
                        className="w-full pl-10 pr-4 py-2 rounded-xl bg-background-light border border-background-dark text-sm text-basic focus:outline-none focus:ring-2 focus:ring-primary/50"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="text-sm text-muted">
                    Showing {filteredOrders.length} of {orders.length} orders
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead>
                        <tr className="text-muted border-b border-background-dark bg-background-light/50">
                            <th className="py-4 px-6 font-medium">Order ID</th>
                            <th className="py-4 px-6 font-medium">Customer</th>
                            <th className="py-4 px-6 font-medium">Items</th>
                            <th className="py-4 px-6 font-medium">Amount</th>
                            <th className="py-4 px-6 font-medium">Status</th>
                            <th className="py-4 px-6 font-medium">Date</th>
                            <th className="py-4 px-6 font-medium text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-background-dark">
                        {filteredOrders.length > 0 ? (
                            filteredOrders.map((order) => (
                                <tr key={order.id} className="hover:bg-background-light/30 transition-colors">
                                    <td className="py-4 px-6 font-mono text-xs text-muted truncate max-w-[120px]" title={order.id}>
                                        #{order.id.slice(0, 8)}...
                                    </td>
                                    <td className="py-4 px-6">
                                        <div className="flex flex-col">
                                            <span className="font-medium text-basic">{order.user.name}</span>
                                            <span className="text-[10px] text-muted">{order.user.email}</span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6 text-basic">
                                        {order._count.orderItems}
                                    </td>
                                    <td className="py-4 px-6 text-basic font-medium">
                                        ₦{order.totalAmount.toLocaleString()}
                                    </td>
                                    <td className="py-4 px-6 text-basic">
                                        <OrderStatusBadge status={order.orderStatus} />
                                    </td>
                                    <td className="py-4 px-6 text-muted">
                                        {new Date(order.orderDate).toLocaleDateString("en-NG", {
                                            day: "numeric",
                                            month: "short",
                                            year: "numeric",
                                        })}
                                    </td>
                                    <td className="py-4 px-6 text-right">
                                        <div className="flex justify-end gap-2">
                                            <button
                                                onClick={() => onViewDetails(order.id)}
                                                className="p-2 rounded-lg hover:bg-primary/10 text-primary transition-colors"
                                                title="View Details"
                                            >
                                                <Eye className="h-4 w-4" />
                                            </button>
                                            
                                            <div className="relative group">
                                                <button
                                                    className="p-2 rounded-lg hover:bg-background-dark text-muted hover:text-basic transition-colors"
                                                    title="Change Status"
                                                >
                                                    <RefreshCw className="h-4 w-4" />
                                                </button>
                                                
                                                {/* Status Dropdown Menu */}
                                                <div className="absolute right-0 top-full mt-1 bg-background border border-background-dark rounded-xl shadow-xl z-10 hidden group-hover:block w-40 animate-in fade-in slide-in-from-top-1">
                                                    <div className="p-1.5 flex flex-col gap-1">
                                                        {Object.values(OrderStatus).map((status) => (
                                                            <button
                                                                key={status}
                                                                onClick={() => onUpdateStatus(order.id, status)}
                                                                className={`text-left px-3 py-2 text-xs rounded-lg transition-colors ${order.orderStatus === status ? 'bg-primary/10 text-primary font-bold' : 'hover:bg-background-dark text-muted hover:text-basic'}`}
                                                            >
                                                                {status}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={7} className="py-12 text-center text-muted">
                                    No orders found matching your search.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
