"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://assign-4-l2-b6-skill-bridge-backend.vercel.app/api";

export async function loginUser(data: any) {
    try {
        console.log("Login request data:", data);
        const res = await fetch(`${API_URL}/auth/sign-in/email`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
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

        // Robustly extract the session token
        const setCookie = res.headers.get("Set-Cookie");
        const parsedToken = setCookie?.match(/better-auth\.session_token=([^;]+)/)?.[1];

        // Better Auth can return token in various fields depending on configuration
        const tokenToUse = parsedToken || result.token || result.session?.sessionToken || result.sessionToken;

        if (tokenToUse) {
            (await cookies()).set("better-auth.session_token", tokenToUse, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                path: "/",
                maxAge: 60 * 60 * 24 * 7, // 1 week
            });
        }

        return { success: true, data: result.user };
    } catch (error: any) {
        return {
            success: false,
            error: error.message || "Login failed"
        };
    }
}

export async function registerUser(data: any) {
    try {
        const res = await fetch(`${API_URL}/auth/sign-up/email`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
            cache: "no-store",
        });

        const result = await res.json();

        if (!res.ok) {
            const errorMessage =
                result.message ||
                result.error?.message ||
                result.errors?.[0]?.message ||
                (typeof result.error === 'string' ? result.error : null) ||
                "Registration failed";

            return { success: false, error: errorMessage };
        }

        // Auto-login after registration
        const setCookie = res.headers.get("Set-Cookie");
        const parsedToken = setCookie?.match(/better-auth\.session_token=([^;]+)/)?.[1];
        const tokenToUse = parsedToken || result.token || result.session?.sessionToken || result.sessionToken;

        if (tokenToUse) {
            (await cookies()).set("better-auth.session_token", tokenToUse, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                path: "/",
                maxAge: 60 * 60 * 24 * 7,
            });
        }

        return {
            success: true,
            data: result,
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
