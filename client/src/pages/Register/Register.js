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

import "./Register.scss";

function Register({
  isAuthenticated,
  isRegistering,
  register,
  registerError,
  registerSuccess,
  resetMessages,
}) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (username !== "" && email !== "" && password !== "") {
      register({ username, email, password });
    }
  }

  if (isAuthenticated) {
    return <Redirect to={ROUTES.HOME} />;
  }

  return (
    <div className="cont-register">
      <div className="text-center w-100">
        <main>
          <Logo fontSize="2.75rem" />

          <form
            className="form-register"
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <h1 className="h3 mb-3 font-weight-normal">User registration</h1>

            <Label htmlFor="registerName">Username</Label>
            <Input
              htmlType="text"
              id="registerName"
              name="registerName"
              additionalClasses="upper"
              placeholder="Username"
              maxLength="18"
              required
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <Label htmlFor="registerEmail">Email address</Label>
            <Input
              htmlType="email"
              id="registerEmail"
              name="registerEmail"
              additionalClasses="mid"
              placeholder="Email address"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Label htmlFor="registerPassword">Password</Label>
            <Input
              htmlType="password"
              id="registerPassword"
              name="registerPassword"
              additionalClasses="lower"
              placeholder="Password"
              minLength="6"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {registerError && (
              <Alert
                show={true}
                onClose={resetMessages}
                variant="danger"
                closeLabel="Close Alert"
                dismissible
                fade="true"
              >
                {registerError}
              </Alert>
            )}

            {registerSuccess && (
              <Alert
                show={true}
                onClose={resetMessages}
                variant="success"
                closeLabel="Close Alert"
                dismissible
                fade="true"
              >
                {registerSuccess}
              </Alert>
            )}

            <Button
              htmlType="submit"
              additionalClasses="btn-lg btn-block"
              disabled={isRegistering}
            >
              Create account
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

export default Register;
