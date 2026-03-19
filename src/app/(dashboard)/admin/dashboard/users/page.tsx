"use client";

import { useEffect, useState } from "react";
import { UserPlus, Users, ShieldCheck, UserCheck, Loader2 } from "lucide-react";
import { getUsers } from "@/actions/user.actions";
import UserTable from "@/components/dashboard/admin/users/UserTable";
import UserForm from "@/components/dashboard/admin/users/UserForm";
import DeleteUserDialog from "@/components/dashboard/admin/users/DeleteUserDialog";
import { Role } from "@/generated/prisma/enums";

interface AppUser {
    id: string;
    name: string;
    email: string;
    phone: string;
    role: Role;
    createdAt: Date;
    _count: {
        orders: number;
    };
}

export default function AdminUsersPage() {
    const [users, setUsers] = useState<AppUser[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<AppUser | undefined>(undefined);
    const [deletingUserId, setDeletingUserId] = useState<string | null>(null);
    const [deletingUserName, setDeletingUserName] = useState<string | null>(null);

    const fetchUsers = async () => {
        setIsLoading(true);
        try {
            const data = await getUsers();
            setUsers(data as AppUser[]);
        } catch (error) {
            console.error("Failed to fetch users:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleAddUser = () => {
        setEditingUser(undefined);
        setIsFormOpen(true);
    };

    const handleEditUser = (user: AppUser) => {
        setEditingUser(user);
        setIsFormOpen(true);
    };

    const handleDeleteClick = (id: string) => {
        const user = users.find(u => u.id === id);
        if (user) {
            setDeletingUserId(id);
            setDeletingUserName(user.name);
        }
    };

    const handleFormSuccess = () => {
        setIsFormOpen(false);
        fetchUsers();
    };

    const handleDeleteSuccess = () => {
        setDeletingUserId(null);
        setDeletingUserName(null);
        fetchUsers();
    };

    const stats = {
        total: users.length,
        admins: users.filter(u => u.role === "ADMIN").length,
        staff: users.filter(u => u.role === "STAFF").length,
        customers: users.filter(u => u.role === "USER").length,
    };

    return (
        <main className="w-full h-dvh p-10 overflow-y-scroll bg-background-light/30">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
                    <div>
                        <h1 className="text-3xl font-bold text-basic mb-2">User Management</h1>
                        <p className="text-muted">Manage administrators, staff, and customer accounts.</p>
                    </div>
                    <button
                        onClick={handleAddUser}
                        className="flex items-center gap-2 px-6 py-3 bg-accent text-white font-bold rounded-xl shadow-lg shadow-accent/20 hover:opacity-90 transition-all transform hover:-translate-y-0.5"
                    >
                        <UserPlus className="h-5 w-5" />
                        Add New User
                    </button>
                </div>

                {/* Dashboard Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                    <div className="bg-background p-6 rounded-2xl shadow-sm border border-background-dark flex items-center gap-4">
                        <div className="h-12 w-12 bg-accent/10 text-accent rounded-xl flex items-center justify-center">
                            <Users className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-muted uppercase tracking-wider">Total Users</p>
                            <p className="text-2xl font-bold text-basic">{stats.total}</p>
                        </div>
                    </div>
                    <div className="bg-background p-6 rounded-2xl shadow-sm border border-background-dark flex items-center gap-4">
                        <div className="h-12 w-12 bg-red-50 text-red-500 rounded-xl flex items-center justify-center">
                            <ShieldCheck className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-muted uppercase tracking-wider">Admins</p>
                            <p className="text-2xl font-bold text-basic">{stats.admins}</p>
                        </div>
                    </div>
                    <div className="bg-background p-6 rounded-2xl shadow-sm border border-background-dark flex items-center gap-4">
                        <div className="h-12 w-12 bg-blue-50 text-blue-500 rounded-xl flex items-center justify-center">
                            <UserCheck className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-muted uppercase tracking-wider">Staff</p>
                            <p className="text-2xl font-bold text-basic">{stats.staff}</p>
                        </div>
                    </div>
                    <div className="bg-background p-6 rounded-2xl shadow-sm border border-background-dark flex items-center gap-4">
                        <div className="h-12 w-12 bg-green-50 text-green-500 rounded-xl flex items-center justify-center">
                            <Users className="h-6 w-6 text-green-500" />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-muted uppercase tracking-wider">Customers</p>
                            <p className="text-2xl font-bold text-basic">{stats.customers}</p>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                {isLoading ? (
                    <div className="h-64 flex flex-col items-center justify-center bg-background rounded-2xl border border-background-dark">
                        <Loader2 className="h-10 w-10 text-accent animate-spin mb-4" />
                        <p className="text-muted font-medium">Loading user data...</p>
                    </div>
                ) : (
                    <UserTable
                        users={users}
                        onEdit={handleEditUser}
                        onDelete={handleDeleteClick}
                    />
                )}
            </div>

            {/* Overlays/Modals */}
            {isFormOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="w-full max-w-lg animate-in zoom-in-95 duration-200">
                        <UserForm
                            user={editingUser}
                            onClose={() => setIsFormOpen(false)}
                            onSuccess={handleFormSuccess}
                        />
                    </div>
                </div>
            )}

            {deletingUserId && (
                <DeleteUserDialog
                    userId={deletingUserId}
                    userName={deletingUserName}
                    onClose={() => setDeletingUserId(null)}
                    onSuccess={handleDeleteSuccess}
                />
            )}
        </main>
    );
}
