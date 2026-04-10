"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";

export async function extractSearchIntent(prompt: string) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        return { success: false, error: "GEMINI_API_KEY is not set in environment variables." };
    }

    try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        const systemPrompt = `You are an expert search assistant for a tutoring platform.
Extract search parameters from the user's natural language query.
Return pure JSON with the following keys:
- search: A string keyword representing the subject or skill (e.g. "React", "Math", "English"). Leave empty string if none.
- minRating: A string for minimum star rating (e.g., "4.5", "4.0", "3.0"). Return "all" if not specified.
- maxPrice: A number for maximum hourly rate in USD. E.g., "cheap" or "affordable" could map to 20 or 30. Return null if not specified.
- sortOrder: A string. If they want cheapest, return "hourlyRate-asc". If they want best, return "rating-desc". If newest, return "createdAt-desc". Otherwise null.

User Query: "${prompt}"

Return ONLY valid JSON, no markdown formatting like \`\`\`json.
Example: {"search": "React", "minRating": "4.0", "maxPrice": 25, "sortOrder": "rating-desc"}`;

        const result = await model.generateContent(systemPrompt);
        const aiResponse = result.response.text() || "{}";

        const cleanedResponse = aiResponse.replace(/```json/g, '').replace(/```/g, '').trim();
        const json = JSON.parse(cleanedResponse);

        return { success: true, data: json };
    } catch (error: any) {
        console.error("AI Search Error:", error);

        let errorMessage = "Failed to understand search query. Please try again.";

        if (error.message?.includes("503") || error.message?.includes("overloaded")) {
            errorMessage = "Our AI servers are currently experiencing high traffic. Please wait a few seconds and try again!";
        } else if (error.message?.includes("429") || error.message?.includes("quota")) {
            errorMessage = "We have reached our AI search limits for now. Please try again in a little bit.";
        } else if (error.message?.includes("API key")) {
            errorMessage = "AI Search is currently offline due to a configuration issue.";
        }

        return { success: false, error: errorMessage };
    }
}
