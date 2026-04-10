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

    return (
        <div className="w-full max-w-md">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 p-8 border rounded-xl shadow-lg bg-card text-card-foreground">
                    <div className="text-center mb-6">
                        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">Welcome Back</h1>
                        <p className="text-sm text-muted-foreground mt-2">Login to access your personalized dashboard</p>
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
