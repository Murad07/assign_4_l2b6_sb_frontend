"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://assign-4-l2-b6-skill-bridge-backend.vercel.app/api";

export async function updateTutorProfile(data: any) {
    try {
        const cookieStore = await cookies();
        const tokenCookie =
            cookieStore.get("better-auth.session_token") ||
            cookieStore.get("__Secure-better-auth.session_token");

        const token = tokenCookie?.value;
        if (!token) return { success: false, error: "Unauthorized" };

        const decodedToken = decodeURIComponent(token);

        const res = await fetch(`${API_URL}/tutor/profile`, {
            method: "PATCH",
            headers: {
                "Authorization": `Bearer ${decodedToken}`,
                "Cookie": `better-auth.session_token=${decodedToken}; __Secure-better-auth.session_token=${decodedToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        const result = await res.json();
        if (!res.ok) {
            return {
                success: false,
                error: result.message || result.error || "Failed to update profile",
            };
        }

        revalidatePath("/tutor/profile");
        revalidatePath("/", "layout");
        return { success: true, data: result.data || result };
    } catch (error: any) {
        console.error("Update Tutor Profile Error:", error);
        return { success: false, error: error.message || "An unexpected error occurred" };
    }
}

export async function createTutorProfile(data: any) {
    try {
        const cookieStore = await cookies();
        const tokenCookie =
            cookieStore.get("better-auth.session_token") ||
            cookieStore.get("__Secure-better-auth.session_token");

        const token = tokenCookie?.value;
        if (!token) return { success: false, error: "Unauthorized" };

        const decodedToken = decodeURIComponent(token);

        const res = await fetch(`${API_URL}/tutor/profile`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${decodedToken}`,
                "Cookie": `better-auth.session_token=${decodedToken}; __Secure-better-auth.session_token=${decodedToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        const result = await res.json();
        if (!res.ok) {
            return {
                success: false,
                error: result.message || result.error || "Failed to create profile",
            };
        }

        revalidatePath("/tutor/profile");
        revalidatePath("/", "layout");
        return { success: true, data: result.data || result };
    } catch (error: any) {
        console.error("Create Tutor Profile Error:", error);
        return { success: false, error: error.message || "An unexpected error occurred" };
    }
}

export async function updateAvailability(availability: any[]) {
    try {
        const cookieStore = await cookies();
        const tokenCookie =
            cookieStore.get("better-auth.session_token") ||
            cookieStore.get("__Secure-better-auth.session_token");

        const token = tokenCookie?.value;
        if (!token) return { success: false, error: "Unauthorized" };

        const decodedToken = decodeURIComponent(token);

        const res = await fetch(`${API_URL}/tutor/availability`, {
            method: "PATCH",
            headers: {
                "Authorization": `Bearer ${decodedToken}`,
                "Cookie": `better-auth.session_token=${decodedToken}; __Secure-better-auth.session_token=${decodedToken}`,
                "Content-Type": "application/json",
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

        revalidatePath("/tutor/profile");
        return { success: true, data: result.data || result };
    } catch (error: any) {
        console.error("Update Availability Error:", error);
        return { success: false, error: error.message || "An unexpected error occurred" };
    }
}

export async function getMyTutorProfile() {
    try {
        const cookieStore = await cookies();
        const tokenCookie =
            cookieStore.get("better-auth.session_token") ||
            cookieStore.get("__Secure-better-auth.session_token");

        const token = tokenCookie?.value;
        if (!token) return null;

        const decodedToken = decodeURIComponent(token);

        const res = await fetch(`${API_URL}/tutor/profile/me`, {
            headers: {
                "Authorization": `Bearer ${decodedToken}`,
                "Cookie": `better-auth.session_token=${decodedToken}; __Secure-better-auth.session_token=${decodedToken}`,
                "Content-Type": "application/json",
            },
            cache: "no-store"
        });

        if (!res.ok) return null;

        const result = await res.json();
        // Backend returns sendResponse format { success: true, data: profile }
        return result.data || null;
    } catch (error) {
        console.error("getMyTutorProfile error:", error);
        return null;
    }
}
