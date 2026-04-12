"use server";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://assign-4-l2-b6-skill-bridge-backend.vercel.app/api";

export async function getPublicStats() {
    try {
        const res = await fetch(`${API_URL}/meta/public-stats`, {
            next: { revalidate: 3600 }, // Cache for 1 hour
        });

        if (!res.ok) throw new Error("Failed to fetch public stats");

        const result = await res.json();
        return result.data;
    } catch (error) {
        console.error("Public Stats Error:", error);
        return {
            tutors: "0",
            students: "0",
            sessions: "0",
            subjects: "0"
        };
    }
}
