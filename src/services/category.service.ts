import { Category } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

interface CategoryResponse {
    data: Category[];
    total: number;
}

export const CategoryService = {
    getAllCategories: async (): Promise<CategoryResponse> => {
        const res = await fetch(`${API_URL}/categories`, {
            next: { revalidate: 86400 }, // Cache for 24 hours
        });
        if (!res.ok) throw new Error("Failed to fetch categories");
        return res.json();
    },
};
