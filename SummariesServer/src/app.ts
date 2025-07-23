import express from "express";
import summaryRoutes from "./routes/summaryRoute.js";

const app = express();

app.use(express.json());

// All API routes
app.use("/api/summary", summaryRoutes);

// 404 fallback
app.use((req, res) => {
  res.status(404).json({ body: req.body, error: "Not found" });
});

export default app;
