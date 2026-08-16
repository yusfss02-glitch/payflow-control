import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        {
          success: false,
          error: "GEMINI_API_KEY is not configured.",
        },
        { status: 500 }
      );
    }

    const ai = new GoogleGenAI({
      apiKey,
    });

    const interaction = await ai.interactions.create({
      model: "gemini-3-flash-preview",
      input: "Respond with exactly: PayFlow AI connection successful.",
    });

    let message = "";

    for (const step of interaction.steps ?? []) {
      if (step.type === "model_output") {
        for (const content of step.content ?? []) {
          if (content.type === "text") {
            message += content.text;
          }
        }
      }
    }

    return NextResponse.json({
      success: true,
      message,
    });
  } catch (error) {
    console.error("Gemini API test error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Gemini API connection failed.",
      },
      { status: 500 }
    );
  }
}

