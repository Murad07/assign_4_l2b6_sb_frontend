"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { deleteCategoryAction } from "@/actions/category";
import { toast } from "sonner";
import CategoryDialog from "./CategoryDialog";

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

interface CategoryItemActionsProps {
    category: any;
}

export default function CategoryItemActions({ category }: CategoryItemActionsProps) {
    const [isLoading, setIsLoading] = useState(false);

    const handleDelete = async () => {
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

            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-red-500"
                        disabled={isLoading}
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the
                            <span className="font-bold"> {category.name} </span>
                            category and remove it from our servers.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete} className="bg-red-500 hover:bg-red-600">
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
