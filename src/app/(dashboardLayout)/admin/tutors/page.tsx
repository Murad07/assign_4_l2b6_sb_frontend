import { AdminService } from "@/services/admin.service";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TutorDataTable from "@/components/modules/admin/tutor/TutorDataTable";

export const dynamic = "force-dynamic";

export default async function TutorApprovalsPage() {
    const res = await AdminService.getPendingTutors();
    // Ensure we handle potentially missing data safely
    const pendingTutors = Array.isArray(res.data) ? res.data : [];

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex flex-col gap-1">
                    <h1 className="text-3xl font-black tracking-tighter sm:text-4xl text-primary">
                        Tutor Verification
                    </h1>
                    <p className="text-muted-foreground text-sm font-medium">
                        Review and authorize professional tutor applications.
                    </p>
                </div>
            </div>

            <Card className="rounded-[2.5rem] border-primary/5 bg-background/50 backdrop-blur-sm overflow-hidden shadow-2xl shadow-primary/5">
                <CardHeader className="bg-primary/5 border-b border-primary/5 py-8">
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-xl font-black tracking-tighter">
                            Awaiting Review
                            <span className="ml-3 text-xs font-black uppercase bg-primary text-white px-3 py-1 rounded-full">
                                {pendingTutors.length} Total
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
