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
      let movies = [];
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
        } else {
          response.data.poster_path = new URL(
            "/img/movie/default-poster.png",
            config().app.SERVER_DOMAIN
          );
        }

        movies.push(response.data);
      });
      return movies;
    } catch (error) {
      return "error";
    }
  },

  getTopRated: async function (page) {
    try {
      const response = await axios.get(
        config().app.API_BASE_URL + "movie/top_rated?page=" + page,
        {
          headers: {
            Authorization: "Bearer " + config().app.API_TOKEN,
          },
        }
      );

      if (response.data.results.length > 0) {
        response.data.results.forEach((result) => {
          if (result.backdrop_path != null) {
            result.backdrop_path = new URL(
              "t/p/w1280" + result.backdrop_path,
              "https://image.tmdb.org/"
            );
          }

          if (result.poster_path != null) {
            result.poster_path = new URL(
              "t/p/w780" + result.poster_path,
              "https://image.tmdb.org/"
            );
          } else {
            result.poster_path = new URL(
              "/img/movie/default-poster.png",
              config().app.SERVER_DOMAIN
            );
          }
        });
      }
      return {
        results: response.data.results,
        totalPages: response.data.total_pages,
      };
    } catch (error) {
      return "error";
    }
  },

  getNowPlaying: async function (page) {
    try {
      const response = await axios.get(
        config().app.API_BASE_URL + "movie/now_playing?page=" + page,
        {
          headers: {
            Authorization: "Bearer " + config().app.API_TOKEN,
          },
        }
      );

      if (response.data.results.length > 0) {
        response.data.results.forEach((result) => {
          if (result.backdrop_path != null) {
            result.backdrop_path = new URL(
              "t/p/w1280" + result.backdrop_path,
              "https://image.tmdb.org/"
            );
          }

          if (result.poster_path != null) {
            result.poster_path = new URL(
              "t/p/w780" + result.poster_path,
              "https://image.tmdb.org/"
            );
          } else {
            result.poster_path = new URL(
              "/img/movie/default-poster.png",
              config().app.SERVER_DOMAIN
            );
          }
        });
      }
      return {
        results: response.data.results,
        totalPages: response.data.total_pages,
      };
    } catch (error) {
      return "error";
    }
  },

  getUpcoming: async function (page) {
    try {
      const response = await axios.get(
        config().app.API_BASE_URL + "movie/upcoming?page=" + page,
        {
          headers: {
            Authorization: "Bearer " + config().app.API_TOKEN,
          },
        }
      );

      if (response.data.results.length > 0) {
        response.data.results.forEach((result) => {
          if (result.backdrop_path != null) {
            result.backdrop_path = new URL(
              "t/p/w1280" + result.backdrop_path,
              "https://image.tmdb.org/"
            );
          }

          if (result.poster_path != null) {
            result.poster_path = new URL(
              "t/p/w780" + result.poster_path,
              "https://image.tmdb.org/"
            );
          } else {
            result.poster_path = new URL(
              "/img/movie/default-poster.png",
              config().app.SERVER_DOMAIN
            );
          }
        });
      }
      return {
        results: response.data.results,
        totalPages: response.data.total_pages,
      };
    } catch (error) {
      return "error";
    }
  },

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
      } else {
        response.data.poster_path = new URL(
          "/img/movie/default-poster.png",
          config().app.SERVER_DOMAIN
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

  getSearch: async function (search_query, page) {
    try {
      const response = await axios.get(
        config().app.API_BASE_URL +
          `search/movie?query=${search_query}&page=${page}&include_adult=false`,
        {
          headers: {
            Authorization: "Bearer " + config().app.API_TOKEN,
          },
        }
      );

      if (response.data.results.length > 0) {
        response.data.results.forEach((result) => {
          if (result.backdrop_path != null) {
            result.backdrop_path = new URL(
              "t/p/w1280" + result.backdrop_path,
              "https://image.tmdb.org/"
            );
          }

          if (result.poster_path != null) {
            result.poster_path = new URL(
              "t/p/w780" + result.poster_path,
              "https://image.tmdb.org/"
            );
          } else {
            result.poster_path = new URL(
              "/img/movie/default-poster.png",
              config().app.SERVER_DOMAIN
            );
          }
        });
      }
      return {
        results: response.data.results,
        totalPages: response.data.total_pages,
      };
    } catch (error) {
      return "error";
    }
  },
};
