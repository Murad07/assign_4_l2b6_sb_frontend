export const dynamic = "force-dynamic";

import Sidebar from "@/components/layout/Sidebar";
import { AuthService } from "@/services/auth.service";

import { redirect } from "next/navigation";

import UserDropdown from "@/components/layout/UserDropdown";

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
        <div className="flex min-h-screen bg-background">
            <Sidebar user={user} />
            <main className="flex-1 lg:max-w-7xl lg:mx-auto w-full">
                <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-sm border-b px-8 h-16 flex justify-between items-center transition-all duration-300">
                    <h1 className="text-xl font-bold tracking-tight text-foreground/80 lowercase first-letter:uppercase">
                        / {user.role} Dashboard
                    </h1>
                    <UserDropdown user={user} />
                </header>
                <div className="p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
