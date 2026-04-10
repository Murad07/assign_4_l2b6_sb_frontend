"use server";

import { redirect } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://assign-4-l2-b6-skill-bridge-backend.vercel.app/api";

export async function loginUser(data: any) {
    try {
        const { headers } = await import("next/headers");
        const headerList = await headers();
        const host = headerList.get("host");
        const protocol = host?.includes("localhost") ? "http" : "https";
        const appOrigin = `${protocol}://${host}`;

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

        const setCookie = res.headers.get("Set-Cookie");
        const parsedToken = setCookie?.match(/better-auth\.session_token=([^;]+)/)?.[1];
        const tokenToUse = parsedToken || result.token || result.session?.token;

        if (tokenToUse) {
            const isProd = process.env.NODE_ENV === "production";
            const { cookies: getCookies } = await import("next/headers");
            const cookieStore = await getCookies();

            const cookieOptions = {
                httpOnly: true,
                secure: isProd,
                sameSite: (isProd ? "none" : "lax") as "none" | "lax",
                path: "/",
                maxAge: 60 * 60 * 24 * 7, // 1 week
            };

            // Set both the standard and the Secure-prefixed version for production
            cookieStore.set("better-auth.session_token", tokenToUse, cookieOptions);

            if (isProd) {
                cookieStore.set("__Secure-better-auth.session_token", tokenToUse, cookieOptions);
            }
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
        const { headers } = await import("next/headers");
        const headerList = await headers();
        const host = headerList.get("host");
        const protocol = host?.includes("localhost") ? "http" : "https";
        const appOrigin = `${protocol}://${host}`;

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

        if (!res.ok) {
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

        return {
            success: true,
            data: result,
            token: result.token,
            user: result.user
        };
    } catch (error: any) {
        return {
            success: false,
            error: error.message || "Network error. Please try again."
        };
    }
}

export async function logoutUser() {
    try {
        const { cookies } = await import("next/headers");
        (await cookies()).delete("better-auth.session_token");
    } catch (e) {
        // Silently fail during build if analyzed
    }
}
