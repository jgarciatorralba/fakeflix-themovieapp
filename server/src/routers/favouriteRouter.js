// Import dependencies
import express from "express";

// Import controller
import favouriteController from "../controllers/favouriteController.js";

// Import project files
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

// Get favourite movies for a given user
router.get("/", async (req, res) => {
  const user_id = req.user.id;
  const userFavs = await favouriteController.getUserFavourites(user_id);
  if (userFavs !== "error") {
    return res.json({ data: userFavs, error: null });
  } else {
    return res.status(500).json({ data: null, error: "Internal Server Error" });
  }
});

// Add movie to favourites
router.post("/:movie_id", async (req, res) => {
  const user_id = req.user.id;
  const movie_id = req.params.movie_id;
  const error = await favouriteController.add(user_id, movie_id);
  if (error) {
    return res.status(500).json({ data: null, error: "Internal Server Error" });
  }
  res.json({ data: "Favourite added successfully!", error: null });
});

// Remove movie from favourites
router.delete("/:movie_id", async (req, res) => {
  const user_id = req.user.id;
  const movie_id = req.params.movie_id;
  const error = await favouriteController.remove(user_id, movie_id);
  if (error) {
    return res.status(500).json({ data: null, error: "Internal Server Error" });
  }
  res.json({ data: "Favourite removed successfully!", error: null });
});

export default router;
