import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, FileWarning, CheckCircle2, Search } from "lucide-react";

export default function ModeratorDashboard() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold tracking-tight">Moderation Hub</h1>
                <div className="px-3 py-1 bg-amber-500/10 text-amber-600 text-xs font-bold rounded-full uppercase tracking-wider">
                    Staff Restricted
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Pending Reviews</CardTitle>
                        <Search className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">14</div>
                        <p className="text-xs text-muted-foreground">Tutor profiles</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Reported Content</CardTitle>
                        <FileWarning className="h-4 w-4 text-destructive" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">5</div>
                        <p className="text-xs text-muted-foreground">User reports</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Resolved Today</CardTitle>
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">32</div>
                        <p className="text-xs text-muted-foreground">Cases closed</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Policy Match</CardTitle>
                        <Shield className="h-4 w-4 text-primary" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">99.8%</div>
                        <p className="text-xs text-muted-foreground">Auto-scan accuracy</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="rounded-xl border bg-card p-6 shadow-sm">
                    <h3 className="font-semibold mb-4 text-lg">Active Review Queue</h3>
                    <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/20 border">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                                        T{i}
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium">New Tutor Application #{i}04</p>
                                        <p className="text-xs text-muted-foreground">Submitted 2h ago</p>
                                    </div>
                                </div>
                                <button className="text-xs font-bold text-primary hover:underline">Review Now</button>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="rounded-xl border bg-card p-6 shadow-sm">
                    <h3 className="font-semibold mb-4 text-lg">Moderator Guidelines</h3>
                    <div className="prose prose-sm text-muted-foreground max-w-none">
                        <ul className="text-sm space-y-2 list-disc pl-4">
                            <li>Always verify educational certificates before approval.</li>
                            <li>Flag any profile containing external contact information.</li>
                            <li>Respond to user reports within 24 hours of submission.</li>
                            <li>Maintain the SkillBridge community standards at all times.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
