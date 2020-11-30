import React, { useState } from "react";
import Alert from "react-bootstrap/Alert";

import Logo from "../../components/Logo/Logo";
import Label from "../../components/Label/Label";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import Footer from "../../components/Footer/Footer";
import HelperParagraph from "../../components/HelperParagraph/HelperParagraph";

import "./ForgotPassword.scss";

function ForgotPassword() {
  const [show, setShow] = useState(true);

  return (
    <div className="cont-forgot">
      <div className="text-center w-100">
        <main>
          <Logo fontSize="2.75rem" />

          <form className="form-forgot" autoComplete="off">
            <h1 className="h3 font-weight-normal">Forgot your password?</h1>
            <p className="mb-3">Enter your email to restore it.</p>

            <Label htmlFor="forgotEmail">Email address</Label>
            <Input
              htmlType="email"
              id="forgotEmail"
              name="forgotEmail"
              additionalClasses="single"
              placeholder="Email address"
              required
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
              Send email
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

export default ForgotPassword;
