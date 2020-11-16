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
};
