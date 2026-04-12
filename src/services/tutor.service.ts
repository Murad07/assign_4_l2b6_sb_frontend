import { Tutor, ApiResponse } from "@/types";
import { unstable_noStore as noStore } from "next/cache";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://assign-4-l2-b6-skill-bridge-backend.vercel.app/api";

export const TutorService = {
    getAllTutors: async (params?: any): Promise<ApiResponse<Tutor[]>> => {
        try {
            const queryString = params ? new URLSearchParams(params).toString() : "";
            const res = await fetch(`${API_URL}/tutor?${queryString}`, {
                cache: "no-store",
            });
            if (!res.ok) throw new Error("Failed to fetch tutors");

            const result = await res.json();

            // Normalize response for sendResponse format { success: true, data: { data, meta } }
            if (result.success && result.data && result.data.data) {
                return {
                    success: true,
                    data: result.data.data,
                    pagination: {
                        total: result.data.meta?.total || 0,
                        page: result.data.meta?.page || 1,
                        limit: result.data.meta?.limit || 10,
                        totalPages: result.data.meta?.totalPages || 1,
                    }
                };
            }

            return result;
        } catch (error: any) {
            console.error("getAllTutors error:", error);
            return { success: false, data: [], error: error.message };
        }
    },

    getTutorById: async (id: string): Promise<Tutor> => {
        const res = await fetch(`${API_URL}/tutor/${id}`, {
            cache: "no-store",
        });
        if (!res.ok) throw new Error("Failed to fetch tutor");
        const result = await res.json();
        return result.data || result;
    },

    getFeaturedTutors: async (): Promise<ApiResponse<Tutor[]>> => {
        try {
            const res = await fetch(`${API_URL}/tutor?sort=rating&limit=4`, {
                cache: "no-store",
            });
            if (!res.ok) throw new Error("Failed to fetch featured tutors");

            const result = await res.json();

            // Normalize response
            if (result.success && result.data && result.data.data) {
                return {
                    success: true,
                    data: result.data.data,
                };
            }

            return result;
        } catch (error) {
            console.error("getFeaturedTutors error:", error);
            return { success: false, data: [] };
        }
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

            const result = await res.json();

            // Normalize response
            if (result.success && result.data && result.data.data) {
                return {
                    success: true,
                    data: result.data.data,
                    pagination: {
                        total: result.data.meta?.total || 0,
                        page: result.data.meta?.page || 1,
                        limit: result.data.meta?.limit || 10,
                        totalPages: result.data.meta?.totalPages || 1,
                    }
                };
            }

            return result;
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
            const result = await res.json();
            return result;
        } catch (e) {
            console.error("getTutorProfile service error:", e);
            return { success: false, message: "Internal Error", data: null as any };
        }
    }
};
