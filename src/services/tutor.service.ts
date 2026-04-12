import { Tutor, ApiResponse } from "@/types";
import { unstable_noStore as noStore } from "next/cache";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://assign-4-l2-b6-skill-bridge-backend.vercel.app/api";

export const TutorService = {
    getAllTutors: async (params?: any): Promise<ApiResponse<Tutor[]>> => {
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

    getMySessions: async (): Promise<ApiResponse<any>> => {
        try {
            noStore();
            const { cookies } = await import("next/headers");
            const cookieStore = await cookies();
            const tokenCookie =
                cookieStore.get("better-auth.session_token") ||
                cookieStore.get("__Secure-better-auth.session_token");

            const token = tokenCookie?.value;

            if (!token) return { success: false, message: "Unauthorized", data: [] };

            const decodedToken = decodeURIComponent(token);

            const res = await fetch(`${API_URL}/tutor/sessions/my-sessions`, {
                headers: {
                    "Authorization": `Bearer ${decodedToken}`,
                    "Cookie": `better-auth.session_token=${decodedToken}; __Secure-better-auth.session_token=${decodedToken}`,
                },
                cache: "no-store",
            });

            if (!res.ok) return { success: false, message: "Failed to fetch sessions", data: [] };
            return res.json();
        } catch (e) {
            console.error("getMySessions service error:", e);
            return { success: false, message: "Internal Error", data: [] };
        }
    },

    getTutorProfile: async (): Promise<ApiResponse<Tutor>> => {
        try {
            noStore();
            const { cookies } = await import("next/headers");
            const cookieStore = await cookies();
            const tokenCookie =
                cookieStore.get("better-auth.session_token") ||
                cookieStore.get("__Secure-better-auth.session_token");

            const token = tokenCookie?.value;

            if (!token) return { success: false, message: "Unauthorized", data: null as any };

            const decodedToken = decodeURIComponent(token);

            const res = await fetch(`${API_URL}/tutor/profile/me`, {
                headers: {
                    "Authorization": `Bearer ${decodedToken}`,
                    "Cookie": `better-auth.session_token=${decodedToken}; __Secure-better-auth.session_token=${decodedToken}`,
                },
                cache: "no-store",
            });

            if (!res.ok) return { success: false, message: "Failed to fetch profile", data: null as any };
            return res.json();
        } catch (e) {
            console.error("getTutorProfile service error:", e);
            return { success: false, message: "Internal Error", data: null as any };
        }
    }
};
