import { Review, ApiResponse } from "@/types";
import { unstable_noStore as noStore } from "next/cache";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://assign-4-l2-b6-skill-bridge-backend.vercel.app/api";

export const ReviewService = {
    getTutorReviews: async (tutorId: string): Promise<ApiResponse<Review[]>> => {
        try {
            noStore();
            const { cookies } = await import("next/headers");
            const cookieStore = await cookies();
            const tokenCookie = cookieStore.get("better-auth.session_token");
            const token = tokenCookie?.value;

            const headers: Record<string, string> = {
                "Content-Type": "application/json",
            };

            if (token) {
                headers["Authorization"] = `Bearer ${token}`;
                headers["Cookie"] = `${tokenCookie?.name}=${token}`;
            }

            const res = await fetch(`${API_URL}/review/tutor/${tutorId}`, {
                headers,
                cache: "no-store",
            });

            if (!res.ok) return { success: false, message: "Failed to fetch reviews", data: [] };
            return res.json();
        } catch (e) {
            return { success: false, message: "Internal Error", data: [] };
        }
    },

    createReview: async (reviewData: any): Promise<ApiResponse<Review>> => {
        try {
            const { cookies } = await import("next/headers");
            const cookieStore = await cookies();
            const tokenCookie = cookieStore.get("better-auth.session_token");
            const token = tokenCookie?.value;

            if (!token) return { success: false, message: "Unauthorized", data: null as any };

            const res = await fetch(`${API_URL}/review`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                    Cookie: `${tokenCookie?.name}=${token}`,
                },
                body: JSON.stringify(reviewData),
            });

            if (!res.ok) return { success: false, message: "Failed to create review", data: null as any };
            return res.json();
        } catch (e) {
            return { success: false, message: "Internal Error", data: null as any };
        }
    }
};
