import React, { useState, useEffect } from "react";

import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import Alert from "react-bootstrap/Alert";

import "./ProfileContactDetails.scss";

function ProfileContactDetails({
  currentUser,
  isUpdatingProfile,
  updateProfileError,
  updateProfileSuccess,
  updateContact,
  resetMessages,
}) {
  const [username, setUsername] = useState(currentUser.username);
  const [email, setEmail] = useState(currentUser.email);

  useEffect(() => {
    resetMessages();
  }, [resetMessages]);

  function handleSubmit(e) {
    e.preventDefault();

    if (username !== "" && email !== "") {
      if (username === currentUser.username && email !== currentUser.email) {
        updateContact({ undefined, email });
      } else if (
        username !== currentUser.username &&
        email === currentUser.email
      ) {
        updateContact({ username, undefined });
      } else if (
        username !== currentUser.username &&
        email !== currentUser.email
      ) {
        updateContact({ username, email });
      }
    }
  }

  return (
    <form
      className="form-profile-contact-details"
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <label htmlFor="profileUsername" className="px-4 px-sm-5">
        <b>Username</b>
      </label>
      <div className="input-group px-4 px-sm-5 mb-2">
        <Input
          htmlType="text"
          id="profileUsername"
          name="profileUsername"
          additionalClasses="single"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          spellCheck="false"
          maxLength="18"
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
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          spellCheck="false"
          required
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

export default ProfileContactDetails;
