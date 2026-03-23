"use client";

import { useActionState, useEffect } from "react";
import { X, Loader2 } from "lucide-react";
import { createCollection, updateCollection } from "@/actions/collection.actions";
import type { CollectionActionState, CollectionFormProps } from "@/interfaces";

const initialState: CollectionActionState = {};

export default function CollectionForm({ collection, onClose, onSuccess }: CollectionFormProps) {
    const action = collection 
        ? updateCollection.bind(null, collection.id)
        : createCollection;
    
    const [state, formAction, isPending] = useActionState(action, initialState);

    useEffect(() => {
        if (state.success) {
            onSuccess();
        }
    }, [state.success, onSuccess]);

    return (
        <div className="bg-background-light rounded-2xl shadow-2xl overflow-hidden border border-background-dark max-w-md w-full flex flex-col">
            <div className="p-6 border-b border-background-dark flex justify-between items-center bg-background shrink-0">
                <div>
                    <h2 className="text-xl font-bold text-basic">{collection ? "Edit Collection" : "New Collection"}</h2>
                    <p className="text-sm text-muted">Define your product group</p>
                </div>
                <button
                    onClick={onClose}
                    className="p-2 hover:bg-background-dark rounded-full transition-colors text-muted hover:text-basic"
                >
                    <X className="h-5 w-5" />
                </button>
            </div>

            <form action={formAction} className="p-8 space-y-6">
                <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-basic mb-2 pl-1">
                        Collection Name
                    </label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        defaultValue={collection?.name}
                        className={`w-full px-4 py-3 rounded-xl bg-background border ${state.errors?.name ? 'border-red-500' : 'border-background-dark'} text-basic focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all`}
                        placeholder="e.g. Summer Specials"
                        required
                    />
                    {state.errors?.name && <p className="text-red-500 text-xs mt-1 pl-1">{state.errors.name[0]}</p>}
                </div>

                <div>
                    <label htmlFor="description" className="block text-sm font-semibold text-basic mb-2 pl-1">
                        Description
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        defaultValue={collection?.description}
                        rows={4}
                        className={`w-full px-4 py-3 rounded-xl bg-background border ${state.errors?.description ? 'border-red-500' : 'border-background-dark'} text-basic focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none`}
                        placeholder="Describe what's special about this collection..."
                        required
                    ></textarea>
                    {state.errors?.description && <p className="text-red-500 text-xs mt-1 pl-1">{state.errors.description[0]}</p>}
                </div>

                {state.error && (
                    <div className="p-4 bg-red-50 text-red-500 rounded-xl text-sm border border-red-100 italic">
                        {state.error}
                    </div>
                )}

                <div className="pt-4 flex gap-4">
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
                        className="flex-1 py-3.5 px-4 rounded-xl font-bold bg-primary text-white hover:opacity-90 transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                        {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
                        {collection ? "Save Changes" : "Create"}
                    </button>
                </div>
            </form>
        </div>
    );
}
