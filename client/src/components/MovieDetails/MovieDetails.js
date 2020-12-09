import React from "react";

import "./MovieDetails.scss";

function MovieDetails({ details }) {
  return (
    <div className="MovieDetails">
      <div className="details-cont">
        <div
          className="cover"
          style={{
            backgroundColor: "#141414",
            backgroundImage: `linear-gradient(rgba(20, 20, 20, 0.8), rgba(20, 20, 20, 0.8)), url(${details.backdrop_path})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        ></div>
      </div>
    </div>
  );
}

export default MovieDetails;
