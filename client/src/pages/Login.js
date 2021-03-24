import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Form } from "semantic-ui-react";

function Login() {
  const [values, setValues] = useState({
    username: "",
    password: "",
    remember: false,
  });

  // const [loading, setLoading] = useState(false)

  const updateFieldValue = e =>
    setValues({ ...values, [e.target.name]: e.target.value });

  return (
    <React.Fragment>
      <div className="register-form">
        <h1>Sign up for a new account</h1>
        <Form>
          <Form.Input
            fluid
            name="username"
            label="Username"
            value={values.useState}
            onChange={updateFieldValue}
            placeholder="Enter your username"
            required
          />
          <Form.Input
            fluid
            type="password"
            name="password"
            label="Password"
            value={values.password}
            onChange={updateFieldValue}
            placeholder="Enter a password for your account"
            required
          />
          <Form.Group>
            <Button fluid type="submit" primary>
              Sign in to your account
            </Button>
          </Form.Group>
          <Form.Group>
            <Button fluid secondary as={Link} to="/">
              Back to homepage
            </Button>
          </Form.Group>
        </Form>
      </div>
    </React.Fragment>
  );
}

export default Login;
