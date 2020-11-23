import React from "react";
import { useParams } from "react-router";

function Movie() {
  let { movie_id } = useParams();

  return (
    <div className="Movie">
      <h1>Movie {movie_id}</h1>
    </div>
  );
}

export default Movie;
