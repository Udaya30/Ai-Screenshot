import express from "express";
import cors from "cors";
import router from "./src/routes/agentRoutes";

const app = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use(express.json());
app.use("/api", router);

app.get("/", (req, res) => {
  res.send("API WORKING");
});
router.get("/analyze", (req, res) => {
  res.send("Analyze GET works");
});

export default app;