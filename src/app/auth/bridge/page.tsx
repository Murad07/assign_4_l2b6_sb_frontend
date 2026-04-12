"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { syncSessionToken } from "@/actions/auth";
import { toast } from "sonner";

export default function AuthBridgePage() {
    const router = useRouter();

    useEffect(() => {
        const bridge = async () => {
            try {
                const params = new URLSearchParams(window.location.search);
                const token = params.get("token");

                if (!token) {
                    router.push("/login?error=no_token");
                    return;
                }

                const res = await fetch(`/api/auth/session?token=${token}`, {
                    cache: "no-store",
                });

                const data = await res.json();

                if (!res.ok || !data?.user) {
                    console.error("Bridge: invalid session", data);
                    router.push("/login?error=invalid_session");
                    return;
                }

                // ✅ Use the token returned by the API (already properly decoded)
                // not the raw URL param which may be encoded differently
                await syncSessionToken({
                    "better-auth.session_token": data.token,
                });

                toast.success("Login successful!");

                const role = data.user?.role || "Student";

                // ✅ Full page reload instead of router.push — prevents stale
                // middleware cache from rejecting the fresh cookie
                window.location.href = role === "Tutor" ? "/tutor/dashboard" : "/dashboard";

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
                <p className="text-sm text-muted-foreground">Please wait...</p>
            </div>
        </div>
    );
}