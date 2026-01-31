"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { updateTutorProfile } from "@/actions/tutor";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tutor } from "@/types";

const formSchema = z.object({
    bio: z.string().min(10, "Bio must be at least 10 characters"),
    expertise: z.string().min(2, "Expertise is required"), // We'll handle split by comma
    hourlyRate: z.number().min(1, "Hourly rate must be at least 1"),
    education: z.string().min(2, "Education is required"),
    experience: z.string().min(2, "Experience is required"),
});

interface TutorProfileFormProps {
    tutor: Tutor | null;
}

export default function TutorProfileForm({ tutor }: TutorProfileFormProps) {
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            bio: tutor?.bio || "",
            expertise: tutor?.expertise?.join(", ") || "",
            hourlyRate: tutor?.hourlyRate || 0,
            education: tutor?.education || "",
            experience: tutor?.experience || "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            // Transform expertise string to array
            const formattedValues = {
                ...values,
                expertise: values.expertise.split(",").map(s => s.trim()).filter(Boolean),
                categoryIds: tutor?.categories?.map(c => c.id) || [], // Preserve existing categories or empty
            };

            const res = await updateTutorProfile(formattedValues);

            if (res.success) {
                toast.success("Tutor profile updated!");
                router.refresh();
            } else {
                toast.error(res.error);
            }
        } catch (error) {
            toast.error("Something went wrong.");
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Professional Profile</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="bio"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Bio</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Tell students about yourself..." className="min-h-[100px]" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="expertise"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Expertise / Skills</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Math, Physics, React (comma separated)" {...field} />
                                    </FormControl>
                                    <FormDescription>Separate skills with commas</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                                control={form.control}
                                name="hourlyRate"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Hourly Rate ($)</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="25"
                                                {...field}
                                                onChange={e => field.onChange(parseFloat(e.target.value))}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="experience"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Total Experience</FormLabel>
                                        <FormControl>
                                            <Input placeholder="5 years, or 'Senior Engineer'" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="education"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Education</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Degree / University" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit" disabled={form.formState.isSubmitting}>
                            {form.formState.isSubmitting ? "Saving..." : "Save Profile"}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
