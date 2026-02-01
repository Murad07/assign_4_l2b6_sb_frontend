import { createAuthClient } from "better-auth/react";

// Use NEXT_PUBLIC_ variable so it's available in the browser
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export const authClient = createAuthClient({
    baseURL: `${API_URL}/auth`,
});
