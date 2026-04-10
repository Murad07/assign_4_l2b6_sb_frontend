"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sparkles, Loader2 } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { extractSearchIntent } from "@/actions/ai-search";
import { useRouter, useSearchParams } from "next/navigation";

export function AiSearchDialog() {
    const [open, setOpen] = useState(false);
    const [prompt, setPrompt] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const searchParams = useSearchParams();

    const handleAiSearch = async () => {
        if (!prompt.trim()) return;
        setIsLoading(true);
        setError(null);

        const res = await extractSearchIntent(prompt);

        if (!res.success) {
            setError(res.error || "Failed to process AI search");
            setIsLoading(false);
            return;
        }

        const data = res.data;
        const params = new URLSearchParams(searchParams.toString());

        if (data.search) params.set("search", data.search);
        else params.delete("search");

        if (data.minRating && data.minRating !== "all") params.set("minRating", data.minRating);

        if (data.maxPrice) params.set("maxPrice", data.maxPrice.toString());

        if (data.sortOrder) {
            const [sortField, sortOrder] = data.sortOrder.split("-");
            params.set("sortBy", sortField);
            params.set("sortOrder", sortOrder);
        }

        params.delete("page"); // Reset to page 1

        router.push(`?${params.toString()}`);
        setIsLoading(false);
        setOpen(false);
        setPrompt("");
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className="gap-2 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border-indigo-500/20 hover:bg-indigo-500/20">
                    <Sparkles className="h-4 w-4 text-indigo-500" />
                    <span className="font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Ask AI</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Sparkles className="h-5 w-5 text-indigo-500" />
                        AI Super Search
                    </DialogTitle>
                    <DialogDescription>
                        Tell us exactly what you're looking for in plain English, and our AI will find the perfect match.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col gap-4 py-4">
                    <Input
                        placeholder="e.g., 'I want a cheap React tutor with 4 stars'"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleAiSearch()}
                        autoFocus
                    />
                    {error && (
                        <p className="text-sm text-red-500">{error}</p>
                    )}
                    <Button
                        onClick={handleAiSearch}
                        disabled={isLoading || !prompt.trim()}
                        className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Analyzing Request...
                            </>
                        ) : (
                            "Find My Tutor"
                        )}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
