"use client";
import type { RecentOrder } from "@/interfaces";

const statusStyles: Record<string, string> = {
    PENDING: "bg-amber-50 text-amber-600 border-amber-100",
    PROCESSING: "bg-blue-50 text-blue-600 border-blue-100",
    SHIPPED: "bg-indigo-50 text-indigo-600 border-indigo-100",
    DELIVERED: "bg-emerald-50 text-emerald-600 border-emerald-100",
    CANCELLED: "bg-rose-50 text-rose-600 border-rose-100",
};

export default function RecentOrdersTable({
    orders,
}: {
    orders: RecentOrder[];
}) {
    return (
        <div className="bg-background border border-background-dark rounded-2xl overflow-hidden shadow-sm">
            <div className="p-6 border-b border-background-dark flex items-center justify-between">
                <h2 className="text-lg font-bold text-basic">Recent Orders</h2>
                <span className="text-xs font-medium text-muted">
                    {orders.length} total
                </span>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead className="bg-background-light/50 text-muted uppercase text-[10px] font-bold tracking-wider">
                        <tr>
                            <th className="py-3 px-6">Customer</th>
                            <th className="py-3 px-6">Amount</th>
                            <th className="py-3 px-6">Status</th>
                            <th className="py-3 px-6 text-right">Date</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-background-dark">
                        {orders.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="py-12 text-center text-muted">
                                    No recent orders found.
                                </td>
                            </tr>
                        ) : (
                            orders.map((order) => (
                                <tr key={order.id} className="hover:bg-background-light/30 transition-colors">
                                    <td className="py-4 px-6">
                                        <div className="font-bold text-basic">{order.userName}</div>
                                        <div className="text-[10px] text-muted truncate max-w-[120px]">
                                            #{order.id.split('-')[0]}
                                        </div>
                                    </td>
                                    <td className="py-4 px-6 font-bold text-basic">
                                        ₦{order.totalAmount.toLocaleString()}
                                    </td>
                                    <td className="py-4 px-6">
                                        <span
                                            className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold border ${statusStyles[order.orderStatus] ?? "bg-gray-50 text-gray-600"}`}
                                        >
                                            {order.orderStatus}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6 text-right text-muted text-xs">
                                        {new Date(order.orderDate).toLocaleDateString("en-NG", {
                                            day: "numeric",
                                            month: "short",
                                        })}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
