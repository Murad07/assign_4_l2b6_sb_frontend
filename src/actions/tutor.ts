"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export async function updateTutorProfile(data: any) {
    try {
        const cookieStore = await cookies();
        const tokenCookie = cookieStore.get("better-auth.session_token");
        const token = tokenCookie?.value;

        if (!token) {
            return { success: false, error: "Unauthorized" };
        }

        const res = await fetch(`${API_URL}/tutor/profile`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Origin": process.env.API_URL || "http://localhost:5000",
                Cookie: `${tokenCookie?.name}=${token}`,
            },
            body: JSON.stringify(data),
        });

        const result = await res.json();

        if (!res.ok) {
            return {
                success: false,
                error: result.message || "Failed to update tutor profile",
            };
        }

        revalidatePath("/tutor/profile");
        revalidatePath("/tutors", "page"); // Revalidate listing
        return { success: true, data: result };
    } catch (error: any) {
        return {
            success: false,
            error: error.message || "Something went wrong",
        };
    }
}

export async function createTutorProfile(data: any) {
    try {
        const cookieStore = await cookies();
        const tokenCookie = cookieStore.get("better-auth.session_token");
        const token = tokenCookie?.value;

        if (!token) {
            return { success: false, error: "Unauthorized" };
        }

        const res = await fetch(`${API_URL}/tutor/profile`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Origin": process.env.API_URL || "http://localhost:5000",
                Cookie: `${tokenCookie?.name}=${token}`,
            },
            body: JSON.stringify(data),
        });

        const result = await res.json();

        if (!res.ok) {
            return {
                success: false,
                error: result.message || "Failed to create tutor profile",
            };
        }

        revalidatePath("/tutor/profile");
        return { success: true, data: result };
    } catch (error: any) {
        return {
            success: false,
            error: error.message || "Something went wrong",
        };
    }
}

export async function updateAvailability(availability: any[]) {
    try {
        const cookieStore = await cookies();
        const tokenCookie = cookieStore.get("better-auth.session_token");
        const token = tokenCookie?.value;

        if (!token) {
            return { success: false, error: "Unauthorized" };
        }

        const res = await fetch(`${API_URL}/tutor/availability`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Origin": "http://localhost:5000",
                Cookie: `${tokenCookie?.name}=${token}`,
            },
            body: JSON.stringify({ availability }),
        });

        const result = await res.json();

        if (!res.ok) {
            return {
                success: false,
                error: result.message || "Failed to update availability",
            };
        }

        revalidatePath("/tutor/profile"); // Assuming this is where it's shown
        return { success: true, data: result };
    } catch (error: any) {
        return {
            success: false,
            error: error.message || "Something went wrong",
        };
    }
}

export async function getMyTutorProfile() {
    try {
        const { AuthService } = await import("@/services/auth.service");
        const user = await AuthService.getCurrentUser();
        return user?.tutorProfile || null;
    } catch (error) {
        console.error("getMyTutorProfile error:", error);
        return null;
    }
}
