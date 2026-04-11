"use server";

import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://assign-4-l2-b6-skill-bridge-backend.vercel.app/api";

export async function getOverviewData() {
    try {
        const cookieStore = await cookies();
        let tokenCookie = cookieStore.get("better-auth.session_token");
        if (!tokenCookie) {
            tokenCookie = cookieStore.get("__Secure-better-auth.session_token");
        }
        const token = tokenCookie?.value;

        const res = await fetch(`${API_URL}/users/overview`, {
            headers: {
                Authorization: `Bearer ${token}`,
                Cookie: `${tokenCookie?.name}=${token}`,
            },
            next: { revalidate: 60 } // Cache for 1 minute
        });

        const result = await res.json();

        if (!res.ok) {
            throw new Error(result.message || "Failed to fetch overview data");
        }

        return result.data;
    } catch (error: any) {
        console.error("Overview Action Error:", error);
        return null;
    }
}
