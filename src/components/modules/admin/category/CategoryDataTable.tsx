"use client";

import { useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
    Search,
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
    Filter,
    ArrowUpDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import CategoryItemActions from "./CategoryItemActions";
import { Category } from "@/types";

interface CategoryDataTableProps {
    categories: Category[];
}

export default function CategoryDataTable({ categories }: CategoryDataTableProps) {
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    // Filtering logic
    const filteredCategories = categories.filter((category) =>
        category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        category.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Pagination logic
    const totalPages = Math.ceil(filteredCategories.length / rowsPerPage);
    const startIndex = (currentPage - 1) * rowsPerPage;
    const paginatedCategories = filteredCategories.slice(startIndex, startIndex + rowsPerPage);

    const handlePageChange = (page: number) => {
        setCurrentPage(Math.max(1, Math.min(page, totalPages)));
    };

    return (
        <div className="space-y-4">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-muted/30 p-4 rounded-2xl border border-primary/5">
                <div className="relative w-full sm:w-96 group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <Input
                        placeholder="Search categories..."
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setCurrentPage(1);
                        }}
                        className="pl-10 h-11 bg-background border-primary/10 rounded-xl focus-visible:ring-primary/20"
                    />
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                    <span className="text-xs font-black uppercase text-muted-foreground hidden sm:inline">Rows per page</span>
                    <Select
                        value={rowsPerPage.toString()}
                        onValueChange={(value) => {
                            setRowsPerPage(Number(value));
                            setCurrentPage(1);
                        }}
                    >
                        <SelectTrigger className="w-full sm:w-[80px] h-11 rounded-xl bg-background border-primary/10 font-bold">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl border-primary/10">
                            {[5, 10, 20, 50].map((size) => (
                                <SelectItem key={size} value={size.toString()} className="font-medium">
                                    {size}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Table */}
            <div className="rounded-3xl border border-primary/5 bg-background overflow-hidden">
                <Table>
                    <TableHeader className="bg-muted/50">
                        <TableRow className="hover:bg-transparent border-primary/5">
                            <TableHead className="w-[80px] font-black uppercase text-[10px] tracking-tighter">Icon</TableHead>
                            <TableHead className="font-black uppercase text-[10px] tracking-tighter">
                                <div className="flex items-center gap-1 cursor-pointer hover:text-primary transition-colors">
                                    Name <ArrowUpDown className="h-3 w-3" />
                                </div>
                            </TableHead>
                            <TableHead className="font-black uppercase text-[10px] tracking-tighter">Description</TableHead>
                            <TableHead className="text-right font-black uppercase text-[10px] tracking-tighter">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {paginatedCategories.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} className="h-64 text-center">
                                    <div className="flex flex-col items-center gap-2 text-muted-foreground">
                                        <Filter className="h-8 w-8 opacity-20" />
                                        <p className="font-medium">No categories found matching your search.</p>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : (
                            paginatedCategories.map((category) => (
                                <TableRow key={category.id} className="hover:bg-primary/5 border-primary/5 transition-colors group">
                                    <TableCell>
                                        <Avatar className="h-10 w-10 bg-muted/50 ring-2 ring-transparent group-hover:ring-primary/20 transition-all">
                                            <AvatarImage src={category.icon} alt={category.name} className="object-cover" />
                                            <AvatarFallback className="bg-primary/5 text-primary font-black">
                                                {category.name?.[0]?.toUpperCase()}
                                            </AvatarFallback>
                                        </Avatar>
                                    </TableCell>
                                    <TableCell className="font-bold text-foreground">
                                        {category.name}
                                    </TableCell>
                                    <TableCell className="text-muted-foreground text-sm max-w-md truncate font-medium">
                                        {category.description || "No description provided."}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <CategoryItemActions category={category} />
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination Sidebar/Footer */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 px-2 py-2">
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-tighter">
                    Showing <span className="text-primary">{startIndex + 1}</span> to <span className="text-primary">{Math.min(startIndex + rowsPerPage, filteredCategories.length)}</span> of <span className="text-primary">{filteredCategories.length}</span> categories
                </p>

                <div className="flex items-center gap-1">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-lg hover:bg-primary/10 hover:text-primary"
                        onClick={() => handlePageChange(1)}
                        disabled={currentPage === 1}
                    >
                        <ChevronsLeft className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-lg hover:bg-primary/10 hover:text-primary"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Button>

                    <div className="flex items-center gap-1 px-2">
                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                            let pageNum;
                            if (totalPages <= 5) pageNum = i + 1;
                            else if (currentPage <= 3) pageNum = i + 1;
                            else if (currentPage >= totalPages - 2) pageNum = totalPages - 4 + i;
                            else pageNum = currentPage - 2 + i;

                            return (
                                <Button
                                    key={pageNum}
                                    variant={currentPage === pageNum ? "default" : "ghost"}
                                    size="sm"
                                    className={`h-8 w-8 rounded-lg font-bold text-xs ${currentPage === pageNum ? "bg-primary shadow-lg shadow-primary/20" : "hover:bg-primary/10 hover:text-primary"
                                        }`}
                                    onClick={() => handlePageChange(pageNum as number)}
                                >
                                    {pageNum}
                                </Button>
                            );
                        })}
                    </div>

                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-lg hover:bg-primary/10 hover:text-primary"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages || totalPages === 0}
                    >
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-lg hover:bg-primary/10 hover:text-primary"
                        onClick={() => handlePageChange(totalPages)}
                        disabled={currentPage === totalPages || totalPages === 0}
                    >
                        <ChevronsRight className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
