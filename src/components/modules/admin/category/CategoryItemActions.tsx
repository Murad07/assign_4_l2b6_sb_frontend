"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { deleteCategoryAction } from "@/actions/category";
import { toast } from "sonner";
import CategoryDialog from "./CategoryDialog";

interface CategoryItemActionsProps {
    category: any;
}

export default function CategoryItemActions({ category }: CategoryItemActionsProps) {
    const [isLoading, setIsLoading] = useState(false);

    const handleDelete = async () => {
        if (!confirm("Are you sure you want to delete this category?")) return;

        setIsLoading(true);
        try {
            const res = await deleteCategoryAction(category.id);
            if (res.success) {
                toast.success("Category deleted");
            } else {
                toast.error(res.message);
            }
        } catch (error) {
            toast.error("Failed to delete category");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center gap-2 justify-end">
            <CategoryDialog
                category={category}
                trigger={
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-500">
                        <Edit className="h-4 w-4" />
                    </Button>
                }
            />
            <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-red-500"
                onClick={handleDelete}
                disabled={isLoading}
            >
                <Trash2 className="h-4 w-4" />
            </Button>
        </div>
    );
}
