"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function Sidebar() {
    const pathname = usePathname();

    // TODO: Dynamic links based on Auth Role
    const sidebarLinks = [
        { name: "Dashboard", href: "/dashboard" },
        { name: "My Bookings", href: "/dashboard/bookings" },
        { name: "Profile", href: "/dashboard/profile" },
    ];

    return (
        <aside className="w-64 border-r bg-muted/10 hidden md:block min-h-screen p-6">
            <div className="mb-8 px-2">
                <Link href="/" className="text-2xl font-bold text-primary">SkillBridge</Link>
            </div>
            <nav className="space-y-2">
                {sidebarLinks.map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        className={cn(
                            "block px-4 py-2 rounded-md text-sm font-medium transition-colors",
                            pathname === link.href
                                ? "bg-primary text-primary-foreground"
                                : "hover:bg-muted text-foreground"
                        )}
                    >
                        {link.name}
                    </Link>
                ))}
            </nav>
        </aside>
    )
}
