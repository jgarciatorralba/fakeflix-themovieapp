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
app.use(cors({ origin: [config().app.CLIENT_DOMAIN] }));
app.use(express.json());

// Routers
app.use("/", authRouter);
app.use("/user", userRouter);
app.use("/comment", commentRouter);
app.use("/like", likeRouter);
app.use("/dislike", dislikeRouter);
app.use("/favourite", favouriteRouter);
app.use("/movie", movieRouter);

// Allow "public" folder to serve static files
app.use(express.static(path.resolve() + "/server/public"));

export default app;
