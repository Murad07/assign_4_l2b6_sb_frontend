import DashboardOverview from "@/components/modules/dashboard/DashboardOverview";
import { getOverviewData } from "@/actions/overview";

export const dynamic = "force-dynamic";

export default async function ModeratorDashboard() {
    const data = await getOverviewData();

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div className="flex flex-col gap-1">
                    <h1 className="text-3xl font-black tracking-tighter sm:text-4xl text-primary">
                        Moderation Hub
                    </h1>
                    <p className="text-muted-foreground text-sm font-medium">
                        Platform integrity and content moderation oversight.
                    </p>
                </div>
                <div className="px-3 py-1 bg-amber-500/10 text-amber-600 text-[10px] font-black rounded-full uppercase tracking-tighter ring-1 ring-amber-500/20">
                    Staff Restricted
                </div>
            </div>

            <DashboardOverview data={data} />
        </div>
    );
}
