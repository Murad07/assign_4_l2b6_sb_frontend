"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { loginUser } from "@/actions/auth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

const formSchema = z.object({
    email: z.string().email({
        message: "Please enter a valid email address.",
    }),
    password: z.string().min(6, {
        message: "Password must be at least 6 characters.",
    }),
});

export default function LoginForm() {
    const router = useRouter();
    const [selectedRole, setSelectedRole] = useState<"Student" | "Tutor">("Student");
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const res = await loginUser(values);
            if (res.success) {
                toast.success("Logged in successfully!");

                // CRITICAL: router.refresh() forces Next.js to re-fetch all
                // server components with the newly set cookies. Without this,
                // the dashboard layout reads a stale (pre-login) RSC cache and
                // redirects back to /login immediately.
                router.refresh();

                const user = res.data;
                if (user?.role === "Student") {
                    router.push("/dashboard");
                } else if (user?.role === "Tutor") {
                    router.push("/tutor/dashboard");
                } else if (user?.role === "Admin") {
                    router.push("/admin");
                } else {
                    router.push("/"); // Fallback
                }
            } else {
                toast.error(res.error);
            }
        } catch (error) {
            toast.error("Something went wrong.");
        }
    }

    async function handleDemoLogin(email: string, password: string) {
        form.setValue("email", email);
        form.setValue("password", password);
        await onSubmit({ email, password });
    }

    async function handleGoogleLogin() {
        try {
            const backendAuthUrl = "https://assign-4-l2-b6-skill-bridge-backend.vercel.app/api/auth";
            const callbackUrl = `${window.location.origin}/auth/bridge`;

            // Set temporary role cookie for the bridge
            document.cookie = `pending_role=${selectedRole}; path=/; max-age=600`;

            /** 
             * 🕵️‍♂️ SENIOR ENGINEER FIX:
             * We use a direct GET link instead of fetch. 
             * This makes the 'state' cookie First-Party, which prevents 
             * 'state_mismatch' errors in ALL browsers/environments.
             */
            const loginUrl = `${backendAuthUrl}/login/social/google?callbackURL=${encodeURIComponent(callbackUrl)}`;

            window.location.href = loginUrl;
        } catch (error) {
            console.error("Google Login Error:", error);
            toast.error("Failed to login with Google");
        }
    }



    return (
        <div className="w-full max-w-md">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 p-8 border rounded-xl shadow-lg bg-card text-card-foreground">
                    <div className="text-center mb-6">
                        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">Welcome Back</h1>
                        <p className="text-sm text-muted-foreground mt-2">Login to access your personalized dashboard</p>
                    </div>

                    <div className="space-y-3">
                        <label className="text-xs font-medium text-muted-foreground uppercase ml-1">I want to sign up as a:</label>
                        <Tabs defaultValue="Student" onValueChange={(v) => setSelectedRole(v as any)} className="w-full">
                            <TabsList className="grid w-full grid-cols-2 h-11 p-1 bg-muted/50">
                                <TabsTrigger value="Student" className="rounded-md data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm transition-all h-full">Student</TabsTrigger>
                                <TabsTrigger value="Tutor" className="rounded-md data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm transition-all h-full">Tutor</TabsTrigger>
                            </TabsList>
                        </Tabs>
                    </div>

                    <Button
                        type="button"
                        variant="outline"
                        className="w-full rounded-lg border-primary/20 hover:bg-primary/5 transition-all py-6"
                        onClick={handleGoogleLogin}
                    >
                        <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
                            <path
                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                fill="#4285F4"
                            />
                            <path
                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                fill="#34A853"
                            />
                            <path
                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                                fill="#FBBC05"
                            />
                            <path
                                d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 12.16-4.53z"
                                fill="#EA4335"
                            />
                        </svg>
                        Continue with Google
                    </Button>

                    <div className="relative my-4">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-card px-2 text-muted-foreground font-medium">Or continue with</span>
                        </div>
                    </div>

                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="email@example.com" {...field} className="rounded-lg" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="******" {...field} className="rounded-lg" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="w-full h-11 text-base font-semibold rounded-lg transition-all hover:scale-[1.01] active:scale-[0.99]" disabled={form.formState.isSubmitting}>
                        {form.formState.isSubmitting ? "Logging in..." : "Login"}
                    </Button>

                    <div className="relative my-4">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-card px-2 text-muted-foreground font-medium">Quick Demo access</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-3">
                        <div className="grid grid-cols-3 gap-2">
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                className="h-9 text-xs border-primary/20 hover:bg-primary/5 hover:text-primary transition-colors"
                                onClick={() => handleDemoLogin("admin@skillbridge.com", "admin123")}
                                disabled={form.formState.isSubmitting}
                            >
                                Admin
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                className="h-9 text-xs border-primary/20 hover:bg-primary/5 hover:text-primary transition-colors"
                                onClick={() => handleDemoLogin("atikur@gmail.com", "atikur123")}
                                disabled={form.formState.isSubmitting}
                            >
                                Tutor
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                className="h-9 text-xs border-primary/20 hover:bg-primary/5 hover:text-primary transition-colors"
                                onClick={() => handleDemoLogin("mehir@gmail.com", "mehir123")}
                                disabled={form.formState.isSubmitting}
                            >
                                Student
                            </Button>
                        </div>
                        <p className="text-[10px] text-center text-muted-foreground opacity-70">
                            Click to auto-fill and login instantly
                        </p>
                    </div>
                </form>
            </Form>
        </div>
    );
}
