// Import dependencies
import express from "express";
import bcrypt from "bcrypt";

// Import controller
import userController from "../controllers/userController.js";

// Import project files
import { config } from "../config/app-config.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import avatarMiddleware from "../middlewares/avatarMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

// CRUD over users (by themselves in the "profile" section)

// Get a user
router.get("/", async (req, res) => {
  const userId = req.user.id;
  const user = await userController.findById(userId);
  if (user) {
    user.avatar = new URL(
      "/img/user/" + user.avatar,
      config().app.SERVER_DOMAIN
    ).href;
    res.json({ data: user, error: null });
  } else {
    return res.status(400).json({ data: null, error: "User not found" });
  }
});

// Update a user
router.patch("/", avatarMiddleware.single("avatar"), async (req, res) => {
  const updatedUser = {};
  if (req.body.email && req.body.email !== "")
    updatedUser.email = req.body.email;
  if (req.body.password && req.body.password !== "")
    updatedUser.password = await bcrypt.hash(
      req.body.password,
      config().app.SALT_ROUNDS
    );
  if (req.body.username && req.body.username !== "")
    updatedUser.username = req.body.username;
  if (req.file) updatedUser.avatar = req.file.filename;

  const deletedUser = await userController.findOnlyDeletedById(req.user.id);
  if (deletedUser) {
    return res
      .status(400)
      .json({ data: null, error: "User account was deactivated" });
  } else {
    const error = await userController.updateUserById(req.user.id, updatedUser);
    if (error) {
      if (error.name == "MongoError") {
        if (Object.keys(error.keyValue).includes("email"))
          return res
            .status(400)
            .json({ data: null, error: "That email is already registered" });
        if (Object.keys(error.keyValue).includes("username"))
          return res
            .status(400)
            .json({ data: null, error: "That username is already registered" });
      } else {
        return res
          .status(500)
          .json({ data: null, error: "Internal Server Error" });
      }
    } else {
      res.json({ data: "User data updated!", error: null });
    }
  }
});

// Delete a user
router.delete("/", async (req, res) => {
  const user = await userController.findById(req.user.id);
  if (user) {
    const error = await userController.deleteUser(user);
    if (error) {
      return res
        .status(500)
        .json({ data: null, error: "Internal Server Error" });
    } else {
      res.json({ data: "User deleted!", error: null });
    }
  } else {
    return res.status(400).json({ data: null, error: "User not found" });
  }
});

// Logout user
router.post("/logout", async (req, res) => {
  const user = await userController.findById(req.user.id);
  if (user) {
    const error = await userController.updateUserById(req.user.id, {
      token: "",
    });
    if (error) {
      return res
        .status(500)
        .json({ data: null, error: "Internal Server Error" });
    } else {
      res.json({ data: "User logged out!", error: null });
    }
  } else {
    return res.status(400).json({ data: null, error: "User not found" });
  }
});

export default router;
