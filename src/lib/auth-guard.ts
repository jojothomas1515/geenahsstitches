"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import type { Role } from "@/generated/prisma/enums";

/**
 * Require the caller to be authenticated and hold one of the given roles.
 * Returns the session on success; throws on failure.
 *
 * Usage:
 *   const session = await requireRole("ADMIN", "STAFF");
 */
export async function requireRole(...allowedRoles: Role[]) {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) {
        throw new Error("Unauthorized: not authenticated");
    }

    const userRole = (session.user as { role?: Role }).role;
    if (!userRole || !allowedRoles.includes(userRole)) {
        throw new Error("Forbidden: insufficient permissions");
    }

    return session;
}
