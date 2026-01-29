import Sidebar from "@/components/layout/Sidebar";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen">
            <Sidebar />
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
