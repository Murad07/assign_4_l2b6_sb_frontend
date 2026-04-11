import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const BACKEND_URL = "https://assign-4-l2-b6-skill-bridge-backend.vercel.app/api";

export async function GET(req: NextRequest) {
    try {
        const cookieStore = await cookies();

        // Read the session token that better-auth set on our frontend domain
        const sessionToken =
            cookieStore.get("better-auth.session_token")?.value ||
            cookieStore.get("__Secure-better-auth.session_token")?.value;

        if (!sessionToken) {
            return NextResponse.json(
                { error: "No session token found" },
                { status: 401 }
            );
        }

        // Forward to our backend exchange endpoint
        const res = await fetch(`${BACKEND_URL}/auth/session-exchange`, {
            headers: {
                "x-session-token": sessionToken,
                "Content-Type": "application/json",
            },
            cache: "no-store",
        });

        const data = await res.json();

        if (!res.ok || !data?.user) {
            return NextResponse.json(
                { error: "Session invalid" },
                { status: 401 }
            );
        }

        return NextResponse.json({
            success: true,
            user: data.user,
            session: data.session,
            token: sessionToken, // pass back so bridge can call syncSessionToken
        });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}