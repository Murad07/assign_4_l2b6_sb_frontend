"use server";

import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://assign-4-l2-b6-skill-bridge-backend.vercel.app/api";

export async function createBooking(data: {
    tutorId: string;
    startTime: string;
    endTime: string;
    sessionDate: string;
    sessionTime: string;
    duration: number;
    subject: string;
    price: number;
}) {
    try {
        const cookieStore = await cookies();
        const tokenCookie = cookieStore.get("better-auth.session_token");
        const token = tokenCookie?.value;

        if (!token) {
            return {
                success: false,
                error: "You must be logged in to book a session.",
            };
        }

        const res = await fetch(`${API_URL}/bookings`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
                Cookie: `${tokenCookie?.name}=${token}`,
            },
            body: JSON.stringify(data),
        });

        const result = await res.json();

        if (!res.ok) {
            return {
                success: false,
                error: result.message || "Failed to create booking",
            };
        }

        return {
            success: true,
            data: result.data,
        };
    } catch (error: any) {
        return {
            success: false,
            error: error.message || "Failed to create booking",
        };
    }
}

export async function updateBookingStatus(bookingId: string, status: "COMPLETED" | "CANCELLED") {
    try {
        const cookieStore = await cookies();
        const tokenCookie = cookieStore.get("better-auth.session_token");
        const token = tokenCookie?.value;

        if (!token) {
            return { success: false, error: "Unauthorized" };
        }

        const res = await fetch(`${API_URL}/bookings/${bookingId}/status`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Origin": "http://assign-4-l2-b6-skill-bridge-backend.vercel.app",
                Authorization: `Bearer ${token}`,
                Cookie: `${tokenCookie?.name}=${token}`,
            },
            body: JSON.stringify({ status }),
        });

        const result = await res.json();

        if (!res.ok) {
            return {
                success: false,
                error: result.message || "Failed to update booking status",
            };
        }

        // Import revalidatePath here inside function scope or top level if added
        const { revalidatePath } = await import("next/cache");
        revalidatePath("/dashboard/bookings");
        revalidatePath("/tutor/sessions");
        return { success: true, data: result };
    } catch (error: any) {
        return {
            success: false,
            error: error.message || "Something went wrong",
        };
    }
}
