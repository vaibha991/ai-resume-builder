import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Must be set in .env.local
});

export async function POST(req: Request) {
  try {
    const { text, jobTitle } = await req.json();

    if (!text) {
      return NextResponse.json({ error: "No text provided" }, { status: 400 });
    }

    const prompt = `
Rewrite the following resume sentence to be professional, ATS-optimized, 
and suitable for a ${jobTitle || "resume"}. 
Make it concise, measurable, and action-oriented. 
Avoid generic phrases like "hardworking" or "responsible for".

Text: "${text}"
`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.6,
    });

    const improved = response.choices[0].message?.content ?? text;

    return NextResponse.json({ improved });
  } catch (error: any) {
    console.error("OpenAI error:", error);
    return NextResponse.json(
      { error: error.message || "AI request failed" },
      { status: 500 }
    );
  }
}
