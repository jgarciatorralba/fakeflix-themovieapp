import mongoose from "mongoose";
import validator from "validator";
import mongoose_delete from "mongoose-delete";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: [validator.isEmail, "Invalid email format"],
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default: "default.jpg",
    },
    favourite: {
      type: [String],
    },
    likes: {
      type: [String],
    },
    dislikes: {
      type: [String],
    },
    comments: [
      {
        movie_id: {
          type: String,
          required: true,
        },
        body: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

UserSchema.plugin(mongoose_delete, {
  deletedAt: true,
  overrideMethods: true,
});

const User = mongoose.model("User", UserSchema);

export default User;
