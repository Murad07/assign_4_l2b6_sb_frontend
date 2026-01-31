import { TutorService } from "@/services/tutor.service";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User } from "lucide-react";
import BookingStatusAction from "@/components/modules/booking/BookingStatusAction";

export default async function TutorSessionsPage() {
    let sessions = [];
    try {
        const res = await TutorService.getMySessions();
        sessions = res.data || [];
    } catch (error) {
        console.error("Failed to fetch sessions:", error);
    }

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight">My Sessions</h1>

            {sessions.length === 0 ? (
                <Card>
                    <CardContent className="flex flex-col items-center justify-center py-12 text-center h-[300px]">
                        <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
                        <h3 className="text-lg font-semibold">No scheduled sessions</h3>
                        <p className="text-muted-foreground mt-2">
                            You don't have any upcoming teaching sessions.
                        </p>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {sessions.map((session: any) => {
                        const studentName = session.student?.name || "Student";
                        const subject = session.subject || "Session";
                        const startTime = new Date(session.startTime);
                        const endTime = new Date(session.endTime);

                        return (
                            <Card key={session.id}>
                                <CardHeader className="pb-2">
                                    <div className="flex justify-between items-start">
                                        <CardTitle className="text-lg">{subject}</CardTitle>
                                        <Badge variant={session.status === "CONFIRMED" ? "default" : "secondary"}>
                                            {session.status || "PENDING"}
                                        </Badge>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <User className="h-4 w-4" />
                                        <span>{studentName}</span>
                                    </div>
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
                                    <BookingStatusAction bookingId={session.id} currentStatus={session.status} isTutor={true} />
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
