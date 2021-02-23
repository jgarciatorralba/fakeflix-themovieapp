import React, { useState } from "react";
import { Redirect } from "react-router-dom";

import ROUTES from "../../utils/routes";

import HeaderContainer from "../../redux/containers/components/HeaderContainer";
import ProfileContactDetailsContainer from "../../redux/containers/components/ProfileContactDetailsContainer";
import ProfileAvatarContainer from "../../redux/containers/components/ProfileAvatarContainer";
import ProfilePasswordContainer from "../../redux/containers/components/ProfilePasswordContainer";

import Footer from "../../components/Footer/Footer";

import "./Profile.scss";

function Profile({ isAuthenticated }) {
  const [classDetails, setClassDetails] = useState("active-option");
  const [classAvatar, setClassAvatar] = useState("");
  const [classPassword, setClassPassword] = useState("");

  function handleClick(e) {
    if (e.target.innerText === "Contact details") {
      setClassDetails("active-option");
      setClassAvatar("");
      setClassPassword("");
    } else if (e.target.innerText === "Avatar") {
      setClassDetails("");
      setClassAvatar("active-option");
      setClassPassword("");
    } else if (e.target.innerText === "Password") {
      setClassDetails("");
      setClassAvatar("");
      setClassPassword("active-option");
    }
  }

  if (!isAuthenticated) {
    return <Redirect to={ROUTES.HOME} />;
  }

  return (
    <div className="Profile">
      <HeaderContainer />

      <h5 className="p-3 mx-auto mb-0 my-sm-3">Your Profile</h5>
      <div className="cont-profile-options mx-3 mx-sm-5 mb-3 mb-sm-4">
        <ul className="p-0">
          <li
            className={`d-inline py-3 mr-4 ${classDetails}`}
            onClick={(e) => handleClick(e)}
          >
            Contact details
          </li>
          <li
            className={`d-inline py-3 mr-4 ${classAvatar}`}
            onClick={(e) => handleClick(e)}
          >
            Avatar
          </li>
          <li
            className={`d-inline py-3 mr-4 ${classPassword}`}
            onClick={(e) => handleClick(e)}
          >
            Password
          </li>
        </ul>
      </div>

      {classDetails === "active-option" && <ProfileContactDetailsContainer />}
      {classAvatar === "active-option" && <ProfileAvatarContainer />}
      {classPassword === "active-option" && <ProfilePasswordContainer />}

      <Footer />
    </div>
  );
}

export default Profile;
