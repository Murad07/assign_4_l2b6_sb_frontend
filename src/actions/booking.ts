"use server";

import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export async function createBooking(data: {
    tutorId: string;
    startTime: string;
    endTime: string;
}) {
    try {
        const token = (await cookies()).get("better-auth.session_token")?.value;

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
