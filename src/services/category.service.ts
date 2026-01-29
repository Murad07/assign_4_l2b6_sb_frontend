const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export const CategoryService = {
    getAllCategories: async () => {
        const res = await fetch(`${API_URL}/categories`, {
            next: { revalidate: 86400 }, // Cache for 24 hours
        });
        if (!res.ok) throw new Error("Failed to fetch categories");
        return res.json();
    },
};
