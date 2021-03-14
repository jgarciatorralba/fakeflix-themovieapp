import React from "react";

import Button from "../../components/Button/Button";

import "./ProfileDeactivateAccount.scss";

function ProfileDeactivateAccount() {
  return (
    <div className="cont-profile-deactivate-account">
      <h6 className="px-4 px-sm-5">
        <b>Delete account</b>
      </h6>
      <p className="px-4 px-sm-5">
        This process is permanent and cannot be undone.
      </p>

      <span>&nbsp;</span>

      <div className="input-group px-4 px-sm-5 mb-2 mb-sm-5">
        <Button
          htmlType="submit"
          id="btnDeactivate"
          additionalClasses="btn-lg btn-block"
        >
          Confirm
        </Button>
      </div>
    </div>
  );
}

export default ProfileDeactivateAccount;
