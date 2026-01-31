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
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { createReview } from "@/actions/review";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import { Star } from "lucide-react";

const formSchema = z.object({
    rating: z.number().min(1).max(5),
    comment: z.string().min(2, {
        message: "Comment must be at least 2 characters.",
    }),
});

interface ReviewModalProps {
    bookingId: string;
    tutorId: string;
}

export default function ReviewModal({ bookingId, tutorId }: ReviewModalProps) {
    const [open, setOpen] = useState(false);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            rating: 5,
            comment: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const res = await createReview({
                bookingId,
                tutorId,
                ...values
            });
            if (res.success) {
                toast.success("Review submitted successfully!");
                setOpen(false);
                form.reset();
            } else {
                toast.error(res.error);
            }
        } catch (error) {
            toast.error("Something went wrong.");
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm">Leave Review</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Rate Your Session</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="rating"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Rating</FormLabel>
                                    <FormControl>
                                        <div className="flex items-center gap-2">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <Star
                                                    key={star}
                                                    className={`h-6 w-6 cursor-pointer ${star <= field.value ? "fill-yellow-500 text-yellow-500" : "text-gray-300"}`}
                                                    onClick={() => {
                                                        field.onChange(Number(star));
                                                    }}
                                                />
                                            ))}
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="comment"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Comment</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Share your experience..." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit" disabled={form.formState.isSubmitting} className="w-full">
                            {form.formState.isSubmitting ? "Submitting..." : "Submit Review"}
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
