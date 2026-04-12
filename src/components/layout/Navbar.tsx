"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import React from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetDescription } from "@/components/ui/sheet";
import {
    Menu,
    ChevronDown,
    GraduationCap,
    Users,
    Info,
    Phone,
    Star,
    Search,
    Newspaper,
    Home,
    LayoutDashboard,
    User as UserIcon,
    LogOut,
    Settings,
    Layers
} from "lucide-react";

import { ThemeToggle } from "@/components/layout/ThemeToggle";
import UserDropdown from "@/components/layout/UserDropdown";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

import { User } from "@/types";

export default function Navbar({ user }: { user?: User | null }) {
    const pathname = usePathname();
    const router = useRouter();
    const [open, setOpen] = React.useState(false);

    const navLinks = [
        { name: "Home", href: "/", icon: <Home className="w-4 h-4" /> },
        { name: "Find Tutors", href: "/tutors", icon: <Users className="w-4 h-4" /> },
        { name: "Become a Tutor", href: "/become-tutor", icon: <GraduationCap className="w-4 h-4" /> },
        { name: "Reviews", href: "/reviews", icon: <Star className="w-4 h-4" /> },
        { name: "Blog", href: "/blog", icon: <Newspaper className="w-4 h-4" /> },
        { name: "About Us", href: "/about", icon: <Info className="w-4 h-4" /> },
        { name: "Contact", href: "/contact", icon: <Phone className="w-4 h-4" /> },
    ];

    const handleLogout = async () => {
        const { authClient } = await import("@/lib/auth-client");
        const { logoutUser: serverLogout } = await import("@/actions/auth");

        // 1. Purge custom tokens via server action
        await serverLogout();

        // 2. Official sign out
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    window.location.href = "/login";
                },
            },
        });
    };

    const getDashboardLink = () => {
        const role = user?.role;
        if (role === "Tutor") return "/tutor/dashboard";
        if (role === "Admin") return "/admin";
        if (role === "Manager") return "/manager";
        if (role === "Moderator") return "/moderator";
        return "/dashboard";
    };

    const getProfileLink = () => {
        const role = user?.role;
        if (role === "Tutor") return "/tutor/profile";
        if (role === "Manager") return "/manager/profile";
        if (role === "Moderator") return "/moderator/profile";
        if (role === "Admin") return "/admin/profile";
        return "/dashboard/profile";
    };

    return (
        <nav className="border-b bg-background/95 backdrop-blur-md sticky top-0 z-50 transition-all duration-300">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <div className="flex items-center gap-8">
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-black group-hover:rotate-12 transition-transform shadow-lg shadow-primary/20">
                            S
                        </div>
                        <span className="text-2xl font-black bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                            SkillBridge
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-6">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`text-sm font-semibold transition-all hover:text-primary relative py-2 ${pathname === link.href ? "text-primary" : "text-muted-foreground"
                                    }`}
                            >
                                {link.name}
                                {pathname === link.href && (
                                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full" />
                                )}
                            </Link>
                        ))}

                        <DropdownMenu>
                            <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-semibold text-muted-foreground hover:text-primary transition-colors outline-none">
                                <Layers className="w-4 h-4" /> Browse <ChevronDown className="w-3 h-3" />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="start" className="w-56 p-2 rounded-xl border-primary/10 shadow-2xl">
                                <DropdownMenuLabel className="text-xs uppercase tracking-wider text-muted-foreground font-bold">Subjects</DropdownMenuLabel>
                                <DropdownMenuSeparator className="my-1 opacity-50" />
                                <DropdownMenuItem className="rounded-lg h-10 px-3 cursor-pointer" onClick={() => router.push("/tutors?category=mathematics")}>Mathematics</DropdownMenuItem>
                                <DropdownMenuItem className="rounded-lg h-10 px-3 cursor-pointer" onClick={() => router.push("/tutors?category=programming")}>Programming</DropdownMenuItem>
                                <DropdownMenuItem className="rounded-lg h-10 px-3 cursor-pointer" onClick={() => router.push("/tutors?category=science")}>Science</DropdownMenuItem>
                                <DropdownMenuItem className="rounded-lg h-10 px-3 cursor-pointer" onClick={() => router.push("/tutors?category=languages")}>Languages</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <ThemeToggle />

                    {/* Desktop Auth Section */}
                    <div className="hidden md:flex items-center gap-3">
                        {user ? (
                            <>
                                <Link href={getDashboardLink()}>
                                    <Button variant="ghost" className="font-semibold gap-2 border hover:bg-muted/50">
                                        <LayoutDashboard className="w-4 h-4" /> Dashboard
                                    </Button>
                                </Link>
                                <UserDropdown user={user} />
                            </>
                        ) : (
                            <>
                                <Link href="/login">
                                    <Button variant="ghost" className="font-semibold hover:bg-primary/5 px-6">Log In</Button>
                                </Link>
                                <Link href="/register">
                                    <Button className="font-bold px-6 shadow-xl shadow-primary/20 hover:shadow-primary/30 transition-all active:scale-95">
                                        Join Now
                                    </Button>
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Trigger */}
                    <div className="lg:hidden">
                        <Sheet open={open} onOpenChange={setOpen}>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="w-10 h-10 rounded-full hover:bg-muted active:scale-90 transition-all">
                                    <Menu className="h-5 w-5" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right" className="w-full sm:max-w-md p-0 overflow-hidden flex flex-col border-l-0">
                                {/* Header with Gradient Background */}
                                <div className="absolute top-0 right-0 left-0 h-32 bg-gradient-to-br from-primary/10 via-transparent to-transparent -z-10" />

                                <div className="p-6 flex flex-col h-full">
                                    <SheetHeader className="mb-8 block text-left">
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="w-6 h-6 bg-primary rounded-md flex items-center justify-center text-primary-foreground font-bold text-xs">S</div>
                                            <SheetTitle className="text-xl font-black">SkillBridge</SheetTitle>
                                        </div>
                                        <SheetDescription className="text-sm font-medium">Connect with export tutors worldwide.</SheetDescription>
                                    </SheetHeader>

                                    {/* Scrollable Content Area */}
                                    <div className="flex-1 overflow-y-auto pr-2 -mr-2 space-y-8 no-scrollbar">
                                        {/* User Section (If Logged In) */}
                                        {user && (
                                            <div className="bg-muted/30 p-4 rounded-2xl border border-primary/5 space-y-4 shadow-sm relative overflow-hidden group">
                                                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full -mr-8 -mt-8 transition-transform group-hover:scale-110" />
                                                <div className="flex items-center gap-4">
                                                    <Avatar className="h-14 w-14 ring-4 ring-background shadow-md">
                                                        <AvatarImage src={user.image || ""} alt={user.name} />
                                                        <AvatarFallback className="bg-primary text-primary-foreground font-black text-lg">
                                                            {user.name?.charAt(0)}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-base font-bold truncate">{user.name}</p>
                                                        <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                                                        <Badge className="mt-1 h-5 text-[10px] uppercase tracking-tighter" variant="secondary">{user.role}</Badge>
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-2 gap-2">
                                                    <Link href={getDashboardLink()} className="w-full" onClick={() => setOpen(false)}>
                                                        <Button size="sm" className="w-full text-xs font-bold h-9">Dashboard</Button>
                                                    </Link>
                                                    <Link href={getProfileLink()} className="w-full" onClick={() => setOpen(false)}>
                                                        <Button size="sm" variant="outline" className="w-full text-xs font-bold h-9">Profile</Button>
                                                    </Link>
                                                </div>
                                            </div>
                                        )}

                                        {/* Main Links Section */}
                                        <div className="space-y-4">
                                            <p className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground/60 px-2">Navigation</p>
                                            <div className="grid gap-1">
                                                {navLinks.map((link) => (
                                                    <Link
                                                        key={link.href}
                                                        href={link.href}
                                                        onClick={() => setOpen(false)}
                                                        className={`flex items-center gap-4 px-3 py-3 rounded-xl transition-all group ${pathname === link.href
                                                            ? "bg-primary/10 text-primary font-bold shadow-sm shadow-primary/5"
                                                            : "hover:bg-muted font-medium"
                                                            }`}
                                                    >
                                                        <div className={`p-2 rounded-lg transition-colors ${pathname === link.href ? "bg-primary text-primary-foreground" : "bg-muted group-hover:bg-background"
                                                            }`}>
                                                            {link.icon}
                                                        </div>
                                                        <span className="text-base">{link.name}</span>
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Categories Quick Access */}
                                        <div className="space-y-4 pb-4">
                                            <p className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground/60 px-2">Explore</p>
                                            <div className="grid grid-cols-2 gap-2">
                                                {["Mathematics", "Programming", "Science", "Languages"].map((cat) => (
                                                    <button
                                                        key={cat}
                                                        onClick={() => {
                                                            router.push(`/tutors?category=${cat.toLowerCase()}`);
                                                            setOpen(false);
                                                        }}
                                                        className="px-4 py-3 bg-muted/40 hover:bg-primary/5 hover:text-primary border border-transparent hover:border-primary/20 rounded-xl text-sm font-bold transition-all text-left flex items-center justify-between"
                                                    >
                                                        {cat}
                                                        <div className="w-1 h-1 rounded-full bg-primary/40" />
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Sticky Bottom Actions */}
                                    <div className="pt-6 mt-auto border-t space-y-4 bg-background">
                                        {user ? (
                                            <Button
                                                variant="ghost"
                                                className="w-full justify-start h-12 gap-4 text-destructive hover:text-destructive hover:bg-destructive/5 rounded-xl font-bold transition-colors"
                                                onClick={handleLogout}
                                            >
                                                <div className="p-2 bg-destructive/10 rounded-lg">
                                                    <LogOut className="w-4 h-4" />
                                                </div>
                                                Log Out
                                            </Button>
                                        ) : (
                                            <div className="grid grid-cols-2 gap-3 pb-2">
                                                <Link href="/login" className="w-full" onClick={() => setOpen(false)}>
                                                    <Button variant="outline" className="w-full h-12 font-bold rounded-xl border-primary/20">Log In</Button>
                                                </Link>
                                                <Link href="/register" className="w-full" onClick={() => setOpen(false)}>
                                                    <Button className="w-full h-12 font-black rounded-xl shadow-lg shadow-primary/20">Join Now</Button>
                                                </Link>
                                            </div>
                                        )}
                                        <div className="flex items-center justify-center gap-6 px-4 py-2 opacity-40">
                                            <Star className="w-3 h-3" />
                                            <div className="w-1 h-1 rounded-full bg-muted-foreground" />
                                            <Star className="w-3 h-3 text-primary" />
                                            <div className="w-1 h-1 rounded-full bg-muted-foreground" />
                                            <Star className="w-3 h-3" />
                                        </div>
                                    </div>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </nav>
    );
}
