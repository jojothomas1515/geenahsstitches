"use client";

import { useState } from "react";
import { Edit, Trash2, Search, Layers, ExternalLink, Eye } from "lucide-react";
import Link from "next/link";
import type { CollectionTableProps } from "@/interfaces";

export default function CollectionTable({ collections, onEdit, onDelete, onManageProducts, baseUrl = "/admin/dashboard/collections" }: CollectionTableProps) {
    const [searchQuery, setSearchQuery] = useState("");

    const filteredCollections = collections.filter((collection) =>
        collection.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        collection.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="bg-background rounded-2xl shadow-sm overflow-hidden border border-background-dark">
            <div className="p-6 border-b border-background-dark flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="relative w-full sm:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
                    <input
                        type="text"
                        placeholder="Search collections..."
                        className="w-full pl-10 pr-4 py-2 rounded-xl bg-background-light border border-background-dark text-sm text-basic focus:outline-none focus:ring-2 focus:ring-primary/50"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="text-sm text-muted">
                    Showing {filteredCollections.length} of {collections.length} collections
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead>
                        <tr className="text-muted border-b border-background-dark bg-background-light/50">
                            <th className="py-4 px-6 font-medium">Collection</th>
                            <th className="py-4 px-6 font-medium">Description</th>
                            <th className="py-4 px-6 font-medium">Products</th>
                            <th className="py-4 px-6 font-medium">Created At</th>
                            <th className="py-4 px-6 font-medium text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-background-dark">
                        {filteredCollections.length > 0 ? (
                            filteredCollections.map((collection) => (
                                <tr key={collection.id} className="hover:bg-background-light/30 transition-colors">
                                    <td className="py-4 px-6">
                                        <div className="flex items-center gap-3">
                                            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                                <Layers className="h-5 w-5" />
                                            </div>
                                            <Link 
                                                href={`${baseUrl}/${collection.id}`}
                                                className="font-medium text-basic truncate max-w-[150px] hover:text-primary transition-colors"
                                            >
                                                {collection.name}
                                            </Link>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6">
                                        <div className="text-muted truncate max-w-[250px]">
                                            {collection.description}
                                        </div>
                                    </td>
                                    <td className="py-4 px-6">
                                        <span className="px-2 py-1 rounded-full bg-blue-50 text-blue-600 text-[11px] font-bold">
                                            {collection._count.products} Products
                                        </span>
                                    </td>
                                    <td className="py-4 px-6 text-muted">
                                        {new Date(collection.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="py-4 px-6 text-right">
                                        <div className="flex justify-end gap-2">
                                            <Link
                                                href={`${baseUrl}/${collection.id}`}
                                                className="p-2 rounded-lg hover:bg-blue-50 text-blue-500 transition-colors"
                                                title="View collection details"
                                            >
                                                <Eye className="h-4 w-4" />
                                            </Link>
                                            <button
                                                onClick={() => onManageProducts(collection)}
                                                className="p-2 rounded-lg hover:bg-blue-50 text-blue-500 transition-colors"
                                                title="Manage products"
                                            >
                                                <ExternalLink className="h-4 w-4" />
                                            </button>
                                            <button
                                                onClick={() => onEdit(collection)}
                                                className="p-2 rounded-lg hover:bg-primary/10 text-primary transition-colors"
                                                title="Edit collection"
                                            >
                                                <Edit className="h-4 w-4" />
                                            </button>
                                            <button
                                                onClick={() => onDelete(collection.id)}
                                                className="p-2 rounded-lg hover:bg-red-50 text-red-500 transition-colors"
                                                title="Delete collection"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} className="py-12 text-center text-muted">
                                    No collections found matching your search.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
