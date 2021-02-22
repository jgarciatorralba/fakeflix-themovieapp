import React, { useState } from "react";
import { Redirect } from "react-router-dom";

import ROUTES from "../../utils/routes";

import HeaderContainer from "../../redux/containers/components/HeaderContainer";

import Alert from "react-bootstrap/Alert";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
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

      <h5 className="p-3 mx-auto mb-0">Your Profile</h5>
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

      {classDetails === "active-option" && (
        <form className="form-profile-contact-details" autoComplete="off">
          <label htmlFor="profileUsername" className="px-4">
            <b>Username</b>
          </label>
          <div className="input-group px-4 mb-2">
            <Input
              htmlType="text"
              id="profileUsername"
              name="profileUsername"
              additionalClasses="single"
              autoFocus
            />
          </div>

          <label htmlFor="profileEmail" className="px-4">
            <b>Email address</b>
          </label>
          <div className="input-group px-4 mb-2">
            <Input
              htmlType="email"
              id="profileEmail"
              name="profileEmail"
              additionalClasses="single"
            />
          </div>

          {/* Alert message here */}

          <span>&nbsp;</span>
          <div className="input-group px-4 mb-4">
            <Button htmlType="submit" additionalClasses="btn-lg btn-block">
              Save
            </Button>
          </div>
        </form>
      )}
      {classAvatar === "active-option" && <div>Avatar</div>}
      {classPassword === "active-option" && (
        <form className="form-profile-password" autoComplete="off">
          <label htmlFor="profileCurrentPassword" className="px-4">
            <b>Current Password</b>
          </label>
          <div className="input-group px-4 mb-2">
            <Input
              htmlType="password"
              id="profileCurrentPassword"
              name="profileCurrentPassword"
              additionalClasses="single"
              autoFocus
            />
          </div>

          <label htmlFor="profileNewPassword" className="px-4">
            <b>New Password</b>
          </label>
          <div className="input-group px-4 mb-2">
            <Input
              htmlType="password"
              id="profileNewPassword"
              name="profileNewPassword"
              additionalClasses="single"
            />
          </div>

          <label htmlFor="profileRepeatPassword" className="px-4">
            <b>Confirm New Password</b>
          </label>
          <div className="input-group px-4 mb-2">
            <Input
              htmlType="password"
              id="profileRepeatPassword"
              name="profileRepeatPassword"
              additionalClasses="single"
            />
          </div>

          {/* Alert message here */}

          <span>&nbsp;</span>
          <div className="input-group px-4 mb-4">
            <Button htmlType="submit" additionalClasses="btn-lg btn-block">
              Save
            </Button>
          </div>
        </form>
      )}

      <Footer />
    </div>
  );
}

export default Profile;
