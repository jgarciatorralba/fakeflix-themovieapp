import React from "react";

import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import Alert from "react-bootstrap/Alert";

import "./ProfileAvatar.scss";

function ProfileAvatar({ currentUser }) {
  console.log(currentUser.avatar);

  return <div>Avatar</div>;
}

export default ProfileAvatar;
