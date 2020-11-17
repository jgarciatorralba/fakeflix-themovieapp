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

  getRandomMovie: async function () {
    try {
      const respLatestMovie = await axios.get(
        config().app.API_BASE_URL + "movie/latest",
        {
          headers: {
            Authorization: "Bearer " + config().app.API_TOKEN,
          },
        }
      );
      const latestMovieId = Number(respLatestMovie.data.id);
      let randomInt;
      let response;
      do {
        randomInt = Math.floor(Math.random() * latestMovieId) + 1;
        response = await axios.get(
          config().app.API_BASE_URL + "movie/" + randomInt,
          {
            headers: {
              Authorization: "Bearer " + config().app.API_TOKEN,
            },
          }
        );
      } while (
        response.status !== 200 ||
        response.data.backdrop_path == null ||
        response.data.poster_path == null
      );

      return response.data;
    } catch (error) {
      return "error";
    }
  },

  // Get details for several movies by id (if possible, for favourites)

  // Get popular movies (page 1)

  // Get top rated movies (page 1)

  // Get now playing movies (page 1)

  // Get upcoming movies (page 1)

  // Get movie details

  // Get movie trailers
};
