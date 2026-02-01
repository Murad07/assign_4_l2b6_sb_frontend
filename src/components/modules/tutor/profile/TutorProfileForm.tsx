"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { updateTutorProfile, createTutorProfile } from "@/actions/tutor";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Category, Tutor } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const formSchema = z.object({
    bio: z.string().min(10, "Bio must be at least 10 characters"),
    expertise: z.string().min(2, "Expertise is required"), // We'll handle split by comma
    hourlyRate: z.number().min(1, "Hourly rate must be at least 1"),
    education: z.string().min(2, "Education is required"),
    experience: z.string().min(1, "Experience is required"),
    categoryIds: z.array(z.string()).min(1, "Select at least one category"),
});

interface TutorProfileFormProps {
    tutor: Tutor | null;
    categories: Category[];
}

export default function TutorProfileForm({ tutor, categories }: TutorProfileFormProps) {
    const router = useRouter();
    const [open, setOpen] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            bio: tutor?.bio || "",
            expertise: tutor?.expertise?.join(", ") || "",
            hourlyRate: tutor?.hourlyRate || 0,
            education: tutor?.education || "",
            experience: tutor?.experience || "",
            categoryIds: tutor?.categories?.map(c => c.id) || [],
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            // Transform expertise string to array
            const formattedValues = {
                ...values,
                expertise: values.expertise.split(",").map(s => s.trim()).filter(Boolean),
            };

            let res;
            if (tutor) {
                res = await updateTutorProfile(formattedValues);
            } else {
                res = await createTutorProfile(formattedValues);
            }

            if (res.success) {
                toast.success("Tutor profile updated!");
                router.refresh();
            } else {
                toast.error(res.error);
            }
        } catch (error) {
            toast.error("Something went wrong.");
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Professional Profile</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                        <FormField
                            control={form.control}
                            name="bio"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Bio</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Tell students about yourself..." className="min-h-[100px]" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="categoryIds"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Categories</FormLabel>
                                    <Popover open={open} onOpenChange={setOpen}>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant="outline"
                                                    role="combobox"
                                                    aria-expanded={open}
                                                    className="justify-between"
                                                >
                                                    {field.value.length > 0
                                                        ? `${field.value.length} selected`
                                                        : "Select categories..."}
                                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="p-0">
                                            <Command>
                                                <CommandInput placeholder="Search category..." />
                                                <CommandList>
                                                    <CommandEmpty>No category found.</CommandEmpty>
                                                    <CommandGroup>
                                                        {categories.map((category) => (
                                                            <CommandItem
                                                                key={category.id}
                                                                value={category.name}
                                                                onSelect={() => {
                                                                    const current = field.value;
                                                                    const isSelected = current.includes(category.id);
                                                                    if (isSelected) {
                                                                        field.onChange(current.filter((id) => id !== category.id));
                                                                    } else {
                                                                        field.onChange([...current, category.id]);
                                                                    }
                                                                }}
                                                            >
                                                                <Check
                                                                    className={cn(
                                                                        "mr-2 h-4 w-4",
                                                                        field.value.includes(category.id) ? "opacity-100" : "opacity-0"
                                                                    )}
                                                                />
                                                                {category.name}
                                                            </CommandItem>
                                                        ))}
                                                    </CommandGroup>
                                                </CommandList>
                                            </Command>
                                        </PopoverContent>
                                    </Popover>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {field.value.map((id) => {
                                            const category = categories.find((c) => c.id === id);
                                            return category ? (
                                                <div key={id} className="bg-secondary text-secondary-foreground px-2 py-1 rounded text-xs flex items-center gap-1">
                                                    {category.icon} {category.name}
                                                    <button
                                                        type="button"
                                                        onClick={() => field.onChange(field.value.filter((val) => val !== id))}
                                                        className="ml-1 hover:text-destructive"
                                                    >
                                                        ×
                                                    </button>
                                                </div>
                                            ) : null;
                                        })}
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="expertise"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Expertise / Skills</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Math, Physics, React (comma separated)" {...field} />
                                    </FormControl>
                                    <FormDescription>Separate skills with commas</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                                control={form.control}
                                name="hourlyRate"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Hourly Rate ($)</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="25"
                                                {...field}
                                                onChange={e => field.onChange(parseFloat(e.target.value))}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="experience"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Total Experience</FormLabel>
                                        <FormControl>
                                            <Input placeholder="5 years, or 'Senior Engineer'" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="education"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Education</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Degree / University" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit" disabled={form.formState.isSubmitting}>
                            {form.formState.isSubmitting ? "Saving..." : "Save Profile"}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
