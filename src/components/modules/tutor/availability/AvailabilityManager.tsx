"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Plus, Trash2, Save } from "lucide-react";
import { updateAvailability } from "@/actions/tutor";
import { AvailabilitySlot } from "@/types";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

interface AvailabilityManagerProps {
    initialAvailability?: AvailabilitySlot[];
}

export default function AvailabilityManager({ initialAvailability = [] }: AvailabilityManagerProps) {
    const [availability, setAvailability] = useState<AvailabilitySlot[]>(initialAvailability);
    const [isSaving, setIsSaving] = useState(false);

    // Initial state for new slot entry
    const [selectedDay, setSelectedDay] = useState(DAYS[0]);
    const [startTime, setStartTime] = useState("09:00");
    const [endTime, setEndTime] = useState("10:00");

    const addSlot = () => {
        if (!startTime || !endTime) return;
        if (startTime >= endTime) {
            toast.error("Start time must be before end time");
            return;
        }

        const newSlotString = `${startTime}-${endTime}`;

        setAvailability((prev) => {
            const dayIndex = prev.findIndex((item) => item.day === selectedDay);
            if (dayIndex >= 0) {
                // Day exists, add slot if not duplicate
                const existingSlots = prev[dayIndex].slots;
                if (existingSlots.includes(newSlotString)) {
                    toast.error("Slot already exists");
                    return prev;
                }
                const updated = [...prev];
                updated[dayIndex] = {
                    ...updated[dayIndex],
                    slots: [...existingSlots, newSlotString].sort(),
                };
                return updated;
            } else {
                // New day entry
                return [...prev, { day: selectedDay, slots: [newSlotString] }];
            }
        });
    };

    const removeSlot = (day: string, slotToRemove: string) => {
        setAvailability((prev) => {
            return prev.map((item) => {
                if (item.day === day) {
                    return {
                        ...item,
                        slots: item.slots.filter((s) => s !== slotToRemove),
                    };
                }
                return item;
            }).filter((item) => item.slots.length > 0);
        });
    };

    const handleSave = async () => {
        setIsSaving(true);
        try {
            const res = await updateAvailability(availability);
            if (res.success) {
                toast.success("Availability updated successfully");
            } else {
                toast.error(res.error);
            }
        } catch (error) {
            toast.error("Failed to save availability");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Manage Availability</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">

                {/* Add New Slot Section */}
                <div className="flex flex-col md:flex-row gap-4 items-end border-b pb-6">
                    <div className="space-y-2 w-full md:w-1/3">
                        <Label>Day</Label>
                        <Select value={selectedDay} onValueChange={setSelectedDay}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select Day" />
                            </SelectTrigger>
                            <SelectContent>
                                {DAYS.map((day) => (
                                    <SelectItem key={day} value={day}>{day}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2 w-full md:w-1/3">
                        <Label>Start Time</Label>
                        <Input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
                    </div>
                    <div className="space-y-2 w-full md:w-1/3">
                        <Label>End Time</Label>
                        <Input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
                    </div>
                    <Button onClick={addSlot} size="icon" className="shrink-0">
                        <Plus className="h-4 w-4" />
                    </Button>
                </div>

                {/* Display Slots */}
                <div className="space-y-4">
                    {availability.length === 0 && (
                        <p className="text-muted-foreground text-center py-4">No availability slots set.</p>
                    )}

                    {availability.map((item) => (
                        <div key={item.day} className="border rounded-lg p-4">
                            <h3 className="font-semibold mb-2">{item.day}</h3>
                            <div className="flex flex-wrap gap-2">
                                {item.slots.map((slot) => (
                                    <div key={slot} className="bg-secondary text-secondary-foreground px-3 py-1 rounded-md text-sm flex items-center gap-2">
                                        {slot}
                                        <button
                                            onClick={() => removeSlot(item.day, slot)}
                                            className="text-muted-foreground hover:text-destructive transition-colors"
                                        >
                                            <Trash2 className="h-3 w-3" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="pt-4 flex justify-end">
                    <Button onClick={handleSave} disabled={isSaving}>
                        {isSaving ? "Saving..." : <><Save className="mr-2 h-4 w-4" /> Save Changes</>}
                    </Button>
                </div>

            </CardContent>
        </Card>
    );
}
