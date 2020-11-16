// Import dependencies
import express from "express";

// Import controller
import likeController from "../controllers/likeController.js";

// Import project files
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

// Get all likes for a given movie
router.get("/:movie_id", async (req, res) => {
  const movie_id = req.params.movie_id;
  const likes = await likeController.getMovieLikes(movie_id);
  let likedByUser = false;
  likes.forEach((like) => {
    if (like.user_id == req.user.id) {
      likedByUser = true;
    }
  });
  let data = {};
  data.likeCount = likes.length;
  data.likes = likes;
  data.likedByUser = likedByUser;

  if (likes !== "error") {
    return res.json({ data: data, error: null });
  } else {
    return res.status(500).json({ data: null, error: "Internal Server Error" });
  }
});

// Add like to movie
router.post("/:movie_id", async (req, res) => {
  const user_id = req.user.id;
  const movie_id = req.params.movie_id;
  const error = await likeController.add(user_id, movie_id);
  if (error) {
    return res.status(500).json({ data: null, error: "Internal Server Error" });
  }
  res.json({ data: "Like added successfully!", error: null });
});

// Remove like from movie
router.delete("/:movie_id", async (req, res) => {
  const user_id = req.user.id;
  const movie_id = req.params.movie_id;
  const error = await likeController.remove(user_id, movie_id);
  if (error) {
    return res.status(500).json({ data: null, error: "Internal Server Error" });
  }
  res.json({ data: "Like removed successfully!", error: null });
});

export default router;
