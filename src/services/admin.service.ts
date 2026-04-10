import { ApiResponse, User } from "@/types";
import { unstable_noStore as noStore } from "next/cache";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://assign-4-l2-b6-skill-bridge-backend.vercel.app/api";

export const AdminService = {
    getAllUsers: async (): Promise<ApiResponse<User[]>> => {
        try {
            noStore();
            const { cookies } = await import("next/headers");
            const cookieStore = await cookies();
            const tokenCookie = cookieStore.get("better-auth.session_token");
            const token = tokenCookie?.value;

            if (!token) return { success: false, message: "Unauthorized", data: [] };

            const res = await fetch(`${API_URL}/admin/users`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Cookie: `${tokenCookie?.name}=${token}`,
                },
                cache: "no-store",
            });

            if (!res.ok) return { success: false, message: "Failed to fetch users", data: [] };

            const responseData = await res.json();

            // Handle nested data structure from API
            if (responseData.data && Array.isArray(responseData.data.data)) {
                const users = responseData.data.data.map((user: any) => ({
                    ...user,
                    isBlocked: user.status === "BANNED",
                    image: user.image || null,
                }));

                return {
                    success: responseData.success,
                    message: responseData.message,
                    data: users,
                    pagination: responseData.data.meta,
                };
            }

            return responseData;
        } catch (error) {
            console.error("Error fetching users:", error);
            return { success: false, message: "Failed to fetch users", data: [] };
        }
    },

    updateUserStatus: async (userId: string, isBlocked: boolean): Promise<ApiResponse<User>> => {
        try {
            const { cookies } = await import("next/headers");
            const cookieStore = await cookies();
            const tokenCookie = cookieStore.get("better-auth.session_token");
            const token = tokenCookie?.value;

            if (!token) return { success: false, message: "Unauthorized", data: null as any };

            const res = await fetch(`${API_URL}/admin/users/${userId}/status`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                    Cookie: `${tokenCookie?.name}=${token}`,
                },
                body: JSON.stringify({ status: isBlocked ? "BANNED" : "ACTIVE" }),
            });

            if (!res.ok) return { success: false, message: "Failed to update user status", data: null as any };
            return res.json();
        } catch (e) {
            return { success: false, message: "Internal Error", data: null as any };
        }
    },

    updateUserRole: async (userId: string, role: string): Promise<ApiResponse<User>> => {
        try {
            const { cookies } = await import("next/headers");
            const cookieStore = await cookies();
            const tokenCookie = cookieStore.get("better-auth.session_token");
            const token = tokenCookie?.value;

            if (!token) return { success: false, message: "Unauthorized", data: null as any };

            const res = await fetch(`${API_URL}/admin/users/${userId}/role`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                    Cookie: `${tokenCookie?.name}=${token}`,
                },
                body: JSON.stringify({ role: role }),
            });

            if (!res.ok) return { success: false, message: "Failed to update user role", data: null as any };
            return res.json();
        } catch (e) {
            return { success: false, message: "Internal Error", data: null as any };
        }
    },

    getPendingTutors: async (): Promise<ApiResponse<any[]>> => {
        try {
            noStore();
            const { cookies } = await import("next/headers");
            const cookieStore = await cookies();
            const tokenCookie = cookieStore.get("better-auth.session_token");
            const token = tokenCookie?.value;

            if (!token) return { success: false, message: "Unauthorized", data: [] };

            const res = await fetch(`${API_URL}/tutor/admin/pending`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Cookie: `${tokenCookie?.name}=${token}`,
                },
                cache: "no-store",
            });

            if (!res.ok) return { success: false, message: "Failed to fetch pending tutors", data: [] };
            return res.json();
        } catch (e) {
            return { success: false, message: "Internal Error", data: [] };
        }
    },

    approveTutor: async (tutorId: string): Promise<ApiResponse<any>> => {
        try {
            const { cookies } = await import("next/headers");
            const cookieStore = await cookies();
            const tokenCookie = cookieStore.get("better-auth.session_token");
            const token = tokenCookie?.value;

            if (!token) return { success: false, message: "Unauthorized", data: null as any };

            const res = await fetch(`${API_URL}/tutor/admin/${tutorId}/approve`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                    Cookie: `${tokenCookie?.name}=${token}`,
                },
                body: JSON.stringify({ isApproved: true }),
            });

            const data = await res.json();
            if (!res.ok) {
                return { success: false, message: data.message || "Failed to approve tutor", data: null as any };
            }
            if (data.success === undefined) {
                return { success: true, message: "Tutor approved successfully", data: data };
            }
            return data;
        } catch (error: any) {
            return { success: false, message: error.message || "Failed to approve tutor", data: null as any };
        }
    },

    rejectTutor: async (tutorId: string): Promise<ApiResponse<any>> => {
        try {
            const { cookies } = await import("next/headers");
            const cookieStore = await cookies();
            const tokenCookie = cookieStore.get("better-auth.session_token");
            const token = tokenCookie?.value;

            if (!token) return { success: false, message: "Unauthorized", data: null as any };

            const res = await fetch(`${API_URL}/tutor/admin/${tutorId}/reject`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                    Cookie: `${tokenCookie?.name}=${token}`,
                },
            });

            const data = await res.json();
            if (!res.ok) {
                return { success: false, message: data.message || "Failed to reject tutor", data: null as any };
            }
            if (data.success === undefined) {
                return { success: true, message: "Tutor rejected successfully", data: data };
            }
            return data;
        } catch (error: any) {
            return { success: false, message: error.message || "Failed to reject tutor", data: null as any };
        }
    },
};
