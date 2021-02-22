import React, { useState } from "react";
import { Redirect } from "react-router-dom";

import ROUTES from "../../utils/routes";

import HeaderContainer from "../../redux/containers/components/HeaderContainer";

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

      <h5 className="p-3 mx-auto">Your Profile</h5>
      <div className="cont-profile-options mx-3 mb-3 ">
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
      {classDetails === "active-option" && <div>Contact</div>}
      {classAvatar === "active-option" && <div>Avatar</div>}
      {classPassword === "active-option" && <div>Password</div>}
    </div>
  );
}

export default Profile;
