import { getDashboardStats } from "@/actions/dashboard.actions";
import StatCard from "@/components/dashboard/admin/StatCard";
import RecentOrdersTable from "@/components/dashboard/admin/RecentOrdersTable";

export default async function AdminDashboardPage() {
    const stats = await getDashboardStats();

    return (
        <main className="w-full h-screen p-6 md:p-10 overflow-y-auto bg-background-light/30">
            <div className="max-w-7xl mx-auto">
                <header className="mb-10">
                    <h1 className="text-3xl font-bold text-basic mb-2">Dashboard Overview</h1>
                    <p className="text-muted">Welcome back! Here&apos;s what&apos;s happening with your store today.</p>
                </header>

                {/* Main Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                    <StatCard
                        title="Total Revenue"
                        value={stats.totalRevenue}
                        icon="Package"
                        formatAsCurrency
                    />
                    <StatCard
                        title="Total Products"
                        value={stats.totalProducts}
                        icon="Package"
                        href="/admin/dashboard/products"
                        linkLabel="View Inventory"
                    />
                    <StatCard
                        title="Total Users"
                        value={stats.totalUsers}
                        icon="Users"
                        href="/admin/dashboard/users"
                        linkLabel="View Customers"
                    />
                    <StatCard
                        title="Active Orders"
                        value={stats.pendingOrders}
                        icon="Clock"
                        href="/admin/dashboard/orders"
                        linkLabel="View Orders"
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Recent Orders Table */}
                    <div className="lg:col-span-2">
                        <RecentOrdersTable orders={stats.recentOrders} />
                    </div>

                    {/* Order Status Breakdown */}
                    <div className="space-y-6">
                        <div className="bg-background border border-background-dark rounded-2xl p-6 shadow-sm">
                            <h2 className="text-sm font-bold text-muted uppercase tracking-wider mb-6">Order Summary</h2>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-muted">Processing</span>
                                    <span className="text-sm font-bold text-basic">{stats.processingOrders}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-muted">Shipped</span>
                                    <span className="text-sm font-bold text-basic">{stats.shippedOrders}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-muted">Completed</span>
                                    <span className="text-sm font-bold text-basic">{stats.completedOrders}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-muted">Cancelled</span>
                                    <span className="text-sm font-bold text-rose-500">{stats.cancelledOrders}</span>
                                </div>
                                <div className="pt-4 border-t border-background-dark flex items-center justify-between">
                                    <span className="text-sm font-bold text-basic">Total Orders</span>
                                    <span className="text-sm font-bold text-basic">{stats.totalOrders}</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-primary text-white rounded-2xl p-6 shadow-lg shadow-primary/20">
                            <h2 className="text-sm font-bold uppercase tracking-wider opacity-80 mb-2">Success Rate</h2>
                            <div className="text-3xl font-bold mb-1">
                                {stats.totalOrders > 0 ? Math.round((stats.completedOrders / stats.totalOrders) * 100) : 0}%
                            </div>
                            <p className="text-xs opacity-70">Percentage of completed orders relative to total volume.</p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}