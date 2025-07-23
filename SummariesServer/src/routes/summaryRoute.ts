import { Router } from "express";

import { Summary } from "../types/summary.js";
import { saveSummary } from "../services/elasticService.js";

const router = Router();

router.post("/add", async (req, res) => {
  const body = req.body as Summary;

  if (
    !(body.fullName && body.email && body.address && body.products.length > 0)
  ) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const result = await saveSummary(body);
    res.status(201).json({ message: "Saved", id: result._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not save summary" });
  }
});

export default router;
