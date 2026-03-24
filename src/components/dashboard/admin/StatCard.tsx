"use client";

import Link from "next/link";
import type { StatCardProps } from "@/interfaces";
import { Package, Users, Clock, CheckCircle, ArrowRight } from "lucide-react";
import React from "react";

const ICON_MAP: Record<string, React.ElementType> = {
    Package,
    Users,
    Clock,
    CheckCircle,
};

export default function StatCard({
    title,
    value,
    icon,
    href,
    linkLabel,
    formatAsCurrency = false,
}: StatCardProps) {
    const IconComponent = ICON_MAP[icon] || Package;
    const displayValue = formatAsCurrency
        ? `₦${Number(value).toLocaleString()}`
        : value;

    return (
        <div className="bg-background border border-background-dark rounded-2xl p-6 flex flex-col gap-4 shadow-sm hover:shadow-md transition-all duration-200">
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-xs font-bold text-muted uppercase tracking-wider mb-1">
                        {title}
                    </p>
                    <h3 className="text-2xl font-bold text-basic">
                        {displayValue}
                    </h3>
                </div>
                <div className="bg-primary/10 rounded-xl p-3 text-primary">
                    <IconComponent size={20} />
                </div>
            </div>

            {href && (
                <Link
                    href={href}
                    className="inline-flex items-center gap-2 text-xs font-bold text-primary hover:underline mt-2"
                >
                    {linkLabel ?? "View Details"}
                    <ArrowRight size={14} />
                </Link>
            )}
        </div>
    );
}
