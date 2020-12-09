import React from "react";

import "./MovieDetails.scss";

function MovieDetails({ details, loading, loadingError }) {
  return (
    <div className="MovieDetails">
      <div className="details-cont">
        {loadingError && (
          <div className="d-flex justify-content-center align-items-center border rounded error-cont mx-auto">
            <div>
              <p className="my-2 text-center">
                Whoops, something went wrong...
              </p>
              <p className="my-2 text-center">{loadingError}</p>
            </div>
          </div>
        )}

        {loading && (
          <div className="d-flex justify-content-center align-items-center loading-cont mx-auto">
            <div>
              <p className="p-3 my-0">Loading content, please wait...</p>
            </div>
          </div>
        )}

        {!loadingError && !loading && (
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
        )}
      </div>
    </div>
  );
}

export default MovieDetails;
