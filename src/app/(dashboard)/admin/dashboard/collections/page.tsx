"use client";

import { useState, useEffect } from "react";
import { Plus, Layers, Loader2 } from "lucide-react";
import { getCollections } from "@/actions/collection.actions";
import CollectionTable from "@/components/dashboard/shared/collections/CollectionTable";
import CollectionForm from "@/components/dashboard/shared/collections/CollectionForm";
import AddProductToCollectionForm from "@/components/dashboard/shared/collections/AddProductToCollectionForm";
import DeleteCollectionDialog from "@/components/dashboard/shared/collections/DeleteCollectionDialog";
import type { Collection } from "@/interfaces";

export default function CollectionsPage() {
    const [collections, setCollections] = useState<(Collection & { _count: { products: number } })[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [showProductForm, setShowProductForm] = useState(false);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [selectedCollection, setSelectedCollection] = useState<Collection | null>(null);

    const fetchCollections = async () => {
        setIsLoading(true);
        try {
            const data = await getCollections();
            setCollections(data as (Collection & { _count: { products: number } })[]);
        } catch (error) {
            console.error("Failed to fetch collections:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchCollections();
    }, []);

    const handleCreate = () => {
        setSelectedCollection(null);
        setShowForm(true);
    };

    const handleEdit = (collection: Collection) => {
        setSelectedCollection(collection);
        setShowForm(true);
    };

    const handleManageProducts = (collection: Collection) => {
        setSelectedCollection(collection);
        setShowProductForm(true);
    };

    const handleDelete = (id: string) => {
        const collection = collections.find(c => c.id === id);
        if (collection) {
            setSelectedCollection(collection);
            setShowDeleteDialog(true);
        }
    };

    return (
        <main className="w-full h-dvh p-10 overflow-y-scroll bg-background-light/30">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
                    <div>
                        <h1 className="text-3xl font-bold text-basic mb-2">Collections</h1>
                        <p className="text-muted">Organize your products into curated groups.</p>
                    </div>
                    <button
                        onClick={handleCreate}
                        className="flex items-center gap-2 px-6 py-3 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:opacity-90 transition-all transform hover:-translate-y-0.5"
                    >
                        <Plus className="h-5 w-5" />
                        New Collection
                    </button>
                </div>

                {/* Main Content */}
                {isLoading ? (
                    <div className="h-64 flex flex-col items-center justify-center bg-background rounded-2xl border border-background-dark">
                        <Loader2 className="h-10 w-10 text-primary animate-spin mb-4" />
                        <p className="text-muted font-medium">Loading collections...</p>
                    </div>
                ) : collections.length > 0 ? (
                    <CollectionTable 
                        collections={collections} 
                        onEdit={handleEdit} 
                        onDelete={handleDelete}
                        onManageProducts={handleManageProducts}
                    />
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 bg-background rounded-2xl border border-background-dark text-center px-6">
                        <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6">
                            <Layers className="h-10 w-10" />
                        </div>
                        <h3 className="text-xl font-bold text-basic mb-2">No collections yet</h3>
                        <p className="text-muted max-w-md mb-8">
                            Collections help you group products for special offers, seasons, or categories to make them easier for customers to find.
                        </p>
                        <button
                            onClick={handleCreate}
                            className="bg-primary text-white px-6 py-3 rounded-xl font-bold hover:opacity-90 transition-all shadow-lg shadow-primary/20 flex items-center gap-2"
                        >
                            <Plus className="h-5 w-5" />
                            Create your first collection
                        </button>
                    </div>
                )}
            </div>

            {/* Modals */}
            {showForm && (
                <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <CollectionForm 
                        collection={selectedCollection || undefined}
                        onClose={() => setShowForm(false)}
                        onSuccess={() => {
                            setShowForm(false);
                            fetchCollections();
                        }}
                    />
                </div>
            )}

            {showProductForm && selectedCollection && (
                <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <AddProductToCollectionForm 
                        collection={selectedCollection}
                        onClose={() => setShowProductForm(false)}
                        onSuccess={() => {
                            setShowProductForm(false);
                            fetchCollections();
                        }}
                    />
                </div>
            )}

            {showDeleteDialog && selectedCollection && (
                <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <DeleteCollectionDialog 
                        collectionId={selectedCollection.id}
                        collectionName={selectedCollection.name}
                        onClose={() => setShowDeleteDialog(false)}
                        onSuccess={() => {
                            setShowDeleteDialog(false);
                            fetchCollections();
                        }}
                    />
                </div>
            )}
        </main>
    );
}
