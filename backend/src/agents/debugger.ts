// agents/debugger.ts

import { openai } from "../services/openaiClient.js";

export const debuggerAgent = async (description: string) => {
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    max_tokens: 140,
    messages: [
      {
        role: "system",
        content:
          "You are an expert UI/UX and software debugger. Keep responses short: exactly 3 bullet points, each one sentence.",
      },
      {
        role: "user",
        content: `Analyze this and identify only the top 3 problems. Keep total length under 80 words:\n${description}`,
      },
    ],
  });

  return response.choices[0].message.content;
};