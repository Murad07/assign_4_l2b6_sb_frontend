"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { approveTutorAction, rejectTutorAction } from "@/actions/admin";
import { toast } from "sonner";
import { Check, X } from "lucide-react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Badge } from "@/components/ui/badge";

interface PendingTutorActionsProps {
    tutorId: string;
    isApproved?: boolean;
}

export default function PendingTutorActions({ tutorId, isApproved }: PendingTutorActionsProps) {
    const [isLoading, setIsLoading] = useState(false);

    const handleApprove = async () => {
        setIsLoading(true);
        try {
            const res = await approveTutorAction(tutorId);
            if (res.success) {
                toast.success("Tutor approved successfully");
            } else {
                toast.error(res.message);
            }
        } catch (error) {
            toast.error("Failed to approve tutor");
        } finally {
            setIsLoading(false);
        }
    };

    // ... inside the component ...

    const handleReject = async () => {
        // Removed window.confirm

        setIsLoading(true);
        try {
            const res = await rejectTutorAction(tutorId);
            if (res.success) {
                toast.success("Tutor rejected successfully");
            } else {
                toast.error(res.message);
            }
        } catch (error) {
            toast.error("Failed to reject tutor");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center gap-2">
            <Button
                size="sm"
                variant="outline"
                className="text-green-600 hover:text-green-700 hover:bg-green-50"
                onClick={handleApprove}
                disabled={isLoading || isApproved}
            >
                <Check className="h-4 w-4 mr-1" />
                {isApproved ? "Approved" : "Approve"}
            </Button>

            {isApproved === false ? (
                <Badge variant="destructive">Rejected</Badge>
            ) : (
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button
                            size="sm"
                            variant="outline"
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            disabled={isLoading}
                        >
                            <X className="h-4 w-4 mr-1" />
                            Reject
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Reject Tutor Application</AlertDialogTitle>
                            <AlertDialogDescription>
                                Are you sure you want to reject this tutor? This action cannot be undone.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={handleReject} className="bg-red-600 hover:bg-red-700">
                                Reject
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            )}
        </div>
    );
}
