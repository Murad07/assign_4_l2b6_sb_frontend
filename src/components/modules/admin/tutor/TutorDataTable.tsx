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
    ArrowUpDown,
    ExternalLink,
    Filter,
    Mail,
    GraduationCap,
    Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import PendingTutorActions from "./PendingTutorActions";

interface TutorDataTableProps {
    tutors: any[];
}

export default function TutorDataTable({ tutors }: TutorDataTableProps) {
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    // Filter logic
    const filteredTutors = tutors.filter((tutor) => {
        const name = tutor.user?.name?.toLowerCase() || "";
        const email = tutor.user?.email?.toLowerCase() || "";
        const expertise = tutor.expertise?.join(" ").toLowerCase() || "";
        const search = searchTerm.toLowerCase();

        return name.includes(search) || email.includes(search) || expertise.includes(search);
    });

    // Pagination logic
    const totalPages = Math.ceil(filteredTutors.length / rowsPerPage);
    const startIndex = (currentPage - 1) * rowsPerPage;
    const paginatedTutors = filteredTutors.slice(startIndex, startIndex + rowsPerPage);

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
                        placeholder="Search by name, email or subjects..."
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
                            <TableHead className="font-black uppercase text-[10px] tracking-tighter">Tutor Info</TableHead>
                            <TableHead className="font-black uppercase text-[10px] tracking-tighter">Subjects & Expertise</TableHead>
                            <TableHead className="font-black uppercase text-[10px] tracking-tighter">Experience</TableHead>
                            <TableHead className="font-black uppercase text-[10px] tracking-tighter">
                                <div className="flex items-center gap-1 cursor-pointer hover:text-primary transition-colors">
                                    Applied Date <ArrowUpDown className="h-3 w-3" />
                                </div>
                            </TableHead>
                            <TableHead className="text-right font-black uppercase text-[10px] tracking-tighter">Decision</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {paginatedTutors.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="h-64 text-center">
                                    <div className="flex flex-col items-center gap-2 text-muted-foreground">
                                        <Filter className="h-8 w-8 opacity-20" />
                                        <p className="font-medium">No pending applications matching your search.</p>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : (
                            paginatedTutors.map((tutor) => (
                                <TableRow key={tutor.id} className="hover:bg-primary/5 border-primary/5 transition-colors group">
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <Avatar className="h-10 w-10 ring-2 ring-transparent group-hover:ring-primary/20 transition-all shadow-sm">
                                                <AvatarImage src={tutor.user?.image || ""} alt={tutor.user?.name} />
                                                <AvatarFallback className="bg-primary/5 text-primary font-black uppercase">
                                                    {tutor.user?.name?.slice(0, 2)}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="flex flex-col gap-0.5">
                                                <div className="flex items-center gap-1.5">
                                                    <span className="font-black text-sm tracking-tight">{tutor.user?.name}</span>
                                                    <Link href={`/tutors/${tutor.id}`} className="text-muted-foreground hover:text-primary transition-colors" target="_blank">
                                                        <ExternalLink className="h-3 w-3" />
                                                    </Link>
                                                </div>
                                                <div className="flex items-center gap-1 text-[10px] font-bold text-muted-foreground">
                                                    <Mail className="h-2.5 w-2.5" />
                                                    {tutor.user?.email}
                                                </div>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex flex-wrap gap-1 max-w-[250px]">
                                            {tutor.expertise && tutor.expertise.map((exp: string, idx: number) => (
                                                <Badge
                                                    key={idx}
                                                    className="bg-primary/5 text-primary border-none text-[9px] font-black uppercase tracking-tighter px-2 py-0.5"
                                                >
                                                    {exp}
                                                </Badge>
                                            ))}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2 font-bold text-xs">
                                            <div className="p-1.5 bg-secondary rounded-lg">
                                                <GraduationCap className="h-3 w-3 text-primary/70" />
                                            </div>
                                            {tutor.experience}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex flex-col gap-1">
                                            <div className="flex items-center gap-1.5 text-xs font-bold">
                                                <Clock className="h-3 w-3 text-primary/60" />
                                                {new Date(tutor.createdAt || "").toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <PendingTutorActions tutorId={tutor.id} isApproved={tutor.isApproved} />
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 px-2 py-2">
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-tighter">
                    Showing <span className="text-primary">{startIndex + 1}</span> to <span className="text-primary">{Math.min(startIndex + rowsPerPage, filteredTutors.length)}</span> of <span className="text-primary">{filteredTutors.length}</span> applications
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
