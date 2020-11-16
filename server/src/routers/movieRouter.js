// Import dependencies
import express from "express";

// Import controller
import movieController from "../controllers/movieController.js";

// Import project files
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

// Get configuration details (used for images base url)
router.get("/config", async (req, res) => {
  const config = await movieController.getConfig();
  if (config == "error") {
    return res.status(500).json({ data: null, error: "Internal Server Error" });
  }
  res.json({ data: config, error: null });
});

export default router;
