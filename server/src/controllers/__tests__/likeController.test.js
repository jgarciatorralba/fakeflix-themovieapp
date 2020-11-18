// Import dependendices
import mongoose from "mongoose";

// Import controller
import likeController from "../likeController.js";

// Import model
import Like from "../../models/Like.js";
import User from "../../models/User.js";

// Import configuration object
import { config } from "../../config/app-config.js";

describe("Performing CRUD over Like controller in test database", () => {
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

      await Like.deleteMany({});
      await User.deleteOne({ email: "test-like-controller@domain.com" });

      const newUser = new User({
        username: "test-like-controller",
        email: "test-like-controller@domain.com",
        password: "123456",
      });
      await newUser.save();

      const newLike1 = new Like({
        user_id: newUser._id,
        movie_id: 278,
      });
      await newLike1.save();

      const newLike2 = new Like({
        user_id: newUser._id,
        movie_id: 238,
      });
      await newLike2.save();
    } catch (error) {
      return error;
    }
  });

  afterAll(async () => {
    await Like.deleteMany({});
    await User.deleteOne({ email: "test-like-controller@domain.com" });
    await mongoose.connection.close();
  });

  test("Insert a new like", async () => {
    const user = await User.findOne({
      email: "test-like-controller@domain.com",
    });

    const like = {
      user_id: user._id,
      movie_id: 496243,
    };

    expect.assertions(3);

    const error = await likeController.add(like.user_id, like.movie_id);
    expect(error).toBeNull();

    const savedLike = await Like.findOne({ movie_id: 496243 });
    expect(savedLike).not.toBeNull();
    expect(savedLike.user_id).toEqual(user._id);

    await Like.deleteOne({ movie_id: 496243 });
  });

  test("Get existing likes for a given movie", async () => {
    const user = await User.findOne({
      email: "test-like-controller@domain.com",
    });
    const likes = await likeController.getMovieLikes(278);

    expect.assertions(3);

    expect(likes).not.toBeNull();
    expect(likes).toHaveLength(1);
    expect(likes[0].user_id).toEqual(user._id);
  });

  test("Delete existing like", async () => {
    const user = await User.findOne({
      email: "test-like-controller@domain.com",
    });

    expect.assertions(3);

    const error = await likeController.remove(user._id, 238);
    expect(error).toBeNull();

    const likes = await Like.find({});
    expect(likes).toHaveLength(1);
    expect(Number(likes[0].movie_id)).toEqual(278);
  });
});
