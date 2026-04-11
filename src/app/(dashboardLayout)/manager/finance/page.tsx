import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, ArrowUpRight, ArrowDownRight, CreditCard } from "lucide-react";

export default function ManagerFinancePage() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight">Financial Overview</h1>

            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">$12,234.00</div>
                        <p className="flex items-center text-xs text-green-500">
                            <ArrowUpRight className="mr-1 h-3 w-3" /> +15.2% from last month
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Payouts Pending</CardTitle>
                        <CreditCard className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">$4,500.00</div>
                        <p className="text-xs text-muted-foreground text-amber-500">
                            12 Tutors awaiting payout
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Operation Costs</CardTitle>
                        <ArrowDownRight className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">$2,100.00</div>
                        <p className="text-xs text-muted-foreground">-2% optimizations</p>
                    </CardContent>
                </Card>
            </div>

            <div className="rounded-xl border bg-card p-6 shadow-sm">
                <h3 className="font-semibold mb-4">Recent Transactions</h3>
                <div className="space-y-4">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                            <div>
                                <p className="text-sm font-medium">Tutor Payment #{1000 + i}</p>
                                <p className="text-xs text-muted-foreground">Processed on Oct {i + 10}, 2023</p>
                            </div>
                            <div className="text-sm font-bold text-green-600">-$240.00</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
