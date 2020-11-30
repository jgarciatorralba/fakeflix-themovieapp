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
      return "error";
    }

    return newComment;
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

  getCommentById: async function (comment_id) {
    try {
      const comment = await Comment.findById(comment_id);
      return comment;
    } catch (error) {
      return "error";
    }
  },

  getCommentsByMovie: async function (movie_id) {
    try {
      const comments = await Comment.find({ movie_id: movie_id }, null, {
        sort: { createdAt: -1 },
      });
      return comments;
    } catch (error) {
      return "error";
    }
  },
};
