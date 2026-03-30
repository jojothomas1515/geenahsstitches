"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Edit, Trash2, Search, Package } from "lucide-react";
import Image from "next/image";
import TablePagination from "@/components/dashboard/shared/TablePagination";
import type { ProductTableProps } from "@/interfaces";

const PAGE_SIZE = 10;

export default function ProductTable({ products, onEdit, onDelete }: ProductTableProps) {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.some(cat => cat.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    const totalPages = Math.ceil(filteredProducts.length / PAGE_SIZE);
    const paginatedProducts = filteredProducts.slice(
        (currentPage - 1) * PAGE_SIZE,
        currentPage * PAGE_SIZE
    );

    // Reset to page 1 when search changes
    const handleSearch = (value: string) => {
        setSearchQuery(value);
        setCurrentPage(1);
    };

    return (
        <div className="bg-background rounded-2xl shadow-sm overflow-hidden border border-background-dark">
            <div className="p-6 border-b border-background-dark flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="relative w-full sm:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
                    <input
                        type="text"
                        placeholder="Search products..."
                        className="w-full pl-10 pr-4 py-2 rounded-xl bg-background-light border border-background-dark text-sm text-basic focus:outline-none focus:ring-2 focus:ring-primary/50"
                        value={searchQuery}
                        onChange={(e) => handleSearch(e.target.value)}
                    />
                </div>
                <div className="text-sm text-muted">
                    Showing {paginatedProducts.length} of {filteredProducts.length} products
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead>
                        <tr className="text-muted border-b border-background-dark bg-background-light/50">
                            <th className="py-4 px-6 font-medium">Product</th>
                            <th className="py-4 px-6 font-medium">Category</th>
                            <th className="py-4 px-6 font-medium">Collections</th>
                            <th className="py-4 px-6 font-medium">Price</th>
                            <th className="py-4 px-6 font-medium">Quantity</th>
                            <th className="py-4 px-6 font-medium text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-background-dark">
                        {paginatedProducts.length > 0 ? (
                            paginatedProducts.map((product) => (
                                <tr key={product.id} className="hover:bg-background-light/30 transition-colors cursor-pointer" onClick={() => router.push(`/admin/dashboard/products/${product.id}`)}>
                                    <td className="py-4 px-6">
                                        <div className="flex items-center gap-3">
                                            <div className="relative h-12 w-12 rounded-lg overflow-hidden border border-background-dark bg-background-light shrink-0">
                                                {product.productImages.length > 0 ? (
                                                    <Image
                                                        src={product.productImages[0].url}
                                                        alt={product.name}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                ) : (
                                                    <div className="h-full w-full flex items-center justify-center text-muted">
                                                        <Package className="h-6 w-6" />
                                                    </div>
                                                )}
                                            </div>
                                            <div className="font-medium text-basic truncate max-w-[200px]">
                                                {product.name}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6">
                                        <div className="flex flex-wrap gap-1">
                                            {product.category.map((cat, i) => (
                                                <span key={i} className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-semibold">
                                                    {cat}
                                                </span>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="py-4 px-6">
                                        <div className="flex flex-wrap gap-1">
                                            {product.collections && product.collections.length > 0 ? (
                                                product.collections.map((col, i) => (
                                                    <span key={i} className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 text-[10px] font-semibold border border-blue-100">
                                                        {col.name}
                                                    </span>
                                                ))
                                            ) : (
                                                <span className="text-muted text-[10px] italic">None</span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="py-4 px-6 text-basic font-medium">
                                        {product.discount > 0 ? (
                                            <div className="flex flex-col">
                                                <span className="text-primary">₦{(product.price * (1 - product.discount / 100)).toLocaleString()}</span>
                                                <span className="text-muted line-through text-[10px]">₦{product.price.toLocaleString()}</span>
                                            </div>
                                        ) : (
                                            <span>₦{product.price.toLocaleString()}</span>
                                        )}
                                    </td>
                                    <td className="py-4 px-6">
                                        <span className={`font-medium ${product.quantity <= 5 ? 'text-red-500' : 'text-basic'}`}>
                                            {product.quantity}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6 text-right">
                                        <div className="flex justify-end gap-2">
                                            <button
                                                onClick={(e) => { e.stopPropagation(); onEdit(product); }}
                                                className="p-2 rounded-lg hover:bg-primary/10 text-primary transition-colors"
                                                title="Edit product"
                                            >
                                                <Edit className="h-4 w-4" />
                                            </button>
                                            <button
                                                onClick={(e) => { e.stopPropagation(); onDelete(product.id); }}
                                                className="p-2 rounded-lg hover:bg-red-50 text-red-500 transition-colors"
                                                title="Delete product"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={6} className="py-12 text-center text-muted">
                                    No products found matching your search.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <TablePagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={filteredProducts.length}
                pageSize={PAGE_SIZE}
                onPageChange={setCurrentPage}
            />
        </div>
    );
}
