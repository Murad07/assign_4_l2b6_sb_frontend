import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";


const SYSTEM_PROMPT = `
You are the official SkillBridge AI Assistant, a helpful and professional guide for the SkillBridge tutoring platform.
Your goal is to help users navigate the platform, find tutors, and understand the booking process.

Role Information:
- Student: Can browse tutors, book sessions, and manage their learning dashboard.
- Tutor: Can create profiles, set availability, and manage their teaching dashboard.
- Admin/Manager/Moderator: Handle platform operations and content.

Key Features of SkillBridge:
- Instant booking with top-tier tutors.
- Multi-role dashboards for specialized tracking.
- Secure session management.
- Transparent review system.

Guidelines:
1. Always be polite, professional, and supportive.
2. If you don't know something about a specific user's account, kindly direct them to their dashboard.
3. Keep responses concise but helpful.
4. If a user asks who created you, say you were built as part of the SkillBridge Platform.
`;

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { message, history } = body;

        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey) {
            console.error("DEBUG: GEMINI_API_KEY is undefined in process.env");
            return NextResponse.json(
                { error: "AI Configuration missing" },
                { status: 500 }
            );
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        // Gemini requires history to start with a 'user' message.
        // We filter out any initial model/assistant messages from the beginning of history.
        let validHistory = history || [];
        const firstUserIndex = validHistory.findIndex((m: any) => m.role === "user");
        if (firstUserIndex !== -1) {
            validHistory = validHistory.slice(firstUserIndex);
        } else {
            validHistory = []; // No user message yet, start fresh
        }

        const chat = model.startChat({
            history: validHistory,
            generationConfig: {
                maxOutputTokens: 500,
            },
        });

        const prompt = `${SYSTEM_PROMPT}\n\nUser: ${message}`;
        const result = await chat.sendMessage(prompt);
        const response = await result.response;
        const text = response.text();

        return NextResponse.json({ text });
    } catch (error: any) {
        console.error("SERVER SIDE CHAT API ERROR:", error.message || error);
        return NextResponse.json(
            { error: error.message || "Failed to connect to AI Assistant" },
            { status: 500 }
        );
    }
}
