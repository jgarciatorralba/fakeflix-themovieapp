// Import dependencies
import jwt from "jsonwebtoken";

// Import config object
import { config } from "../config/app-config.js";

export default function (req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    return res
      .status(401)
      .json({ data: null, error: "Unauthorized: Missing JWT" });
  }

  jwt.verify(token, config().app.RESET_SECRET, (err, user) => {
    if (err) {
      return res
        .status(403)
        .json({ data: null, error: "Forbidden: Invalid JWT" });
    }
    req.user = user;
    next();
  });
}
