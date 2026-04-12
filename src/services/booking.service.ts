import { ApiResponse } from "@/types";
import { unstable_noStore as noStore } from "next/cache";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://assign-4-l2-b6-skill-bridge-backend.vercel.app/api";

export const BookingService = {
    getUserBookings: async (): Promise<ApiResponse<any[]>> => {
        try {
            noStore();
            const { cookies } = await import("next/headers");
            const cookieStore = await cookies();
            const tokenCookie =
                cookieStore.get("better-auth.session_token") ||
                cookieStore.get("__Secure-better-auth.session_token");

            const token = tokenCookie?.value;

            if (!token) return { success: false, data: [] };

            const decodedToken = decodeURIComponent(token);

            const res = await fetch(`${API_URL}/bookings`, {
                headers: {
                    "Authorization": `Bearer ${decodedToken}`,
                    "Cookie": `better-auth.session_token=${decodedToken}; __Secure-better-auth.session_token=${decodedToken}`,
                },
                cache: "no-store",
            });

            if (!res.ok) return { success: false, data: [] };

            const responseData = await res.json();

            // Normalize response
            if (responseData.success && responseData.data && responseData.data.data) {
                return {
                    success: true,
                    data: responseData.data.data,
                    pagination: responseData.data.meta,
                };
            }

            return responseData;
        } catch (error) {
            console.error("Error fetching user bookings:", error);
            return { success: false, data: [] };
        }
    },

    getAllBookings: async (): Promise<ApiResponse<any[]>> => {
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

            const res = await fetch(`${API_URL}/bookings/admin`, {
                headers: {
                    "Authorization": `Bearer ${decodedToken}`,
                    "Cookie": `better-auth.session_token=${decodedToken}; __Secure-better-auth.session_token=${decodedToken}`,
                },
                cache: "no-store",
            });

            if (!res.ok) return { success: false, message: "Failed to fetch all bookings", data: [] };

            const responseData = await res.json();

            // Normalize response
            if (responseData.success && responseData.data && responseData.data.data) {
                return {
                    success: true,
                    message: responseData.message,
                    data: responseData.data.data,
                    pagination: responseData.data.meta,
                };
            }

            return responseData;

        } catch (error) {
            console.error("Error fetching admin bookings:", error);
            return { success: false, message: "Failed to fetch all bookings", data: [] };
        }
    },
};
