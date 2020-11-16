// Import dependencies
import axios from "axios";

// Import project files
import { config } from "../config/app-config.js";

export default {
  getConfig: async function () {
    try {
      const response = await axios.get(
        config().app.API_BASE_URL + "configuration",
        {
          headers: {
            Authorization: "Bearer " + config().app.API_TOKEN,
          },
        }
      );
      return response.data;
    } catch (error) {
      return "error";
    }
  },

  // Get random movie details (for the banner)

  // Get details for several movies by id (if possible, for favourites)

  // Get popular movies (page 1)

  // Get top rated movies (page 1)

  // Get now playing movies (page 1)

  // Get upcoming movies (page 1)

  // Get movie details

  // Get movie trailers
};
