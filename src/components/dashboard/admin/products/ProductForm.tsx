"use client";

import { useActionState, useEffect } from "react";
import { X, Loader2, Image as ImageIcon } from "lucide-react";
import { createProduct, updateProduct, type ProductActionState } from "@/actions/product.actions";

interface Product {
    id: string;
    name: string;
    price: number;
    discount: number;
    image: string;
    category: string[];
    description: string;
    quantity: number;
}

interface ProductFormProps {
    product?: Product;
    onClose: () => void;
    onSuccess: () => void;
}

const initialState: ProductActionState = {};

export default function ProductForm({ product, onClose, onSuccess }: ProductFormProps) {
    const action = product 
        ? updateProduct.bind(null, product.id) 
        : createProduct;

    const [state, formAction, isPending] = useActionState(action, initialState);

    useEffect(() => {
        if (state.success) {
            onSuccess();
        }
    }, [state.success, onSuccess]);

    return (
        <div className="bg-background-light rounded-2xl shadow-2xl overflow-hidden border border-background-dark max-w-2xl w-full max-h-[90vh] flex flex-col">
            <div className="p-6 border-b border-background-dark flex justify-between items-center bg-background shrink-0">
                <div>
                    <h2 className="text-xl font-bold text-basic">{product ? "Edit Product" : "Add New Product"}</h2>
                    <p className="text-sm text-muted">Fill in the product details below</p>
                </div>
                <button 
                    onClick={onClose}
                    className="p-2 hover:bg-background-dark rounded-full transition-colors text-muted hover:text-basic"
                >
                    <X className="h-5 w-5" />
                </button>
            </div>

            <form action={formAction} className="p-8 space-y-6 overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name */}
                    <div className="md:col-span-2">
                        <label htmlFor="name" className="block text-sm font-semibold text-basic mb-2 pl-1">
                            Product Name
                        </label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            defaultValue={product?.name}
                            className={`w-full px-4 py-3 rounded-xl bg-background border ${state.errors?.name ? 'border-red-500' : 'border-background-dark'} text-basic focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all`}
                            placeholder="e.g. Traditional Nigerian Dashiki"
                            required
                        />
                        {state.errors?.name && <p className="text-red-500 text-xs mt-1 pl-1">{state.errors.name[0]}</p>}
                    </div>

                    {/* Price */}
                    <div>
                        <label htmlFor="price" className="block text-sm font-semibold text-basic mb-2 pl-1">
                            Price (₦)
                        </label>
                        <input
                            id="price"
                            name="price"
                            type="number"
                            defaultValue={product?.price}
                            className={`w-full px-4 py-3 rounded-xl bg-background border ${state.errors?.price ? 'border-red-500' : 'border-background-dark'} text-basic focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all`}
                            placeholder="5000"
                            required
                            min="1"
                        />
                        {state.errors?.price && <p className="text-red-500 text-xs mt-1 pl-1">{state.errors.price[0]}</p>}
                    </div>

                    {/* Discount */}
                    <div>
                        <label htmlFor="discount" className="block text-sm font-semibold text-basic mb-2 pl-1">
                            Discount (%)
                        </label>
                        <input
                            id="discount"
                            name="discount"
                            type="number"
                            defaultValue={product?.discount ?? 0}
                            className={`w-full px-4 py-3 rounded-xl bg-background border ${state.errors?.discount ? 'border-red-500' : 'border-background-dark'} text-basic focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all`}
                            placeholder="0"
                            min="0"
                            max="100"
                        />
                        {state.errors?.discount && <p className="text-red-500 text-xs mt-1 pl-1">{state.errors.discount[0]}</p>}
                    </div>

                    {/* Quantity */}
                    <div>
                        <label htmlFor="quantity" className="block text-sm font-semibold text-basic mb-2 pl-1">
                            Stock Quantity
                        </label>
                        <input
                            id="quantity"
                            name="quantity"
                            type="number"
                            defaultValue={product?.quantity}
                            className={`w-full px-4 py-3 rounded-xl bg-background border ${state.errors?.quantity ? 'border-red-500' : 'border-background-dark'} text-basic focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all`}
                            placeholder="10"
                            required
                            min="0"
                        />
                        {state.errors?.quantity && <p className="text-red-500 text-xs mt-1 pl-1">{state.errors.quantity[0]}</p>}
                    </div>

                    {/* Categories */}
                    <div>
                        <label htmlFor="category" className="block text-sm font-semibold text-basic mb-2 pl-1">
                            Categories (comma separated)
                        </label>
                        <input
                            id="category"
                            name="category"
                            type="text"
                            defaultValue={product?.category.join(", ")}
                            className={`w-full px-4 py-3 rounded-xl bg-background border ${state.errors?.category ? 'border-red-500' : 'border-background-dark'} text-basic focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all`}
                            placeholder="Women, Native, Dress"
                            required
                        />
                        {state.errors?.category && <p className="text-red-500 text-xs mt-1 pl-1">{state.errors.category[0]}</p>}
                    </div>

                    {/* Image URL */}
                    <div className="md:col-span-2">
                        <label htmlFor="image" className="block text-sm font-semibold text-basic mb-2 pl-1">
                            Image URL
                        </label>
                        <div className="relative">
                            <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted" />
                            <input
                                id="image"
                                name="image"
                                type="url"
                                defaultValue={product?.image}
                                className={`w-full pl-10 pr-4 py-3 rounded-xl bg-background border ${state.errors?.image ? 'border-red-500' : 'border-background-dark'} text-basic focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all`}
                                placeholder="https://example.com/image.jpg"
                                required
                            />
                        </div>
                        {state.errors?.image && <p className="text-red-500 text-xs mt-1 pl-1">{state.errors.image[0]}</p>}
                    </div>

                    {/* Description */}
                    <div className="md:col-span-2">
                        <label htmlFor="description" className="block text-sm font-semibold text-basic mb-2 pl-1">
                            Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            defaultValue={product?.description}
                            rows={4}
                            className={`w-full px-4 py-3 rounded-xl bg-background border ${state.errors?.description ? 'border-red-500' : 'border-background-dark'} text-basic focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all resize-none`}
                            placeholder="Describe the product details, fabric, and care instructions..."
                            required
                        ></textarea>
                        {state.errors?.description && <p className="text-red-500 text-xs mt-1 pl-1">{state.errors.description[0]}</p>}
                    </div>
                </div>

                {state.error && (
                    <div className="p-4 bg-red-50 text-red-500 rounded-xl text-sm border border-red-100 italic">
                        {state.error}
                    </div>
                )}

                <div className="pt-4 flex gap-4 shrink-0">
                    <button
                        type="button"
                        onClick={onClose}
                        className="flex-1 py-3.5 px-4 rounded-xl font-bold bg-background-dark text-muted hover:text-basic transition-all border border-background-dark"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={isPending}
                        className="flex-[2] py-3.5 px-4 rounded-xl font-bold bg-accent text-white hover:opacity-90 transition-all shadow-lg shadow-accent/20 flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                        {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
                        {product ? "Save Changes" : "Create Product"}
                    </button>
                </div>
            </form>
        </div>
    );
}
