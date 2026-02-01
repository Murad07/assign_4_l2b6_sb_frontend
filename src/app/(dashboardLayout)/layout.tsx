import Sidebar from "@/components/layout/Sidebar";
import { AuthService } from "@/services/auth.service";

import { redirect } from "next/navigation";

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const user = await AuthService.getCurrentUser();

    if (!user) {
        redirect("/login");
    }

    return (
        <div className="flex min-h-screen">
            <Sidebar user={user} />
            <main className="flex-1 p-8">
                <header className="mb-8 flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Dashboard</h1>
                    {/* User Dropdown / Notifications could go here */}
                    <div className="h-10 w-10 bg-muted rounded-full"></div>
                </header>
                {children}
            </main>
        </div>
    );
}
