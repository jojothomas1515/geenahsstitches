"use client";

import { useEffect, useState } from "react";
import { ShoppingBag, Loader2, Filter, Download } from "lucide-react";
import { getOrders, updateOrderStatus } from "@/actions/order.actions";
import OrderTable from "@/components/dashboard/admin/orders/OrderTable";
import OrderDetailsModal from "@/components/dashboard/admin/orders/OrderDetailsModal";
import { OrderStatus } from "@/generated/prisma/enums";
import type { Order } from "@/interfaces";

export default function AdminOrdersPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
    const [statusFilter, setStatusFilter] = useState<string>("ALL");

    const fetchOrders = async () => {
        setIsLoading(true);
        try {
            const data = await getOrders();
            setOrders(data as Order[]);
        } catch (error) {
            console.error("Failed to fetch orders:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleUpdateStatus = async (orderId: string, status: OrderStatus) => {
        try {
            const result = await updateOrderStatus(orderId, status);
            if (result.success) {
                fetchOrders();
            } else {
                alert(result.error);
            }
        } catch (error) {
            console.error("Failed to update status:", error);
        }
    };

    const filteredOrders = statusFilter === "ALL" 
        ? orders 
        : orders.filter(order => order.orderStatus === statusFilter);

    const stats = {
        total: orders.length,
        pending: orders.filter(o => o.orderStatus === "PENDING").length,
        revenue: orders.filter(o => o.orderStatus !== "CANCELLED").reduce((acc, o) => acc + o.totalAmount, 0),
    };

    return (
        <main className="w-full h-dvh p-10 overflow-y-scroll bg-background-light/30 text-basic">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
                    <div>
                        <h1 className="text-3xl font-bold text-basic mb-2">Order Management</h1>
                        <p className="text-muted">Monitor and manage all customer orders from here.</p>
                    </div>
                    <div className="flex gap-3">
                        <button 
                            className="flex items-center gap-2 px-4 py-2 bg-background border border-background-dark text-muted hover:text-basic font-medium rounded-xl transition-all"
                            onClick={() => window.print()}
                        >
                            <Download className="h-4 w-4" />
                            Export Data
                        </button>
                    </div>
                </div>

                {/* Stats Summary */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
                    <div className="bg-background p-6 rounded-2xl shadow-sm border border-background-dark flex items-center gap-4">
                        <div className="h-12 w-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                            <ShoppingBag className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-muted uppercase tracking-wider">Total Orders</p>
                            <p className="text-2xl font-bold text-basic">{stats.total}</p>
                        </div>
                    </div>
                    <div className="bg-background p-6 rounded-2xl shadow-sm border border-background-dark flex items-center gap-4">
                        <div className="h-12 w-12 bg-yellow-50 text-yellow-600 rounded-xl flex items-center justify-center">
                            <ShoppingBag className="h-6 w-6 text-yellow-500" />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-muted uppercase tracking-wider">Pending Actions</p>
                            <p className="text-2xl font-bold text-basic">{stats.pending}</p>
                        </div>
                    </div>
                    <div className="bg-background p-6 rounded-2xl shadow-sm border border-background-dark flex items-center gap-4">
                        <div className="h-12 w-12 bg-green-50 text-green-600 rounded-xl flex items-center justify-center">
                            <ShoppingBag className="h-6 w-6 text-green-500" />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-muted uppercase tracking-wider">Total Revenue</p>
                            <p className="text-2xl font-bold text-primary">₦{stats.revenue.toLocaleString()}</p>
                        </div>
                    </div>
                </div>

                {/* Filters */}
                <div className="mb-6 flex flex-wrap gap-4 items-center">
                    <div className="flex items-center gap-2 text-sm font-medium text-muted">
                        <Filter className="h-4 w-4" /> Filter by Status:
                    </div>
                    <div className="flex bg-background border border-background-dark rounded-xl p-1 overflow-x-auto max-w-full">
                        <button
                            onClick={() => setStatusFilter("ALL")}
                            className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${statusFilter === "ALL" ? 'bg-primary text-white shadow-md' : 'text-muted hover:text-basic'}`}
                        >
                            All Orders
                        </button>
                        {Object.values(OrderStatus).map((status) => (
                            <button
                                key={status}
                                onClick={() => setStatusFilter(status)}
                                className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all whitespace-nowrap ${statusFilter === status ? 'bg-primary text-white shadow-md' : 'text-muted hover:text-basic'}`}
                            >
                                {status.charAt(0) + status.slice(1).toLowerCase()}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Main Table */}
                {isLoading ? (
                    <div className="h-64 flex flex-col items-center justify-center bg-background rounded-2xl border border-background-dark">
                        <Loader2 className="h-10 w-10 text-primary animate-spin mb-4" />
                        <p className="text-muted font-medium">Loading orders details...</p>
                    </div>
                ) : (
                    <OrderTable
                        orders={filteredOrders}
                        onViewDetails={(id) => setSelectedOrderId(id)}
                        onUpdateStatus={handleUpdateStatus}
                    />
                )}
            </div>

            {/* Modals */}
            {selectedOrderId && (
                <OrderDetailsModal
                    orderId={selectedOrderId}
                    onClose={() => setSelectedOrderId(null)}
                />
            )}
        </main>
    );
}
