import React, { useState } from "react";
import { Redirect } from "react-router-dom";

import ROUTES from "../../utils/routes";

import Alert from "react-bootstrap/Alert";

import Logo from "../../components/Logo/Logo";
import Label from "../../components/Label/Label";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import Footer from "../../components/Footer/Footer";
import HelperParagraph from "../../components/HelperParagraph/HelperParagraph";

import "./ForgotPassword.scss";

function ForgotPassword({
  isAuthenticated,
  isRequestingNewPassword,
  forgotPassword,
  forgetPasswordError,
  forgetPasswordSuccess,
  resetMessages,
}) {
  const [email, setEmail] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (email !== "") {
      forgotPassword({ email });
    }
  }

  if (isAuthenticated) {
    return <Redirect to={ROUTES.HOME} />;
  }

  return (
    <div className="cont-forgot">
      <div className="text-center w-100">
        <main>
          <Logo fontSize="2.75rem" />

          <form
            className="form-forgot"
            autoComplete="off"
            onSubmit={handleSubmit}
          >
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
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            {forgetPasswordError && (
              <Alert
                show={true}
                onClose={resetMessages}
                variant="danger"
                closeLabel="Close Alert"
                dismissible
                fade="true"
              >
                {forgetPasswordError}
              </Alert>
            )}

            {forgetPasswordSuccess && (
              <Alert
                show={true}
                onClose={resetMessages}
                variant="success"
                closeLabel="Close Alert"
                dismissible
                fade="true"
              >
                {forgetPasswordSuccess}
              </Alert>
            )}

            <Button
              htmlType="submit"
              additionalClasses="btn-lg btn-block"
              disabled={isRequestingNewPassword}
            >
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
