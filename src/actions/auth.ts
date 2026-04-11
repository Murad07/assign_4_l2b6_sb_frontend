"use server";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://assign-4-l2-b6-skill-bridge-backend.vercel.app/api";

export async function loginUser(data: any) {
    try {
        const { headers } = await import("next/headers");
        const headerList = await headers();
        const host = headerList.get("x-forwarded-host") || headerList.get("host");
        const protocol = host?.includes("localhost") ? "http" : "https";
        const appOrigin = `${protocol}://${host}`;

        const res = await fetch(`${API_URL}/auth/sign-in/email`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Origin": appOrigin,
            },
            body: JSON.stringify(data),
            cache: "no-store",
        });

        const result = await res.json();

        // --- GUARD: return error BEFORE touching cookies if login failed ---
        if (!res.ok) {
            return {
                success: false,
                error: result.message || result.error || "Login failed",
            };
        }

        // --- CORRECT multi-cookie forwarding using getSetCookie() ---
        // res.headers.get("Set-Cookie") only returns the FIRST cookie.
        // getSetCookie() returns ALL Set-Cookie values as an array (Node 18+).
        const { cookies: getCookies } = await import("next/headers");
        const cookieStore = await getCookies();
        const isProd = process.env.NODE_ENV === "production";

        // @ts-ignore — getSetCookie() exists in undici/Node 18+ fetch
        const rawSetCookies: string[] = typeof res.headers.getSetCookie === "function"
            ? res.headers.getSetCookie()
            : [res.headers.get("Set-Cookie") || ""].filter(Boolean);

        // Build a map: cookieName → value (last write wins).
        // KEY INSIGHT: better-auth sends TWO session cookies:
        //   - better-auth.session_token = raw token ID (not enough for validation)
        //   - __Secure-better-auth.session_token = SIGNED token (required for validation)
        // The __Secure- cookie requires HTTPS, so browsers drop it on HTTP localhost.
        // Fix: extract the SIGNED value and store it under the base name too, so our
        // server-side Cookie forwarding always sends what get-session can validate.
        const cookieMap = new Map<string, string>();

        for (const cookieStr of rawSetCookies) {
            const nameValuePart = cookieStr.split(";")[0].trim();
            const eqIdx = nameValuePart.indexOf("=");
            if (eqIdx === -1) continue;

            const rawName = nameValuePart.slice(0, eqIdx).trim();
            const value = nameValuePart.slice(eqIdx + 1).trim();
            if (!rawName || !value) continue;

            cookieMap.set(rawName, value);

            // If this is the __Secure- signed token, also store it under the base name.
            // This ensures the signed value is forwarded on HTTP (dev) too.
            if (rawName.startsWith("__Secure-")) {
                const baseName = rawName.replace("__Secure-", "");
                cookieMap.set(baseName, value); // overwrites the raw ID with the signed value
            }
        }

        for (const [name, value] of cookieMap.entries()) {
            // Skip __Secure- cookies on HTTP — browser would reject them anyway.
            // We've already captured the value under the base name.
            if (!isProd && name.startsWith("__Secure-")) continue;

            cookieStore.set(name, value, {
                httpOnly: true,
                secure: isProd,
                sameSite: isProd ? "none" : "lax",
                path: "/",
                maxAge: 60 * 60 * 24 * 7, // 7 days
            });
        }

        return { success: true, data: result.user, token: result.token };
    } catch (error: any) {
        return {
            success: false,
            error: error.message || "Login failed",
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
        const cookieStore = await cookies();

        // 1. Tell better-auth on the backend to invalidate the session
        const { headers: getHeaders } = await import("next/headers");
        const headerList = await getHeaders();
        const host = headerList.get("x-forwarded-host") || headerList.get("host");
        const protocol = host?.includes("localhost") ? "http" : "https";
        const appOrigin = `${protocol}://${host}`;

        // Direct fetch to backend sign-out to be thorough
        try {
            await fetch(`${API_URL}/auth/sign-out`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Origin": appOrigin,
                },
                cache: "no-store",
            });
        } catch (err) {
            // Ignore fetch errors during logout
        }

        // 2. Delete ALL possible auth-related cookies
        // We include __Secure- versions because Vercel/HTTPS uses them.
        const authCookies = [
            "better-auth.session_token",
            "__Secure-better-auth.session_token",
            "accessToken",
            "refreshToken",
            "__Secure-accessToken",
            "__Secure-refreshToken",
        ];

        for (const name of authCookies) {
            cookieStore.delete(name);
        }
    } catch (e) {
        // Silently fail during build if analyzed
    }
}
