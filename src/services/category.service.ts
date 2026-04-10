import { Category } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://assign-4-l2-b6-skill-bridge-backend.vercel.app/api";

interface CategoryResponse {
    data: Category[];
    total: number;
}

export const CategoryService = {
    getAllCategories: async (): Promise<CategoryResponse> => {
        const res = await fetch(`${API_URL}/categories`, {
            cache: "no-store",
        });
        if (!res.ok) throw new Error("Failed to fetch categories");
        return res.json();
    },

    createCategory: async (data: any) => {
        try {
            const { cookies } = await import("next/headers");
            const cookieStore = await cookies();
            const tokenCookie = cookieStore.get("better-auth.session_token");
            const token = tokenCookie?.value;

            const res = await fetch(`${API_URL}/categories`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Cookie: `${tokenCookie?.name}=${token}`,
                },
                body: JSON.stringify(data),
            });
            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.message || "Failed to create category");
            }
            return res.json();
        } catch (e: any) {
            throw new Error(e.message || "Internal Error");
        }
    },

    updateCategory: async (id: string, data: any) => {
        try {
            const { cookies } = await import("next/headers");
            const cookieStore = await cookies();
            const tokenCookie = cookieStore.get("better-auth.session_token");
            const token = tokenCookie?.value;

            const res = await fetch(`${API_URL}/categories/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Cookie: `${tokenCookie?.name}=${token}`,
                },
                body: JSON.stringify(data),
            });
            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.message || "Failed to update category");
            }
            return res.json();
        } catch (e: any) {
            throw new Error(e.message || "Internal Error");
        }
    },

    deleteCategory: async (id: string) => {
        try {
            const { cookies } = await import("next/headers");
            const cookieStore = await cookies();
            const tokenCookie = cookieStore.get("better-auth.session_token");
            const token = tokenCookie?.value;

            const res = await fetch(`${API_URL}/categories/${id}`, {
                method: "DELETE",
                headers: {
                    Cookie: `${tokenCookie?.name}=${token}`,
                },
            });
            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.message || "Failed to delete category");
            }
            return res.json();
        } catch (e: any) {
            throw new Error(e.message || "Internal Error");
        }
    },
};
