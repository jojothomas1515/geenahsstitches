import AdminHeader from "@/components/dashboard/admin/Header";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="bg-background-dark min-h-screen flex w-full">
            <AdminHeader />
            <div className="flex-1">
                {children}
            </div>
        </div>
    );
}