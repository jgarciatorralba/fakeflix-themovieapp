// Import dependendices
import mongoose from "mongoose";

// Import controller
import commentController from "../commentController.js";

// Import model
import Comment from "../../models/Comment.js";
import User from "../../models/User.js";

// Import configuration object
import { config } from "../../config/app-config.js";

describe("Performing CRUD over Comment controller in test database", () => {
  beforeAll(async () => {
    try {
      await mongoose.connect(
        `mongodb+srv://${config().db.USER}:${config().db.PWD}@${
          config().db.CLUSTER
        }.z1ipk.mongodb.net/${config().db.TEST_NAME}`,
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          retryWrites: true,
          useCreateIndex: true,
          w: "majority",
        }
      );

      await Comment.deleteMany({});
      await User.deleteOne({ email: "test-comment-controller@domain.com" });

      const newUser = new User({
        username: "test-comment-controller",
        email: "test-comment-controller@domain.com",
        password: "123456",
      });
      await newUser.save();

      const newComment1 = new Comment({
        user_id: newUser._id,
        movie_id: 122,
        body:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed odio mauris, consectetur sit amet dolor at, ornare commodo felis. Cras quis sapien venenatis, bibendum nunc a, viverra orci. Nullam a nunc a purus gravida vestibulum et at lacus. Mauris tincidunt iaculis augue eu facilisis. Etiam sodales aliquet eros ac accumsan.",
      });
      await newComment1.save();

      const newComment2 = new Comment({
        user_id: newUser._id,
        movie_id: 400160,
        body:
          "Mauris maximus tortor non consequat eleifend. Integer interdum nulla felis, eget cursus libero placerat nec. Suspendisse a vestibulum est, ac commodo augue. Nullam fringilla nibh in urna accumsan, vel sollicitudin urna sodales. Sed congue eleifend erat, sed laoreet orci aliquam tempus. Ut scelerisque dui id dolor euismod consectetur quis at urna.",
      });
      await newComment2.save();
    } catch (error) {
      return error;
    }
  });

  afterAll(async () => {
    await Comment.deleteMany({});
    await User.deleteOne({ email: "test-comment-controller@domain.com" });
    await mongoose.connection.close();
  });

  test("Insert a new comment", async () => {
    const user = await User.findOne({
      email: "test-comment-controller@domain.com",
    });

    const comment = {
      user_id: user._id,
      movie_id: 11,
      content:
        "Ut bibendum lobortis placerat. Nulla eu cursus nisi. Nullam posuere nec leo vitae commodo. Aenean ac lorem molestie, viverra ipsum non, varius risus. Ut blandit urna fermentum nibh porta, sit amet tincidunt urna consequat. Cras commodo nibh non lacus viverra eleifend. Suspendisse a laoreet mi. Nullam vulputate blandit nulla vel efficitur.",
    };

    expect.assertions(3);

    const insertedComment = await commentController.add(comment);
    expect(insertedComment).not.toEqual("error");

    const savedComment = await Comment.findOne({ movie_id: 11 });
    expect(savedComment).not.toBeNull();
    expect(savedComment.user_id).toEqual(user._id);

    await Comment.deleteOne({ movie_id: 11 });
  });

  test("Get existing comments for a given movie", async () => {
    const user = await User.findOne({
      email: "test-comment-controller@domain.com",
    });
    const comments = await commentController.getCommentsByMovie(122);

    expect.assertions(3);

    expect(comments).not.toBeNull();
    expect(comments).toHaveLength(1);
    expect(comments[0].user_id).toEqual(user._id);
  });

  test("Delete existing comment", async () => {
    const comment = await Comment.findOne({ movie_id: 400160 });

    expect.assertions(3);

    const error = await commentController.remove(comment._id);
    expect(error).toBeNull();

    const comments = await Comment.find({});
    expect(comments).toHaveLength(1);
    expect(Number(comments[0].movie_id)).toEqual(122);
  });
});
