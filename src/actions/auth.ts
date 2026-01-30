"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export async function loginUser(data: any) {
    try {
        console.log("Login request data:", data);
        const res = await fetch(`${API_URL}/auth/sign-in/email`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Origin": "http://localhost:5000"
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
        if (setCookie) {
            (await cookies()).set("better-auth.session-token", result.token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                path: "/",
            });
        }

        console.log("Login response result:", result);

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
                "Origin": "http://localhost:5000"
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
