// Import native node modules
import path from "path";

// Import dependencies
import express from "express";
import cors from "cors";

// Import configuration object
import { config } from "./config/app-config.js";

// Import routers
import authRouter from "./routers/authRouter.js";
import userRouter from "./routers/userRouter.js";
import commentRouter from "./routers/commentRouter.js";
import likeRouter from "./routers/likeRouter.js";
import dislikeRouter from "./routers/dislikeRouter.js";
import favouriteRouter from "./routers/favouriteRouter.js";
import movieRouter from "./routers/movieRouter.js";

const app = express();

// General use middlewares
if (config().app.MODE !== "production") {
  app.use(cors({ origin: [config().app.CLIENT_DOMAIN] }));
}
app.use(express.json());

// Routers
app.use("/api/", authRouter);
app.use("/api/user", userRouter);
app.use("/api/comment", commentRouter);
app.use("/api/like", likeRouter);
app.use("/api/dislike", dislikeRouter);
app.use("/api/favourite", favouriteRouter);
app.use("/api/movie", movieRouter);

// Allow "public" folder to serve static files
app.use(express.static(path.resolve("public")));

// Serve React static assets if in production
if (config().app.MODE === "production") {
  // Allow "build" folder to serve static files
  app.use(express.static(path.resolve("..", "client", "build")));

  // File "index.html" for all page routes
  app.get("*", (req, res) => {
    res.sendFile(path.resolve("..", "client", "build", "index.html"));
  });
}

export default app;
