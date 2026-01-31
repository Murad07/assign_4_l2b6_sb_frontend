import { BookingService } from "@/services/booking.service";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function AdminBookingsPage() {
    let bookings = [];
    let totalBookings = 0;

    try {
        const res = await BookingService.getAllBookings();
        bookings = res.data || [];
        totalBookings = res.pagination?.total || bookings.length;
    } catch (error) {
        console.error("Failed to fetch all bookings:", error);
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold tracking-tight">Booking Management</h1>
                <Badge variant="outline">{totalBookings} Total</Badge>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>All Bookings</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Subject</TableHead>
                                <TableHead>Student</TableHead>
                                <TableHead>Tutor</TableHead>
                                <TableHead>Date / Time</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {bookings.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                                        No bookings found.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                bookings.map((booking: any) => {
                                    const studentName = booking.student?.name || "Unknown Student";
                                    // Based on the user's provided JSON, tutor name is directly in tutor object
                                    const tutorName = booking.tutor?.name || "Unknown Tutor";
                                    const sessionDate = booking.sessionDate ? new Date(booking.sessionDate).toLocaleDateString() : 'N/A';

                                    return (
                                        <TableRow key={booking.id}>
                                            <TableCell className="font-medium">{booking.subject}</TableCell>
                                            <TableCell>{studentName}</TableCell>
                                            <TableCell>{tutorName}</TableCell>
                                            <TableCell>
                                                <div className="flex flex-col text-sm">
                                                    <span>{sessionDate}</span>
                                                    <span className="text-muted-foreground text-xs">{booking.sessionTime}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant={
                                                    booking.status === "CONFIRMED" ? "default" :
                                                        booking.status === "COMPLETED" ? "secondary" :
                                                            booking.status === "CANCELLED" ? "destructive" : "outline"
                                                }>
                                                    {booking.status || "PENDING"}
                                                </Badge>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
