import React, { useState } from "react";
import Alert from "react-bootstrap/Alert";

import Logo from "../../components/Logo/Logo";
import Label from "../../components/Label/Label";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import Footer from "../../components/Footer/Footer";
import HelperParagraph from "../../components/HelperParagraph/HelperParagraph";

import "./ResetPassword.scss";

function ResetPassword() {
  const [show, setShow] = useState(true);

  return (
    <div className="cont-reset">
      <div className="text-center w-100">
        <main>
          <Logo fontSize="2.75rem" />

          <form className="form-reset" autoComplete="off">
            <h1 className="h3 font-weight-normal">Reset your password</h1>
            <p className="mb-3">Enter a new password.</p>

            <Label htmlFor="resetPassword">New password</Label>
            <Input
              htmlType="password"
              id="resetPassword"
              name="resetPassword"
              additionalClasses="single"
              placeholder="New password"
              minLength="6"
              required
              autoFocus
            />

            {show && (
              <Alert
                show={true}
                onClose={() => setShow(false)}
                variant="danger"
                closeLabel="Close Alert"
                dismissible
                fade="true"
              >
                Dismissible alert!
              </Alert>
            )}

            <Button htmlType="button" additionalClasses="btn-lg btn-block">
              Reset password
            </Button>

            <HelperParagraph
              helperText="Back to"
              linkTo="/login"
              boldText="login"
            />
          </form>
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default ResetPassword;
