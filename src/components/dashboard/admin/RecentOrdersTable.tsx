import type { RecentOrder } from "@/interfaces";

const statusStyles: Record<string, string> = {
    PENDING: "bg-yellow-100 text-yellow-800",
    PROCESSING: "bg-blue-100 text-blue-800",
    SHIPPED: "bg-purple-100 text-purple-800",
    DELIVERED: "bg-green-100 text-green-800",
    CANCELLED: "bg-red-100 text-red-800",
};

export default function RecentOrdersTable({
    orders,
}: {
    orders: RecentOrder[];
}) {
    return (
        <div className="bg-background rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-bold text-basic mb-4">Recent Orders</h2>
            {orders.length === 0 ? (
                <p className="text-muted text-sm">No orders yet.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead>
                            <tr className="text-muted border-b border-background-light">
                                <th className="py-3 pr-4 font-medium">Customer</th>
                                <th className="py-3 pr-4 font-medium">Amount</th>
                                <th className="py-3 pr-4 font-medium">Status</th>
                                <th className="py-3 font-medium">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr
                                    key={order.id}
                                    className="border-b border-background-light last:border-0"
                                >
                                    <td className="py-3 pr-4 text-basic font-medium">
                                        {order.userName}
                                    </td>
                                    <td className="py-3 pr-4 text-basic">
                                        ₦{order.totalAmount.toLocaleString()}
                                    </td>
                                    <td className="py-3 pr-4">
                                        <span
                                            className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold ${statusStyles[order.orderStatus] ?? "bg-gray-100 text-gray-800"}`}
                                        >
                                            {order.orderStatus}
                                        </span>
                                    </td>
                                    <td className="py-3 text-muted">
                                        {new Date(order.orderDate).toLocaleDateString("en-NG", {
                                            day: "numeric",
                                            month: "short",
                                            year: "numeric",
                                        })}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
