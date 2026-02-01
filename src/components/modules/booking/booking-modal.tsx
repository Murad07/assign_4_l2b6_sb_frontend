"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { createBooking } from "@/actions/booking";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface BookingModalProps {
    tutorId: string;
    hourlyRate: number;
    availability: { day: string; slots: string[] }[];
}

export default function BookingModal({ tutorId, hourlyRate, availability }: BookingModalProps) {
    const [open, setOpen] = useState(false);
    const [selectedSlot, setSelectedSlot] = useState<{
        date: string;
        startTime: string;
        endTime: string;
        displayDate: string;
    } | null>(null);
    const [subject, setSubject] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    // Helper to generate next few available dates based on availability data
    const generateAvailableSlots = () => {
        const slots: { date: string; startTime: string; endTime: string; displayDate: string; displayTime: string }[] = [];
        const today = new Date();
        const daysMap: { [key: string]: number } = {
            "Sunday": 0, "Monday": 1, "Tuesday": 2, "Wednesday": 3,
            "Thursday": 4, "Friday": 5, "Saturday": 6
        };

        // Look ahead 14 days
        for (let i = 0; i < 14; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() + i);
            const dayName = date.toLocaleDateString("en-US", { weekday: "long" });

            const dayAvailability = availability.find(a => a.day === dayName);

            if (dayAvailability) {
                dayAvailability.slots.forEach(slotTime => {
                    const [start, end] = slotTime.split("-");
                    slots.push({
                        date: date.toISOString().split("T")[0], // YYYY-MM-DD
                        startTime: start,
                        endTime: end,
                        displayDate: date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" }),
                        displayTime: `${start} - ${end}`
                    });
                });
            }
        }
        return slots;
    };

    const availableSlots = generateAvailableSlots();

    const handleBooking = async () => {
        if (!selectedSlot || !subject) return;

        setIsSubmitting(true);
        try {
            // Construct ISO strings for start and end time
            const startDateTime = new Date(`${selectedSlot.date}T${selectedSlot.startTime}:00`);
            const endDateTime = new Date(`${selectedSlot.date}T${selectedSlot.endTime}:00`);

            // Calculate duration in hours
            const durationMs = endDateTime.getTime() - startDateTime.getTime();
            const durationHours = durationMs / (1000 * 60 * 60);

            const res = await createBooking({
                tutorId,
                startTime: startDateTime.toISOString(),
                endTime: endDateTime.toISOString(),
                sessionDate: selectedSlot.date,
                sessionTime: selectedSlot.startTime,
                duration: durationHours,
                subject: subject,
                price: durationHours * hourlyRate,
            });

            if (res.success) {
                toast.success("Booking requested successfully!");
                setOpen(false);
                router.push("/dashboard"); // Redirect to student dashboard
            } else {
                toast.error(res.error || "Failed to book session");
            }
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size="lg" className="w-full">Book Session</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Book a Session</DialogTitle>
                    <DialogDescription>
                        Select a time slot to book a session. Rate: ${hourlyRate}/hr
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Subject / Topic
                        </label>
                        <input
                            type="text"
                            placeholder="e.g. React Hooks, Algebra basics..."
                            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                        />
                    </div>

                    <div className="grid gap-4 py-4 max-h-[200px] overflow-y-auto">
                        {availableSlots.length > 0 ? (
                            <div className="grid grid-cols-2 gap-2">
                                {availableSlots.map((slot, idx) => (
                                    <button
                                        key={`${slot.date}-${slot.startTime}-${idx}`}
                                        onClick={() => setSelectedSlot(slot)}
                                        className={`text-sm p-3 rounded-md border text-center transition-colors ${selectedSlot?.date === slot.date && selectedSlot?.startTime === slot.startTime
                                            ? "bg-primary text-primary-foreground border-primary"
                                            : "hover:bg-accent"
                                            }`}
                                    >
                                        <div className="font-semibold">{slot.displayDate}</div>
                                        <div className="text-xs">{slot.displayTime}</div>
                                    </button>
                                ))}
                            </div>
                        ) : (
                            <p className="text-center text-muted-foreground py-8">
                                No available slots found for the next 2 weeks.
                            </p>
                        )}
                    </div>
                </div>

                <DialogFooter>
                    <Button
                        onClick={handleBooking}
                        disabled={!selectedSlot || !subject || isSubmitting}
                        className="w-full"
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Booking...
                            </>
                        ) : (
                            "Confirm Booking"
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
