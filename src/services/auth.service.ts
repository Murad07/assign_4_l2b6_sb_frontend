import { cookies } from "next/headers";
import { User } from "@/types";

// Senior Engineer Note: Server-side checks must hit the backend DIRECTLY to avoid proxy loops.
const API_URL = process.env.API_URL || "http://localhost:5000/api";
const CLEAN_API_URL = API_URL.endsWith("/api") ? API_URL : `${API_URL}/api`;
const AUTH_URL = `${CLEAN_API_URL}/auth`;

export const AuthService = {
    getSession: async function () {
        try {
            const cookieStore = await cookies();
            const token = cookieStore.get("better-auth.session_token");

            // console.log("AuthService: All Cookies:", cookieStore.getAll());

            if (!token) {
                return { data: null, error: { message: "Session is missing." } };
            }

            // Send Headers - Include both standard and __Secure- prefix for production
            const headers: Record<string, string> = {
                "Content-Type": "application/json",
                "Cookie": `${token.name}=${token.value}; __Secure-${token.name}=${token.value}`,
                "Authorization": `Bearer ${token.value}`,
                "Origin": process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
                "Referer": process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
            };

            // Helpful for Better Auth cross-domain
            if (process.env.NEXT_PUBLIC_APP_URL) {
                headers["x-better-auth-origin"] = process.env.NEXT_PUBLIC_APP_URL;
            }

            // console.log("AuthService: Sending Headers to Backend:", headers);

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
