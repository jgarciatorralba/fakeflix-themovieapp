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

import "./Login.scss";

function Login({
  isAuthenticated,
  loginError,
  isLoggingIn,
  login,
  logoutError,
  deactivateAccountSuccess,
  logoutSuccess,
  resetMessages,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (email !== "" && password !== "") {
      login({ email, password });
    }
  }

  if (isAuthenticated) {
    return <Redirect to={ROUTES.HOME} />;
  }

  return (
    <div className="cont-login">
      <div className="text-center w-100">
        <main>
          <Logo fontSize="2.75rem" />

          <form
            className="form-login"
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>

            <Label htmlFor="loginEmail">Email address</Label>
            <Input
              htmlType="email"
              id="loginEmail"
              name="loginEmail"
              additionalClasses="upper"
              placeholder="Email address"
              required
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Label htmlFor="loginPassword">Password</Label>
            <Input
              htmlType="password"
              id="loginPassword"
              name="loginPassword"
              additionalClasses="lower"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {loginError && (
              <Alert
                show={true}
                onClose={resetMessages}
                variant="danger"
                closeLabel="Close Alert"
                dismissible
                fade="true"
              >
                {loginError}
              </Alert>
            )}

            {logoutError && (
              <Alert
                show={true}
                onClose={resetMessages}
                variant="danger"
                closeLabel="Close Alert"
                dismissible
                fade="true"
              >
                {logoutError}
              </Alert>
            )}

            {logoutSuccess && (
              <Alert
                show={true}
                onClose={resetMessages}
                variant="success"
                closeLabel="Close Alert"
                dismissible
                fade="true"
              >
                {logoutSuccess}
              </Alert>
            )}

            {deactivateAccountSuccess && (
              <Alert
                show={true}
                onClose={resetMessages}
                variant="success"
                closeLabel="Close Alert"
                dismissible
                fade="true"
              >
                {deactivateAccountSuccess}
              </Alert>
            )}

            <Button
              htmlType="submit"
              additionalClasses="btn-lg btn-block"
              disabled={isLoggingIn}
            >
              Sign in
            </Button>

            <HelperParagraph
              helperText="Forgot your password?"
              linkTo="/password/forgot"
              boldText="Reset here"
            />

            <HelperParagraph
              helperText="Don't have an account?"
              linkTo="/register"
              boldText="Register here"
            />
          </form>
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default Login;
