"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { approveTutorAction, rejectTutorAction } from "@/actions/admin";
import { toast } from "sonner";
import { Check, X } from "lucide-react";

interface PendingTutorActionsProps {
    tutorId: string;
}

export default function PendingTutorActions({ tutorId }: PendingTutorActionsProps) {
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

    const handleReject = async () => {
        if (!confirm("Are you sure you want to reject this tutor?")) return;

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
                disabled={isLoading}
            >
                <Check className="h-4 w-4 mr-1" />
                Approve
            </Button>
            <Button
                size="sm"
                variant="outline"
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                onClick={handleReject}
                disabled={isLoading}
            >
                <X className="h-4 w-4 mr-1" />
                Reject
            </Button>
        </div>
    );
}
