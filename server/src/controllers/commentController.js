// Import models
import Comment from "../models/Comment.js";

export default {
  add: async function (commentObj) {
    const newComment = new Comment({
      user_id: commentObj.user_id,
      movie_id: commentObj.movie_id,
      content: commentObj.content,
    });

    try {
      await newComment.save();
    } catch (error) {
      return error;
    }

    return null;
  },

  remove: async function (comment_id) {
    try {
      await Comment.deleteOne({
        _id: comment_id,
      });
    } catch (error) {
      return error;
    }

    return null;
  },

  getCommentsByMovie: async function (movie_id) {
    try {
      const comments = await Comment.find({ movie_id: movie_id });
      return comments;
    } catch (error) {
      return "error";
    }
  },
};
