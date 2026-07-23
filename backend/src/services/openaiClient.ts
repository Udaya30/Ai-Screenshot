// services/openaiClient.ts

import dotenv from "dotenv";
dotenv.config();
import OpenAI from "openai";

class OpenAIClient {
  private static instance: OpenAI;

  public static getInstance(): OpenAI {
    if (!OpenAIClient.instance) {
      const apiKey = process.env.OPENAI_API_KEY || process.env.OPENROUTER_API_KEY;

      if (!apiKey) {
        throw new Error("Missing API key. Set OPENAI_API_KEY or OPENROUTER_API_KEY.");
      }

      OpenAIClient.instance = new OpenAI({
        apiKey,
        baseURL: process.env.OPENROUTER_BASE_URL || "https://openrouter.ai/api/v1",
        defaultHeaders: {
          "HTTP-Referer": process.env.APP_URL || "http://localhost:5173",
          "X-Title": process.env.APP_NAME || "AI Screenshot App",
        },
      });
    }

    return OpenAIClient.instance;
  }
}

export const openai = OpenAIClient.getInstance();