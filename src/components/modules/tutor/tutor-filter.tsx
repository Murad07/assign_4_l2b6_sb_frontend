"use client";

import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useDebounce } from "@/hooks/use-debounce";
import { Category } from "@/types";
import { Search, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface TutorFilterProps {
    categories: Category[];
}

export function TutorFilter({ categories }: TutorFilterProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");
    const [category, setCategory] = useState(searchParams.get("categoryId") || "all");
    const [sortBy, setSortBy] = useState(
        searchParams.get("sortBy")
            ? `${searchParams.get("sortBy")}-${searchParams.get("sortOrder") || "desc"}`
            : "createdAt-desc"
    );
    const [minRating, setMinRating] = useState(searchParams.get("minRating") || "all");

    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    const handleClearFilters = () => {
        setSearchTerm("");
        setCategory("all");
        setSortBy("createdAt-desc");
        setMinRating("all");
        router.push("?");
    };

    useEffect(() => {
        const params = new URLSearchParams(searchParams.toString());

        if (debouncedSearchTerm) params.set("search", debouncedSearchTerm);
        else params.delete("search");

        if (category && category !== "all") params.set("categoryId", category);
        else params.delete("categoryId");

        if (minRating && minRating !== "all") params.set("minRating", minRating);
        else params.delete("minRating");

        if (sortBy && sortBy !== "createdAt-desc") {
            const [sortField, sortOrder] = sortBy.split("-");
            params.set("sortBy", sortField);
            params.set("sortOrder", sortOrder);
        } else {
            params.delete("sortBy");
            params.delete("sortOrder");
        }

        // Reset to page 1 on new filter
        if (params.toString() !== searchParams.toString() && !params.get('page')) {
            // We might not want to reset page on every minor change, but usually good practice.
            // Leaving it to standard behavior for now.
        }

        const newSearch = params.toString();
        const currentSearch = searchParams.toString();

        if (newSearch !== currentSearch) {
            router.push(`?${newSearch}`);
        }
    }, [debouncedSearchTerm, category, sortBy, minRating, router, searchParams]);

    return (
        <div className="flex flex-col md:flex-row gap-3 items-center w-full bg-card p-2 rounded-2xl border shadow-sm flex-wrap">
            <div className="relative w-full md:w-80 lg:w-96">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                    type="search"
                    placeholder="Search by name, subject, or skills..."
                    className="pl-9 bg-background border-none shadow-none focus-visible:ring-1"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="h-6 w-px bg-border hidden md:block"></div>

            <div className="flex gap-3 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
                <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger className="w-[140px] border-none bg-background shadow-none focus:ring-1 shrink-0">
                        <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        {categories.map((cat) => (
                            <SelectItem key={cat.id} value={cat.id}>
                                {cat.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <Select value={minRating} onValueChange={setMinRating}>
                    <SelectTrigger className="w-[130px] border-none bg-background shadow-none focus:ring-1 shrink-0">
                        <SelectValue placeholder="Rating" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">Any Rating</SelectItem>
                        <SelectItem value="4.5">4.5+ Stars</SelectItem>
                        <SelectItem value="4.0">4.0+ Stars</SelectItem>
                        <SelectItem value="3.0">3.0+ Stars</SelectItem>
                    </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-[160px] border-none bg-background shadow-none focus:ring-1 shrink-0">
                        <SelectValue placeholder="Sort By" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="createdAt-desc">Newest First</SelectItem>
                        <SelectItem value="rating-desc">Highest Rated</SelectItem>
                        <SelectItem value="hourlyRate-asc">Price: Low to High</SelectItem>
                        <SelectItem value="hourlyRate-desc">Price: High to Low</SelectItem>
                    </SelectContent>
                </Select>

                {(searchTerm || category !== "all" || minRating !== "all" || sortBy !== "createdAt-desc") && (
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleClearFilters}
                        className="shrink-0 text-muted-foreground hover:text-foreground hover:bg-muted"
                        title="Clear Filters"
                    >
                        <X className="w-4 h-4" />
                    </Button>
                )}
            </div>
        </div>
    );
}
