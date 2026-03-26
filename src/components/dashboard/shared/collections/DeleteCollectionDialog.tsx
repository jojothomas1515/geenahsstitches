"use client";

import { useTransition } from "react";
import { X, AlertTriangle, Loader2 } from "lucide-react";
import { deleteCollection } from "@/actions/collection.actions";
import type { DeleteCollectionDialogProps } from "@/interfaces";

export default function DeleteCollectionDialog({ collectionId, collectionName, onClose, onSuccess }: DeleteCollectionDialogProps) {
    const [isPending, startTransition] = useTransition();

    const handleDelete = () => {
        if (!collectionId) return;
        
        startTransition(async () => {
            const result = await deleteCollection(collectionId);
            if (result.success) {
                onSuccess();
            } else {
                alert(result.error || "Failed to delete collection");
            }
        });
    };

    return (
        <div className="bg-background-light rounded-2xl shadow-2xl overflow-hidden border border-background-dark max-w-md w-full">
            <div className="p-6 border-b border-background-dark flex justify-between items-center bg-background">
                <div className="flex items-center gap-3 text-red-500">
                    <div className="h-10 w-10 rounded-full bg-red-50 flex items-center justify-center">
                        <AlertTriangle className="h-6 w-6" />
                    </div>
                    <h2 className="text-xl font-bold">Delete Collection</h2>
                </div>
                <button
                    onClick={onClose}
                    className="p-2 hover:bg-background-dark rounded-full transition-colors text-muted hover:text-basic"
                >
                    <X className="h-5 w-5" />
                </button>
            </div>

            <div className="p-8">
                <p className="text-basic mb-6">
                    Are you sure you want to delete the collection <span className="font-bold text-red-500">&quot;{collectionName}&quot;</span>? 
                    This action cannot be undone. Products in this collection will not be deleted.
                </p>

                <div className="flex gap-4">
                    <button
                        type="button"
                        onClick={onClose}
                        className="flex-1 py-3.5 px-4 rounded-xl font-bold bg-background-dark text-muted hover:text-basic transition-all border border-background-dark"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleDelete}
                        disabled={isPending}
                        className="flex-1 py-3.5 px-4 rounded-xl font-bold bg-red-500 text-basic hover:bg-red-600 transition-all shadow-lg shadow-red-500/20 flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                        {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}
