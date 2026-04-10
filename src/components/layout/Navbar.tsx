"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
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
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Menu, ChevronDown, GraduationCap, Users, Info, Phone, Star, Search } from "lucide-react";

import { ThemeToggle } from "@/components/layout/ThemeToggle";

import { User } from "@/types";

export default function Navbar({ user }: { user?: User | null }) {
    const pathname = usePathname();
    const router = useRouter();

    const navLinks = [
        { name: "Home", href: "/", icon: <Search className="w-4 h-4" /> },
        { name: "Find Tutors", href: "/tutors", icon: <Users className="w-4 h-4" /> },
        { name: "Become a Tutor", href: "/become-tutor", icon: <GraduationCap className="w-4 h-4" /> },
        { name: "Reviews", href: "/reviews", icon: <Star className="w-4 h-4" /> },
        { name: "About Us", href: "/about", icon: <Info className="w-4 h-4" /> },
        { name: "Contact", href: "/contact", icon: <Phone className="w-4 h-4" /> },
    ];

    const handleLogout = async () => {
        await logoutUser();
        window.location.href = "/";
    };

    const getDashboardLink = () => {
        if (user?.role === "Tutor") return "/tutor/dashboard";
        if (user?.role === "Admin") return "/admin";
        return "/dashboard";
    };

    const NavItems = ({ isMobile = false }) => (
        <>
            {navLinks.map((link) => (
                <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary ${pathname === link.href ? "text-primary" : "text-muted-foreground"
                        } ${isMobile ? "text-lg py-2" : ""}`}
                >
                    {link.name}
                </Link>
            ))}

            {/* Advanced Dropdown for Categories in Desktop */}
            {!isMobile && (
                <DropdownMenu>
                    <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-primary transition-colors outline-none">
                        Browse <ChevronDown className="w-4 h-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-48">
                        <DropdownMenuLabel>Categories</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => router.push("/tutors?category=mathematics")}>Mathematics</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => router.push("/tutors?category=programming")}>Programming</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => router.push("/tutors?category=science")}>Science</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => router.push("/tutors?category=languages")}>Languages</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )}
        </>
    );

    return (
        <nav className="border-b bg-background/95 backdrop-blur-md sticky top-0 z-50 transition-all duration-300">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <div className="flex items-center gap-8">
                    <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                        SkillBridge
                    </Link>

                    <div className="hidden lg:flex items-center gap-8 relative">
                        <NavItems />
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <ThemeToggle />
                    {/* Desktop Auth Section */}
                    <div className="hidden md:flex items-center gap-4">
                        {user ? (
                            <>
                                <Link href={getDashboardLink()}>
                                    <Button variant="outline" className="border-primary/20 hover:border-primary/50">Dashboard</Button>
                                </Link>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" className="relative h-9 w-9 rounded-full ring-2 ring-primary/10 hover:ring-primary/30 transition-all">
                                            <Avatar className="h-9 w-9">
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
                                        <DropdownMenuItem onClick={() => router.push("/profile")}>
                                            Profile Settings
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem className="text-destructive focus:text-destructive" onClick={handleLogout}>
                                            Log out
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </>
                        ) : (
                            <>
                                <Link href="/login">
                                    <Button variant="ghost" className="hover:bg-primary/5">Log In</Button>
                                </Link>
                                <Link href="/register">
                                    <Button className="shadow-lg shadow-primary/20">Sign Up</Button>
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu */}
                    <div className="lg:hidden">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="md:h-10 md:w-10">
                                    <Menu className="h-6 w-6" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                                <SheetHeader>
                                    <SheetTitle className="text-left text-2xl font-bold text-primary">SkillBridge</SheetTitle>
                                </SheetHeader>
                                <div className="flex flex-col gap-4 mt-8">
                                    <NavItems isMobile />
                                    <div className="h-px bg-border my-2" />
                                    {user ? (
                                        <div className="flex flex-col gap-4">
                                            <div className="flex items-center gap-3 p-2 bg-muted/50 rounded-lg">
                                                <Avatar className="h-10 w-10">
                                                    <AvatarImage src={user.image || ""} alt={user.name} />
                                                    <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <p className="text-sm font-medium">{user.name}</p>
                                                    <p className="text-xs text-muted-foreground">{user.email}</p>
                                                </div>
                                            </div>
                                            <Link href={getDashboardLink()}>
                                                <Button className="w-full">Dashboard</Button>
                                            </Link>
                                            <Button variant="outline" className="w-full" onClick={handleLogout}>
                                                Log Out
                                            </Button>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col gap-3">
                                            <Link href="/login">
                                                <Button variant="outline" className="w-full">Log In</Button>
                                            </Link>
                                            <Link href="/register">
                                                <Button className="w-full">Sign Up</Button>
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </nav>
    );
}
