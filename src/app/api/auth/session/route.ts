import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = "https://assign-4-l2-b6-skill-bridge-backend.vercel.app/api";

export async function GET(req: NextRequest) {
    try {
        const rawToken = req.nextUrl.searchParams.get("token");

        if (!rawToken) {
            return NextResponse.json({ error: "No token in request" }, { status: 401 });
        }

        // ✅ searchParams.get() auto-decodes once, but the token itself
        // may contain encoded chars (+, =) that need a second decode
        // We try decoded first, fall back to raw if that fails
        const decodedToken = decodeURIComponent(rawToken);

        console.log("session route — raw token:", rawToken.slice(0, 20));
        console.log("session route — decoded token:", decodedToken.slice(0, 20));

        // Try with decoded token first
        let res = await fetch(`${BACKEND_URL}/auth/session-exchange`, {
            headers: {
                "x-session-token": decodedToken,
                "Content-Type": "application/json",
            },
            cache: "no-store",
        });

        // ✅ If decoded fails, try raw token as fallback
        if (!res.ok) {
            console.log("decoded token failed, trying raw token...");
            res = await fetch(`${BACKEND_URL}/auth/session-exchange`, {
                headers: {
                    "x-session-token": rawToken,
                    "Content-Type": "application/json",
                },
                cache: "no-store",
            });
        }

        const data = await res.json();

        if (!res.ok || !data?.user) {
            console.error("session-exchange failed:", data);
            return NextResponse.json(
                { error: "Session invalid", detail: data },
                { status: 401 }
            );
        }

        return NextResponse.json({
            success: true,
            user: data.user,
            session: data.session,
            token: decodedToken, // ✅ always return decoded for syncSessionToken
        });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}