import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookingService } from "@/services/booking.service";
import { BookOpen, Calendar, DollarSign } from "lucide-react";

export default async function StudentDashboard() {
    let bookings: any[] = [];

    try {
        const res = await BookingService.getUserBookings();
        bookings = res.data || [];
    } catch (error) {
        console.error("Failed to fetch student dashboard data", error);
    }

    const totalBookings = bookings.length;
    const completedClasses = bookings.filter((b) => b.status === "COMPLETED").length;
    const totalSpent = bookings.reduce((sum, b) => sum + (Number(b.price) || 0), 0);

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight">Student Dashboard</h1>

            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalBookings}</div>
                        <p className="text-xs text-muted-foreground">
                            All time
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Completed Classes</CardTitle>
                        <BookOpen className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{completedClasses}</div>
                        <p className="text-xs text-muted-foreground">
                            Successfully finished
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">${totalSpent.toFixed(2)}</div>
                        <p className="text-xs text-muted-foreground">
                            Invested in learning
                        </p>
                    </CardContent>
                </Card>
            </div>

            <div className="rounded-xl border bg-card text-card-foreground shadow">
                <div className="p-6 flex flex-col items-center justify-center min-h-[300px] text-center">
                    <h3 className="text-lg font-semibold mb-2">Welcome to your Learning Journey!</h3>
                    {totalBookings === 0 ? (
                        <p className="text-muted-foreground max-w-sm">
                            You have no bookings yet. Start by browsing our expert tutors to book your first session.
                        </p>
                    ) : (
                        <p className="text-muted-foreground max-w-sm">
                            You have {bookings.filter(b => b.status !== "COMPLETED" && b.status !== "CANCELLED").length} active or upcoming sessions. Check "My Bookings" for details.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
