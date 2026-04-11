import { User } from "@/types";
import { unstable_noStore as noStore } from "next/cache";

// --- WHY WE USE THE PROXY ---
// On the server we must call an absolute URL. We use the internal Next.js
// rewrite proxy (/api/* → backend) rather than hitting the backend directly.
// This guarantees the `Origin` header is the frontend's own origin which
// better-auth has in its `trustedOrigins` list on the backend, making the
// session cookie valid. Going directly to the Vercel backend URL with the
// frontend origin set manually can hit CORS / SameSite restrictions.
//
// next.config.ts rewrites  /api/:path*  →  ${BACKEND_URL}/api/:path*
// So /api/auth/get-session  →  https://.../api/auth/get-session  ✓

const BACKEND_API_URL = process.env.NEXT_PUBLIC_API_URL || "https://assign-4-l2-b6-skill-bridge-backend.vercel.app/api";
const BACKEND_AUTH_URL = `${BACKEND_API_URL}/auth`;

function getBaseUrl() {
    // Priority:
    // 1. NEXT_PUBLIC_APP_URL — explicitly set in .env or Vercel dashboard
    // 2. VERCEL_URL — automatically injected by Vercel (no protocol prefix)
    // 3. localhost fallback for local dev
    if (process.env.NEXT_PUBLIC_APP_URL) {
        return process.env.NEXT_PUBLIC_APP_URL;
    }
    if (process.env.VERCEL_URL) {
        return `https://${process.env.VERCEL_URL}`;
    }
    return "http://localhost:3000";
}

export const AuthService = {
    /**
     * Validates the session by calling better-auth's canonical `get-session`
     * endpoint via the local Next.js rewrite proxy.
     * Returns better-auth's { user, session } object on success.
     */
    getSession: async function () {
        try {
            noStore();
            const { cookies } = await import("next/headers");
            const cookieStore = await cookies();

            // Forward ALL cookies
            let cookiesToForward = cookieStore.getAll()
                .map((c) => `${c.name}=${c.value}`);

            // === SENIOR ENGINEER WORKAROUND ===
            // When Frontend is on localhost (HTTP) and Backend is on Vercel (HTTPS),
            // better-auth on the backend expects `__Secure-better-auth.session_token`.
            // But browsers reject `__Secure-` cookies on HTTP.
            // In `loginUser`, we stored the signed token from the `__Secure-` cookie
            // under the plain name `better-auth.session_token`.
            // Now we must "rename" it back to `__Secure-` for the backend to recognize it.
            const sessionToken = cookieStore.get("better-auth.session_token")?.value;
            if (sessionToken && !cookieStore.get("__Secure-better-auth.session_token")) {
                cookiesToForward.push(`__Secure-better-auth.session_token=${sessionToken}`);
            }

            const cookieString = cookiesToForward.join("; ");

            if (!cookieString) {
                return { data: null, error: { message: "No cookies found." } };
            }

            const sessionUrl = `${BACKEND_AUTH_URL}/get-session`;
            const currentOrigin = getBaseUrl();

            const res = await fetch(sessionUrl, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Cookie": cookieString,
                    "Origin": currentOrigin,
                },
                cache: "no-store",
            });

            if (!res.ok) {
                return { data: null, error: { message: "Failed to fetch session" } };
            }

            const session = await res.json();

            // better-auth's get-session returns null when no session exists
            if (!session || !session.user) {
                return { data: null, error: { message: "No active session." } };
            }

            return { data: session, error: null };
        } catch (err) {
            console.error("Get Session Error:", err);
            return { data: null, error: { message: "Something went wrong" } };
        }
    },

    /**
     * Returns the authenticated User object, or null if not logged in.
     */
    getCurrentUser: async function (): Promise<User | null> {
        const { data } = await this.getSession();
        // better-auth returns { user: {...}, session: {...} }
        return data?.user || null;
    },
};
