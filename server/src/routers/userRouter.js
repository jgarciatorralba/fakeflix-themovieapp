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

// Update a user (except password)
router.patch("/", avatarMiddleware.single("avatar"), async (req, res) => {
  const updatedUser = {};
  if (req.body.username && req.body.username !== "")
    updatedUser.username = req.body.username;
  if (req.body.email && req.body.email !== "")
    updatedUser.email = req.body.email;
  if (req.file) updatedUser.avatar = req.file.filename;

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
    res.json({
      data: {
        message: "User data updated!",
        newAvatar: updatedUser.avatar
          ? new URL(
              "/img/user/" + updatedUser.avatar,
              config().app.SERVER_DOMAIN
            ).href
          : null,
      },
      error: null,
    });
  }
});

// Update user's password
router.patch("/password", async (req, res) => {
  if (req.body.newPassword !== req.body.confirmPassword) {
    return res
      .status(400)
      .json({ data: null, error: "New passwords do not match!" });
  }
  const user = await userController.findById(req.user.id);
  const match = await bcrypt.compare(req.body.currentPassword, user.password);
  if (!match) {
    return res.status(400).json({ data: null, error: "Password incorrect!" });
  } else {
    const updatedUser = {};
    updatedUser.password = await bcrypt.hash(
      req.body.newPassword,
      config().app.SALT_ROUNDS
    );
    const error = await userController.updateUserById(req.user.id, updatedUser);
    if (error) {
      return res
        .status(500)
        .json({ data: null, error: "Internal Server Error" });
    } else {
      res.json({ data: "Password updated!", error: null });
    }
  }
});

// Delete a user
router.delete("/", async (req, res) => {
  const user = await userController.findById(req.user.id);
  if (user) {
    const error_update = await userController.updateUserById(req.user.id, {
      token: "",
    });
    if (!error_update) {
      const error_delete = await userController.deleteUser(user);
      if (!error_delete) {
        res.json({ data: "User deleted!", error: null });
      } else {
        return res
          .status(500)
          .json({ data: null, error: "Internal Server Error" });
      }
    } else {
      return res
        .status(500)
        .json({ data: null, error: "Internal Server Error" });
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
