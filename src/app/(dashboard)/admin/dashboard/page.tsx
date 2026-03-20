import { getDashboardStats } from "@/actions/dashboard.actions";
import StatCard from "@/components/dashboard/admin/StatCard";
import RecentOrdersTable from "@/components/dashboard/admin/RecentOrdersTable";
import {
    Package,
    Users,
    Clock,
    Loader,
    Truck,
    CheckCircle,
    XCircle,
    DollarSign,
} from "lucide-react";

export default async function AdminDashboardPage() {
    const stats = await getDashboardStats();

    return (
        <main className="w-full h-dvh p-10 overflow-y-scroll">
            <h1 className="text-2xl font-bold text-basic mb-8">Dashboard Overview</h1>

            {/* Primary stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
                <StatCard
                    title="Total Products"
                    value={stats.totalProducts}
                    icon={Package}
                    href="/admin/dashboard/products"
                    linkLabel="Manage Products"
                />
                <StatCard
                    title="Total Users"
                    value={stats.totalUsers}
                    icon={Users}
                    href="/admin/dashboard/users"
                    linkLabel="Manage Users"
                />
                <StatCard
                    title="Pending Orders"
                    value={stats.pendingOrders}
                    icon={Clock}
                    href="/admin/dashboard/orders"
                    linkLabel="View Orders"
                />
                <StatCard
                    title="Completed Orders"
                    value={stats.completedOrders}
                    icon={CheckCircle}
                    href="/admin/dashboard/orders"
                    linkLabel="View Orders"
                />
            </div>

            {/* Secondary stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
                <StatCard
                    title="Processing"
                    value={stats.processingOrders}
                    icon={Loader}
                />
                <StatCard
                    title="Shipped"
                    value={stats.shippedOrders}
                    icon={Truck}
                />
                <StatCard
                    title="Cancelled"
                    value={stats.cancelledOrders}
                    icon={XCircle}
                />
                <StatCard
                    title="Total Revenue"
                    value={stats.totalRevenue}
                    icon={DollarSign}
                    formatAsCurrency
                />
            </div>

            {/* Recent orders */}
            <RecentOrdersTable orders={stats.recentOrders} />
        </main>
    );
}