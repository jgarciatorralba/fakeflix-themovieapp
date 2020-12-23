// Import dependencies
import express from "express";

// Import controllers
import commentController from "../controllers/commentController.js";
import userController from "../controllers/userController.js";

// Import middlewares
import authMiddleware from "../middlewares/authMiddleware.js";

// Import config object
import { config } from "../config/app-config.js";

const router = express.Router();

router.use(authMiddleware);

// Get all comments for a given movie
router.get("/:movie_id", async (req, res) => {
  const movie_id = req.params.movie_id;
  const comments = await commentController.getCommentsByMovie(movie_id);

  if (comments == "error") {
    return res.status(500).json({ data: null, error: "Internal Server Error" });
  } else {
    let users = await userController.findAllWithDeleted();
    users.forEach((user) => {
      user._doc.avatar = new URL(
        "/img/user/" + user._doc.avatar,
        config().app.SERVER_DOMAIN
      ).href;
    });

    comments.forEach((comment) => {
      users.forEach((user) => {
        if (user._id.id.toString("hex") == comment.user_id) {
          comment._doc.user = user;
          delete comment._doc.user_id;
        }
      });
    });

    res.json({ data: comments, error: null });
  }
});

// Add a new comment for a given movie
router.post("/:movie_id", async (req, res) => {
  const user_id = req.user.id;
  const movie_id = req.params.movie_id;
  const content = req.body.content;

  let comment = await commentController.add({
    user_id,
    movie_id,
    content,
  });
  if (comment == "error") {
    return res.status(500).json({ data: null, error: "Internal Server Error" });
  }

  let user = await userController.findWithDeletedById(user_id);
  user._doc.avatar = new URL(
    "/img/user/" + user._doc.avatar,
    config().app.SERVER_DOMAIN
  ).href;

  comment._doc.user = user;
  delete comment._doc.user_id;

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
