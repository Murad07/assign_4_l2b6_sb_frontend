import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://assign-4-l2-b6-skill-bridge-backend.vercel.app/api";

export const BookingService = {
    getUserBookings: async () => {
        const cookieStore = await cookies();
        const tokenCookie = cookieStore.get("better-auth.session_token");
        const token = tokenCookie?.value;

        if (!token) {
            throw new Error("Unauthorized");
        }

        const res = await fetch(`${API_URL}/bookings`, { // Verify endpoint. api_response says GET /api/bookings gets user's bookings.
            headers: {
                Authorization: `Bearer ${token}`,
                Cookie: `${tokenCookie?.name}=${token}`,
            },
            cache: "no-store",
        });

        if (!res.ok) {
            throw new Error("Failed to fetch bookings");
        }

        return res.json();
    },

    getAllBookings: async () => {
        const cookieStore = await cookies();
        const tokenCookie = cookieStore.get("better-auth.session_token");
        const token = tokenCookie?.value;

        if (!token) return { success: false, message: "Unauthorized", data: [] };

        try {
            const res = await fetch(`${API_URL}/bookings/admin`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Cookie: `${tokenCookie?.name}=${token}`,
                },
                cache: "no-store",
            });

            if (!res.ok) return { success: false, message: "Failed to fetch all bookings", data: [] };

            const responseData = await res.json();

            // Handle nested data structure
            if (responseData.data && Array.isArray(responseData.data.data)) {
                return {
                    success: responseData.success,
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
