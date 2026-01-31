"use server";

import { AdminService } from "@/services/admin.service";
import { revalidatePath } from "next/cache";

export async function updateUserStatusAction(userId: string, isBlocked: boolean) {
    try {
        const res = await AdminService.updateUserStatus(userId, isBlocked);
        if (res.success) {
            revalidatePath("/admin/users");
        }
        return res;
    } catch (error: any) {
        return { success: false, message: error.message };
    }
}

export async function updateUserRoleAction(userId: string, role: string) {
    try {
        const res = await AdminService.updateUserRole(userId, role);
        if (res.success) {
            revalidatePath("/admin/users");
        }
        return res;
    } catch (error: any) {
        return { success: false, message: error.message };
    }
}

export async function approveTutorAction(tutorId: string) {
    try {
        const res = await AdminService.approveTutor(tutorId);
        if (res.success) {
            revalidatePath("/admin/tutors");
        }
        return res;
    } catch (error: any) {
        return { success: false, message: error.message };
    }
}

export async function rejectTutorAction(tutorId: string) {
    try {
        const res = await AdminService.rejectTutor(tutorId);
        if (res.success) {
            revalidatePath("/admin/tutors");
        }
        return res;
    } catch (error: any) {
        return { success: false, message: error.message };
    }
}
