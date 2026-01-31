"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { updateBookingStatus } from "@/actions/booking";
import { toast } from "sonner";
import { CheckCircle, XCircle } from "lucide-react";

interface BookingStatusActionProps {
    bookingId: string;
    currentStatus?: string;
    isTutor?: boolean;
}

export default function BookingStatusAction({ bookingId, currentStatus, isTutor }: BookingStatusActionProps) {
    const [isLoading, setIsLoading] = useState(false);

    const handleUpdate = async (status: "COMPLETED" | "CANCELLED") => {
        setIsLoading(true);
        try {
            const res = await updateBookingStatus(bookingId, status);
            if (res.success) {
                toast.success(`Booking marked as ${status.toLowerCase()}`);
            } else {
                toast.error(res.error);
            }
        } catch (error) {
            toast.error("An error occurred");
        } finally {
            setIsLoading(false);
        }
    };

    if (currentStatus === "COMPLETED" || currentStatus === "CANCELLED") {
        return null; // Don't show actions if already final
    }

    if (isTutor) {
        // Tutor can calculate "Mark as Complete"
        return (
            <Button
                size="sm"
                variant="outline"
                className="w-full mt-2"
                onClick={() => handleUpdate("COMPLETED")}
                disabled={isLoading}
            >
                <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                {isLoading ? "Updating..." : "Mark as Completed"}
            </Button>
        );
    }

    // Student can "Cancel"
    return (
        <Button
            size="sm"
            variant="destructive"
            className="w-full mt-2"
            onClick={() => handleUpdate("CANCELLED")}
            disabled={isLoading}
        >
            <XCircle className="mr-2 h-4 w-4" />
            {isLoading ? "Updating..." : "Cancel Booking"}
        </Button>
    );
}
