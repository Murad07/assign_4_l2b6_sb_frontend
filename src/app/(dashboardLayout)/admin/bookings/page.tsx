import { BookingService } from "@/services/booking.service";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { unstable_noStore as noStore } from "next/cache";
import BookingDataTable from "@/components/modules/admin/booking/BookingDataTable";

export const dynamic = "force-dynamic";

export default async function AdminBookingsPage() {
    noStore();
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
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex flex-col gap-1">
                    <h1 className="text-3xl font-black tracking-tighter sm:text-4xl text-primary">
                        Booking Control
                    </h1>
                    <p className="text-muted-foreground text-sm font-medium">
                        Monitor and manage all tutoring sessions across the platform.
                    </p>
                </div>
            </div>

            <Card className="rounded-[2.5rem] border-primary/5 bg-background/50 backdrop-blur-sm overflow-hidden shadow-2xl shadow-primary/5">
                <CardHeader className="bg-primary/5 border-b border-primary/5 py-8">
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-xl font-black tracking-tighter">
                            All Platform Sessions
                            <span className="ml-3 text-xs font-black uppercase bg-primary text-white px-3 py-1 rounded-full">
                                {totalBookings} Registered
                            </span>
                        </CardTitle>
                    </div>
                </CardHeader>
                <CardContent className="p-6">
                    <BookingDataTable bookings={bookings} />
                </CardContent>
            </Card>
        </div>
    );
}
