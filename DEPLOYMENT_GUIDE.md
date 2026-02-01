# Deployment Guide for SkillBridge Frontend

This guide explains how to deploy the SkillBridge Frontend to **Vercel** and connect it to your backend.

## Prerequisites

1.  **Backend Deployment**: Your backend application (running on port 5000 locally) **MUST** be deployed to a public hosting provider (e.g., [Render](https://render.com/), [Railway](https://railway.app/), [Heroku](https://www.heroku.com/), or a VPS).
    *   *Note*: You cannot connect a deployed Vercel app to `localhost`.
2.  **GitHub Repository**: Ensure your latest code is pushed to GitHub (you have already done this).

## Step 1: Deploy to Vercel

1.  Log in to [Vercel](https://vercel.com/).
2.  Click **"Add New..."** -> **"Project"**.
3.  Select your GitHub repository (`assign_4_l2b6_sb_frontend`).
4.  Vercel will detect `Next.js` automatically.

## Step 2: Configure Environment Variables

Before clicking "Deploy", expand the **"Environment Variables"** section. You need to add the following variables:

| Variable Name | Description | Example Value |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_API_URL` | The URL of your **deployed** backend API. | `https://api.your-backend-domain.com/api` |
| `NEXT_PUBLIC_APP_URL` | The URL of your **frontend** (Vercel domain). | `https://skillbridge-frontend.vercel.app` |

> **Important**: 
> *   Do **not** use `http://assign-4-l2-b6-skill-bridge-backend.vercel.app` for `NEXT_PUBLIC_API_URL`.
> *   If you don't know your Vercel URL yet, you can enter a placeholder and update it after the first deployment (Deployment > Settings > Environment Variables).

## Step 3: Deployment

1.  Click **"Deploy"**.
2.  Wait for the build to complete.
3.  Once finished, you will get a dashboard link and a live URL.

## Step 4: Component Configuration (Backend Side)

For authentication to work (cookies), your **Backend** must be configured to trust your Vercel domain.

1.  **CORS**: Allow your Vercel domain in your backend's CORS settings.
    ```typescript
    // Example Backend Config (cors)
    app.use(cors({
        origin: ["https://skillbridge-frontend.vercel.app", "http://localhost:3000"],
        credentials: true // Crucial for cookies!
    }));
    ```
2.  **Cookies**: Ensure your backend sets cookies with `SameSite: "none"` and `Secure: true` when running in production (HTTPS).

## Troubleshooting

*   **Auth Failing?** Check the Network tab. If requests to `/api/auth` are failing with CORS errors, update your Backend CORS settings.
*   **Cookies not saving?** Ensure your backend sends `Secure: true` and `SameSite: none`.
