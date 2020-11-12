// Import project files
import { config } from "./src/config/app-config.js";
// import Database from "./src/database/connection.js";
import app from "./src/app.js";

// DB Connection
// const db = new Database();
// const connPromise = db.connect();
// connPromise
//   .then((result) => console.log(result))
//   .catch((error) => console.log(error));

// Run server
app.listen(config().app.PORT, () => {
  console.log(`Server started on port ${config().app.PORT}...`);
});
