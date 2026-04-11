"use client";

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
import { Button } from "@/components/ui/button";
import { User } from "@/types";

export default function UserDropdown({ user }: { user: User }) {
    const router = useRouter();

    const handleLogout = async () => {
        const { authClient } = await import("@/lib/auth-client");
        const { logoutUser: serverLogout } = await import("@/actions/auth");
        await serverLogout();
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
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full ring-2 ring-primary/10 hover:ring-primary/30 transition-all overflow-hidden p-0">
                    <Avatar className="h-10 w-10">
                        <AvatarImage src={user.image || ""} alt={user.name} />
                        <AvatarFallback className="bg-primary/5 text-primary text-xs font-bold">{user.name?.charAt(0)}</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-64 p-2" align="end" forceMount>
                <DropdownMenuLabel className="font-normal p-2">
                    <div className="flex flex-col space-y-2">
                        <div className="flex items-center justify-between">
                            <p className="text-sm font-extrabold leading-none">{user.name}</p>
                            <span className="text-[10px] font-black bg-primary/10 text-primary px-2 py-0.5 rounded-full uppercase tracking-tighter">
                                {user.role}
                            </span>
                        </div>
                        <p className="text-xs leading-none text-muted-foreground truncate">
                            {user.email}
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="my-2" />
                <DropdownMenuItem className="cursor-pointer rounded-lg py-2.5" onClick={() => router.push(getDashboardLink())}>
                    Dashboard Overview
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer rounded-lg py-2.5" onClick={() => router.push(getProfileLink())}>
                    Account Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator className="my-2" />
                <DropdownMenuItem className="text-destructive focus:text-destructive cursor-pointer rounded-lg py-2.5 font-bold" onClick={handleLogout}>
                    Log out of SkillBridge
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
