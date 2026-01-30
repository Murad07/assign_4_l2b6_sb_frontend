import { cookies } from "next/headers";
import { User } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
const AUTH_URL = `${API_URL}/auth`;

export const AuthService = {
    getSession: async function () {
        try {
            const cookieStore = await cookies();
            const token = cookieStore.get("better-auth.session_token");

            // console.log("AuthService: All Cookies:", cookieStore.getAll());

            if (!token) {
                console.log("AuthService: Token cookie missing");
                return { data: null, error: { message: "Session is missing." } };
            }

            // Send Header
            const headers: Record<string, string> = {
                Cookie: `${token.name}=${token.value}`,
                Authorization: `Bearer ${token.value}`,
                Origin: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
            };

            // console.log("AuthService: Sending Headers to Backend:", headers);

            const res = await fetch(`${AUTH_URL}/me`, {
                headers,
                cache: "no-store",
            });

            // console.log("AuthService: Backend Response Status:", res.status);

            if (!res.ok) {
                // console.error("Fetch session failed:", res.status, res.statusText);
                return { data: null, error: { message: "Failed to fetch session" } };
            }

            const session = await res.json();
            // console.log("Session JSON Data:", session);

            if (session === null) {
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
        console.log("Current User:", data);
        return data?.data || null;
    }
};
