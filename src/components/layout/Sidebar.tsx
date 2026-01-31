"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

import { User } from "@/types";

export default function Sidebar({ user }: { user?: User | null }) {
    const pathname = usePathname();
    const userRole = user?.role;

    const studentLinks = [
        { name: "Dashboard", href: "/dashboard" },
        { name: "My Bookings", href: "/dashboard/bookings" },
        { name: "Profile", href: "/dashboard/profile" },
    ];

    const tutorLinks = [
        { name: "Dashboard", href: "/tutor/dashboard" },
        { name: "My Sessions", href: "/tutor/sessions" },
        { name: "Profile", href: "/tutor/profile" },
    ];

    const adminLinks = [
        { name: "Dashboard", href: "/admin" },
        { name: "Users", href: "/admin/users" },
        { name: "Bookings", href: "/admin/bookings" },
        { name: "Categories", href: "/admin/categories" },
    ];

    let sidebarLinks = studentLinks; // Default to student
    if (userRole === "Tutor") sidebarLinks = tutorLinks;
    if (userRole === "Admin") sidebarLinks = adminLinks;

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
