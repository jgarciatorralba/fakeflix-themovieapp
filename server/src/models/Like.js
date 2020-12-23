import mongoose from "mongoose";

const Schema = mongoose.Schema;

const LikeSchema = new mongoose.Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  movie_id: {
    type: String,
    required: true,
  },
});

const Like = mongoose.model("Like", LikeSchema);

export default Like;
