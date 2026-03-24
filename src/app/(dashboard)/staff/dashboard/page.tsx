import { getStaffDashboardStats } from "@/actions/staff-dashboard.actions";
import StatCard from "@/components/dashboard/staff/StatCard";
import RecentOrdersTable from "@/components/dashboard/staff/RecentOrdersTable";
import {
    Loader,
    Truck,
    XCircle,
    ArrowUpRight,
} from "lucide-react";

export default async function StaffDashboardPage() {
    const stats = await getStaffDashboardStats();

    return (
        <main className="w-full h-dvh p-8 md:p-12 overflow-y-auto bg-background-dark/5">
            <header className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex flex-col gap-2">
                    <h1 className="text-4xl font-black text-basic tracking-tight">Staff Workspace</h1>
                    <p className="text-muted font-medium opacity-80">Track inventory and manage pending orders efficiently.</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="px-6 py-3 bg-background/60 backdrop-blur-md border border-background-light/20 rounded-2xl flex items-center gap-3 shadow-sm">
                        <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                        <span className="text-xs font-bold text-basic tracking-widest uppercase">Operations Active</span>
                    </div>
                </div>
            </header>

            {/* Primary stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
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
                    title="Fulfilled"
                    value={stats.completedOrders}
                    icon="CheckCircle"
                    href="/staff/dashboard/orders"
                    linkLabel="Order Logs"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Recent orders */}
                <div className="lg:col-span-2">
                    <RecentOrdersTable orders={stats.recentOrders} />
                </div>

                {/* Secondary stats & Focus */}
                <div className="flex flex-col gap-6">
                    <div className="bg-background/60 backdrop-blur-xl border border-background-light/20 p-8 rounded-[2.5rem] flex flex-col gap-6 shadow-sm">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-black uppercase tracking-[0.2em] text-muted opacity-60">Quick Metrics</span>
                            <ArrowUpRight size={18} className="text-primary" />
                        </div>
                        <div className="grid grid-cols-1 gap-4">
                            <div className="flex items-center justify-between p-4 bg-background-light/20 rounded-2xl">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500">
                                        <Loader size={16} />
                                    </div>
                                    <span className="text-xs font-bold text-basic">Processing</span>
                                </div>
                                <span className="text-lg font-black text-basic">{stats.processingOrders}</span>
                            </div>
                            <div className="flex items-center justify-between p-4 bg-background-light/20 rounded-2xl">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-500">
                                        <Truck size={16} />
                                    </div>
                                    <span className="text-xs font-bold text-basic">In Transit</span>
                                </div>
                                <span className="text-lg font-black text-basic">{stats.shippedOrders}</span>
                            </div>
                            <div className="flex items-center justify-between p-4 bg-background-light/20 rounded-2xl">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-rose-500/10 flex items-center justify-center text-rose-500">
                                        <XCircle size={16} />
                                    </div>
                                    <span className="text-xs font-bold text-basic">Cancelled</span>
                                </div>
                                <span className="text-lg font-black text-basic">{stats.cancelledOrders}</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-primary/5 border border-primary/10 p-8 rounded-[2.5rem] flex flex-col gap-4">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Team Notice</span>
                        <p className="text-sm font-medium text-basic opacity-70 leading-relaxed">
                            Remember to update order status as soon as they are shipped to keep clients informed.
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}
