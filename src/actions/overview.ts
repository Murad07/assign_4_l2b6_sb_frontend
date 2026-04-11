"use server";

import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://assign-4-l2-b6-skill-bridge-backend.vercel.app/api";

export async function getOverviewData() {
    try {
        const cookieStore = await cookies();

        const tokenCookie =
            cookieStore.get("better-auth.session_token") ||
            cookieStore.get("__Secure-better-auth.session_token");

        const token = tokenCookie?.value;

        if (!token) {
            console.error("No session token found in cookies");
            return null;
        }

        // ✅ Always decode before sending — stored value may be URL-encoded
        const decodedToken = decodeURIComponent(token);

        const res = await fetch(`${API_URL}/users/overview`, {
            headers: {
                "Authorization": `Bearer ${decodedToken}`,
                "Cookie": `better-auth.session_token=${decodedToken}; __Secure-better-auth.session_token=${decodedToken}`,
                "Content-Type": "application/json",
            },
            next: { revalidate: 60 },
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
