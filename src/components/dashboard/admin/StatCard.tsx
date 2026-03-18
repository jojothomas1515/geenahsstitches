import { LucideIcon } from "lucide-react";
import Link from "next/link";

interface StatCardProps {
    title: string;
    value: number | string;
    icon: LucideIcon;
    href?: string;
    linkLabel?: string;
    formatAsCurrency?: boolean;
}

export default function StatCard({
    title,
    value,
    icon: Icon,
    href,
    linkLabel,
    formatAsCurrency = false,
}: StatCardProps) {
    const displayValue = formatAsCurrency
        ? `₦${Number(value).toLocaleString()}`
        : value;

    return (
        <div className="bg-background rounded-2xl p-6 flex flex-col gap-4 min-w-[220px] flex-1 shadow-sm transition-transform duration-200 hover:scale-[1.02]">
            <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted uppercase tracking-wider">
                    {title}
                </span>
                <div className="bg-background-light rounded-xl p-2.5">
                    <Icon size={20} className="text-basic" />
                </div>
            </div>
            <span className="text-3xl font-bold text-basic">{displayValue}</span>
            {href && (
                <Link
                    href={href}
                    className="text-sm font-medium bg-background-light text-basic rounded-lg px-4 py-2 text-center transition-colors duration-200 hover:opacity-80 mt-auto"
                >
                    {linkLabel ?? "View All"}
                </Link>
            )}
        </div>
    );
}
