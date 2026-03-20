import Link from "next/link";
import {
  Package,
  User,
  Mail,
  CalendarDays,
  Eye,
  ChevronRight,
} from "lucide-react";

// ── Dummy data ──────────────────────────────────────────────────────────────

const profile = {
  name: "Jane Doe",
  email: "jane.doe@example.com",
  memberSince: "March 2024",
};

type OrderStatus = "Delivered" | "Shipped" | "Processing" | "Pending";

interface Order {
  id: string;
  date: string;
  items: string[];
  total: string;
  status: OrderStatus;
}

const orders: Order[] = [
  {
    id: "GS-10042",
    date: "Mar 12, 2026",
    items: ["Ankara Midi Dress", "Lace Blouse"],
    total: "₦85,000",
    status: "Delivered",
  },
  {
    id: "GS-10039",
    date: "Feb 28, 2026",
    items: ["Custom Agbada Set"],
    total: "₦120,000",
    status: "Shipped",
  },
  {
    id: "GS-10035",
    date: "Feb 14, 2026",
    items: ["Velvet Evening Gown", "Beaded Clutch"],
    total: "₦210,000",
    status: "Delivered",
  },
  {
    id: "GS-10028",
    date: "Jan 30, 2026",
    items: ["Silk Camisole"],
    total: "₦35,000",
    status: "Processing",
  },
  {
    id: "GS-10021",
    date: "Jan 10, 2026",
    items: ["Denim Jacket", "Wide-leg Trousers"],
    total: "₦68,000",
    status: "Pending",
  },
];

// ── Status badge colour map ─────────────────────────────────────────────────

const statusStyles: Record<OrderStatus, string> = {
  Delivered: "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300",
  Shipped: "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300",
  Processing:
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300",
  Pending: "bg-gray-100 text-gray-600 dark:bg-gray-800/40 dark:text-gray-300",
};

// ── Page component ──────────────────────────────────────────────────────────

export default function AccountPage() {
  return (
    <main className="min-h-screen bg-background text-basic">
      {/* ── Hero banner ─────────────────────────────────────────────── */}
      <section className="bg-primary/30 dark:bg-primary/20 py-14 sm:py-20">
        <div className="max-w-5xl mx-auto px-5">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
            My Account
          </h1>
          <p className="mt-2 text-muted text-sm sm:text-base">
            View your profile and track your orders.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-5 py-10 flex flex-col gap-10">
        {/* ── Profile card ────────────────────────────────────────── */}
        <section
          id="profile-card"
          className="rounded-2xl border border-primary/20 bg-background-light dark:bg-background-dark p-6 sm:p-8 shadow-sm"
        >
          <h2 className="text-xl font-semibold mb-5 flex items-center gap-2">
            <User className="w-5 h-5 text-primary" />
            Profile Overview
          </h2>

          <div className="grid sm:grid-cols-3 gap-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center">
                <User className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted">Name</p>
                <p className="font-medium">{profile.name}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center">
                <Mail className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted">Email</p>
                <p className="font-medium">{profile.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center">
                <CalendarDays className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted">Member Since</p>
                <p className="font-medium">{profile.memberSince}</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Order history ───────────────────────────────────────── */}
        <section id="order-history">
          <h2 className="text-xl font-semibold mb-5 flex items-center gap-2">
            <Package className="w-5 h-5 text-primary" />
            Order History
          </h2>

          {/* Desktop table (hidden on mobile) */}
          <div className="hidden sm:block rounded-2xl border border-primary/20 overflow-hidden shadow-sm">
            <table className="w-full text-left text-sm">
              <thead className="bg-primary/15 dark:bg-primary/25 text-xs uppercase tracking-wider text-muted">
                <tr>
                  <th className="px-5 py-3">Order&nbsp;ID</th>
                  <th className="px-5 py-3">Date</th>
                  <th className="px-5 py-3">Items</th>
                  <th className="px-5 py-3">Total</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-primary/10">
                {orders.map((order) => (
                  <tr
                    key={order.id}
                    className="bg-background-light dark:bg-background-dark hover:bg-primary/5 transition-colors"
                  >
                    <td className="px-5 py-4 font-medium">{order.id}</td>
                    <td className="px-5 py-4 text-muted">{order.date}</td>
                    <td className="px-5 py-4">
                      {order.items.join(", ")}
                    </td>
                    <td className="px-5 py-4 font-medium">{order.total}</td>
                    <td className="px-5 py-4">
                      <span
                        className={`inline-block rounded-full px-3 py-0.5 text-xs font-semibold ${statusStyles[order.status]}`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <button
                        className="inline-flex items-center gap-1 text-primary hover:underline text-xs font-medium cursor-default"
                        title="Coming soon"
                      >
                        <Eye className="w-4 h-4" />
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile card list (hidden on desktop) */}
          <div className="flex flex-col gap-4 sm:hidden">
            {orders.map((order) => (
              <div
                key={order.id}
                className="rounded-xl border border-primary/20 bg-background-light dark:bg-background-dark p-4 shadow-sm"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-semibold">{order.id}</span>
                  <span
                    className={`rounded-full px-3 py-0.5 text-xs font-semibold ${statusStyles[order.status]}`}
                  >
                    {order.status}
                  </span>
                </div>
                <p className="text-xs text-muted mb-1">{order.date}</p>
                <p className="text-sm mb-2">{order.items.join(", ")}</p>
                <div className="flex items-center justify-between">
                  <span className="font-medium">{order.total}</span>
                  <button
                    className="inline-flex items-center gap-1 text-primary text-xs font-medium cursor-default"
                    title="Coming soon"
                  >
                    View <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Quick links ─────────────────────────────────────────── */}
        <section className="flex flex-wrap gap-3">
          <Link
            href="/"
            className="btn text-sm !py-3 !px-6 rounded-lg"
          >
            Continue Shopping
          </Link>
          <Link
            href="/contact"
            className="text-sm py-3 px-6 rounded-lg border border-primary/30 hover:bg-primary/10 transition-colors text-center"
          >
            Contact Support
          </Link>
        </section>
      </div>
    </main>
  );
}
