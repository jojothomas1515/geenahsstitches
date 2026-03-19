import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "@/lib/prisma";

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    databaseHooks: {
        user: {
            create: {
                after: async (user) => {
                    await prisma.cart.create({
                        data: {
                            userId: user.id,
                        }
                    })
                }
            }
        }
    },
    emailAndPassword: {
        enabled: true,
    },
    user: {
        additionalFields: {
            role: {
                type: ["ADMIN", "USER", "STAFF"],
                required: true,
                defaultValue: "USER",
                input: false,
            },
            phone: {
                type: "string",
                required: true,
                input: true,
            },
        }
    },

    session: {
        storeSessionInDatabase: true,
        expiresIn: 60 * 60 * 24 * 7,
    },
    plugins: [
        nextCookies(),
    ]

});

