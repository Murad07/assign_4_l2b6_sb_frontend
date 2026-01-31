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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createCategoryAction, updateCategoryAction } from "@/actions/category";
import { toast } from "sonner";
import { Plus } from "lucide-react";

interface CategoryDialogProps {
    category?: any; // If provided, it's edit mode
    trigger?: React.ReactNode;
}

export default function CategoryDialog({ category, trigger }: CategoryDialogProps) {
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [name, setName] = useState(category?.name || "");
    const [description, setDescription] = useState(category?.description || "");
    const [icon, setIcon] = useState(category?.icon || "");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        const payload = { name, description, icon };

        try {
            let res;
            if (category) {
                res = await updateCategoryAction(category.id, payload);
            } else {
                res = await createCategoryAction(payload);
            }

            if (res.success) {
                toast.success(category ? "Category updated" : "Category created");
                setOpen(false);
                if (!category) {
                    setName("");
                    setDescription("");
                    setIcon("");
                }
            } else {
                toast.error(res.message);
            }
        } catch (error) {
            toast.error("An error occurred");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {trigger || (
                    <Button>
                        <Plus className="mr-2 h-4 w-4" /> Add Category
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{category ? "Edit Category" : "Add Category"}</DialogTitle>
                    <DialogDescription>
                        {category ? "Make changes to the category details here." : "Add a new category to the platform."}
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Name
                            </Label>
                            <Input
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="col-span-3"
                                required
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="description" className="text-right">
                                Description
                            </Label>
                            <Textarea
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="col-span-3"
                            />
                        </div>
                        {/* Assuming icon is a URL string or class name for now */}
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="icon" className="text-right">
                                Icon
                            </Label>
                            <Input
                                id="icon"
                                value={icon}
                                onChange={(e) => setIcon(e.target.value)}
                                className="col-span-3"
                                placeholder="Icon URL or Name"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? "Saving..." : "Save changes"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
