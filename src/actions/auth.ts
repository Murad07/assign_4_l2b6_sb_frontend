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
        console.log("Set-Cookie header:", res.headers.get("Set-Cookie"));


        if (!res.ok) {
            return {
                success: false,
                error: result.message || "Login failed"
            };
        }

        const setCookieHeader = res.headers.get("set-cookie"); // lowercase try করো
        const parsedToken = setCookieHeader?.match(
            /(?:better-auth\.session_token|__Secure-better-auth\.session_token)=([^;]+)/
        )?.[1];

        const tokenToUse = parsedToken
            ?? result.token
            ?? result.session?.token
            ?? result.data?.token;

        console.log("Token to use:", tokenToUse); // null হলে backend এর response structure ভুল

        if (!tokenToUse) {
            return { success: false, error: "No token received from server" };
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
