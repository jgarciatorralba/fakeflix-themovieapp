// Import dependendices
import mongoose from "mongoose";

// Import controller
import favouriteController from "../favouriteController.js";

// Import model
import Favourite from "../../models/Favourite.js";
import User from "../../models/User.js";

// Import configuration object
import { config } from "../../config/app-config.js";

describe("Performing CRUD over Favourite controller in test database", () => {
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

      await Favourite.deleteMany({});
      await User.deleteOne({ email: "test-favourite-controller@domain.com" });

      const newUser = new User({
        username: "test-favourite-controller",
        email: "test-favourite-controller@domain.com",
        password: "123456",
      });
      await newUser.save();

      const newFavourite1 = new Favourite({
        user_id: newUser._id,
        movie_id: 122,
      });
      await newFavourite1.save();

      const newFavourite2 = new Favourite({
        user_id: newUser._id,
        movie_id: 400160,
      });
      await newFavourite2.save();
    } catch (error) {
      return error;
    }
  });

  afterAll(async () => {
    await Favourite.deleteMany({});
    await User.deleteOne({ email: "test-favourite-controller@domain.com" });
    await mongoose.connection.close();
  });

  test("Insert a new favourite", async () => {
    const user = await User.findOne({
      email: "test-favourite-controller@domain.com",
    });

    const favourite = {
      user_id: user._id,
      movie_id: 11,
    };

    expect.assertions(3);

    const error = await favouriteController.add(
      favourite.user_id,
      favourite.movie_id
    );
    expect(error).toBeNull();

    const savedFavourite = await Favourite.findOne({ movie_id: 11 });
    expect(savedFavourite).not.toBeNull();
    expect(savedFavourite.user_id).toEqual(user._id);

    await Favourite.deleteOne({ movie_id: 11 });
  });

  test("Get existing favourites for a given user", async () => {
    const user = await User.findOne({
      email: "test-favourite-controller@domain.com",
    });
    const favourites = await favouriteController.getUserFavourites(user._id);

    expect.assertions(2);

    expect(favourites).not.toBeNull();
    expect(favourites).toHaveLength(2);
  });

  test("Delete existing favourite", async () => {
    const user = await User.findOne({
      email: "test-favourite-controller@domain.com",
    });

    expect.assertions(3);

    const error = await favouriteController.remove(user._id, 400160);
    expect(error).toBeNull();

    const favourites = await Favourite.find({});
    expect(favourites).toHaveLength(1);
    expect(Number(favourites[0].movie_id)).toEqual(122);
  });
});
