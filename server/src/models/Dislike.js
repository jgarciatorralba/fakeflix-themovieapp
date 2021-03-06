import mongoose from "mongoose";

const Schema = mongoose.Schema;

const DislikeSchema = new mongoose.Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  movie_id: {
    type: String,
    required: true,
  },
});

const Dislike = mongoose.model("Dislike", DislikeSchema);

export default Dislike;
