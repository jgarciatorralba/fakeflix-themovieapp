import React from "react";

import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import Alert from "react-bootstrap/Alert";

import "./ProfilePassword.scss";

function ProfilePassword({ currentUser }) {
  console.log(currentUser);

  return (
    <form className="form-profile-password" autoComplete="off">
      <label htmlFor="profileCurrentPassword" className="px-4 px-sm-5">
        <b>Current Password</b>
      </label>
      <div className="input-group px-4 px-sm-5 mb-2">
        <Input
          htmlType="password"
          id="profileCurrentPassword"
          name="profileCurrentPassword"
          additionalClasses="single"
          autoFocus
        />
      </div>

      <label htmlFor="profileNewPassword" className="px-4 px-sm-5">
        <b>New Password</b>
      </label>
      <div className="input-group px-4 px-sm-5 mb-2">
        <Input
          htmlType="password"
          id="profileNewPassword"
          name="profileNewPassword"
          additionalClasses="single"
        />
      </div>

      <label htmlFor="profileRepeatPassword" className="px-4 px-sm-5">
        <b>Confirm New Password</b>
      </label>
      <div className="input-group px-4 px-sm-5 mb-3">
        <Input
          htmlType="password"
          id="profileRepeatPassword"
          name="profileRepeatPassword"
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

export default ProfilePassword;
