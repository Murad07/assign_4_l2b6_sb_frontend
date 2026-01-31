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
import { updateStudentProfile } from "@/actions/student";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const formSchema = z.object({
    name: z.string().min(2, {
        message: "Name must be at least 2 characters.",
    }),
    phone: z.string().optional(),
    image: z.string().url("Invalid URL").optional().or(z.literal("")),
});

interface StudentProfileFormProps {
    user: User;
}

export default function StudentProfileForm({ user }: StudentProfileFormProps) {
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
            console.log("Student profile update request data:", formattedValues);
            const res = await updateStudentProfile(formattedValues);
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
        <Card className="max-w-2xl">
            <CardHeader>
                <CardTitle>Edit Profile</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Your Name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="image"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Profile Image URL</FormLabel>
                                    <FormControl>
                                        <Input placeholder="https://example.com/avatar.jpg" {...field} />
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
                                    <FormLabel>Phone (Optional)</FormLabel>
                                    <FormControl>
                                        <Input placeholder="+1234567890" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit" disabled={form.formState.isSubmitting}>
                            {form.formState.isSubmitting ? "Saving..." : "Save Changes"}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
