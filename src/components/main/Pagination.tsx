"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
    totalPages: number;
    currentPage: number;
}

export default function Pagination({ totalPages, currentPage }: PaginationProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const goToPage = (page: number) => {
        if (page < 1 || page > totalPages) return;
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", page.toString());
        router.push(`/store?${params.toString()}`, { scroll: true });
    };

    if (totalPages <= 1) return null;

    return (
        <div className="flex justify-center items-center gap-2 mt-16">
            {/* Prev */}
            <button 
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-4 border border-background-dark hover:border-primary/30 transition-all font-bold text-xs uppercase disabled:opacity-30 disabled:cursor-not-allowed group"
            >
                <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            </button>

            {/* Pages Info */}
            <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                        key={page}
                        onClick={() => goToPage(page)}
                        className={`w-12 h-12 flex items-center justify-center border font-black text-xs transition-all ${
                            currentPage === page 
                                ? "bg-basic text-white border-basic" 
                                : "bg-neutral dark:bg-neutral-dark border-background-dark hover:border-primary/30"
                        }`}
                    >
                        {page}
                    </button>
                ))}
            </div>

            {/* Next */}
            <button 
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-4 border border-background-dark hover:border-primary/30 transition-all font-bold text-xs uppercase disabled:opacity-30 disabled:cursor-not-allowed group"
            >
                <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
        </div>
    );
}
