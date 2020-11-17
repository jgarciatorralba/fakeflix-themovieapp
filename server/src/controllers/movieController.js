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

  getFavouritesDetails: async function (favsArray) {
    let requestsArray = [];
    favsArray.forEach((fav) => {
      let request = axios.get(config().app.API_BASE_URL + "movie/" + fav, {
        headers: {
          Authorization: "Bearer " + config().app.API_TOKEN,
        },
      });
      requestsArray.push(request);
    });
    try {
      const responses = await axios.all(requestsArray);
      let data = [];
      responses.forEach((response) => {
        if (response.data.backdrop_path != null) {
          response.data.backdrop_path = new URL(
            "t/p/w1280" + response.data.backdrop_path,
            "https://image.tmdb.org/"
          );
        }

        if (response.data.poster_path != null) {
          response.data.poster_path = new URL(
            "t/p/w780" + response.data.poster_path,
            "https://image.tmdb.org/"
          );
        }

        data.push(response.data);
      });
      return data;
    } catch (error) {
      return "error";
    }
  },

  // Get top rated movies (page 1)

  // Get now playing movies (page 1)

  // Get upcoming movies (page 1)

  getMovieDetails: async function (movie_id) {
    try {
      const response = await axios.get(
        config().app.API_BASE_URL + "movie/" + movie_id,
        {
          headers: {
            Authorization: "Bearer " + config().app.API_TOKEN,
          },
        }
      );

      if (response.data.backdrop_path != null) {
        response.data.backdrop_path = new URL(
          "t/p/w1280" + response.data.backdrop_path,
          "https://image.tmdb.org/"
        );
      }

      if (response.data.poster_path != null) {
        response.data.poster_path = new URL(
          "t/p/w780" + response.data.poster_path,
          "https://image.tmdb.org/"
        );
      }

      return response.data;
    } catch (error) {
      return "error";
    }
  },

  getMovieTrailers: async function (movie_id) {
    try {
      const response = await axios.get(
        config().app.API_BASE_URL + "movie/" + movie_id + "/videos",
        {
          headers: {
            Authorization: "Bearer " + config().app.API_TOKEN,
          },
        }
      );

      if (response.data.results.length > 0) {
        response.data.results.forEach((result) => {
          result.key = "https://www.youtube.com/watch?v=" + result.key;
        });
      }

      return response.data.results;
    } catch (error) {
      return "error";
    }
  },
};
