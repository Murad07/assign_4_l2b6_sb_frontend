import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileCheck, Search, ShieldCheck, Clock } from "lucide-react";

export default function ModeratorVerifyPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight">Profile Verification</h1>

            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Pending Tutors</CardTitle>
                        <Clock className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">18</div>
                        <p className="text-xs text-muted-foreground">Est results: 4h wait</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Verified (This Week)</CardTitle>
                        <ShieldCheck className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">124</div>
                        <p className="text-xs text-muted-foreground">+5% from last week</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Auto-Flagged</CardTitle>
                        <Search className="h-4 w-4 text-amber-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">4</div>
                        <p className="text-xs text-muted-foreground">Suspicious patterns</p>
                    </CardContent>
                </Card>
            </div>

            <div className="rounded-xl border bg-card p-6 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="font-semibold text-lg">Verification Queue</h3>
                    <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <input className="pl-9 h-9 w-64 rounded-md border bg-muted/50 text-sm focus:outline-primary/50" placeholder="Search by name or ID..." />
                    </div>
                </div>

                <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="flex flex-col md:flex-row md:items-center justify-between p-4 rounded-xl border hover:bg-muted/10 transition-colors gap-4">
                            <div className="flex items-center gap-4">
                                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                                    <FileCheck className="h-6 w-6" />
                                </div>
                                <div>
                                    <p className="font-bold">Prof. Robert Smith</p>
                                    <p className="text-xs text-muted-foreground">Applied for: Physics Specialist</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="text-xs font-medium px-2 py-1 bg-muted rounded">Doc: PhD_Cert.pdf</span>
                                <button className="bg-primary text-primary-foreground px-4 py-1.5 rounded-lg text-xs font-bold hover:opacity-90 transition-opacity">Verify Now</button>
                                <button className="border px-4 py-1.5 rounded-lg text-xs font-bold hover:bg-muted transition-colors text-destructive">Decline</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
