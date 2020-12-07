import React from "react";
import { Redirect } from "react-router-dom";

import ROUTES from "../../utils/routes";

import HeaderContainer from "../../redux/containers/components/HeaderContainer";
import RandomMovieContainer from "../../redux/containers/components/RandomMovieContainer";
import TopRatedContainer from "../../redux/containers/components/TopRatedContainer";
import Footer from "../../components/Footer/Footer";

import "./Home.scss";

function Home({ isAuthenticated }) {
  if (!isAuthenticated) {
    return <Redirect to={ROUTES.LOGIN} />;
  }

  return (
    <div className="Home">
      <HeaderContainer />
      <RandomMovieContainer />
      <TopRatedContainer />
      <Footer />
    </div>
  );
}

export default Home;
