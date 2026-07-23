// agents/analyzer.ts

import { openai } from "../services/openaiClient.js";

export const analyzerAgent = async (imageDataUrl: string) => {

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    max_tokens: 120,
    messages: [
      {
        role: "system",
        content:
          "Be concise. Return 2-3 short sentences only. Focus on the most important UI context.",
      },
      {
        role: "user",
        content: [
          {
            type: "text",
            text: "Describe this screenshot briefly. Keep it under 60 words.",
          },
          {
            type: "image_url",
            image_url: {
              url: imageDataUrl,
            },
          },
        ],
      },
    ],
  });

  return response.choices[0].message.content;
};