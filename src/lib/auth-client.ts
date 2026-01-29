import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
    baseURL: process.env.NEXT_PUBLIC_API_URL, // Verify if this matches backend URL requirement or if better-auth needs its own URL
});
