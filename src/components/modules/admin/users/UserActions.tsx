"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Shield, ShieldAlert, ShieldBan, ShieldCheck } from "lucide-react";
import { updateUserStatusAction, updateUserRoleAction } from "@/actions/admin";
import { toast } from "sonner";
import { User } from "@/types";

interface UserActionsProps {
    user: User;
}

export default function UserActions({ user }: UserActionsProps) {
    const [isLoading, setIsLoading] = useState(false);

    const handleStatusUpdate = async (isBlocked: boolean) => {
        setIsLoading(true);
        console.log('user id', user.id, isBlocked)
        try {
            const res = await updateUserStatusAction(user.id, isBlocked);
            console.log('res -: ', res)
            if (res.success) {
                toast.success(isBlocked ? "User blocked successfully" : "User activated successfully");
            } else {
                toast.error(res.message);
            }
        } catch (error) {
            toast.error("Failed to update status");
        } finally {
            setIsLoading(false);
        }
    };

    const handleRoleUpdate = async (role: "Student" | "Tutor" | "Admin") => {
        setIsLoading(true);
        try {
            const res = await updateUserRoleAction(user.id, role);
            if (res.success) {
                toast.success(`Role updated to ${role}`);
            } else {
                toast.error(res.message);
            }
        } catch (error) {
            toast.error("Failed to update role");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />

                {/* Status Toggles */}
                {user.isBlocked ? (
                    <DropdownMenuItem onClick={() => handleStatusUpdate(false)} disabled={isLoading}>
                        <ShieldCheck className="mr-2 h-4 w-4 text-green-500" />
                        Unban User
                    </DropdownMenuItem>
                ) : (
                    <DropdownMenuItem onClick={() => handleStatusUpdate(true)} disabled={isLoading}>
                        <ShieldBan className="mr-2 h-4 w-4 text-red-500" />
                        Ban User
                    </DropdownMenuItem>
                )}

                <DropdownMenuSeparator />
                <DropdownMenuLabel>Change Role</DropdownMenuLabel>

                <DropdownMenuItem onClick={() => handleRoleUpdate("Admin")} disabled={isLoading || user.role === "Admin"}>
                    <ShieldAlert className="mr-2 h-4 w-4" />
                    Make Admin
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleRoleUpdate("Tutor")} disabled={isLoading || user.role === "Tutor"}>
                    <Shield className="mr-2 h-4 w-4" />
                    Make Tutor
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleRoleUpdate("Student")} disabled={isLoading || user.role === "Student"}>
                    <UserIcon className="mr-2 h-4 w-4" />
                    Make Student
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

function UserIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
        </svg>
    )
}
