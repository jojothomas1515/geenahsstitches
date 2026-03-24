"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Search, X, ChevronDown } from "lucide-react";
import { useState, useEffect, useTransition, useCallback } from "react";

interface CatalogFiltersProps {
    collections: { id: string; name: string }[];
}

export default function CatalogFilters({ collections }: CatalogFiltersProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isPending, startTransition] = useTransition();

    const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
    const currentCollection = searchParams.get("collection") || "all";
    const currentSort = searchParams.get("sort") || "newest";

    // Update URL with new parameters
    const updateParams = useCallback((updates: Record<string, string | null>) => {
        const params = new URLSearchParams(searchParams.toString());
        
        Object.entries(updates).forEach(([key, value]) => {
            if (value === null || value === "all") {
                params.delete(key);
            } else {
                params.set(key, value);
            }
        });

        // Reset to page 1 on filter change
        if (!updates.page) {
            params.delete("page");
        }

        startTransition(() => {
            router.push(`/store?${params.toString()}`, { scroll: false });
        });
    }, [router, searchParams]);

    // Debounce search
    useEffect(() => {
        const timer = setTimeout(() => {
            if (searchQuery !== (searchParams.get("q") || "")) {
                updateParams({ q: searchQuery || null });
            }
        }, 500);
        return () => clearTimeout(timer);
    }, [searchQuery, searchParams, updateParams]);

    return (
        <div className="space-y-8 mb-12">
            <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between border-b border-background-dark pb-8">
                {/* Search Bar */}
                <div className="relative w-full lg:max-w-md group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted group-focus-within:text-primary transition-colors" />
                    <input 
                        type="text"
                        placeholder="Search products..."
                        className="w-full pl-12 pr-12 py-4 bg-background-light border border-background-dark focus:border-primary/50 outline-none transition-all font-medium text-basic placeholder:text-muted/50"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    {searchQuery && (
                        <button 
                            onClick={() => setSearchQuery("")}
                            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 hover:bg-background-dark transition-colors text-muted hover:text-primary"
                        >
                            <X size={14} />
                        </button>
                    )}
                </div>

                {/* Filters Group */}
                <div className="flex flex-wrap gap-4 w-full lg:w-auto">
                    {/* Collection Filter */}
                    <div className="relative group">
                        <select 
                            value={currentCollection}
                            onChange={(e) => updateParams({ collection: e.target.value })}
                            className="appearance-none pl-6 pr-12 py-4 bg-background-light border border-background-dark focus:border-primary/50 outline-none transition-all font-black text-[10px] uppercase tracking-[0.2em] cursor-pointer min-w-[200px] text-basic"
                        >
                            <option value="all">All Collections</option>
                            {collections.map(c => (
                                <option key={c.id} value={c.id}>{c.name}</option>
                            ))}
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted group-hover:text-primary transition-colors pointer-events-none" />
                    </div>

                    {/* Sort Filter */}
                    <div className="relative group">
                        <select 
                            value={currentSort}
                            onChange={(e) => updateParams({ sort: e.target.value })}
                            className="appearance-none pl-6 pr-12 py-4 bg-background-light border border-background-dark focus:border-primary/50 outline-none transition-all font-black text-[10px] uppercase tracking-[0.2em] cursor-pointer min-w-[180px] text-basic"
                        >
                            <option value="newest">Newest First</option>
                            <option value="price-asc">Price (Low - High)</option>
                            <option value="price-desc">Price (High - Low)</option>
                            <option value="name-asc">Name (A - Z)</option>
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted group-hover:text-primary transition-colors pointer-events-none" />
                    </div>
                </div>
            </div>

            {/* Active Filters / Pending State */}
            <div className="h-2 flex items-center">
                {isPending && (
                   <div className="h-0.5 w-full bg-neutral-dark overflow-hidden relative">
                       <div className="absolute inset-0 bg-primary animate-progress origin-left" />
                   </div>
                )}
            </div>
        </div>
    );
}
