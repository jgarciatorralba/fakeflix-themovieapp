// Import dependencies
import bcrypt from "bcrypt";

// Import models
import User from "../models/User.js";

// Import config object
import { config } from "../config/app-config.js";

export default {
  create: async function (userObj) {
    const newUser = new User({
      email: userObj.email,
      password: await bcrypt.hash(userObj.password, config().app.SALT_ROUNDS),
      username: userObj.username,
    });

    try {
      await newUser.save();
    } catch (error) {
      return error;
    }

    return null;
  },

  findByEmail: async function (email) {
    const user = await User.findOne({ email: email });
    return user;
  },

  findById: async function (id) {
    const user = await User.findOne({ _id: id }, [
      "_id",
      "email",
      "username",
      "avatar",
      "password",
    ]);
    return user;
  },

  findOnlyDeletedById: async function (id) {
    const deletedUser = await User.findOneDeleted({ _id: id });
    return deletedUser;
  },

  findWithDeletedById: async function (id) {
    const user = await User.findOneWithDeleted({ _id: id });
    return user;
  },

  findAllWithDeleted: async function () {
    const allUsers = await User.findWithDeleted(
      {},
      "_id username email avatar"
    );
    return allUsers;
  },

  updateUserById: async function (id, userObj) {
    try {
      const res = await User.updateOne({ _id: id }, userObj);
      if (res.nModified == 0) {
        throw new Error("User not found");
      }
    } catch (error) {
      return error;
    }

    return null;
  },

  deleteUser: async function (userObj) {
    try {
      await userObj.delete();
    } catch (error) {
      return error;
    }

    return null;
  },
};
