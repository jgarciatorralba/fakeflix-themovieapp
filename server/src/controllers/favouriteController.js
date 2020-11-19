// Import models
import Favourite from "../models/Favourite.js";

export default {
  add: async function (user_id, movie_id) {
    try {
      const existingFav = await Favourite.findOne({
        user_id: user_id,
        movie_id: movie_id,
      });
      if (!existingFav) {
        const newFav = new Favourite({
          user_id: user_id,
          movie_id: movie_id,
        });
        await newFav.save();
      } else {
        throw new Error("Movie already in user's favourites");
      }
    } catch (error) {
      return error;
    }

    return null;
  },

  remove: async function (user_id, movie_id) {
    try {
      const res = await Favourite.findOneAndDelete({
        user_id: user_id,
        movie_id: movie_id,
      });
      if (res.n == 0) {
        throw new Error("No favourite documents found");
      }
    } catch (error) {
      return error;
    }

    return null;
  },

  getUserFavourites: async function (user_id) {
    try {
      const favs = await Favourite.find({ user_id: user_id }, "movie_id");
      return favs;
    } catch (error) {
      return "error";
    }
  },
};
