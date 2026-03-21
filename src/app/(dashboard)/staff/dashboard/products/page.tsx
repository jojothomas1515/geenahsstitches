"use client";

import { useEffect, useState } from "react";
import { Plus, Package, Loader2 } from "lucide-react";
import { getProducts } from "@/actions/product.actions";
import ProductTable from "@/components/dashboard/staff/products/ProductTable";
import ProductForm from "@/components/dashboard/staff/products/ProductForm";
import DeleteProductDialog from "@/components/dashboard/staff/products/DeleteProductDialog";
import type { Product } from "@/interfaces";

export default function StaffProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | undefined>(undefined);
    const [deletingProductId, setDeletingProductId] = useState<string | null>(null);
    const [deletingProductName, setDeletingProductName] = useState<string | null>(null);

    const fetchProducts = async () => {
        setIsLoading(true);
        try {
            const data = await getProducts();
            setProducts(data as Product[]);
        } catch (error) {
            console.error("Failed to fetch products:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleAddProduct = () => {
        setEditingProduct(undefined);
        setIsFormOpen(true);
    };

    const handleEditProduct = (product: Product) => {
        setEditingProduct(product);
        setIsFormOpen(true);
    };

    const handleDeleteClick = (id: string) => {
        const product = products.find(p => p.id === id);
        if (product) {
            setDeletingProductId(id);
            setDeletingProductName(product.name);
        }
    };

    const handleFormSuccess = () => {
        setIsFormOpen(false);
        fetchProducts();
    };

    const handleDeleteSuccess = () => {
        setDeletingProductId(null);
        setDeletingProductName(null);
        fetchProducts();
    };

    return (
        <main className="w-full h-dvh p-10 overflow-y-scroll bg-background-light/30">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
                    <div>
                        <h1 className="text-3xl font-bold text-basic mb-2">Manage Products</h1>
                        <p className="text-muted">Add, update, or remove products from your store catalog.</p>
                    </div>
                    <button
                        onClick={handleAddProduct}
                        className="flex items-center gap-2 px-6 py-3 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:opacity-90 transition-all transform hover:-translate-y-0.5"
                    >
                        <Plus className="h-5 w-5" />
                        Add New Product
                    </button>
                </div>

                {/* Stats Summary */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
                    <div className="bg-background p-6 rounded-2xl shadow-sm border border-background-dark flex items-center gap-4">
                        <div className="h-12 w-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center">
                            <Package className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-muted uppercase tracking-wider">Total Products</p>
                            <p className="text-2xl font-bold text-basic">{products.length}</p>
                        </div>
                    </div>
                    <div className="bg-background p-6 rounded-2xl shadow-sm border border-background-dark flex items-center gap-4">
                        <div className="h-12 w-12 bg-yellow-50 text-yellow-600 rounded-xl flex items-center justify-center">
                            <Package className="h-6 w-6 text-yellow-500" />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-muted uppercase tracking-wider">Low Stock</p>
                            <p className="text-2xl font-bold text-basic">{products.filter(p => p.quantity <= 5).length}</p>
                        </div>
                    </div>
                    <div className="bg-background p-6 rounded-2xl shadow-sm border border-background-dark flex items-center gap-4">
                        <div className="h-12 w-12 bg-green-50 text-green-600 rounded-xl flex items-center justify-center">
                            <Package className="h-6 w-6 text-green-500" />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-muted uppercase tracking-wider">Categories</p>
                            <p className="text-2xl font-bold text-basic">
                                {[...new Set(products.flatMap(p => p.category))].length}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Main Table */}
                {isLoading ? (
                    <div className="h-64 flex flex-col items-center justify-center bg-background rounded-2xl border border-background-dark">
                        <Loader2 className="h-10 w-10 text-primary animate-spin mb-4" />
                        <p className="text-muted font-medium">Loading products...</p>
                    </div>
                ) : (
                    <ProductTable
                        products={products}
                        onEdit={handleEditProduct}
                        onDelete={handleDeleteClick}
                    />
                )}
            </div>

            {/* Modals and Overlays */}
            {isFormOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="w-full max-w-2xl animate-in zoom-in-95 duration-200">
                        <ProductForm
                            product={editingProduct}
                            onClose={() => setIsFormOpen(false)}
                            onSuccess={handleFormSuccess}
                        />
                    </div>
                </div>
            )}

            {deletingProductId && (
                <DeleteProductDialog
                    productId={deletingProductId}
                    productName={deletingProductName}
                    onClose={() => setDeletingProductId(null)}
                    onSuccess={handleDeleteSuccess}
                />
            )}
        </main>
    );
}
