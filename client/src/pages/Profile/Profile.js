import React, { useState } from "react";
import { Redirect } from "react-router-dom";

import ROUTES from "../../utils/routes";

import HeaderContainer from "../../redux/containers/components/HeaderContainer";

import "./Profile.scss";

function Profile({ isAuthenticated }) {
  const [sectionDetails, setSectionDetails] = useState("active-option");
  const [sectionPassword, setSectionPassword] = useState("");

  function handleClick(e) {
    if (e.target.innerText === "Contact details") {
      setSectionDetails("active-option");
      setSectionPassword("");
    } else if (e.target.innerText === "Password") {
      setSectionDetails("");
      setSectionPassword("active-option");
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
            className={`d-inline py-3 mr-3 ${sectionDetails}`}
            onClick={(e) => handleClick(e)}
          >
            Contact details
          </li>
          <li
            className={`d-inline py-3 mr-3 ${sectionPassword}`}
            onClick={(e) => handleClick(e)}
          >
            Password
          </li>
        </ul>
      </div>
      {sectionDetails !== "" && <div>Contact</div>}
      {sectionPassword !== "" && <div>Password</div>}
    </div>
  );
}

export default Profile;
