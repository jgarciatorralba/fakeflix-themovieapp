import React from "react";
import { Link } from "react-router-dom";

import "./TopRated.scss";

function TopRated() {
  return (
    <div className="TopRated mt-1 mt-sm-3 px-3">
      <h5 className="section-title">Top Rated</h5>
      <div className="movie-cont py-3"></div>
    </div>
  );
}

export default TopRated;
