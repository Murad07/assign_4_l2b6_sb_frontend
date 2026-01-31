"use server";

import { CategoryService } from "@/services/category.service";
import { revalidatePath } from "next/cache";

export async function createCategoryAction(data: any) {
    try {
        const res = await CategoryService.createCategory(data);
        revalidatePath("/admin/categories");
        return { success: true, data: res };
    } catch (error: any) {
        return { success: false, message: error.message };
    }
}

export async function updateCategoryAction(id: string, data: any) {
    try {
        const res = await CategoryService.updateCategory(id, data);
        revalidatePath("/admin/categories");
        return { success: true, data: res };
    } catch (error: any) {
        return { success: false, message: error.message };
    }
}

export async function deleteCategoryAction(id: string) {
    try {
        const res = await CategoryService.deleteCategory(id);
        revalidatePath("/admin/categories");
        return { success: true, data: res };
    } catch (error: any) {
        return { success: false, message: error.message };
    }
}
