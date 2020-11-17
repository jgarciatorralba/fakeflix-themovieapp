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

// Get random movie details (for the banner)
router.get("/random", async (req, res) => {
  const movie = await movieController.getRandomMovie();
  if (movie == "error") {
    return res.status(500).json({ data: null, error: "Internal Server Error" });
  }
  res.json({ data: movie, error: null });
});

// Get details for several movies by id (if possible, for favourites)

// Get popular movies (page 1)

// Get top rated movies (page 1)

// Get now playing movies (page 1)

// Get upcoming movies (page 1)

// Get movie details

// Get movie trailers

export default router;
