import DashboardOverview from "@/components/modules/dashboard/DashboardOverview";
import { getOverviewData } from "@/actions/overview";

export const dynamic = "force-dynamic";

export default async function StudentDashboard() {
    const data = await getOverviewData();

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-1">
                <h1 className="text-3xl font-black tracking-tighter sm:text-4xl text-primary">
                    Student Dashboard
                </h1>
                <p className="text-muted-foreground text-sm font-medium">
                    Welcome back! Here's a look at your learning progress.
                </p>
            </div>

            <DashboardOverview data={data} />
        </div>
    );
}
