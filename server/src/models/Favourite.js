import mongoose from "mongoose";

const Schema = mongoose.Schema;

const FavouriteSchema = new mongoose.Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  movie_id: {
    type: String,
    required: true,
  },
});

const Favourite = mongoose.model("Favourite", FavouriteSchema);

export default Favourite;
