import React, { useState, useEffect } from "react";

import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import Alert from "react-bootstrap/Alert";

import "./ProfilePassword.scss";

function ProfilePassword({
  isUpdatingProfile,
  updateProfileError,
  updateProfileSuccess,
  updatePassword,
  resetMessages,
}) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    resetMessages();
  }, [resetMessages]);

  function handleSubmit(e) {
    e.preventDefault();

    if (
      currentPassword !== "" &&
      newPassword !== "" &&
      confirmPassword !== ""
    ) {
      updatePassword({ currentPassword, newPassword, confirmPassword });
    }
  }

  return (
    <form
      className="form-profile-password"
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <label htmlFor="profileCurrentPassword" className="px-4 px-sm-5">
        <b>Current Password</b>
      </label>
      <div className="input-group px-4 px-sm-5 mb-2">
        <Input
          htmlType="password"
          id="profileCurrentPassword"
          name="profileCurrentPassword"
          additionalClasses="single"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          required
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
          minLength="6"
          required
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
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
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>

      <span>&nbsp;</span>

      {updateProfileError && (
        <div className="alert-wrapper mx-4 mx-sm-5">
          <Alert
            show={true}
            onClose={resetMessages}
            variant="danger"
            closeLabel="Close Alert"
            dismissible
            fade="true"
          >
            {updateProfileError}
          </Alert>
        </div>
      )}

      {updateProfileSuccess && (
        <div className="alert-wrapper mx-4 mx-sm-5">
          <Alert
            show={true}
            onClose={resetMessages}
            variant="success"
            closeLabel="Close Alert"
            dismissible
            fade="true"
          >
            {updateProfileSuccess}
          </Alert>
        </div>
      )}

      <div className="input-group px-4 px-sm-5 mb-2 mb-sm-5">
        <Button
          htmlType="submit"
          additionalClasses="btn-lg btn-block"
          disabled={isUpdatingProfile}
        >
          Update
        </Button>
      </div>
    </form>
  );
}

export default ProfilePassword;
