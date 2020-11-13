// Import dependencies
import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

// Import controller
import userController from "../controllers/userController.js";

// Import middlewares
import resetMiddleware from "../middlewares/reset.js";

// Import config object
import { config } from "../config/app-config.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  if (req.body.email == null) {
    return res
      .status(400)
      .json({ data: null, error: "Bad Request: Missing email attribute" });
  }

  if (req.body.password == null) {
    return res
      .status(400)
      .json({ data: null, error: "Bad Request: Missing password attribute" });
  }

  if (req.body.username == null) {
    return res
      .status(400)
      .json({ data: null, error: "Bad Request: Missing username attribute" });
  }

  const error = await userController.create({
    email: req.body.email,
    password: req.body.password,
    username: req.body.username,
  });

  if (error) {
    if (error.name == "ValidationError") {
      return res
        .status(400)
        .json({ data: null, error: error.errors["email"].message });
    }
    if (error.name == "MongoError") {
      if (Object.keys(error.keyValue).includes("email"))
        return res
          .status(400)
          .json({ data: null, error: "That email is already registered" });
      if (Object.keys(error.keyValue).includes("username"))
        return res
          .status(400)
          .json({ data: null, error: "That username is already registered" });
    }
    return res.status(500).json({ data: null, error: "Internal Server Error" });
  } else {
    res.json({
      data: "Congratulations, you have been successfully registered!",
      error: null,
    });
  }
});

router.post("/login", async (req, res) => {
  const credentials = req.body;

  if (credentials.email == null) {
    return res
      .status(400)
      .json({ data: null, error: "Bad Request: Missing email attribute" });
  }

  if (credentials.password == null) {
    return res
      .status(400)
      .json({ data: null, error: "Bad Request: Missing password attribute" });
  }

  const user = await userController.findByEmail(credentials.email);
  if (user == null)
    return res.status(400).json({
      data: null,
      error: "That email is not registered or was deactivated",
    });

  const match = await bcrypt.compare(credentials.password, user.password);
  if (!match)
    return res.status(400).json({ data: null, error: "Password incorrect" });

  const accessToken = jwt.sign({ id: user._id }, config().app.ACCESS_SECRET);

  const data = {
    accessToken: accessToken,
    user: {
      email: user.email,
      username: user.username,
      avatar: new URL("/img/user/" + user.avatar, config().app.SERVER_DOMAIN)
        .href,
      favourites: user.favourites,
      likes: user.likes,
      dislikes: user.dislikes,
      comments: user.comments,
    },
  };

  res.json({ data: data, error: null });
});

router.post("/password/forgot", async (req, res) => {
  const email = req.body.email;

  if (email == null) {
    return res
      .status(400)
      .json({ data: null, error: "Bad Request: Missing email attribute" });
  }

  const user = await userController.findByEmail(email);
  if (user == null)
    return res.status(400).json({
      data: null,
      error: "That email is not registered or was deactivated",
    });

  const resetToken = jwt.sign({ id: user._id }, config().app.RESET_SECRET, {
    expiresIn: "1h",
  });

  const transporter = nodemailer.createTransport({
    host: config().smtp.HOST,
    port: config().smtp.PORT,
    auth: {
      user: config().smtp.USER,
      pass: config().smtp.PWD,
    },
  });

  const emailData = {
    from: "noreply@themovieapp.com",
    to: email,
    subject: "Reset your password",
    html: `
      <h2>Reset your password</h2>
      <p>
        Click
        <a href='${
          config().app.CLIENT_DOMAIN
        }/password/reset?token=${resetToken}'>here</a>
        to reset your password.
      </p>`,
  };

  transporter.sendMail(emailData, (error, info) => {
    if (error) {
      return console.log(error);
    }
    res.json({ data: "Email has been sent!", error: null });
  });
});

router.post("/password/reset", resetMiddleware, async (req, res) => {
  const error = await userController.updateUserById(req.user.id, {
    password: await bcrypt.hash(req.body.password, config().app.SALT_ROUNDS),
  });
  if (error) {
    res.status(500).json({ data: null, error: "Internal Server Error" });
  }
  res.json({ data: "Password updated successfully!", error: null });
});

export default router;
