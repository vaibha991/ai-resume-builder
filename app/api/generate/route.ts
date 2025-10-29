import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini", // cheap + fast
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    const result = response.choices[0].message?.content || "";

    return NextResponse.json({ result });
  } catch (error) {
    console.error("OpenAI error:", error);
    return NextResponse.json({ error: "AI request failed" }, { status: 500 });
  }
}
