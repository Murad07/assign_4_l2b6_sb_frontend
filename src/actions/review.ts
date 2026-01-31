"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export async function createReview(data: any) {
    try {
        const cookieStore = await cookies();
        const tokenCookie = cookieStore.get("better-auth.session_token");
        const token = tokenCookie?.value;

        if (!token) {
            return { success: false, error: "Unauthorized" };
        }

        const res = await fetch(`${API_URL}/reviews`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Origin": "http://localhost:5000",
                Authorization: `Bearer ${token}`,
                Cookie: `${tokenCookie?.name}=${token}`,
            },
            body: JSON.stringify(data),
        });

        const result = await res.json();

        if (!res.ok) {
            return {
                success: false,
                error: result.message || "Failed to submit review",
            };
        }

        revalidatePath("/dashboard/bookings");
        revalidatePath(`/tutors/${data.tutorId}`);
        return { success: true, data: result };
    } catch (error: any) {
        return {
            success: false,
            error: error.message || "Something went wrong",
        };
    }
}
