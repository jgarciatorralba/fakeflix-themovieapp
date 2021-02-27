import React, { useState } from "react";

import Button from "../../components/Button/Button";
import Alert from "react-bootstrap/Alert";

import "./ProfileAvatar.scss";

function ProfileAvatar({ currentUser }) {
  const [avatar, setAvatar] = useState(currentUser.avatar);
  const [label, setLabel] = useState("Choose file");

  function handleChange(e) {
    let files = e.target.files;
    if (files.length > 0) {
      let newSrc = URL.createObjectURL(files[0]);
      setAvatar(newSrc);
      setLabel(files[0].name);
    } else {
      setAvatar(currentUser.avatar);
      setLabel("Choose file");
    }
  }

  return (
    <form className="form-profile-avatar" autoComplete="off">
      <div className="px-4 px-sm-5 mb-2">
        <b>Avatar</b>
      </div>

      <div className="mx-4 mx-sm-5 mb-4 picture-wrapper d-flex justify-content-center">
        <div
          className="profile-picture rounded"
          style={{
            backgroundImage: `url(${avatar})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        ></div>
      </div>

      <div className="input-group px-4 px-sm-5 mb-2">
        <div className="custom-file">
          <input
            type="file"
            className="custom-file-input"
            id="profileAvatar"
            onChange={handleChange}
            required
          />
          <label className="custom-file-label" htmlFor="profileAvatar">
            {label}
          </label>
        </div>
      </div>

      <span>&nbsp;</span>

      <div className="px-4 px-sm-5 mb-2 mb-sm-5">
        <Button htmlType="submit" additionalClasses="btn-lg btn-block">
          Update
        </Button>
      </div>
    </form>
  );
}

export default ProfileAvatar;
