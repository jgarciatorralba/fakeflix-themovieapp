// Import models
import Like from "../models/Like.js";
import Dislike from "../models/Dislike.js";

export default {
  add: async function (user_id, movie_id) {
    try {
      const existingDislike = await Dislike.findOne({
        user_id: user_id,
        movie_id: movie_id,
      });
      if (!existingDislike) {
        const newDislike = new Dislike({
          user_id: user_id,
          movie_id: movie_id,
        });
        await newDislike.save();
        await Like.findOneAndDelete({
          user_id: user_id,
          movie_id: movie_id,
        });
      } else {
        throw new Error("Movie already disliked by user");
      }
    } catch (error) {
      return error;
    }

    return null;
  },

  remove: async function (user_id, movie_id) {
    try {
      const res = await Dislike.findOneAndDelete({
        user_id: user_id,
        movie_id: movie_id,
      });
      if (res.n == 0) {
        throw new Error("No dislike documents found");
      }
    } catch (error) {
      return error;
    }

    return null;
  },

  getMovieDislikes: async function (movie_id) {
    try {
      const dislikes = await Dislike.find({ movie_id: movie_id });
      return dislikes;
    } catch (error) {
      return "error";
    }
  },
};
