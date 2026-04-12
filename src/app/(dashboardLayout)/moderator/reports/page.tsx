import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { MessageSquare, ShieldAlert, CheckCircle, SearchX } from "lucide-react";

export default function ModeratorReportsPage() {
    // In a real scenario, this would fetch from a 'reports' table.
    // Since we don't have it yet, we show a professional empty state.
    const activeReports = [];

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-1">
                <h1 className="text-3xl font-black tracking-tighter sm:text-4xl text-primary">
                    Content Oversight
                </h1>
                <p className="text-muted-foreground text-sm font-medium">
                    Monitor and resolve reported content to ensure platform safety.
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                <Card className="rounded-3xl border-primary/5 bg-background shadow-xl shadow-primary/5">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-xs font-black uppercase text-muted-foreground tracking-widest">Active Tickets</CardTitle>
                        <ShieldAlert className="h-5 w-5 text-primary" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-black tracking-tighter">0</div>
                        <p className="text-[10px] font-bold text-muted-foreground mt-1">Platform is currently clean</p>
                    </CardContent>
                </Card>

                <Card className="rounded-3xl border-primary/5 bg-background shadow-xl shadow-primary/5">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-xs font-black uppercase text-muted-foreground tracking-widest">In Review</CardTitle>
                        <MessageSquare className="h-5 w-5 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-black tracking-tighter">0</div>
                        <p className="text-[10px] font-bold text-muted-foreground mt-1">No pending investigations</p>
                    </CardContent>
                </Card>

                <Card className="rounded-3xl border-primary/5 bg-background shadow-xl shadow-primary/5">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-xs font-black uppercase text-muted-foreground tracking-widest">Resolved</CardTitle>
                        <CheckCircle className="h-5 w-5 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-black tracking-tighter">0</div>
                        <p className="text-[10px] font-bold text-green-600 mt-1 uppercase">Maintain 100% resolution</p>
                    </CardContent>
                </Card>
            </div>

            <Card className="rounded-[2.5rem] border-primary/5 bg-background/50 backdrop-blur-sm overflow-hidden shadow-2xl shadow-primary/5 min-h-[400px] flex flex-col items-center justify-center p-12 text-center">
                <div className="p-6 bg-primary/5 rounded-full mb-6">
                    <SearchX className="h-12 w-12 text-primary/40" />
                </div>
                <h3 className="text-xl font-black tracking-tighter mb-2">Queue is Clear!</h3>
                <p className="text-muted-foreground text-sm max-w-sm leading-relaxed decoration-primary/30">
                    Excellent work. There are no active reports or flagged content requiring attention at this time.
                </p>
            </Card>
        </div>
    );
}
