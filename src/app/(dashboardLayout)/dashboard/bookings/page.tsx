import { BookingService } from "@/services/booking.service";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock } from "lucide-react";
import ReviewModal from "@/components/modules/review/ReviewModal";
import BookingStatusAction from "@/components/modules/booking/BookingStatusAction";

export default async function MyBookingsPage() {
    let bookings = [];
    try {
        const res = await BookingService.getUserBookings();
        bookings = res.data || [];
    } catch (error) {
        console.error("Failed to fetch bookings:", error);
    }

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight">My Bookings</h1>

            {bookings.length === 0 ? (
                <Card>
                    <CardContent className="flex flex-col items-center justify-center py-12 text-center h-[300px]">
                        <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
                        <h3 className="text-lg font-semibold">No bookings found</h3>
                        <p className="text-muted-foreground mt-2">
                            You haven't booked any sessions yet.
                        </p>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {bookings.map((booking: any) => {
                        const tutorName = booking.tutor?.user?.name || "Tutor";
                        const subject = booking.subject || "General Session";
                        const startTime = new Date(booking.startTime);
                        const endTime = new Date(booking.endTime);

                        return (
                            <Card key={booking.id}>
                                <CardHeader className="pb-2">
                                    <div className="flex justify-between items-start">
                                        <CardTitle className="text-lg">{subject}</CardTitle>
                                        <Badge variant={booking.status === "CONFIRMED" ? "default" : "secondary"}>
                                            {booking.status || "PENDING"}
                                        </Badge>
                                    </div>
                                    <p className="text-sm text-muted-foreground">with {tutorName}</p>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex items-center text-sm text-muted-foreground">
                                        <Calendar className="mr-2 h-4 w-4" />
                                        <span>{startTime.toLocaleDateString()}</span>
                                    </div>
                                    <div className="flex items-center text-sm text-muted-foreground">
                                        <Clock className="mr-2 h-4 w-4" />
                                        <span>
                                            {startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} -
                                            {endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                    </div>

                                    {booking.status !== "COMPLETED" && booking.status !== "CANCELLED" && (
                                        <BookingStatusAction bookingId={booking.id} currentStatus={booking.status} isTutor={false} />
                                    )}

                                    {booking.status === "COMPLETED" && (
                                        <ReviewModal bookingId={booking.id} tutorId={booking.tutorId} />
                                    )}
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
