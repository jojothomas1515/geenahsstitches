import { LucideIcon } from "lucide-react";
import { Role, OrderStatus } from "@/generated/prisma/enums";

// ── Product ─────────────────────────────────────────────────────────────────

export interface ProductImage {
    id: string;
    name: string;
    url: string;
}

export interface Product {
    id: string;
    name: string;
    price: number;
    discount: number;
    category: string[];
    description: string;
    quantity: number;
    productImages: ProductImage[];
}

export interface ProductFormProps {
    product?: Product;
    onClose: () => void;
    onSuccess: () => void;
}

export interface ProductTableProps {
    products: Product[];
    onEdit: (product: Product) => void;
    onDelete: (id: string) => void;
}

export interface DeleteProductDialogProps {
    productId: string | null;
    productName: string | null;
    onClose: () => void;
    onSuccess: () => void;
}

export type ProductActionState = {
    error?: string;
    success?: boolean;
    errors?: {
        name?: string[];
        price?: string[];
        discount?: string[];
        category?: string[];
        description?: string[];
        quantity?: string[];
    };
};

// ── User ────────────────────────────────────────────────────────────────────

export interface AppUser {
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

export interface UserFormProps {
    user?: AppUser;
    onClose: () => void;
    onSuccess: () => void;
}

export interface UserTableProps {
    users: AppUser[];
    onEdit: (user: AppUser) => void;
    onDelete: (id: string) => void;
}

export interface DeleteUserDialogProps {
    userId: string | null;
    userName: string | null;
    onClose: () => void;
    onSuccess: () => void;
}

export type UserActionState = {
    error?: string;
    success?: boolean;
    errors?: {
        name?: string[];
        email?: string[];
        phone?: string[];
        role?: string[];
        password?: string[];
    };
};

// ── Order ───────────────────────────────────────────────────────────────────

export interface Order {
    id: string;
    orderDate: Date;
    totalAmount: number;
    orderStatus: OrderStatus;
    user: {
        name: string;
        email: string;
    };
    _count: {
        orderItems: number;
    };
}

export interface OrderItem {
    id: string;
    quantity: number;
    price: number;
    discount: number;
    product: {
        name: string;
        image: string;
    };
}

export interface OrderDetails {
    id: string;
    orderDate: Date;
    totalAmount: number;
    orderStatus: OrderStatus;
    user: {
        name: string;
        email: string;
        phone: string;
    };
    orderItems: OrderItem[];
}

export interface OrderTableProps {
    orders: Order[];
    onViewDetails: (id: string) => void;
    onUpdateStatus: (id: string, status: OrderStatus) => void;
}

// ── Dashboard ───────────────────────────────────────────────────────────────

export interface RecentOrder {
    id: string;
    userName: string;
    totalAmount: number;
    orderStatus: string;
    orderDate: Date;
}

export interface DashboardStats {
    totalProducts: number;
    totalUsers: number;
    pendingOrders: number;
    processingOrders: number;
    shippedOrders: number;
    completedOrders: number;
    cancelledOrders: number;
    totalRevenue: number;
    recentOrders: RecentOrder[];
}

export interface StatCardProps {
    title: string;
    value: number | string;
    icon: LucideIcon;
    href?: string;
    linkLabel?: string;
    formatAsCurrency?: boolean;
}
