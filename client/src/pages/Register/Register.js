import React, { useState } from "react";
import Alert from "react-bootstrap/Alert";

import Logo from "../../components/Logo/Logo";
import Label from "../../components/Label/Label";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import Footer from "../../components/Footer/Footer";
import HelperParagraph from "../../components/HelperParagraph/HelperParagraph";

import "./Register.scss";

function Register() {
  const [show, setShow] = useState(true);

  return (
    <div className="cont-register">
      <div className="text-center w-100">
        <main>
          <Logo fontSize="2.75rem" />

          <form className="form-register" autoComplete="off">
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
            />

            <Label htmlFor="registerEmail">Email address</Label>
            <Input
              htmlType="email"
              id="registerEmail"
              name="registerEmail"
              additionalClasses="mid"
              placeholder="Email address"
              required
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
