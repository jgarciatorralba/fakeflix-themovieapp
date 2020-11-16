// Import dependencies
import express from "express";

// Import controller
import dislikeController from "../controllers/dislikeController.js";

// Import project files
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

// Get all dislikes for a given movie
router.get("/:movie_id", async (req, res) => {
  const movie_id = req.params.movie_id;
  const dislikes = await dislikeController.getMovieDislikes(movie_id);
  let dislikedByUser = false;
  dislikes.forEach((dislike) => {
    if (dislike.user_id == req.user.id) {
      dislikedByUser = true;
    }
  });
  let data = {};
  data.dislikeCount = dislikes.length;
  data.dislikes = dislikes;
  data.dislikedByUser = dislikedByUser;

  if (dislikes !== "error") {
    return res.json({ data: data, error: null });
  } else {
    return res.status(500).json({ data: null, error: "Internal Server Error" });
  }
});

// Add dislike to movie
router.post("/:movie_id", async (req, res) => {
  const user_id = req.user.id;
  const movie_id = req.params.movie_id;
  const error = await dislikeController.add(user_id, movie_id);
  if (error) {
    return res.status(500).json({ data: null, error: "Internal Server Error" });
  }
  res.json({ data: "Dislike added successfully!", error: null });
});

// Remove dislike from movie
router.delete("/:movie_id", async (req, res) => {
  const user_id = req.user.id;
  const movie_id = req.params.movie_id;
  const error = await dislikeController.remove(user_id, movie_id);
  if (error) {
    return res.status(500).json({ data: null, error: "Internal Server Error" });
  }
  res.json({ data: "Dislike removed successfully!", error: null });
});

export default router;
