import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TutorService } from "@/services/tutor.service";
import { DollarSign, Users, CalendarCheck } from "lucide-react";

export default async function TutorDashboard() {
    let sessions: any[] = [];
    let profile: any = null;

    try {
        const [sessionsRes, profileRes] = await Promise.all([
            TutorService.getMySessions(),
            TutorService.getTutorProfile(),
        ]);
        sessions = sessionsRes.data || [];
        profile = profileRes.data;
    } catch (error) {
        console.error("Failed to fetch tutor dashboard data", error);
    }

    const completedSessions = sessions.filter((s) => s.status === "COMPLETED");
    const totalSessionsCount = completedSessions.length;

    // Calculate total revenue from completed sessions
    const totalRevenue = completedSessions.reduce((sum, s) => sum + (Number(s.price) || 0), 0);

    // Calculate unique active students (from all sessions, or just active ones?)
    // Let's count students from all bookings as "My Students"
    const uniqueStudents = new Set(sessions.map(s => s.studentId).filter(Boolean));
    const activeStudentsCount = uniqueStudents.size;

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight">Tutor Dashboard</h1>

            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">${totalRevenue.toFixed(2)}</div>
                        <p className="text-xs text-muted-foreground">
                            Lifetime earnings
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">My Students</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{activeStudentsCount}</div>
                        <p className="text-xs text-muted-foreground">
                            Total unique students
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Completed Sessions</CardTitle>
                        <CalendarCheck className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalSessionsCount}</div>
                        <p className="text-xs text-muted-foreground">
                            Successfully finished
                        </p>
                    </CardContent>
                </Card>
            </div>

            <div className="rounded-xl border bg-card text-card-foreground shadow">
                <div className="p-6 flex flex-col items-center justify-center min-h-[300px] text-center">
                    {!profile ? (
                        <>
                            <h3 className="text-lg font-semibold mb-2">Complete Your Profile!</h3>
                            <p className="text-muted-foreground max-w-sm">
                                You need to finish setting up your tutor profile to start accepting bookings.
                                <br />
                                Go to <a href="/tutor/profile" className="text-primary hover:underline">Profile Settings</a>.
                            </p>
                        </>
                    ) : sessions.length === 0 ? (
                        <>
                            <h3 className="text-lg font-semibold mb-2">Ready to Teach?</h3>
                            <p className="text-muted-foreground max-w-sm">
                                Set up your availability to start receiving bookings from students.
                                <br />
                                Go to <a href="/tutor/availability" className="text-primary hover:underline">Availability Settings</a>.
                            </p>
                        </>
                    ) : (
                        <>
                            <h3 className="text-lg font-semibold mb-2">Keep up the Great Work!</h3>
                            <p className="text-muted-foreground max-w-sm">
                                You have {sessions.filter(s => s.status !== "COMPLETED" && s.status !== "CANCELLED").length} upcoming sessions.
                                <br />
                                Check <a href="/tutor/sessions" className="text-primary hover:underline">My Sessions</a> for details.
                            </p>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
