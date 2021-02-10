import React, { useState } from "react";
import { Button, Form } from "semantic-ui-react";

function Register() {
  const [values, setValues] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  // const [loading, setLoading] = useState(false)

  const updateFeildValue = e =>
    setValues({ ...values, [e.target.name]: e.target.value });

  return (
    <React.Fragment>
      <div className="register-form">
        <h1>Sign up for a new account</h1>
        <Form>
          <Form.Group widths="equal">
            <Form.Input
              fluid
              name="firstname"
              label="First name"
              value={values.firstname}
              onChange={updateFeildValue}
              placeholder="Enter your name"
              required
            />
            <Form.Input
              fluid
              name="lastname"
              label="Last name"
              value={values.lastname}
              onChange={updateFeildValue}
              placeholder="Enter yout surname"
            />
          </Form.Group>
          <Form.Input
            fluid
            name="username"
            label="Username"
            value={values.useState}
            onChange={updateFeildValue}
            placeholder="Choose a username for yourself"
            required
          />
          <Form.Input
            fluid
            type="email"
            name="email"
            label="Email"
            value={values.email}
            onChange={updateFeildValue}
            placeholder="Enter your email address"
            required
          />
          <Form.Input
            fluid
            type="password"
            name="password"
            label="Password"
            value={values.password}
            onChange={updateFeildValue}
            placeholder="Enter a password for your account"
            required
          />
          <Form.Input
            fluid
            type="password"
            name="confirm_password"
            label="Confirm Password"
            value={values.confirm_password}
            onChange={updateFeildValue}
            placeholder="Renter your password"
            required
          />
          <Form.Group>
            <Button fluid type="submit" primary>
              Join the community
            </Button>
          </Form.Group>
          <Form.Group>
            <Button fluid secondary>
              Back to homepage
            </Button>
          </Form.Group>
        </Form>
      </div>
    </React.Fragment>
  );
}

export default Register;
