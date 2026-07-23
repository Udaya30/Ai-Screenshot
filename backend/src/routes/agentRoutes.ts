import express from "express";
import dotenv from "dotenv";
import { handleAgent } from "../controllers/agentController.js";

dotenv.config();

const router = express.Router();
router.post("/analyze", handleAgent);

export default router;