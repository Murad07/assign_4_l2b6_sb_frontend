import { Review, ApiResponse } from "@/types";
import { unstable_noStore as noStore } from "next/cache";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://assign-4-l2-b6-skill-bridge-backend.vercel.app/api";

export const ReviewService = {
    getTutorReviews: async (tutorId: string): Promise<ApiResponse<Review[]>> => {
        try {
            noStore();
            const { cookies } = await import("next/headers");
            const cookieStore = await cookies();
            const tokenCookie =
                cookieStore.get("better-auth.session_token") ||
                cookieStore.get("__Secure-better-auth.session_token");

            const token = tokenCookie?.value;

            const headers: Record<string, string> = {
                "Content-Type": "application/json",
            };

            if (token) {
                const decodedToken = decodeURIComponent(token);
                headers["Authorization"] = `Bearer ${decodedToken}`;
                headers["Cookie"] = `better-auth.session_token=${decodedToken}; __Secure-better-auth.session_token=${decodedToken}`;
            }

            const res = await fetch(`${API_URL}/reviews/${tutorId}`, {
                headers,
                cache: "no-store",
            });

            if (!res.ok) {
                const errorBody = await res.text();
                console.error("fetch /reviews failed status:", res.status, "Body:", errorBody);
                return { success: false, message: `Failed to fetch reviews (${res.status})`, data: [] };
            }

            const result = await res.json();

            // Normalize response
            if (result.success && result.data && result.data.data) {
                return {
                    success: true,
                    data: result.data.data,
                    pagination: result.data.meta,
                };
            }

            return result;
        } catch (e) {
            console.error("getTutorReviews error:", e);
            return { success: false, message: "Internal Error", data: [] };
        }
    },

    createReview: async (reviewData: any): Promise<ApiResponse<Review>> => {
        try {
            const { cookies } = await import("next/headers");
            const cookieStore = await cookies();
            const tokenCookie =
                cookieStore.get("better-auth.session_token") ||
                cookieStore.get("__Secure-better-auth.session_token");

            const token = tokenCookie?.value;

            if (!token) return { success: false, message: "Unauthorized", data: null as any };

            const decodedToken = decodeURIComponent(token);

            const res = await fetch(`${API_URL}/reviews`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${decodedToken}`,
                    "Cookie": `better-auth.session_token=${decodedToken}; __Secure-better-auth.session_token=${decodedToken}`,
                },
                body: JSON.stringify(reviewData),
            });

            if (!res.ok) {
                const errorBody = await res.text();
                console.error("createReview failed status:", res.status, "Body:", errorBody);
                return { success: false, message: `Failed to create review (${res.status})`, data: null as any };
            }
            return res.json();
        } catch (e) {
            console.error("createReview error:", e);
            return { success: false, message: "Internal Error", data: null as any };
        }
    }
};
