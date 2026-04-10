"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://assign-4-l2-b6-skill-bridge-backend.vercel.app/api";

export async function loginUser(data: any) {
    try {
        const appOrigin = process.env.NEXT_PUBLIC_APP_URL || "https://assign-4-l2b6-sb-frontend.vercel.app";

        const res = await fetch(`${API_URL}/auth/sign-in/email`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Origin": appOrigin
            },
            body: JSON.stringify(data),
            cache: "no-store",
        });

        const result = await res.json();

        if (!res.ok) {
            return {
                success: false,
                error: result.message || "Login failed"
            };
        }

        // In a real Better Auth + Backend setup, we might need to forward Set-Cookie headers
        const setCookie = res.headers.get("Set-Cookie");
        const parsedToken = setCookie?.match(/better-auth\.session_token=([^;]+)/)?.[1];

        // Better Auth typically returns token in result.token or result.session.token
        const tokenToUse = parsedToken || result.token || result.session?.token;

        if (tokenToUse) {
            const isProd = process.env.NODE_ENV === "production";
            const cookieName = isProd ? "better-auth.session_token" : "better-auth.session_token";

            (await cookies()).set(cookieName, tokenToUse, {
                httpOnly: true,
                secure: isProd,
                sameSite: isProd ? "none" : "lax",
                path: "/",
                maxAge: 60 * 60 * 24 * 7, // 1 week
            });
        }


        return { success: true, data: result.user, token: result.token };
    } catch (error: any) {
        return {
            success: false,
            error: error.message || "Login failed"
        };
    }
}

export async function registerUser(data: any) {
    try {
        const appOrigin = process.env.NEXT_PUBLIC_APP_URL || "https://assign-4-l2b6-sb-frontend.vercel.app";
        const res = await fetch(`${API_URL}/auth/sign-up/email`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Origin": appOrigin
            },
            body: JSON.stringify(data),
            cache: "no-store",
        });

        const result = await res.json();

        console.log("Registration response:", { status: res.status, ok: res.ok, result });

        if (!res.ok) {
            // Extract error message from various possible API response formats
            const errorMessage =
                result.message ||
                result.error?.message ||
                result.errors?.[0]?.message ||
                (typeof result.error === 'string' ? result.error : null) ||
                "Registration failed";

            return {
                success: false,
                error: errorMessage
            };
        }

        // Success response contains { token, user }
        return {
            success: true,
            data: result,
            token: result.token,
            user: result.user
        };
    } catch (error: any) {
        console.error("Registration error:", error);
        return {
            success: false,
            error: error.message || "Network error. Please try again."
        };
    }
}

export async function logoutUser() {
    (await cookies()).delete("better-auth.session_token");
}
