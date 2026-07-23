import type { Request, Response } from "express";
import { analyzerAgent } from "../agents/analyzer.js";
import { debuggerAgent } from "../agents/debugger.js";
import { solutionAgent } from "../agents/solution.js";

function getImageDataUrl(body: any): string | null {
  const imageUrl = body?.messages?.[0]?.content?.find?.(
    (part: any) => part?.type === "image_url"
  )?.image_url?.url;

  if (typeof imageUrl === "string" && imageUrl.startsWith("data:image/")) {
    return imageUrl;
  }

  if (body?.image?.type && body?.image?.base64) {
    return `data:${body.image.type};base64,${body.image.base64}`;
  }

  return null;
}

export const handleAgent = async (req: Request, res: Response) => {
  try {
    const imageDataUrl = getImageDataUrl(req.body);

    if (!imageDataUrl) {
      return res.status(400).json({
        error: "Missing image payload. Send messages[].content[].image_url.url or image.type + image.base64.",
      });
    }

    const analysis = (await analyzerAgent(imageDataUrl)) ?? "";
    const issues = (await debuggerAgent(analysis)) ?? "";
    const solution = (await solutionAgent(issues)) ?? "";

    res.json({
      explanation: analysis,
      issue: issues,
      solution,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Agent failed",
      details: err instanceof Error ? err.message : String(err),
    });
  }
};