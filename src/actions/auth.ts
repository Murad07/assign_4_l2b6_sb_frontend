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

        console.log("Login result:", JSON.stringify(result, null, 2));
        // Professional Cookie Forwarding
        const setCookieHeader = res.headers.get("Set-Cookie");
        if (setCookieHeader) {
            const { cookies: getCookies } = await import("next/headers");
            const cookieStore = await getCookies();
            const isProd = process.env.NODE_ENV === "production";

            // Split and iterate over each cookie sent by the backend
            const cookiesToSet = setCookieHeader.split(/,(?=[^;]+=[^;]+)/);

            cookiesToSet.forEach(cookieStr => {
                const parts = cookieStr.split(";")[0].split("=");
                const name = parts[0].trim();
                const value = parts.slice(1).join("=").trim();

                if (name && value) {
                    cookieStore.set(name, value, {
                        httpOnly: true,
                        secure: isProd,
                        sameSite: isProd ? "none" : "lax" as const,
                        path: "/",
                        maxAge: 60 * 60 * 24 * 7,
                    });
                }
            });
        }

        if (!res.ok) {
            return {
                success: false,
                error: result.message || "Login failed"
            };
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
