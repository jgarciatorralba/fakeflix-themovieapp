// Import project files
import { config } from "./src/config/app-config.js";
import db from "./src/database/connection.js";
import app from "./src/app.js";

// DB Connection
db.connect();

// Run server
app.listen(config().app.PORT, () => {
  console.log(`Server started on port ${config().app.PORT}...`);
});
