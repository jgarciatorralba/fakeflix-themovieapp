import React, { useState } from "react";
import { Redirect, useLocation } from "react-router-dom";

import ROUTES from "../../utils/routes";

import Alert from "react-bootstrap/Alert";

import Logo from "../../components/Logo/Logo";
import Label from "../../components/Label/Label";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import Footer from "../../components/Footer/Footer";
import HelperParagraph from "../../components/HelperParagraph/HelperParagraph";

import "./ResetPassword.scss";

function ResetPassword({
  isAuthenticated,
  isResetingPassword,
  resetPassword,
  resetPasswordError,
  resetPasswordSuccess,
  resetMessages,
}) {
  const [password, setPassword] = useState("");

  let query = new URLSearchParams(useLocation().search);
  let token = query.get("token");

  function handleSubmit(e) {
    e.preventDefault();

    if (password !== "") {
      resetPassword({ password, token });
    }
  }

  if (isAuthenticated) {
    return <Redirect to={ROUTES.HOME} />;
  }

  return (
    <div className="cont-reset">
      <div className="text-center w-100">
        <main>
          <Logo fontSize="2.75rem" />

          <form
            className="form-reset"
            autoComplete="off"
            onSubmit={handleSubmit}
          >
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {resetPasswordError && (
              <Alert
                show={true}
                onClose={resetMessages}
                variant="danger"
                closeLabel="Close Alert"
                dismissible
                fade="true"
              >
                {resetPasswordError}
              </Alert>
            )}

            {resetPasswordSuccess && (
              <Alert
                show={true}
                onClose={resetMessages}
                variant="success"
                closeLabel="Close Alert"
                dismissible
                fade="true"
              >
                {resetPasswordSuccess}
              </Alert>
            )}

            <Button
              htmlType="submit"
              additionalClasses="btn-lg btn-block"
              disabled={isResetingPassword}
            >
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
