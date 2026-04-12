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
    Calendar,
    Clock,
    User,
    ArrowUpDown,
    CheckCircle2,
    XCircle,
    AlertCircle
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

interface BookingDataTableProps {
    bookings: any[];
}

export default function BookingDataTable({ bookings }: BookingDataTableProps) {
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    // Filtering logic
    const filteredBookings = bookings.filter((booking) => {
        const studentName = booking.student?.name?.toLowerCase() || "";
        const tutorName = booking.tutor?.name?.toLowerCase() || "";
        const subject = booking.subject?.toLowerCase() || "";
        const search = searchTerm.toLowerCase();

        const matchesSearch = studentName.includes(search) ||
            tutorName.includes(search) ||
            subject.includes(search);

        const matchesStatus = statusFilter === "all" || booking.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    // Pagination logic
    const totalPages = Math.ceil(filteredBookings.length / rowsPerPage);
    const startIndex = (currentPage - 1) * rowsPerPage;
    const paginatedBookings = filteredBookings.slice(startIndex, startIndex + rowsPerPage);

    const handlePageChange = (page: number) => {
        setCurrentPage(Math.max(1, Math.min(page, totalPages)));
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "CONFIRMED": return <CheckCircle2 className="h-3 w-3" />;
            case "COMPLETED": return <CheckCircle2 className="h-3 w-3" />;
            case "CANCELLED": return <XCircle className="h-3 w-3" />;
            default: return <AlertCircle className="h-3 w-3" />;
        }
    };

    return (
        <div className="space-y-4">
            {/* Toolbar */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 bg-muted/30 p-4 rounded-2xl border border-primary/5">
                <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto flex-1">
                    <div className="relative flex-1 max-w-md group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                        <Input
                            placeholder="Search student, tutor or subject..."
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setCurrentPage(1);
                            }}
                            className="pl-10 h-11 bg-background border-primary/10 rounded-xl focus-visible:ring-primary/20"
                        />
                    </div>

                    <Select value={statusFilter} onValueChange={(val) => { setStatusFilter(val); setCurrentPage(1); }}>
                        <SelectTrigger className="w-full sm:w-[180px] h-11 rounded-xl bg-background border-primary/10 font-bold">
                            <div className="flex items-center gap-2">
                                <Filter className="h-4 w-4 text-primary/60" />
                                <SelectValue placeholder="All Status" />
                            </div>
                        </SelectTrigger>
                        <SelectContent className="rounded-xl border-primary/10">
                            <SelectItem value="all" className="font-medium">All Bookings</SelectItem>
                            <SelectItem value="PENDING" className="font-medium">Pending</SelectItem>
                            <SelectItem value="CONFIRMED" className="font-medium">Confirmed</SelectItem>
                            <SelectItem value="COMPLETED" className="font-medium">Completed</SelectItem>
                            <SelectItem value="CANCELLED" className="font-medium">Cancelled</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex items-center gap-3">
                    <span className="text-xs font-black uppercase text-muted-foreground hidden sm:inline">Rows per page</span>
                    <Select
                        value={rowsPerPage.toString()}
                        onValueChange={(value) => {
                            setRowsPerPage(Number(value));
                            setCurrentPage(1);
                        }}
                    >
                        <SelectTrigger className="w-[80px] h-11 rounded-xl bg-background border-primary/10 font-bold">
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
                            <TableHead className="font-black uppercase text-[10px] tracking-tighter">Subject</TableHead>
                            <TableHead className="font-black uppercase text-[10px] tracking-tighter">Student</TableHead>
                            <TableHead className="font-black uppercase text-[10px] tracking-tighter">Tutor</TableHead>
                            <TableHead className="font-black uppercase text-[10px] tracking-tighter">
                                <div className="flex items-center gap-1 cursor-pointer hover:text-primary transition-colors">
                                    Session Date <ArrowUpDown className="h-3 w-3" />
                                </div>
                            </TableHead>
                            <TableHead className="text-right font-black uppercase text-[10px] tracking-tighter">Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {paginatedBookings.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="h-64 text-center">
                                    <div className="flex flex-col items-center gap-2 text-muted-foreground">
                                        <Filter className="h-8 w-8 opacity-20" />
                                        <p className="font-medium">No bookings found matching your criteria.</p>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : (
                            paginatedBookings.map((booking) => (
                                <TableRow key={booking.id} className="hover:bg-primary/5 border-primary/5 transition-colors group">
                                    <TableCell>
                                        <div className="flex flex-col gap-0.5">
                                            <span className="font-black text-sm tracking-tight group-hover:text-primary transition-colors">{booking.subject}</span>
                                            <span className="text-[10px] font-bold text-muted-foreground uppercase opacity-0 group-hover:opacity-100 transition-opacity">ID: {booking.id.slice(-8)}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <Avatar className="h-7 w-7 ring-1 ring-primary/10">
                                                <AvatarImage src={booking.student?.image} />
                                                <AvatarFallback className="text-[10px] bg-primary/5 text-primary">S</AvatarFallback>
                                            </Avatar>
                                            <span className="font-bold text-sm">{booking.student?.name}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <Avatar className="h-7 w-7 ring-1 ring-primary/10">
                                                <AvatarImage src={booking.tutor?.image} />
                                                <AvatarFallback className="text-[10px] bg-primary/5 text-primary">T</AvatarFallback>
                                            </Avatar>
                                            <span className="font-bold text-sm">{booking.tutor?.name}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex flex-col gap-1">
                                            <div className="flex items-center gap-1.5 text-xs font-bold">
                                                <Calendar className="h-3 w-3 text-primary/60" />
                                                {new Date(booking.sessionDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                                            </div>
                                            <div className="flex items-center gap-1.5 text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                                                <Clock className="h-3 w-3 text-primary/60" />
                                                {booking.sessionTime}
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Badge
                                            className={`
                                                px-3 py-1 rounded-full text-[10px] font-black border-none gap-1.5
                                                ${booking.status === 'CONFIRMED' ? 'bg-green-100 text-green-700' :
                                                    booking.status === 'COMPLETED' ? 'bg-blue-100 text-blue-700' :
                                                        booking.status === 'CANCELLED' ? 'bg-red-100 text-red-700' :
                                                            'bg-amber-100 text-amber-700'}
                                            `}
                                        >
                                            {getStatusIcon(booking.status)}
                                            {booking.status || "PENDING"}
                                        </Badge>
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
                    Showing <span className="text-primary">{startIndex + 1}</span> to <span className="text-primary">{Math.min(startIndex + rowsPerPage, filteredBookings.length)}</span> of <span className="text-primary">{filteredBookings.length}</span> bookings
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
