import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, UserPlus, UserCheck, Shield } from "lucide-react";

export default function ManagerStaffPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight">Staff Management</h1>

            <div className="grid gap-4 md:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Total Staff</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">12</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Moderators</CardTitle>
                        <Shield className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">8</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Support</CardTitle>
                        <UserCheck className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">4</div>
                    </CardContent>
                </Card>
                <Card>
                    <button className="flex flex-col items-center justify-center p-4 rounded-xl border-2 border-dashed border-primary/20 hover:border-primary/50 hover:bg-primary/5 transition-all h-full group">
                        <UserPlus className="h-6 w-6 text-primary mb-2 group-hover:scale-110 transition-transform" />
                        <span className="text-xs font-bold text-primary uppercase">Invite Staff</span>
                    </button>
                </Card>
            </div>

            <div className="rounded-xl border bg-card p-6 shadow-sm">
                <h3 className="font-semibold mb-4 text-lg">Staff Directory</h3>
                <div className="space-y-3">
                    {["Alex Johnson", "Sarah Williams", "Michael Chen"].map((name, i) => (
                        <div key={i} className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/30 transition-colors">
                            <div className="flex items-center gap-3">
                                <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xs">
                                    {name[0]}
                                </div>
                                <div>
                                    <p className="text-sm font-medium">{name}</p>
                                    <p className="text-xs text-muted-foreground">{i === 0 ? "Senior Manager" : "Moderator"}</p>
                                </div>
                            </div>
                            <span className="px-2 py-0.5 bg-green-500/10 text-green-600 text-[10px] font-bold rounded-full uppercase">Active</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
