// Import dependencies
import bcrypt from "bcrypt";

// Import models
import User from "../models/User.js";

// Import project files
import { config } from "../config/app-config.js";
import db from "./connection.js";

(async () => {
  await db.connect();

  // Delete pre-existing collections
  for (let model of [User]) {
    let list = await model.db.db
      .listCollections({
        name: model.collection.name,
      })
      .toArray();

    if (list.length !== 0) {
      await model.collection.drop();
    } else {
      console.log("Collection %s does not exist.", model.collection.name);
    }
  }

  const users = [
    new User({
      username: "admin",
      email: "admin@mail.com",
      password: await bcrypt.hash("123456", config().app.SALT_ROUNDS),
    }),
    new User({
      username: "dummy_user",
      email: "a-dummy-username@mail.com",
      password: await bcrypt.hash("123456", config().app.SALT_ROUNDS),
    }),
    new User({
      username: "appNewUser999",
      email: "app_user@mail.com",
      password: await bcrypt.hash("123456", config().app.SALT_ROUNDS),
    }),
  ];

  for (const user of users) {
    try {
      await user.save();
      console.log('User document for "' + user.username + '" created.');
    } catch (e) {
      console.log("Error: " + e);
    }
  }

  await db.disconnect();
})();
