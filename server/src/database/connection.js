import mongoose from "mongoose";
import { config } from "../config/app-config.js";

export default {
  connect: async function () {
    try {
      await mongoose.connect(
        `mongodb+srv://${config().db.USER}:${config().db.PWD}@${
          config().db.CLUSTER
        }.z1ipk.mongodb.net/${config().db.NAME}`,
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          retryWrites: true,
          useCreateIndex: true,
          w: "majority",
        }
      );
      console.log("MongoDB connected...");
    } catch (error) {
      console.log(error);
    }
  },

  disconnect: async function () {
    try {
      await mongoose.connection.close();
      console.log("MongoDB connection closed...");
    } catch (error) {
      console.log(error);
    }
  },
};
