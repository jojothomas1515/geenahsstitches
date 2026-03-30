"use client";

import { useState } from "react";
import { Search, Edit, Trash2, Shield, User, Mail, Phone } from "lucide-react";
import { Role } from "@/generated/prisma/enums";
import TablePagination from "@/components/dashboard/shared/TablePagination";
import type { UserTableProps } from "@/interfaces";

const roleStyles: Record<Role, string> = {
    ADMIN: "bg-red-100 text-red-800 border-red-200",
    STAFF: "bg-blue-100 text-blue-800 border-blue-200",
    USER: "bg-green-100 text-green-800 border-green-200",
};

const PAGE_SIZE = 10;

export default function UserTable({ users, onEdit, onDelete }: UserTableProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const filteredUsers = users.filter((user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.phone.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const totalPages = Math.ceil(filteredUsers.length / PAGE_SIZE);
    const paginatedUsers = filteredUsers.slice(
        (currentPage - 1) * PAGE_SIZE,
        currentPage * PAGE_SIZE
    );

    const handleSearch = (value: string) => {
        setSearchQuery(value);
        setCurrentPage(1);
    };

    return (
        <div className="bg-background rounded-2xl shadow-sm overflow-hidden border border-background-dark">
            <div className="p-6 border-b border-background-dark flex flex-col sm:flex-row justify-between items-center gap-4 text-basic">
                <div className="relative w-full sm:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
                    <input
                        type="text"
                        placeholder="Search users..."
                        className="w-full pl-10 pr-4 py-2 rounded-xl bg-background-light border border-background-dark text-sm text-basic focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                        value={searchQuery}
                        onChange={(e) => handleSearch(e.target.value)}
                    />
                </div>
                <div className="text-sm text-muted">
                    Showing {paginatedUsers.length} of {filteredUsers.length} users
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead>
                        <tr className="text-muted border-b border-background-dark bg-background-light/50">
                            <th className="py-4 px-6 font-medium">User</th>
                            <th className="py-4 px-6 font-medium">Contact</th>
                            <th className="py-4 px-6 font-medium text-center">Role</th>
                            <th className="py-4 px-6 font-medium text-center">Orders</th>
                            <th className="py-4 px-6 font-medium">Joined</th>
                            <th className="py-4 px-6 font-medium text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-background-dark">
                        {paginatedUsers.length > 0 ? (
                            paginatedUsers.map((user) => (
                                <tr key={user.id} className="hover:bg-background-light/30 transition-colors cursor-pointer" onClick={() => onEdit(user)}>
                                    <td className="py-4 px-6">
                                        <div className="flex items-center gap-3">
                                            <div className="h-10 w-10 rounded-full bg-primary/10 border border-background-dark flex items-center justify-center text-primary">
                                                <User className="h-5 w-5" />
                                            </div>
                                            <div className="font-medium text-basic truncate max-w-[150px]">
                                                {user.name}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6">
                                        <div className="flex flex-col gap-1">
                                            <span className="flex items-center gap-1.5 text-xs text-muted" title={user.email}>
                                                <Mail className="h-3 w-3 shrink-0" />
                                                <span className="truncate max-w-[180px]">{user.email}</span>
                                            </span>
                                            <span className="flex items-center gap-1.5 text-xs text-muted">
                                                <Phone className="h-3 w-3 shrink-0" />
                                                {user.phone}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6 text-center">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold border uppercase tracking-wider ${roleStyles[user.role]}`}>
                                            <Shield className="h-2.5 w-2.5 mr-1" />
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6 text-center text-basic font-medium">
                                        {user._count.orders}
                                    </td>
                                    <td className="py-4 px-6 text-muted">
                                        {new Date(user.createdAt).toLocaleDateString("en-NG", {
                                            day: "numeric",
                                            month: "short",
                                            year: "numeric",
                                        })}
                                    </td>
                                    <td className="py-4 px-6 text-right">
                                        <div className="flex justify-end gap-2">
                                            <button
                                                onClick={(e) => { e.stopPropagation(); onEdit(user); }}
                                                className="p-2 rounded-lg hover:bg-primary/10 text-primary transition-colors"
                                                title="Edit User"
                                            >
                                                <Edit className="h-4 w-4" />
                                            </button>
                                            <button
                                                onClick={(e) => { e.stopPropagation(); onDelete(user.id); }}
                                                className="p-2 rounded-lg hover:bg-red-50 text-red-500 transition-colors"
                                                title="Delete User"
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
                                    No users found matching your search.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <TablePagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={filteredUsers.length}
                pageSize={PAGE_SIZE}
                onPageChange={setCurrentPage}
            />
        </div>
    );
}
