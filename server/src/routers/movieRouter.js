// Import dependencies
import express from "express";

// Import controller
import movieController from "../controllers/movieController.js";
import favouriteController from "../controllers/favouriteController.js";

// Import project files
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

// Get configuration details (used for images base url)
router.get("/config", async (req, res) => {
  const config = await movieController.getConfig();
  if (config == "error") {
    return res.status(500).json({ data: null, error: "Internal Server Error" });
  }
  res.json({ data: config, error: null });
});

// Get random movie details (out of the most popular, used for the banner)
router.get("/random", async (req, res) => {
  const movie = await movieController.getRandomMovie();
  if (movie == "error") {
    return res.status(500).json({ data: null, error: "Internal Server Error" });
  }
  res.json({ data: movie, error: null });
});

// Get details for several movies by id (favourites)
router.get("/favourites", async (req, res) => {
  const favs = await favouriteController.getUserFavourites(req.user.id);
  let favsArray = [];
  favs.forEach((fav) => {
    favsArray.push(fav.movie_id);
  });

  const movies = await movieController.getFavouritesDetails(favsArray);
  if (movies == "error") {
    return res.status(500).json({ data: null, error: "Internal Server Error" });
  }
  res.json({ data: movies, error: null });
});

// Get top rated movies (with pagination)
router.get("/top-rated", async (req, res) => {
  const page = req.query.page || 1;

  const movies = await movieController.getTopRated(page);
  if (movies == "error") {
    return res.status(500).json({ data: null, error: "Internal Server Error" });
  }
  res.json({ data: movies, error: null });
});

// Get now playing movies (with pagination)
router.get("/now-playing", async (req, res) => {
  const page = req.query.page || 1;

  const movies = await movieController.getNowPlaying(page);
  if (movies == "error") {
    return res.status(500).json({ data: null, error: "Internal Server Error" });
  }
  res.json({ data: movies, error: null });
});

// Get upcoming movies (with pagination)
router.get("/upcoming", async (req, res) => {
  const page = req.query.page || 1;

  const movies = await movieController.getUpcoming(page);
  if (movies == "error") {
    return res.status(500).json({ data: null, error: "Internal Server Error" });
  }
  res.json({ data: movies, error: null });
});

// Get movie details
router.get("/details/:movie_id", async (req, res) => {
  const movie = await movieController.getMovieDetails(req.params.movie_id);
  if (movie == "error") {
    return res.status(500).json({ data: null, error: "Internal Server Error" });
  }
  res.json({ data: movie, error: null });
});

// Get movie trailers
router.get("/trailers/:movie_id", async (req, res) => {
  const trailers = await movieController.getMovieTrailers(req.params.movie_id);
  if (trailers == "error") {
    return res.status(500).json({ data: null, error: "Internal Server Error" });
  }
  res.json({ data: trailers, error: null });
});

// Search movies
router.get("/search", async (req, res) => {
  const query = req.query.query;
  const page = req.query.page || 1;

  const movies = await movieController.getSearch(query, page);
  if (movies == "error") {
    return res.status(500).json({ data: null, error: "Internal Server Error" });
  }

  res.json({ data: movies, error: null });
});

export default router;
