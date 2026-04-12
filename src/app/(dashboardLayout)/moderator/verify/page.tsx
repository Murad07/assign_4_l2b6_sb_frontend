import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck, Clock, CheckCircle2, AlertCircle } from "lucide-react";
import { AdminService } from "@/services/admin.service";
import TutorDataTable from "@/components/modules/admin/tutor/TutorDataTable";
import { unstable_noStore as noStore } from "next/cache";

export const dynamic = "force-dynamic";

export default async function ModeratorVerifyPage() {
    noStore();
    let pendingTutors = [];

    try {
        const res = await AdminService.getPendingTutors();
        pendingTutors = Array.isArray(res.data) ? res.data : [];
    } catch (error) {
        console.error("Moderator failed to fetch pending tutors:", error);
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex flex-col gap-1">
                    <h1 className="text-3xl font-black tracking-tighter sm:text-4xl text-primary">
                        Quality Assurance
                    </h1>
                    <p className="text-muted-foreground text-sm font-medium">
                        Verify new tutor credentials and maintain educational standards.
                    </p>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                <Card className="rounded-3xl border-primary/5 bg-background shadow-xl shadow-primary/5">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-xs font-black uppercase text-muted-foreground tracking-widest">Awaiting Review</CardTitle>
                        <Clock className="h-5 w-5 text-primary" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-black tracking-tighter">{pendingTutors.length}</div>
                        <div className="flex items-center gap-1 mt-1 text-[10px] font-black uppercase text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full w-fit">
                            <AlertCircle className="h-3 w-3" />
                            Action Required
                        </div>
                    </CardContent>
                </Card>

                <Card className="rounded-3xl border-primary/5 bg-background shadow-xl shadow-primary/5">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-xs font-black uppercase text-muted-foreground tracking-widest">Platform Status</CardTitle>
                        <ShieldCheck className="h-5 w-5 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-black tracking-tighter italic text-green-600 uppercase">Secure</div>
                        <p className="text-[10px] font-bold text-muted-foreground mt-1">Verification system active</p>
                    </CardContent>
                </Card>

                <Card className="rounded-3xl border-primary/5 bg-primary text-white shadow-xl shadow-primary/20">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-xs font-black uppercase text-white/70 tracking-widest">Moderator Mission</CardTitle>
                        <CheckCircle2 className="h-5 w-5 text-white" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-lg font-black leading-tight">Ensure 100% Expert Verification</div>
                        <p className="text-[10px] font-medium text-white/70 mt-1 italic">Standards exceed expectations</p>
                    </CardContent>
                </Card>
            </div>

            <Card className="rounded-[2.5rem] border-primary/5 bg-background/50 backdrop-blur-sm overflow-hidden shadow-2xl shadow-primary/5 border-t-4 border-t-primary">
                <CardHeader className="bg-primary/5 border-b border-primary/5 py-8">
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-xl font-black tracking-tighter">
                            Verification Queue
                            <span className="ml-3 text-xs font-black uppercase bg-primary text-white px-3 py-1 rounded-full">
                                {pendingTutors.length} Applications
                            </span>
                        </CardTitle>
                    </div>
                </CardHeader>
                <CardContent className="p-6">
                    <TutorDataTable tutors={pendingTutors} />
                </CardContent>
            </Card>
        </div>
    );
}
