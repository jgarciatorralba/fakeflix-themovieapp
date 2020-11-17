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
      let randomMovie;
      const respPopularMovies = await axios.get(
        config().app.API_BASE_URL + "movie/popular",
        {
          headers: {
            Authorization: "Bearer " + config().app.API_TOKEN,
          },
        }
      );
      do {
        let randomMoviePosition = Math.floor(
          Math.random() * respPopularMovies.data.results.length
        );

        randomMovie = respPopularMovies.data.results[randomMoviePosition];
      } while (
        randomMovie.adult !== false ||
        randomMovie.backdrop_path == null ||
        randomMovie.poster_path == null
      );

      randomMovie.backdrop_path = new URL(
        "t/p/w1280" + randomMovie.backdrop_path,
        "https://image.tmdb.org/"
      );

      randomMovie.poster_path = new URL(
        "t/p/w780" + randomMovie.poster_path,
        "https://image.tmdb.org/"
      );

      return randomMovie;
    } catch (error) {
      return "error";
    }
  },

  // Get details for several movies by id (if possible, for favourites)

  // Get top rated movies (page 1)

  // Get now playing movies (page 1)

  // Get upcoming movies (page 1)

  // Get movie details

  // Get movie trailers
};
