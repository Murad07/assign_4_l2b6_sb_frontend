import { Tutor, ApiResponse } from "@/types";
import { unstable_noStore as noStore } from "next/cache";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://assign-4-l2-b6-skill-bridge-backend.vercel.app/api";

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
        const res = await fetch(`${API_URL}/tutor?sort=rating&limit=4`, {
            cache: "no-store",
        });
        if (!res.ok) throw new Error("Failed to fetch featured tutors");
        return res.json();
    },

    getMySessions: async (): Promise<ApiResponse<any[]>> => {
        if (process.env.NEXT_PHASE === 'phase-production-build') return { success: false, message: "Build Phase", data: [] };
        noStore();
        const { cookies } = await import("next/headers");
        const cookieStore = await cookies();
        const tokenCookie = cookieStore.get("better-auth.session_token");
        const token = tokenCookie?.value;

        if (!token) return { success: false, message: "Unauthorized", data: [] };

        const res = await fetch(`${API_URL}/tutor/sessions/my-sessions`, {
            headers: {
                Authorization: `Bearer ${token}`,
                Cookie: `${tokenCookie?.name}=${token}`,
            },
            cache: "no-store",
        });

        if (!res.ok) return { success: false, message: "Failed to fetch sessions", data: [] };
        return res.json();
    },

    getTutorProfile: async (): Promise<ApiResponse<Tutor>> => {
        if (process.env.NEXT_PHASE === 'phase-production-build') return { success: false, message: "Build Phase", data: null as any };
        noStore();
        const { cookies } = await import("next/headers");
        const cookieStore = await cookies();
        const tokenCookie = cookieStore.get("better-auth.session_token");
        const token = tokenCookie?.value;

        if (!token) return { success: false, message: "Unauthorized", data: null as any };

        const res = await fetch(`${API_URL}/tutor/profile/me`, {
            headers: {
                Authorization: `Bearer ${token}`,
                Cookie: `${tokenCookie?.name}=${token}`,
            },
            cache: "no-store",
        });

        if (!res.ok) return { success: false, message: "Failed to fetch profile", data: null as any };
        return res.json();
    }
};
