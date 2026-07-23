// agents/narrator.ts

import { openai } from "../services/openaiClient.js";
import fs from "fs";
import path from "path";

export const narratorAgent = async (text: string) => {
  const filePath = path.resolve(`./audio/output-${Date.now()}.mp3`);

  const response = await openai.audio.speech.create({
    model: "gpt-4o-mini-tts",
    voice: "alloy",
    input: text,
  });

  const buffer = Buffer.from(await response.arrayBuffer());
  fs.writeFileSync(filePath, buffer);

  return filePath; // return audio file path
};