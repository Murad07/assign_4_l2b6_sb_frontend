import { unstable_noStore as noStore } from "next/cache";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://assign-4-l2-b6-skill-bridge-backend.vercel.app/api";

export const BookingService = {
    getUserBookings: async () => {
        try {
            noStore();
            const { cookies } = await import("next/headers");
            const cookieStore = await cookies();
            const tokenCookie = cookieStore.get("better-auth.session_token");
            const token = tokenCookie?.value;

            if (!token) {
                return { data: [] }; // Don't throw, just return empty state
            }

            // Forward ALL cookies
            let cookiesToForward = cookieStore.getAll()
                .map((c) => `${c.name}=${c.value}`);

            // === SENIOR ENGINEER WORKAROUND ===
            // When Frontend is on localhost (HTTP) and Backend is on Vercel (HTTPS),
            // better-auth on the backend expects `__Secure-better-auth.session_token`.
            const sessionToken = cookieStore.get("better-auth.session_token")?.value;
            if (sessionToken && !cookieStore.get("__Secure-better-auth.session_token")) {
                cookiesToForward.push(`__Secure-better-auth.session_token=${sessionToken}`);
            }

            const cookieString = cookiesToForward.join("; ");

            const res = await fetch(`${API_URL}/bookings`, {
                headers: {
                    "Content-Type": "application/json",
                    "Cookie": cookieString,
                },
                cache: "no-store",
            });

            if (!res.ok) {
                console.error("Booking fetch failed status:", res.status);
                return { data: [] };
            }

            const responseData = await res.json();

            // Backend might return { success: true, data: [...] } or { data: { data: [...] } }
            if (responseData.data?.data && Array.isArray(responseData.data.data)) {
                return { data: responseData.data.data };
            }
            if (Array.isArray(responseData.data)) {
                return { data: responseData.data };
            }

            return responseData;
        } catch (error) {
            console.error("Error fetching user bookings:", error);
            return { data: [] };
        }
    },

    getAllBookings: async () => {
        try {
            if (process.env.NEXT_PHASE === 'phase-production-build') return { success: false, data: [] };
            noStore();
            const { cookies } = await import("next/headers");
            const cookieStore = await cookies();
            const tokenCookie = cookieStore.get("better-auth.session_token");
            const token = tokenCookie?.value;

            if (!token) return { success: false, message: "Unauthorized", data: [] };

            // Forward ALL cookies
            let cookiesToForward = cookieStore.getAll()
                .map((c) => `${c.name}=${c.value}`);

            const sessionToken = cookieStore.get("better-auth.session_token")?.value;
            if (sessionToken && !cookieStore.get("__Secure-better-auth.session_token")) {
                cookiesToForward.push(`__Secure-better-auth.session_token=${sessionToken}`);
            }

            const cookieString = cookiesToForward.join("; ");

            const res = await fetch(`${API_URL}/bookings/admin`, {
                headers: {
                    "Content-Type": "application/json",
                    "Cookie": cookieString,
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
