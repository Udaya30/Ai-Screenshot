// agents/analyzer.ts

import { openai } from "../services/openaiClient.js";

export const analyzerAgent = async (imageDataUrl: string) => {

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: "Describe this screenshot in detail." },
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