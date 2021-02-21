import React from "react";
import { Redirect } from "react-router-dom";

import ROUTES from "../../utils/routes";

import HeaderContainer from "../../redux/containers/components/HeaderContainer";

import "./Profile.scss";

function Profile({ isAuthenticated }) {
  if (!isAuthenticated) {
    return <Redirect to={ROUTES.HOME} />;
  }

  return (
    <div className="Profile">
      <HeaderContainer />

      <h1>Profile</h1>
    </div>
  );
}

export default Profile;
