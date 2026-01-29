const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export const TutorService = {
    getAllTutors: async (params?: any) => {
        // Construct query string from params
        const queryString = params ? new URLSearchParams(params).toString() : "";
        const res = await fetch(`${API_URL}/tutors?${queryString}`, {
            cache: "no-store", // or 'force-cache' based on requirements
        });
        if (!res.ok) throw new Error("Failed to fetch tutors");
        return res.json();
    },

    getTutorById: async (id: string) => {
        const res = await fetch(`${API_URL}/tutors/${id}`, {
            cache: "no-store",
        });
        if (!res.ok) throw new Error("Failed to fetch tutor");
        return res.json();
    },

    getFeaturedTutors: async () => {
        const res = await fetch(`${API_URL}/tutors?sort=rating&limit=3`, {
            next: { revalidate: 3600 }, // Revalidate every hour
        });
        if (!res.ok) throw new Error("Failed to fetch featured tutors");
        return res.json();
    },
};
