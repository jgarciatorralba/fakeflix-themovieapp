import React from "react";

import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import Alert from "react-bootstrap/Alert";

import "./ProfileContactDetails.scss";

function ProfileContactDetails({ currentUser }) {
  console.log(currentUser);

  return (
    <form className="form-profile-contact-details" autoComplete="off">
      <label htmlFor="profileUsername" className="px-4 px-sm-5">
        <b>Username</b>
      </label>
      <div className="input-group px-4 px-sm-5 mb-2">
        <Input
          htmlType="text"
          id="profileUsername"
          name="profileUsername"
          additionalClasses="single"
          autoFocus
        />
      </div>

      <label htmlFor="profileEmail" className="px-4 px-sm-5">
        <b>Email address</b>
      </label>
      <div className="input-group px-4 px-sm-5 mb-3">
        <Input
          htmlType="email"
          id="profileEmail"
          name="profileEmail"
          additionalClasses="single"
        />
      </div>

      {/* Alert message here */}

      <span>&nbsp;</span>
      <div className="input-group px-4 px-sm-5 mb-2 mb-sm-5">
        <Button htmlType="submit" additionalClasses="btn-lg btn-block">
          Save
        </Button>
      </div>
    </form>
  );
}

export default ProfileContactDetails;
