"use client";

import { useState } from "react";
import { AlertTriangle, Loader2, UserX } from "lucide-react";
import { deleteUser } from "@/actions/user.actions";
import type { DeleteUserDialogProps } from "@/interfaces";

export default function DeleteUserDialog({ userId, userName, onClose, onSuccess }: DeleteUserDialogProps) {
    const [isDeleting, setIsDeleting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    if (!userId) return null;

    const handleDelete = async () => {
        setIsDeleting(true);
        setError(null);
        try {
            const result = await deleteUser(userId);
            if (result.success) {
                onSuccess();
            } else {
                setError(result.error || "Failed to delete user.");
            }
        } catch (err) {
            setError("An unexpected error occurred.");
            console.error(err);
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-background rounded-2xl shadow-2xl overflow-hidden border border-background-dark max-w-md w-full animate-in zoom-in-95 duration-200">
                <div className="p-8 text-center text-basic">
                    <div className="mx-auto w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-6 border border-red-100">
                        <UserX className="h-8 w-8" />
                    </div>
                    
                    <h3 className="text-xl font-bold mb-2">Delete User Account?</h3>
                    <p className="text-muted text-sm px-4">
                        Are you sure you want to delete <span className="font-semibold text-basic">&quot;{userName}&quot;</span>? 
                        This action will permanently remove their account and all associated data.
                    </p>

                    {error && (
                        <div className="mt-4 p-3 bg-red-50 text-red-500 rounded-xl text-xs border border-red-100 flex items-center gap-2">
                            <AlertTriangle className="h-3 w-3 shrink-0" />
                            <span>{error}</span>
                        </div>
                    )}
                </div>

                <div className="px-8 pb-8 flex gap-4">
                    <button
                        onClick={onClose}
                        disabled={isDeleting}
                        className="flex-1 py-3 px-4 rounded-xl font-bold bg-background-dark text-muted hover:text-basic transition-all border border-background-dark disabled:opacity-50"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleDelete}
                        disabled={isDeleting}
                        className="flex-1 py-3 px-4 rounded-xl font-bold bg-red-500 text-white hover:bg-red-600 transition-all shadow-lg shadow-red-200 flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                        {isDeleting && <Loader2 className="h-4 w-4 animate-spin" />}
                        {isDeleting ? "Deleting..." : "Yes, Delete"}
                    </button>
                </div>
            </div>
        </div>
    );
}
