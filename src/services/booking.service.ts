import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export const BookingService = {
    getUserBookings: async () => {
        const token = (await cookies()).get("better-auth.session_token")?.value;

        if (!token) {
            throw new Error("Unauthorized");
        }

        const res = await fetch(`${API_URL}/bookings`, { // Verify endpoint. api_response says GET /api/bookings gets user's bookings.
            headers: {
                Authorization: `Bearer ${token}`,
            },
            cache: "no-store",
        });

        if (!res.ok) {
            throw new Error("Failed to fetch bookings");
        }

        return res.json();
    },
};
