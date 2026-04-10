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
import { AiSearchDialog } from "@/components/modules/tutor/ai-search-dialog";

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

    // Sync external URL changes (like AI Search) to local state safely
    useEffect(() => {
        const urlSearch = searchParams.get("search") || "";
        if (urlSearch !== searchTerm) setSearchTerm(urlSearch);

        const urlCat = searchParams.get("categoryId") || "all";
        if (urlCat !== category) setCategory(urlCat);

        const urlRating = searchParams.get("minRating") || "all";
        if (urlRating !== minRating) setMinRating(urlRating);

        const urlSortBy = searchParams.get("sortBy")
            ? `${searchParams.get("sortBy")}-${searchParams.get("sortOrder") || "desc"}`
            : "createdAt-desc";
        if (urlSortBy !== sortBy) setSortBy(urlSortBy);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams]);

    const handleClearFilters = () => {
        router.push("?");
    };

    // Push search term uniquely to avoid loops
    useEffect(() => {
        const urlSearch = searchParams.get("search") || "";
        if (debouncedSearchTerm === urlSearch) return; // Prevent pushing what's already there

        const params = new URLSearchParams(searchParams.toString());
        if (debouncedSearchTerm) params.set("search", debouncedSearchTerm);
        else params.delete("search");

        router.push(`?${params.toString()}`);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedSearchTerm]);

    // Handlers for selects that immediately push to URL instead of relying on generic useEffect
    const updateUrlParam = (key: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString());

        if (key === "sortBy") {
            if (value !== "createdAt-desc") {
                const [sortField, sortOrder] = value.split("-");
                params.set("sortBy", sortField);
                params.set("sortOrder", sortOrder);
            } else {
                params.delete("sortBy");
                params.delete("sortOrder");
            }
        } else {
            if (value && value !== "all") params.set(key, value);
            else params.delete(key);
        }

        router.push(`?${params.toString()}`);
    };


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
                <Select value={category} onValueChange={(v) => { setCategory(v); updateUrlParam("categoryId", v); }}>
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

                <Select value={minRating} onValueChange={(v) => { setMinRating(v); updateUrlParam("minRating", v); }}>
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

                <Select value={sortBy} onValueChange={(v) => { setSortBy(v); updateUrlParam("sortBy", v); }}>
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

                <AiSearchDialog />

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
