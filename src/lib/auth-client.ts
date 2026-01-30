import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
    baseURL: process.env.AUTH_URL, // Verify if this matches backend URL requirement or if better-auth needs its own URL
});
