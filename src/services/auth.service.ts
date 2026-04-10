import { cookies } from "next/headers";
import { User } from "@/types";

const API_URL = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || "https://assign-4-l2-b6-skill-bridge-backend.vercel.app/api";
const AUTH_URL = `${API_URL}/auth`;

export const AuthService = {
    getSession: async function () {
        try {
            const cookieStore = await cookies();
            const token = cookieStore.get("better-auth.session_token");

            if (!token) {
                return { data: null, error: { message: "Session is missing." } };
            }

            const headers: Record<string, string> = {
                Cookie: `${token.name}=${token.value}`,
                Authorization: `Bearer ${token.value}`,
                Origin: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
            };

            const res = await fetch(`${AUTH_URL}/me`, {
                headers,
                cache: "no-store",
            });

            if (!res.ok) {
                return { data: null, error: { message: "Failed to fetch session" } };
            }

            const session = await res.json();

            if (!session) {
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
        // Handle various response shapes: { data: user }, { user }, or direct user object
        return data?.user || data?.data || data || null;
    }
};
