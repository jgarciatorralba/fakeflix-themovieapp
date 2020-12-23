import mongoose from "mongoose";

const Schema = mongoose.Schema;

const CommentSchema = new mongoose.Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    movie_id: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      requred: true,
    },
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.model("Comment", CommentSchema);

export default Comment;
