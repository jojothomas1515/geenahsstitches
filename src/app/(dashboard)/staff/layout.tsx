import StaffHeader from "@/components/dashboard/staff/Header";

export default async function StaffLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="bg-background-dark min-h-screen flex w-full md:flex-row flex-col">
            <StaffHeader />
            <div className="flex-1">
                {children}
            </div>
        </div>
    );
}
