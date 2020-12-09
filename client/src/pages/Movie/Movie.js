import React from "react";
import { useParams } from "react-router";
import { Redirect } from "react-router-dom";

import ROUTES from "../../utils/routes";

import HeaderContainer from "../../redux/containers/components/HeaderContainer";
import Footer from "../../components/Footer/Footer";

import "./Movie.scss";

function Movie({ isAuthenticated }) {
  let { movie_id } = useParams();

  if (!isAuthenticated) {
    return <Redirect to={ROUTES.LOGIN} />;
  }

  return (
    <div className="Movie">
      <HeaderContainer />
      <h1>Movie {movie_id}</h1>
      <Footer />
    </div>
  );
}

export default Movie;
