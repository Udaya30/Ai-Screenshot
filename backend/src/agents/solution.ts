// agents/solution.ts

import { openai } from "../services/openaiClient.js";

export const solutionAgent = async (description: string) => {
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    max_tokens: 160,
    messages: [
      {
        role: "system",
        content:
          "You are a senior developer. Be concise. Return exactly 3 fixes as bullet points; each fix must be one sentence and actionable.",
      },
      {
        role: "user",
        content: `Provide short solutions for this. Keep total length under 90 words:\n${description}`,
      },
    ],
  });

  return response.choices[0].message.content;
};