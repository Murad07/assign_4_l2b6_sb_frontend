"use client";

import { motion } from "framer-motion";
import {
    Users,
    GraduationCap,
    UserCheck,
    DollarSign,
    Video,
    Clock,
    Star,
    TrendingUp,
    Calendar,
    Award,
    BookOpen,
    CreditCard
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const iconMap: any = {
    Users: <Users className="h-5 w-5" />,
    GraduationCap: <GraduationCap className="h-5 w-5" />,
    UserCheck: <UserCheck className="h-5 w-5" />,
    DollarSign: <DollarSign className="h-5 w-5" />,
    Video: <Video className="h-5 w-5" />,
    Clock: <Clock className="h-5 w-5" />,
    Star: <Star className="h-5 w-5 text-yellow-500" />,
    Calendar: <Calendar className="h-5 w-5" />,
    Award: <Award className="h-5 w-5 text-orange-500" />,
    BookOpen: <BookOpen className="h-5 w-5" />,
    CreditCard: <CreditCard className="h-5 w-5" />
};

export default function DashboardOverview({ data }: { data: any }) {
    if (!data) return <div>Failed to load overview.</div>;

    const { stats, chartData, recentActivity } = data;

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat: any, idx: number) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                    >
                        <Card className="hover:shadow-lg transition-all duration-300 border-primary/5 bg-gradient-to-br from-background to-muted/20">
                            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 text-muted-foreground">
                                <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
                                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                                    {iconMap[stat.icon] || <TrendingUp className="h-5 w-5" />}
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold tracking-tight">{stat.value}</div>
                                <p className="text-xs text-green-500 font-bold mt-1">
                                    {stat.trend} <span className="text-muted-foreground font-normal">from last month</span>
                                </p>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
                {/* Bar Chart Mockup */}
                <Card className="lg:col-span-4 border-primary/5">
                    <CardHeader>
                        <CardTitle className="text-lg font-bold">Activity Overview</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[300px] flex items-end gap-2 pb-8">
                        {chartData.main.map((datapoint: any, idx: number) => {
                            const maxValue = Math.max(...chartData.main.map((d: any) => d.value));
                            const height = (datapoint.value / maxValue) * 100;
                            return (
                                <div key={idx} className="flex-1 flex flex-col items-center gap-2 group">
                                    <div className="w-full relative flex items-end justify-center h-full">
                                        <motion.div
                                            initial={{ height: 0 }}
                                            animate={{ height: `${height}%` }}
                                            transition={{ duration: 1, delay: idx * 0.1 }}
                                            className="w-full max-w-[40px] bg-primary/80 rounded-t-sm group-hover:bg-primary transition-colors relative"
                                        >
                                            <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-popover text-popover-foreground text-[10px] px-2 py-1 rounded shadow-md pointer-events-none transition-opacity font-bold uppercase">
                                                {datapoint.value}
                                            </div>
                                        </motion.div>
                                    </div>
                                    <span className="text-[10px] text-muted-foreground font-medium uppercase rotate-[-45deg] lg:rotate-0 mt-2">
                                        {datapoint.name}
                                    </span>
                                </div>
                            );
                        })}
                    </CardContent>
                </Card>

                {/* Donut Chart Mockup */}
                <Card className="lg:col-span-3 border-primary/5">
                    <CardHeader>
                        <CardTitle className="text-lg font-bold">Distribution</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[300px] flex flex-col items-center justify-center gap-8 px-8">
                        <div className="relative w-40 h-40">
                            {/* Simple SVG Donut */}
                            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                                <circle cx="50" cy="50" r="40" fill="transparent" stroke="currentColor" strokeWidth="12" className="text-muted/10" />
                                <circle
                                    cx="50" cy="50" r="40"
                                    fill="transparent"
                                    stroke="currentColor"
                                    strokeWidth="12"
                                    strokeDasharray="251.2"
                                    strokeDashoffset={251.2 - (251.2 * 0.65)}
                                    className="text-primary"
                                    strokeLinecap="round"
                                />
                                <circle
                                    cx="50" cy="50" r="40"
                                    fill="transparent"
                                    stroke="currentColor"
                                    strokeWidth="12"
                                    strokeDasharray="251.2"
                                    strokeDashoffset={251.2 - (251.2 * 0.25)}
                                    className="text-secondary"
                                    strokeLinecap="round"
                                />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center flex-col">
                                <span className="text-2xl font-black">100%</span>
                                <span className="text-[10px] text-muted-foreground uppercase font-bold">Allocated</span>
                            </div>
                        </div>
                        <div className="w-full space-y-2">
                            {chartData.distribution.map((d: any, idx: number) => (
                                <div key={idx} className="flex items-center justify-between text-xs">
                                    <div className="flex items-center gap-2">
                                        <div className={`w-2 h-2 rounded-full ${idx === 0 ? 'bg-primary' : idx === 1 ? 'bg-secondary' : 'bg-muted'}`} />
                                        <span className="text-muted-foreground">{d.name}</span>
                                    </div>
                                    <span className="font-bold">{d.value}</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Recent Activity Table */}
            <Card className="border-primary/5">
                <CardHeader>
                    <CardTitle className="text-lg font-bold">Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="relative overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs text-muted-foreground uppercase bg-muted/30">
                                <tr>
                                    <th className="px-6 py-3 rounded-l-lg font-bold">Event Type</th>
                                    <th className="px-6 py-3 font-bold">Activity Details</th>
                                    <th className="px-6 py-3 rounded-r-lg font-bold">Timestamp</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-muted/10">
                                {recentActivity.map((activity: any) => (
                                    <tr key={activity.id} className="bg-background hover:bg-muted/10 transition-colors">
                                        <td className="px-6 py-4 font-bold text-primary">
                                            {activity.type}
                                        </td>
                                        <td className="px-6 py-4 text-muted-foreground">
                                            {activity.message}
                                        </td>
                                        <td className="px-6 py-4 text-xs font-mono">
                                            {activity.time}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
