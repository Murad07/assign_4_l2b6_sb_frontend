"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export async function loginUser(data: any) {
    try {
        const res = await fetch(`${API_URL}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
            cache: "no-store",
        });

        const result = await res.json();

        if (!res.ok) {
            return {
                success: false,
                error: result.message || "Login failed"
            };
        }

        // In a real Better Auth + Backend setup, we might need to forward Set-Cookie headers
        // For now, assuming standard flow

        return { success: true, data: result.data };
    } catch (error: any) {
        return {
            success: false,
            error: error.message || "Login failed"
        };
    }
}

export async function registerUser(data: any) {
    try {
        const res = await fetch(`${API_URL}/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
            cache: "no-store",
        });

        const result = await res.json();

        if (!res.ok) {
            return {
                success: false,
                error: result.message || "Registration failed"
            };
        }

        return { success: true, data: result.data };
    } catch (error: any) {
        return {
            success: false,
            error: error.message || "Registration failed"
        };
    }
}
