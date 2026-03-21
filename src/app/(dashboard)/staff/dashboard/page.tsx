import { getStaffDashboardStats } from "@/actions/staff-dashboard.actions";
import StatCard from "@/components/dashboard/staff/StatCard";
import RecentOrdersTable from "@/components/dashboard/staff/RecentOrdersTable";
import {
    Package,
    Clock,
    Loader,
    Truck,
    CheckCircle,
    XCircle,
    DollarSign,
} from "lucide-react";

export default async function StaffDashboardPage() {
    const stats = await getStaffDashboardStats();

    return (
        <main className="w-full h-dvh p-10 overflow-y-scroll">
            <h1 className="text-2xl font-bold text-basic mb-8">Dashboard Overview</h1>

            {/* Primary stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 mb-8">
                <StatCard
                    title="Total Products"
                    value={stats.totalProducts}
                    icon={Package}
                    href="/staff/dashboard/products"
                    linkLabel="Manage Products"
                />
                <StatCard
                    title="Pending Orders"
                    value={stats.pendingOrders}
                    icon={Clock}
                    href="/staff/dashboard/orders"
                    linkLabel="View Orders"
                />
                <StatCard
                    title="Completed Orders"
                    value={stats.completedOrders}
                    icon={CheckCircle}
                    href="/staff/dashboard/orders"
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
