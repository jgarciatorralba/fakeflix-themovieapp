// Import dependencies
import express from "express";

// Import controller
import commentController from "../controllers/commentController.js";

// Import project files
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

// Get all comments for a given movie
router.get("/:movie_id", async (req, res) => {
  const movie_id = req.params.movie_id;
  const comments = await commentController.getCommentsByMovie(movie_id);
  if (comments !== "error") {
    res.json({ data: comments, error: null });
  } else {
    return res.status(500).json({ data: null, error: "Internal Server Error" });
  }
});

// Add a new comment for a given movie
router.post("/:movie_id", async (req, res) => {
  const user_id = req.user.id;
  const movie_id = req.params.movie_id;
  const content = req.body.content;

  const comment = await commentController.add({
    user_id,
    movie_id,
    content,
  });
  if (comment == "error") {
    return res.status(500).json({ data: null, error: "Internal Server Error" });
  }
  res.json({ data: comment, error: null });
});

// Remove comment from a given movie
router.delete("/:comment_id", async (req, res) => {
  const comment_id = req.params.comment_id;
  const comment = await commentController.getCommentById(comment_id);

  if (!comment) {
    return res.json({
      data: "No comment found for the given comment_id",
      error: null,
    });
  }

  if (comment == "error") {
    return res.status(500).json({ data: null, error: "Internal Server Error" });
  }

  if (comment.user_id != req.user.id) {
    return res.status(403).json({
      data: null,
      error: "Forbidden: Invalid JWT",
    });
  }

  const error = await commentController.remove(comment_id);
  if (error) {
    return res.status(500).json({ data: null, error: "Internal Server Error" });
  }
  res.json({ data: "Comment removed successfully!", error: null });
});

export default router;
