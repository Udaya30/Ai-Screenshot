// agents/debugger.ts

import { openai } from "../services/openaiClient.js";

export const debuggerAgent = async (description: string) => {
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content:
          "You are an expert UI/UX and software debugger. Identify issues clearly.",
      },
      {
        role: "user",
        content: `Analyze this and identify problems:\n${description}`,
      },
    ],
  });

  return response.choices[0].message.content;
};