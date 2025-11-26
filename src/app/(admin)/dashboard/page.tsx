
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Admin dashboard for Geenah's Stitches",
};

export default function DashboardPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="flex gap-4">
        <Link href="/dashboard/collections/add">
          <button className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-900">
            Add Collection
          </button>
        </Link>
        <button className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-900">
          Add Shop Item
        </button>
      </div>
    </div>
  );
}
