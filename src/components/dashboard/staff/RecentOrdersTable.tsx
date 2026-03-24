"use client";
import type { RecentOrder } from "@/interfaces";
import * as motion from "motion/react-client";

const statusStyles: Record<string, string> = {
    PENDING: "bg-amber-100/10 text-amber-500 border border-amber-500/20",
    PROCESSING: "bg-blue-100/10 text-blue-500 border border-blue-500/20",
    SHIPPED: "bg-indigo-100/10 text-indigo-500 border border-indigo-500/20",
    DELIVERED: "bg-emerald-100/10 text-emerald-500 border border-emerald-500/20",
    CANCELLED: "bg-rose-100/10 text-rose-500 border border-rose-500/20",
};

export default function RecentOrdersTable({
    orders,
}: {
    orders: RecentOrder[];
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-background/60 backdrop-blur-xl border border-background-light/20 rounded-4xl p-8 shadow-sm overflow-hidden"
        >
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-black text-basic tracking-tight">Recent Activity</h2>
                <div className="px-4 py-1.5 bg-background-light/30 rounded-full text-xs font-bold text-muted border border-background-light/10">
                    {orders.length} orders total
                </div>
            </div>

            {orders.length === 0 ? (
                <div className="py-20 text-center">
                    <p className="text-muted font-medium">No order history found.</p>
                </div>
            ) : (
                <div className="overflow-x-auto -mx-8 px-8">
                    <table className="w-full text-left border-separate border-spacing-y-4">
                        <thead>
                            <tr className="text-muted uppercase text-[10px] font-black tracking-widest opacity-60">
                                <th className="pb-2 px-4">Customer Info</th>
                                <th className="pb-2 px-4">Value</th>
                                <th className="pb-2 px-4 text-center">Lifecycle</th>
                                <th className="pb-2 px-4 text-right">Timestamp</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order, index) => (
                                <motion.tr
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 * index }}
                                    key={order.id}
                                    className="group bg-background-light/10 hover:bg-background-light/20 transition-all duration-300 rounded-2xl cursor-default"
                                >
                                    <td className="py-4 px-4 first:rounded-l-2xl">
                                        <div className="flex flex-col">
                                            <span className="text-sm font-bold text-basic group-hover:text-primary transition-colors">
                                                {order.userName}
                                            </span>
                                            <span className="text-[10px] text-muted opacity-70 truncate max-w-[150px]">
                                                Order ID: {order.id.split('-')[0]}...
                                            </span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-4">
                                        <span className="text-sm font-black text-basic">
                                            ₦{order.totalAmount.toLocaleString()}
                                        </span>
                                    </td>
                                    <td className="py-4 px-4 text-center">
                                        <span
                                            className={`inline-flex px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${statusStyles[order.orderStatus] ?? "bg-gray-100/10 text-gray-500"}`}
                                        >
                                            {order.orderStatus}
                                        </span>
                                    </td>
                                    <td className="py-4 px-4 text-right text-muted last:rounded-r-2xl">
                                        <span className="text-xs font-medium">
                                            {new Date(order.orderDate).toLocaleDateString("en-NG", {
                                                day: "numeric",
                                                month: "short",
                                                year: "2024" === new Date(order.orderDate).getFullYear().toString() ? undefined : "numeric",
                                            })}
                                        </span>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </motion.div>
    );
}
