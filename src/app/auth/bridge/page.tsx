"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { syncSessionToken, captureBackendSession } from "@/actions/auth";
import { toast } from "sonner";

/**
 * 🌉 The Client-Side Auth Bridge
 * 
 * Why this works:
 * Only the Browser can send cookies for the 'vercel.app' domain.
 * This page runs in your browser, calls the backend with 'credentials: include',
 * which forces the browser to send the cookies. The backend returns the 
 * session data, and we then use a Server Action to 'transplant' that 
 * session to localhost.
 */
export default function AuthBridgePage() {
    const router = useRouter();

    useEffect(() => {
        const bridge = async () => {
            try {
                // 🌉 The Proxy Bridge:
                // We fetch through the local proxy. Next.js handles the domain jump
                // and the browser automatically saves the cookies for localhost.
                const res = await fetch("/api/auth/get-session", {
                    credentials: "include",
                });

                if (!res.ok) throw new Error("Proxy fetch failed");

                const data = await res.json();

                if (data?.session) {
                    // Identify tokens from JSON for manual fallback mapping
                    const tokens: Record<string, string> = {};
                    if (data?.session?.token) tokens["better-auth.session_token"] = data.session.token;
                    if (data?.token) tokens["token"] = data.token;

                    // Sync them locally just to be absolutely certain (Server Action)
                    await syncSessionToken(tokens);

                    // Determine destination
                    const cookies = document.cookie.split("; ");
                    const roleCookie = cookies.find(c => c.startsWith("pending_role="))?.split("=")[1];
                    const role = roleCookie || "Student";

                    // Clean up
                    document.cookie = "pending_role=; path=/; max-age=0";

                    toast.success("Identity verified!");

                    if (role === "Tutor") {
                        router.push("/tutor/dashboard");
                    } else if (role === "Admin") {
                        router.push("/admin");
                    } else {
                        router.push("/dashboard");
                    }

                    router.refresh();
                } else {
                    toast.error("Bridge Connection Lost: No session returned.");
                    router.push("/login?error=no_session");
                }
            } catch (error) {
                console.error("Bridge error:", error);
                toast.error("Authentication bridge failed.");
                router.push("/login?error=bridge_failed");
            }
        };

        bridge();
    }, [router]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-background">
            <div className="text-center space-y-6">
                <div className="relative w-20 h-20 mx-auto">
                    <div className="absolute inset-0 rounded-full border-4 border-primary/20 animate-ping"></div>
                    <div className="relative rounded-full h-20 w-20 border-t-4 border-primary animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                    </div>
                </div>
                <div className="space-y-2">
                    <h2 className="text-2xl font-bold tracking-tight">Syncing your session</h2>
                    <p className="text-muted-foreground animate-pulse">
                        Bridging security across domains...
                    </p>
                </div>
            </div>
        </div>
    );
}
