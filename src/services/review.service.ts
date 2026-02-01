import { cookies } from "next/headers";
import { ApiResponse, Review } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://assign-4-l2-b6-skill-bridge-backend.vercel.app/api";

export const ReviewService = {
    getTutorReviews: async (tutorId: string): Promise<ApiResponse<Review[]>> => {
        const cookieStore = await cookies();
        const tokenCookie = cookieStore.get("better-auth.session_token");
        const token = tokenCookie?.value;

        const res = await fetch(`${API_URL}/reviews/${tutorId}`, {
            headers: {
                "Content-Type": "application/json",
                "Origin": "http://assign-4-l2-b6-skill-bridge-backend.vercel.app",
                Cookie: `${tokenCookie?.name}=${token}`,
            },
            cache: "no-store",
        });

        // console.log('Review response:', res);
        if (!res.ok) {
            return { data: [], success: false, message: "Failed to fetch" };
        }
        return res.json();
    },


};
