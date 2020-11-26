import React, { useState } from "react";
import Alert from "react-bootstrap/Alert";

import Logo from "../../components/Logo/Logo";
import Label from "../../components/Label/Label";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import Footer from "../../components/Footer/Footer";
import HelperParagraph from "../../components/HelperParagraph/HelperParagraph";

import "./Login.scss";

function Login() {
  const [show, setShow] = useState(true);

  return (
    <div className="cont-login">
      <div className="text-center w-100">
        <main>
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
