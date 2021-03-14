import React, { useState } from "react";
import { Modal } from "react-bootstrap";

import Button from "../../components/Button/Button";

import "./ProfileDeactivateAccount.scss";

function ProfileDeactivateAccount() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function handleDelete() {
    console.log("Delete account here!");
  }

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
          onClick={handleShow}
        >
          Confirm
        </Button>
      </div>

      {/* React-Bootstrap modal */}
      <Modal
        show={show}
        onHide={handleClose}
        centered
        // backdrop="static"
        // keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>&nbsp;</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete your account?</Modal.Body>
        <Modal.Footer>
          {/* <Button variant="secondary" onClick={handleClose}>
            Close
          </Button> */}
          <Button variant="primary" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ProfileDeactivateAccount;