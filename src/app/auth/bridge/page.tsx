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
                // ✅ Call OUR OWN Next.js API route (same domain = can read cookie)
                const res = await fetch("/api/auth/session", {
                    cache: "no-store",
                });

                const data = await res.json();

                if (!res.ok || !data?.user) {
                    console.error("Bridge: no valid session", data);
                    router.push("/login?error=no_session");
                    return;
                }

                // ✅ Sync the httpOnly cookie properly via server action
                await syncSessionToken({
                    "better-auth.session_token": data.token,
                });

                toast.success("Login successful!");

                const role = data.user?.role || "Student";
                router.push(role === "Tutor" ? "/tutor/dashboard" : "/dashboard");
                router.refresh();

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