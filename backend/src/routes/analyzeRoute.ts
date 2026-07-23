// // routes/analyzeRoute.ts

// import express from "express";
// import { analyzerAgent } from "../agents/analyzer.js";
// import { debuggerAgent } from "../agents/debugger.js";
// import { solutionAgent } from "../agents/solution.js";

// const router = express.Router();

// router.post("/", async (req, res) => {
//   const { imagePath } = req.body;

//   const description = await analyzerAgent(imagePath);

//   const [issue, solution] = await Promise.all([
//     debuggerAgent(description),
//     solutionAgent(description),
//   ]);

//   res.json({
//     explanation: description,
//     issue,
//     solution,
//   });
// });

// export default router;