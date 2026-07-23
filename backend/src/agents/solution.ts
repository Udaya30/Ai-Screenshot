// agents/solution.ts

import { openai } from "../services/openaiClient.js";

export const solutionAgent = async (description: string) => {
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content:
          "You are a senior developer. Provide clear and actionable solutions.",
      },
      {
        role: "user",
        content: `Provide solutions for this:\n${description}`,
      },
    ],
  });

  return response.choices[0].message.content;
};