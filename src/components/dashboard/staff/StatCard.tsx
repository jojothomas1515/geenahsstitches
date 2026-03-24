"use client";

import Link from "next/link";
import type { StatCardProps } from "@/interfaces";
import * as motion from "motion/react-client";
import { Package, Clock, CheckCircle } from "lucide-react";
import React from "react";

const ICON_MAP: Record<string, React.ElementType> = {
    Package,
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
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="group bg-background/60 backdrop-blur-xl border border-background-light/20 rounded-3xl p-6 flex flex-col gap-6 min-w-[240px] flex-1 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-300"
        >
            <div className="flex items-start justify-between">
                <div className="flex flex-col gap-1">
                    <span className="text-xs font-bold text-muted uppercase tracking-[0.2em] opacity-80">
                        {title}
                    </span>
                    <span className="text-3xl font-extrabold text-basic tracking-tight">
                        {displayValue}
                    </span>
                </div>
                <div className="bg-primary/10 rounded-2xl p-3 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                    <IconComponent size={24} strokeWidth={2.5} />
                </div>
            </div>

            {href && (
                <Link
                    href={href}
                    className="group/link inline-flex items-center justify-between text-xs font-bold bg-background-light/50 text-basic rounded-xl px-4 py-3 transition-all duration-300 hover:bg-primary hover:text-white mt-auto overflow-hidden relative"
                >
                    <span className="relative z-10">{linkLabel ?? "View Details"}</span>
                    <motion.span 
                        className="relative z-10"
                        initial={{ x: -4 }}
                        whileHover={{ x: 0 }}
                    >
                        →
                    </motion.span>
                </Link>
            )}
        </motion.div>
    );
}
