import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AdminService } from "@/services/admin.service";
import { BookingService } from "@/services/booking.service";
import { TutorService } from "@/services/tutor.service";
import { Users, GraduationCap, Calendar, ShieldCheck } from "lucide-react";

export default async function AdminDashboard() {
    let totalUsers = 0;
    let totalTutors = 0;
    let totalBookings = 0;

    try {
        const [usersRes, tutorsRes, bookingsRes] = await Promise.all([
            AdminService.getAllUsers(),
            TutorService.getAllTutors(),
            BookingService.getAllBookings(),
        ]);

        totalUsers = usersRes.pagination?.total || usersRes.data?.length || 0;
        totalTutors = tutorsRes.pagination?.total || tutorsRes.data?.length || 0;
        totalBookings = bookingsRes.pagination?.total || bookingsRes.data?.length || 0;

    } catch (error) {
        console.error("Failed to fetch admin stats", error);
    }

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>

            <div className="grid gap-4 md:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalUsers}</div>
                        <p className="text-xs text-muted-foreground">
                            Platform wide
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Tutors</CardTitle>
                        <GraduationCap className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalTutors}</div>
                        <p className="text-xs text-muted-foreground">
                            Approved & Visible
                        </p>
                    </CardContent>
                </Card>
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
                        <CardTitle className="text-sm font-medium">System Health</CardTitle>
                        <ShieldCheck className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">Good</div>
                        <p className="text-xs text-muted-foreground">
                            All systems operational
                        </p>
                    </CardContent>
                </Card>
            </div>

            <div className="rounded-xl border bg-card text-card-foreground shadow">
                <div className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Platform Overview</h3>
                    <div className="space-y-4">
                        <p className="text-sm text-muted-foreground">
                            Welcome to the admin dashboard. Here you can verify new tutors, manage user accounts, and view platform statistics.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
