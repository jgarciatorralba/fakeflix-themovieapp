import React, { useState } from "react";
import { Modal } from "react-bootstrap";

import Button from "../../components/Button/Button";
import Alert from "react-bootstrap/Alert";

import "./ProfileDeactivateAccount.scss";

function ProfileDeactivateAccount({
  isDeactivatingAccount,
  deactivateAccountError,
  deactivateAccount,
  resetMessages,
}) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="cont-profile-deactivate-account">
      <h6 className="px-4 px-sm-5">
        <b>Delete account</b>
      </h6>
      <p className="px-4 px-sm-5">
        This process is permanent and cannot be undone.
      </p>

      <span>&nbsp;</span>

      {deactivateAccountError && (
        <div className="alert-wrapper mx-4 mx-sm-5">
          <Alert
            show={true}
            onClose={resetMessages}
            variant="danger"
            closeLabel="Close Alert"
            dismissible
            fade="true"
          >
            {deactivateAccountError}
          </Alert>
        </div>
      )}

      <div className="input-group px-4 px-sm-5 mb-2 mb-sm-5">
        <Button
          htmlType="submit"
          id="btnDeactivate"
          additionalClasses="btn-lg btn-block"
          onClick={handleShow}
        >
          Confirm
        </Button>
      </div>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>&nbsp;</Modal.Title>
        </Modal.Header>
        <Modal.Body>Do you really want to delete your account?</Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={deactivateAccount}
            disabled={isDeactivatingAccount}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ProfileDeactivateAccount;
