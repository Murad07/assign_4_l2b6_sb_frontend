"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://assign-4-l2-b6-skill-bridge-backend.vercel.app/api";

export async function updateStudentProfile(data: any) {
    try {
        const cookieStore = await cookies();
        const tokenCookie = cookieStore.get("better-auth.session_token");
        const token = tokenCookie?.value;

        if (!token) {
            return { success: false, error: "Unauthorized" };
        }

        const res = await fetch(`${API_URL}/users/profile`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Origin": process.env.API_URL || "http://assign-4-l2-b6-skill-bridge-backend.vercel.app",
                Authorization: `Bearer ${token}`,
                Cookie: `${tokenCookie?.name}=${token}`,
            },
            body: JSON.stringify(data),
        });

        const result = await res.json();

        if (!res.ok) {
            return {
                success: false,
                error: result.message || "Failed to update profile",
            };
        }

        revalidatePath("/dashboard/profile");
        // Also revalidate layout or where the user name is shown
        revalidatePath("/", "layout");
        return { success: true, data: result };
    } catch (error: any) {
        return {
            success: false,
            error: error.message || "Something went wrong",
        };
    }
}
