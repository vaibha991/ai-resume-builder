
import OpenAI from "openai";

const isServer = typeof window === "undefined";

/**
 * Improve text using AI.
 * - On the server: calls OpenAI directly.
 * - On the client: calls the API route.
 */
export async function improveText(text: string, section?: "jobTitle" | "summary" | "experience" | "project") {
  try {
    // Generate prompt based on section
    const promptMap: Record<string, string> = {
      jobTitle: `Improve this job title to sound more professional, specific, and impactful:\n"${text}"`,
      summary: `Rewrite this resume summary to be concise, professional, and achievement-focused:\n"${text}"`,
      experience: `Rewrite this resume experience bullet to be measurable, action-oriented, and ATS-optimized:\n"${text}"`,
      project: `Rewrite this project description to be concise, professional, and impactful:\n"${text}"`,
    };

    const prompt = section ? promptMap[section] : `Improve the clarity and professionalism of this text:\n"${text}"`;

    if (isServer) {
      // ✅ Server-side OpenAI call
      if (!process.env.OPENAI_API_KEY) {
        console.error("Missing OPENAI_API_KEY");
        return text;
      }

      const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

      const res = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.6,
      });

      return res.choices[0].message?.content?.trim() || text;
    } else {
      // ✅ Client-side: call API route
      const res = await fetch("/api/improve-text", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, section }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      return data.improved;
    }
  } catch (err) {
    console.error("AI improve error:", err);
    return text;
  }
}
