"use client";

import { useEffect, useState } from "react";
import { X, Loader2, Package, MapPin, User, Calendar, CreditCard } from "lucide-react";
import { getOrderById } from "@/actions/order.actions";
import OrderStatusBadge from "./OrderStatusBadge";

interface OrderItem {
    id: string;
    quantity: number;
    price: number;
    discount: number;
    product: {
        name: string;
        image: string;
    };
}

interface OrderDetails {
    id: string;
    orderDate: Date;
    totalAmount: number;
    orderStatus: any;
    user: {
        name: string;
        email: string;
        phone: string;
    };
    orderItems: OrderItem[];
}

export default function OrderDetailsModal({ orderId, onClose }: { orderId: string, onClose: () => void }) {
    const [order, setOrder] = useState<OrderDetails | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchOrder = async () => {
            setIsLoading(true);
            try {
                const data = await getOrderById(orderId);
                setOrder(data as any);
            } catch (error) {
                console.error("Failed to fetch order details:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchOrder();
    }, [orderId]);

    if (isLoading) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
                <div className="bg-background rounded-2xl p-12 flex flex-col items-center">
                    <Loader2 className="h-8 w-8 text-accent animate-spin mb-4" />
                    <p className="text-muted text-sm font-medium">Loading order details...</p>
                </div>
            </div>
        );
    }

    if (!order) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-background-light rounded-2xl shadow-2xl overflow-hidden border border-background-dark max-w-4xl w-full max-h-[90vh] flex flex-col animate-in zoom-in-95 duration-200">
                {/* Header */}
                <div className="p-6 border-b border-background-dark flex justify-between items-center bg-background shrink-0">
                    <div>
                        <div className="flex items-center gap-3">
                            <h2 className="text-xl font-bold text-basic">Order #{order.id.slice(0, 8)}</h2>
                            <OrderStatusBadge status={order.orderStatus} />
                        </div>
                        <p className="text-sm text-muted">Placed on {new Date(order.orderDate).toLocaleString()}</p>
                    </div>
                    <button 
                        onClick={onClose}
                        className="p-2 hover:bg-background-dark rounded-full transition-colors text-muted hover:text-basic"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-8 overflow-y-auto space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Customer Details */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-bold text-muted uppercase tracking-wider flex items-center gap-2">
                                <User className="h-4 w-4" /> Customer Information
                            </h3>
                            <div className="bg-background p-5 rounded-2xl border border-background-dark space-y-3">
                                <p className="text-basic font-bold">{order.user.name}</p>
                                <p className="text-sm text-muted">{order.user.email}</p>
                                <p className="text-sm text-muted">{order.user.phone}</p>
                            </div>
                        </div>

                        {/* Order Summary Summary */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-bold text-muted uppercase tracking-wider flex items-center gap-2">
                                <CreditCard className="h-4 w-4" /> Payment Summary
                            </h3>
                            <div className="bg-background p-5 rounded-2xl border border-background-dark space-y-3">
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted">Total Amount</span>
                                    <span className="text-basic font-bold">₦{order.totalAmount.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted">Items Count</span>
                                    <span className="text-basic">{order.orderItems.length} items</span>
                                </div>
                                <div className="pt-3 border-t border-background-dark flex justify-between">
                                    <span className="text-sm font-bold text-basic">Final Total</span>
                                    <span className="text-lg font-bold text-accent">₦{order.totalAmount.toLocaleString()}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Order Items Table */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-bold text-muted uppercase tracking-wider flex items-center gap-2">
                            <Package className="h-4 w-4" /> Order Items
                        </h3>
                        <div className="bg-background rounded-2xl border border-background-dark overflow-hidden">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-background-light/50 border-b border-background-dark text-muted">
                                    <tr>
                                        <th className="py-3 px-5 font-medium">Product</th>
                                        <th className="py-3 px-5 font-medium">Price</th>
                                        <th className="py-3 px-5 font-medium">Qty</th>
                                        <th className="py-3 px-5 font-medium text-right">Subtotal</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-background-dark">
                                    {order.orderItems.map((item) => (
                                        <tr key={item.id}>
                                            <td className="py-4 px-5">
                                                <div className="flex items-center gap-3">
                                                    {item.product.image && (
                                                        <img 
                                                            src={item.product.image} 
                                                            alt={item.product.name}
                                                            className="h-10 w-10 rounded-lg object-cover border border-background-dark"
                                                        />
                                                    )}
                                                    <span className="font-medium text-basic">{item.product.name}</span>
                                                </div>
                                            </td>
                                            <td className="py-4 px-5 text-basic">
                                                ₦{item.price.toLocaleString()}
                                            </td>
                                            <td className="py-4 px-5 text-basic">
                                                {item.quantity}
                                            </td>
                                            <td className="py-4 px-5 text-right font-medium text-basic">
                                                ₦{(item.price * item.quantity).toLocaleString()}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-background-dark bg-background flex justify-end shrink-0">
                    <button
                        onClick={onClose}
                        className="px-6 py-2.5 bg-background-dark text-muted hover:text-basic font-bold rounded-xl border border-background-dark transition-all"
                    >
                        Close Details
                    </button>
                </div>
            </div>
        </div>
    );
}
