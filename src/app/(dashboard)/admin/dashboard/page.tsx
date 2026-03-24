import { getDashboardStats } from "@/actions/dashboard.actions";
import StatCard from "@/components/dashboard/admin/StatCard";
import RecentOrdersTable from "@/components/dashboard/admin/RecentOrdersTable";
import {
    DollarSign,
    ArrowUpRight,
} from "lucide-react";

export default async function AdminDashboardPage() {
    const stats = await getDashboardStats();

    return (
        <main className="w-full h-dvh p-8 md:p-12 overflow-y-auto bg-background-dark/5">
            <header className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex flex-col gap-2">
                    <h1 className="text-4xl font-black text-basic tracking-tight">Executive Dashboard</h1>
                    <p className="text-muted font-medium opacity-80">Real-time overview of your sewing empire&apos;s performance.</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="px-6 py-3 bg-background/60 backdrop-blur-md border border-background-light/20 rounded-2xl flex items-center gap-3 shadow-sm">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-xs font-bold text-basic tracking-widest uppercase">Live Metrics</span>
                    </div>
                </div>
            </header>

            {/* Primary stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                <StatCard
                    title="Total Products"
                    value={stats.totalProducts}
                    icon="Package"
                    href="/admin/dashboard/products"
                    linkLabel="Manage Inventory"
                />
                <StatCard
                    title="Total Users"
                    value={stats.totalUsers}
                    icon="Users"
                    href="/admin/dashboard/users"
                    linkLabel="Manage Clients"
                />
                <StatCard
                    title="Active Orders"
                    value={stats.pendingOrders}
                    icon="Clock"
                    href="/admin/dashboard/orders"
                    linkLabel="Process Orders"
                />
                <StatCard
                    title="Completed"
                    value={stats.completedOrders}
                    icon="CheckCircle"
                    href="/admin/dashboard/orders"
                    linkLabel="View History"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Recent orders */}
                <div className="lg:col-span-2">
                    <RecentOrdersTable orders={stats.recentOrders} />
                </div>

                {/* Secondary stats & Analytics */}
                <div className="flex flex-col gap-6">
                    <div className="bg-primary p-8 rounded-[2.5rem] text-white shadow-[0_20px_40px_rgba(var(--primary-rgb),0.2)] relative overflow-hidden group">
                        <div className="absolute -right-4 -top-4 w-32 h-32 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
                        <div className="relative z-10 flex flex-col gap-6">
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-black uppercase tracking-[0.2em] opacity-80">Total Revenue</span>
                                <DollarSign size={24} className="opacity-60" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-4xl font-black tracking-tighter">₦{stats.totalRevenue.toLocaleString()}</span>
                                <span className="text-[10px] font-bold opacity-60 mt-1 uppercase tracking-widest">Lifetime Earnings</span>
                            </div>
                            <button className="mt-4 w-full py-4 bg-white/20 backdrop-blur-md rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-white/30 transition-colors flex items-center justify-center gap-2">
                                Financial Report <ArrowUpRight size={14} />
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-background/60 backdrop-blur-xl border border-background-light/20 p-6 rounded-3xl">
                            <div className="flex flex-col gap-1">
                                <span className="text-[10px] font-black text-muted uppercase tracking-widest opacity-60">In Processing</span>
                                <span className="text-2xl font-black text-basic">{stats.processingOrders}</span>
                            </div>
                        </div>
                        <div className="bg-background/60 backdrop-blur-xl border border-background-light/20 p-6 rounded-3xl">
                            <div className="flex flex-col gap-1">
                                <span className="text-[10px] font-black text-muted uppercase tracking-widest opacity-60">On The Way</span>
                                <span className="text-2xl font-black text-basic">{stats.shippedOrders}</span>
                            </div>
                        </div>
                        <div className="bg-background/60 backdrop-blur-xl border border-background-light/20 p-6 rounded-3xl">
                            <div className="flex flex-col gap-1">
                                <span className="text-[10px] font-black text-muted uppercase tracking-widest opacity-60">Cancelled</span>
                                <span className="text-2xl font-black text-rose-500">{stats.cancelledOrders}</span>
                            </div>
                        </div>
                        <div className="bg-background/60 backdrop-blur-xl border border-background-light/20 p-6 rounded-3xl">
                            <div className="flex flex-col gap-1">
                                <span className="text-[10px] font-black text-muted uppercase tracking-widest opacity-60">Success Rate</span>
                                <span className="text-2xl font-black text-emerald-500">
                                    {stats.totalOrders > 0 ? Math.round((stats.completedOrders / stats.totalOrders) * 100) : 0}%
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}