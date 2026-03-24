import { getStaffDashboardStats } from "@/actions/staff-dashboard.actions";
import StatCard from "@/components/dashboard/staff/StatCard";
import RecentOrdersTable from "@/components/dashboard/staff/RecentOrdersTable";

export default async function StaffDashboardPage() {
    const stats = await getStaffDashboardStats();

    return (
        <main className="w-full h-screen p-6 md:p-10 overflow-y-auto bg-background-light/30">
            <div className="max-w-7xl mx-auto">
                <header className="mb-10">
                    <h1 className="text-3xl font-bold text-basic mb-2">Staff Workspace</h1>
                    <p className="text-muted">Manage inventory and fulfill incoming orders efficiently.</p>
                </header>

                {/* Main Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
                    <StatCard
                        title="Inventory"
                        value={stats.totalProducts}
                        icon="Package"
                        href="/staff/dashboard/products"
                        linkLabel="Manage Stock"
                    />
                    <StatCard
                        title="Incoming Orders"
                        value={stats.pendingOrders}
                        icon="Clock"
                        href="/staff/dashboard/orders"
                        linkLabel="Process Orders"
                    />
                    <StatCard
                        title="Completed"
                        value={stats.completedOrders}
                        icon="CheckCircle"
                        href="/staff/dashboard/orders"
                        linkLabel="View Completed"
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Recent Orders */}
                    <div className="lg:col-span-2">
                        <RecentOrdersTable orders={stats.recentOrders} />
                    </div>

                    {/* Operational Summary */}
                    <div className="space-y-6">
                        <div className="bg-background border border-background-dark rounded-2xl p-6 shadow-sm">
                            <h2 className="text-sm font-bold text-muted uppercase tracking-wider mb-6">Operational Status</h2>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-muted">In Processing</span>
                                    <span className="text-sm font-bold text-blue-600">{stats.processingOrders}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-muted">Shipped / In Transit</span>
                                    <span className="text-sm font-bold text-indigo-600">{stats.shippedOrders}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-muted">Total Cancelled</span>
                                    <span className="text-sm font-bold text-rose-500">{stats.cancelledOrders}</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-background-dark/5 border border-background-dark rounded-2xl p-6">
                            <h3 className="text-xs font-bold text-muted uppercase tracking-widest mb-2">Team Notice</h3>
                            <p className="text-sm text-basic opacity-70 leading-relaxed">
                                Please ensure all fulfilled orders are marked as SHIPPED to trigger customer notifications.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
