import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { AlertTriangle, MessageSquare, ShieldAlert, CheckCircle } from "lucide-react";

export default function ModeratorReportsPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight">Reported Content</h1>

            <div className="grid gap-4 md:grid-cols-3">
                <Card className="border-destructive/20 bg-destructive/5">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Critical Reports</CardTitle>
                        <ShieldAlert className="h-4 w-4 text-destructive" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-destructive">3</div>
                        <p className="text-xs text-muted-foreground">Immediate action required</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Standard Tickets</CardTitle>
                        <MessageSquare className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">12</div>
                        <p className="text-xs text-muted-foreground">Review in progress</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Resolved (24h)</CardTitle>
                        <CheckCircle className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">45</div>
                        <p className="text-xs text-muted-foreground">Great job team!</p>
                    </CardContent>
                </Card>
            </div>

            <div className="rounded-xl border bg-card shadow-sm">
                <div className="p-4 border-b bg-muted/50 font-bold text-xs uppercase text-muted-foreground">Queue: Active Reports</div>
                <div className="divide-y">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="p-4 flex items-start gap-4 hover:bg-muted/20 transition-colors">
                            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-600">
                                <AlertTriangle className="h-5 w-5" />
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between">
                                    <h4 className="text-sm font-bold">Harassment Report #FL-{i}92</h4>
                                    <span className="px-2 py-0.5 bg-amber-500/10 text-amber-600 text-[10px] font-bold rounded-full">PENDING</span>
                                </div>
                                <p className="text-xs text-muted-foreground mt-1">Student reported inappropriate behavior during a session. ID: USR-{i}928.</p>
                                <div className="mt-4 flex gap-2">
                                    <button className="px-3 py-1 bg-primary text-primary-foreground text-[10px] font-bold rounded hover:opacity-90 transition-opacity">Investigate</button>
                                    <button className="px-3 py-1 border text-[10px] font-bold rounded hover:bg-muted transition-colors">Dismiss</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
