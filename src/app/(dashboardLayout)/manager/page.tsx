import DashboardOverview from "@/components/modules/dashboard/DashboardOverview";
import { getOverviewData } from "@/actions/overview";

export const dynamic = "force-dynamic";

export default async function ManagerDashboard() {
    const data = await getOverviewData();

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div className="flex flex-col gap-1">
                    <h1 className="text-3xl font-black tracking-tighter sm:text-4xl text-primary">
                        Manager Dashboard
                    </h1>
                    <p className="text-muted-foreground text-sm font-medium">
                        Strategic operations and platform performance metrics.
                    </p>
                </div>
                <div className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-black rounded-full uppercase tracking-tighter ring-1 ring-primary/20">
                    Executive Access
                </div>
            </div>

            <DashboardOverview data={data} />
        </div>
    );
}
