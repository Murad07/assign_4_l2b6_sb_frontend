import { Category } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

interface CategoryResponse {
    data: Category[];
    total: number;
}

export const CategoryService = {
    getAllCategories: async (): Promise<CategoryResponse> => {
        const res = await fetch(`${API_URL}/categories`, {
            cache: "no-store", // Admin needs fresh data often, or we revalidate manually
        });
        if (!res.ok) throw new Error("Failed to fetch categories");
        return res.json();
    },

    createCategory: async (data: any) => {
        const { cookies } = await import("next/headers");
        const token = (await cookies()).get("better-auth.session_token")?.value;
        const res = await fetch(`${API_URL}/categories`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        });
        if (!res.ok) {
            const err = await res.json();
            throw new Error(err.message || "Failed to create category");
        }
        return res.json();
    },

    updateCategory: async (id: string, data: any) => {
        const { cookies } = await import("next/headers");
        const token = (await cookies()).get("better-auth.session_token")?.value;
        const res = await fetch(`${API_URL}/categories/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        });
        if (!res.ok) {
            const err = await res.json();
            throw new Error(err.message || "Failed to update category");
        }
        return res.json();
    },

    deleteCategory: async (id: string) => {
        const { cookies } = await import("next/headers");
        const token = (await cookies()).get("better-auth.session_token")?.value;
        const res = await fetch(`${API_URL}/categories/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (!res.ok) {
            const err = await res.json();
            throw new Error(err.message || "Failed to delete category");
        }
        return res.json();
    },
};

