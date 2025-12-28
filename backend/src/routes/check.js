import express from "express";
import { checkUrl } from "../utils/urlChecker.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { url } = req.body;

  if (!url || !url.startsWith("http")) {
    return res.status(400).json({ error: "Invalid URL" });
  }

  const result = await checkUrl(url);
  res.json(result);
});

export default router;
