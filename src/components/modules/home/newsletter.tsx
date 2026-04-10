"use client";

import { AnimatedSection } from "@/components/ui/animated-section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Sparkles } from "lucide-react";
import { toast } from "sonner";

export const Newsletter = () => {
    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        toast.success("Subscribed successfully! Welcome to the community.");
    };

    return (
        <AnimatedSection className="container mx-auto px-4 py-20">
            <div className="bg-primary/5 rounded-[3rem] p-12 md:p-24 relative overflow-hidden text-center space-y-8">
                <div className="max-w-2xl mx-auto space-y-4">
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Stay ahead of the curve</h2>
                    <p className="text-muted-foreground italic">
                        Join our newsletter to get weekly tips, student success stories, and special tutor offers.
                    </p>
                </div>

                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto relative z-10">
                    <Input
                        placeholder="Enter your email"
                        type="email"
                        required
                        className="rounded-full bg-background border-primary/20 h-14 px-6"
                    />
                    <Button type="submit" size="lg" className="rounded-full h-14 px-10 font-bold">
                        Join Now
                    </Button>
                </form>
            </div>
        </AnimatedSection>
    );
};
