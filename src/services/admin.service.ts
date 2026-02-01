import { cookies } from "next/headers";
import { ApiResponse, User } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export const AdminService = {
    getAllUsers: async (): Promise<ApiResponse<User[]>> => {
        const cookieStore = await cookies();
        const tokenCookie = cookieStore.get("better-auth.session_token");
        const token = tokenCookie?.value;

        if (!token) return { success: false, message: "Unauthorized", data: [] };

        try {
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
                    isBlocked: user.status === "BANNED", // Map status to isBlocked
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
    },

    // For Role updates if needed
    updateUserRole: async (userId: string, role: string): Promise<ApiResponse<User>> => {
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
        console.log('role res: ', res, role);

        if (!res.ok) return { success: false, message: "Failed to update user role", data: null as any };
        return res.json();
    },
    // Tutor Management
    getPendingTutors: async (): Promise<ApiResponse<any[]>> => {
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
    },

    approveTutor: async (tutorId: string): Promise<ApiResponse<any>> => {
        const cookieStore = await cookies();
        const tokenCookie = cookieStore.get("better-auth.session_token");
        const token = tokenCookie?.value;

        if (!token) return { success: false, message: "Unauthorized", data: null as any };

        try {
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
            // If the API returns the raw object without { success: true } wrapper
            if (data.success === undefined) {
                return { success: true, message: "Tutor approved successfully", data: data };
            }
            return data;
        } catch (error: any) {
            return { success: false, message: error.message || "Failed to approve tutor", data: null as any };
        }
    },

    rejectTutor: async (tutorId: string): Promise<ApiResponse<any>> => {
        const cookieStore = await cookies();
        const tokenCookie = cookieStore.get("better-auth.session_token");
        const token = tokenCookie?.value;

        if (!token) return { success: false, message: "Unauthorized", data: null as any };

        try {
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
            // If the API returns the raw object without { success: true } wrapper
            if (data.success === undefined) {
                return { success: true, message: "Tutor rejected successfully", data: data };
            }
            return data;
        } catch (error: any) {
            return { success: false, message: error.message || "Failed to reject tutor", data: null as any };
        }
    },
};
