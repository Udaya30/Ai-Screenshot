// routes/speakRoute.ts

import express from "express";
import { narratorAgent } from "../agents/narrator.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { text } = req.body;

  const audioPath = await narratorAgent(text);

  res.sendFile(audioPath);
});

export default router;