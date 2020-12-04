import React from "react";
import { Redirect } from "react-router-dom";

import ROUTES from "../../utils/routes";

import HeaderContainer from "../../redux/containers/components/HeaderContainer";

import "./Home.scss";

function Home({ isAuthenticated }) {
  if (!isAuthenticated) {
    return <Redirect to={ROUTES.LOGIN} />;
  }

  return (
    <div className="Home">
      <HeaderContainer />
    </div>
  );
}

export default Home;
