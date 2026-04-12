"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";

export async function generateTutorBio(draft: string, expertise: string[]) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        return { success: false, error: "AI Service is currently offline." };
    }

    try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        const systemPrompt = `You are a professional profile writer for SkillBridge, an elite tutoring platform.
Your goal is to transform a tutor's rough draft or bullet points into a professional, engaging, and trustworthy bio.

Input Data:
- Draft/Notes: "${draft}"
- Skills/Expertise: ${expertise.join(", ")}

Guidelines:
1. Tone: Professional, enthusiastic, and approachable.
2. Focus: Highlight their expertise and how they help students.
3. Length: Keep it between 150 to 250 characters.
4. Output: Return ONLY the polished bio text. No introductions, no quotes, no markdown.

Example Output:
Passionate Math tutor with 5+ years of experience helping students master Algebra and Calculus. I focus on simplifying complex concepts through personalized, interactive sessions that build confidence and ensure academic success.`;

        const result = await model.generateContent(systemPrompt);
        const aiResponse = result.response.text() || "";

        return { success: true, data: aiResponse.trim() };
    } catch (error: any) {
        console.error("AI Bio Generation Error:", error);
        return { success: false, error: "Failed to generate bio. Please try again." };
    }
}
