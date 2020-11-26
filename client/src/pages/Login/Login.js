import React, { useState } from "react";
import { Link } from "react-router-dom";
import Alert from "react-bootstrap/Alert";

import Logo from "../../components/Logo/Logo";
import Label from "../../components/Label/Label";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import Footer from "../../components/Footer/Footer";

import "./Login.scss";

function Login() {
  const [show, setShow] = useState(true);

  return (
    <main className="container cont-login">
      <div className="text-center w-100">
        <Logo fontSize="2.75rem" />

        <form className="form-login" autoComplete="off">
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
          />

          <Label htmlFor="loginPassword">Password</Label>
          <Input
            htmlType="password"
            id="loginPassword"
            name="loginPassword"
            additionalClasses="lower"
            placeholder="Password"
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
            Sign in
          </Button>

          <p className="my-1">
            Forgot your password?{" "}
            <Link
              to="/password/forgot"
              className="text-decoration-none text-body"
            >
              <b>Reset here</b>.
            </Link>
          </p>
          <p className="my-1">
            Don't have an account?{" "}
            <Link to="/register" className="text-decoration-none text-body">
              <b>Register here</b>.
            </Link>
          </p>
        </form>

        <Footer />
      </div>
    </main>
  );
}

export default Login;
