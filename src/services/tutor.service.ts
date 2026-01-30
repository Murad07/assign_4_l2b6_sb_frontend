import { Tutor, ApiResponse } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export const TutorService = {
    getAllTutors: async (params?: any): Promise<ApiResponse<Tutor[]>> => {
        // Construct query string from params
        const queryString = params ? new URLSearchParams(params).toString() : "";
        const res = await fetch(`${API_URL}/tutor?${queryString}`, {
            cache: "no-store",
        });
        if (!res.ok) throw new Error("Failed to fetch tutors");
        return res.json();
    },

    getTutorById: async (id: string): Promise<Tutor> => {
        const res = await fetch(`${API_URL}/tutor/${id}`, {
            cache: "no-store",
        });
        if (!res.ok) throw new Error("Failed to fetch tutor");
        return res.json();
    },

    getFeaturedTutors: async (): Promise<ApiResponse<Tutor[]>> => {
        const res = await fetch(`${API_URL}/tutor?sort=rating&limit=3`, {
            next: { revalidate: 3600 },
        });
        if (!res.ok) throw new Error("Failed to fetch featured tutors");
        return res.json();
    },
};
