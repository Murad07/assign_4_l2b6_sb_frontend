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
import { toast } from "sonner";
import { User } from "@/types";
import { updateStaffProfile } from "@/actions/staff";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const formSchema = z.object({
    name: z.string().min(2, {
        message: "Name must be at least 2 characters.",
    }),
    phone: z.string().optional(),
    image: z.string().url("Invalid URL").optional().or(z.literal("")),
});

interface StaffProfileFormProps {
    user: User;
    revalidatePath: string;
}

export default function StaffProfileForm({ user, revalidatePath }: StaffProfileFormProps) {
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: user.name || "",
            phone: user.phone || "",
            image: user.image || "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const formattedValues = {
                ...values,
                phone: values.phone === "" ? undefined : values.phone,
                image: values.image === "" ? undefined : values.image,
            };
            const res = await updateStaffProfile(formattedValues, revalidatePath);
            if (res.success) {
                toast.success("Profile updated successfully!");
                router.refresh();
            } else {
                toast.error(res.error);
            }
        } catch (error) {
            toast.error("Something went wrong.");
        }
    }

    return (
        <Card className="shadow-sm border-primary/10">
            <CardHeader className="bg-primary/5 border-b mb-6">
                <CardTitle className="text-xl">Staff Profile Settings</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-xs font-bold uppercase text-muted-foreground">Full Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter your name" {...field} className="rounded-lg h-11" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="phone"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-xs font-bold uppercase text-muted-foreground">Phone Number</FormLabel>
                                        <FormControl>
                                            <Input placeholder="+1 234 567 890" {...field} className="rounded-lg h-11" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="image"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-xs font-bold uppercase text-muted-foreground">Profile Avatar URL</FormLabel>
                                    <FormControl>
                                        <Input placeholder="https://example.com/photo.jpg" {...field} className="rounded-lg h-11" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="pt-4 border-t">
                            <Button type="submit" size="lg" className="w-full md:w-auto px-10 h-11 rounded-lg font-bold transition-all hover:scale-[1.02]" disabled={form.formState.isSubmitting}>
                                {form.formState.isSubmitting ? "Updating Profile..." : "Save Professional Profile"}
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
