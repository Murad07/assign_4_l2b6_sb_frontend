import { User } from "@/types";
import { unstable_noStore as noStore } from "next/cache";

// Senior Engineer Note: Server-side checks must hit the backend DIRECTLY to avoid proxy loops.
const API_URL = process.env.API_URL || "http://localhost:5000/api";
const CLEAN_API_URL = API_URL.endsWith("/api") ? API_URL : `${API_URL}/api`;
const AUTH_URL = `${CLEAN_API_URL}/auth`;

export const AuthService = {
    getSession: async function () {
        // Professional Safe Check: If we are in the build phase or cookies() fails, return null.
        try {
            noStore();
            const { cookies } = await import("next/headers");
            const cookieStore = await cookies();
            const token = cookieStore.get("better-auth.session_token") ||
                cookieStore.get("__Secure-better-auth.session_token");

            // Identify current host to set the correct Origin
            const { headers: nextHeaders } = await import("next/headers");
            const headerList = await nextHeaders();
            const host = headerList.get("host");
            const protocol = host?.includes("localhost") ? "http" : "https";
            const currentOrigin = `${protocol}://${host}`;

            if (!token) {
                return { data: null, error: { message: "Session is missing." } };
            }

            // Send Headers
            const headers: Record<string, string> = {
                "Content-Type": "application/json",
                "Cookie": `better-auth.session_token=${token.value}; __Secure-better-auth.session_token=${token.value}`,
                "Authorization": `Bearer ${token.value}`,
                "Origin": currentOrigin,
                "Referer": currentOrigin,
            };

            // Helpful for Better Auth cross-domain
            headers["x-better-auth-origin"] = currentOrigin;

            const res = await fetch(`${AUTH_URL}/me`, {
                headers,
                cache: "no-store",
            });

            if (!res.ok) {
                // console.error("Fetch session failed:", res.status, res.statusText);
                return { data: null, error: { message: "Failed to fetch session" } };
            }

            const session = await res.json();

            if (session === null || (session.success === false)) {
                return { data: null, error: { message: "Session is missing." } };
            }

            return { data: session, error: null };
        } catch (err) {
            console.error("Get Session Error:", err);
            return { data: null, error: { message: "Something Went Wrong" } };
        }
    },

    getCurrentUser: async function (): Promise<User | null> {
        const { data } = await this.getSession();
        return data?.data || null;
    }
};
