// Import models
import Like from "../models/Like.js";
import Dislike from "../models/Dislike.js";

export default {
  add: async function (user_id, movie_id) {
    try {
      const existingLike = await Like.findOne({
        user_id: user_id,
        movie_id: movie_id,
      });
      if (!existingLike) {
        const newLike = new Like({
          user_id: user_id,
          movie_id: movie_id,
        });
        await newLike.save();
        await Dislike.findOneAndDelete({
          user_id: user_id,
          movie_id: movie_id,
        });
      } else {
        throw new Error("Movie already liked by user");
      }
    } catch (error) {
      return error;
    }

    return null;
  },

  remove: async function (user_id, movie_id) {
    try {
      const res = await Like.findOneAndDelete({
        user_id: user_id,
        movie_id: movie_id,
      });
      if (res.n == 0) {
        throw new Error("No like documents found");
      }
    } catch (error) {
      return error;
    }

    return null;
  },

  getMovieLikes: async function (movie_id) {
    try {
      const likes = await Like.find({ movie_id: movie_id });
      return likes;
    } catch (error) {
      return "error";
    }
  },
};
