import React, { useState } from "react";
import { Link } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import Logo from "../../components/Logo/Logo";
import Input from "../../components/Input/Input";

import "./Login.scss";

function Login() {
  const [show, setShow] = useState(true);

  return (
    <div className="container cont-login">
      <div className="text-center w-100">
        <Logo fontSize="2.75rem" />

        <form className="form-login" autoComplete="off">
          <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>

          <label htmlFor="loginEmail" className="sr-only">
            Email address
          </label>
          <Input
            htmlType="email"
            id="loginEmail"
            name="loginEmail"
            additionalClasses="upper"
            placeholder="Email address"
            required
            autoFocus
          />

          <label htmlFor="loginPassword" className="sr-only">
            Password
          </label>
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

          <button className="btn btn-lg btn-block" type="submit">
            Sign in
          </button>

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
          <p className="mt-5 mb-3 text-muted">
            &copy; The Movie App {new Date().getFullYear()}
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
