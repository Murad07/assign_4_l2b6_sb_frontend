import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = "https://assign-4-l2-b6-skill-bridge-backend.vercel.app/api";

export async function GET(req: NextRequest) {
    try {
        // ✅ Token comes from the URL param set by the backend redirect
        const token = req.nextUrl.searchParams.get("token");

        if (!token) {
            return NextResponse.json(
                { error: "No token in request" },
                { status: 401 }
            );
        }

        const res = await fetch(`${BACKEND_URL}/auth/session-exchange`, {
            headers: {
                "x-session-token": token,
                "Content-Type": "application/json",
            },
            cache: "no-store",
        });

        const data = await res.json();

        if (!res.ok || !data?.user) {
            return NextResponse.json(
                { error: "Session invalid", detail: data },
                { status: 401 }
            );
        }

        return NextResponse.json({
            success: true,
            user: data.user,
            session: data.session,
            token: data.token,
        });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}