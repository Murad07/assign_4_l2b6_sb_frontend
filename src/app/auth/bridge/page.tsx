"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { syncSessionToken } from "@/actions/auth";
import { toast } from "sonner";

/**
 * 🌉 The Clean Auth Bridge
 * 
 * Google finishes at the Backend. The Backend redirects here.
 * We fetch the session client-side (with credentials) and 
 * sync the resulting token to localhost.
 */
export default function AuthBridgePage() {
    const router = useRouter();

    useEffect(() => {
        const bridge = async () => {
            try {
                // Fetch session from the absolute backend URL
                const backendAuthUrl = "https://assign-4-l2-b6-skill-bridge-backend.vercel.app/api/auth";
                const res = await fetch(`${backendAuthUrl}/get-session`, {
                    credentials: "include",
                });

                if (!res.ok) throw new Error("Backend connection failed");

                const data = await res.json();

                if (data?.session?.token) {
                    // Sync the token locally
                    await syncSessionToken({
                        "better-auth.session_token": data.session.token,
                        "token": data.token || data.session.token // Handle custom tokens too
                    });

                    toast.success("Login successful!");

                    // Final navigation
                    const role = data?.user?.role || "Student";
                    if (role === "Tutor") {
                        router.push("/tutor/dashboard");
                    } else {
                        router.push("/dashboard");
                    }
                    router.refresh();
                } else {
                    router.push("/login?error=no_session");
                }
            } catch (error) {
                console.error("Bridge failure:", error);
                router.push("/login?error=bridge_failed");
            }
        };

        bridge();
    }, [router]);

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="text-center space-y-4">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                <h2 className="text-xl font-medium">Finalizing Login...</h2>
            </div>
        </div>
    );
}
