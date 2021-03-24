import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Checkbox, Form, Message } from "semantic-ui-react";

function Register() {
  const [values, setValues] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  // const [errors, seterrors] = useState([]);

  // const [loading, setLoading] = useState(false)

  const updateFieldValue = e =>
    setValues({ ...values, [e.target.name]: e.target.value });

  return (
    <React.Fragment>
      <div className="register-form">
        <h1>Sign up for a new account</h1>
        <Form>
          <Message error>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor iste
            libero labore, perferendis accusantium molestiae assumenda adipisci
            officiis quis, unde cum eaque magni aperiam praesentium fugiat
            nesciunt! Vero, nesciunt illum?
          </Message>
          <Form.Group widths="equal">
            <Form.Input
              fluid
              name="firstname"
              label="First name"
              value={values.firstname}
              onChange={updateFieldValue}
              placeholder="Enter your name"
              required
            />
            <Form.Input
              fluid
              name="lastname"
              label="Last name"
              value={values.lastname}
              onChange={updateFieldValue}
              placeholder="Enter yout surname"
            />
          </Form.Group>
          <Form.Input
            fluid
            name="username"
            label="Username"
            value={values.useState}
            onChange={updateFieldValue}
            placeholder="Choose a username for yourself"
            required
          />
          <Form.Input
            fluid
            type="email"
            name="email"
            label="Email"
            value={values.email}
            onChange={updateFieldValue}
            placeholder="Enter your email address"
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
          <Form.Input
            fluid
            type="password"
            name="confirm_password"
            label="Confirm Password"
            value={values.confirm_password}
            onChange={updateFieldValue}
            placeholder="Renter your password"
            required
          />
          <Form.Field>
            <Checkbox
              label="I accept the terms and services of Hi Text"
              value="true"
              required
            ></Checkbox>
          </Form.Field>
          <Form.Group>
            <Button fluid type="submit" primary>
              Join the community
            </Button>
          </Form.Group>
          <Form.Group>
            <Button fluid secondary as={Link} to="/">
              Back to homepage
            </Button>
          </Form.Group>
          <Form.Field></Form.Field>
        </Form>
      </div>
    </React.Fragment>
  );
}

export default Register;
