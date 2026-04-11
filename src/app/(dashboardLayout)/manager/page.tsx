import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Users, Settings, Bell } from "lucide-react";

export default function ManagerDashboard() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold tracking-tight">Manager Dashboard</h1>
                <div className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full uppercase tracking-wider">
                    Executive Access
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Revenue Growth</CardTitle>
                        <BarChart3 className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">+12.5%</div>
                        <p className="text-xs text-muted-foreground">From last month</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Staff</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">24</div>
                        <p className="text-xs text-muted-foreground">Internal team</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Config Sync</CardTitle>
                        <Settings className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">Synced</div>
                        <p className="text-xs text-muted-foreground">Nodes operational</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Alert Queue</CardTitle>
                        <Bell className="h-4 w-4 text-primary animate-pulse" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">3</div>
                        <p className="text-xs text-muted-foreground">Urgent actions</p>
                    </CardContent>
                </Card>
            </div>

            <div className="rounded-xl border bg-card text-card-foreground shadow-sm overflow-hidden">
                <div className="bg-primary/5 p-4 border-b">
                    <h3 className="font-semibold text-primary">Managerial Overview</h3>
                </div>
                <div className="p-6 space-y-4">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        Welcome to the Strategic Management interface. This view provides high-level metrics and system configuration options tailored for platform managers.
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 rounded-lg bg-muted/30 border border-dashed">
                            <span className="text-xs font-bold uppercase text-muted-foreground">Target Compliance</span>
                            <div className="mt-1 h-2 bg-muted rounded-full overflow-hidden">
                                <div className="h-full bg-primary w-[85%]"></div>
                            </div>
                        </div>
                        <div className="p-4 rounded-lg bg-muted/30 border border-dashed">
                            <span className="text-xs font-bold uppercase text-muted-foreground">System Integrity</span>
                            <div className="mt-1 flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                <span className="text-sm font-medium">Stable</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
