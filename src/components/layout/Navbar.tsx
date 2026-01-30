"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

import { authClient } from "@/lib/auth-client";
import { logoutUser } from "@/actions/auth";
import { useRouter } from "next/navigation";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { User } from "@/types";

export default function Navbar({ user }: { user?: User | null }) {
    const pathname = usePathname();
    const router = useRouter();
    // const { data: session } = authClient.useSession();
    // console.log("Navbar session:", session);
    // const user = session?.user as User | undefined;
    console.log("Navbar user:", user);

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Find Tutors", href: "/tutors" },
    ];

    const handleLogout = async () => {
        await logoutUser();
        window.location.reload(); // Refresh to update auth state
    };

    const getDashboardLink = () => {
        if (user?.role === "Tutor") return "/tutor/dashboard";
        if (user?.role === "Admin") return "/admin";
        return "/dashboard";
    };

    return (
        <nav className="border-b bg-background sticky top-0 z-50">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link href="/" className="text-2xl font-bold text-primary">
                    SkillBridge
                </Link>

                <div className="hidden md:flex items-center gap-6">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`text-sm font-medium transition-colors hover:text-primary ${pathname === link.href ? "text-primary" : "text-muted-foreground"
                                }`}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                <div className="flex items-center gap-4">
                    {user ? (
                        <>
                            <Link href={getDashboardLink()}>
                                <Button variant="outline">Dashboard</Button>
                            </Link>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                                        <Avatar className="h-8 w-8">
                                            <AvatarImage src={user.image || ""} alt={user.name} />
                                            <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56" align="end" forceMount>
                                    <DropdownMenuLabel className="font-normal">
                                        <div className="flex flex-col space-y-1">
                                            <p className="text-sm font-medium leading-none">{user.name}</p>
                                            <p className="text-xs leading-none text-muted-foreground">
                                                {user.email}
                                            </p>
                                        </div>
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={() => router.push(getDashboardLink())}>
                                        Dashboard
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={handleLogout}>
                                        Log out
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </>
                    ) : (
                        <>
                            <Link href="/login">
                                <Button variant="ghost">Log In</Button>
                            </Link>
                            <Link href="/register">
                                <Button>Sign Up</Button>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}
