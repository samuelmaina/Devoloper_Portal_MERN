import { Form, Button, Checkbox, Input, Typography, Space } from "antd";

import "../../css/auth-form.css";

import { Link } from "react-router-dom";

const { Item } = Form;

const { Title } = Typography;
export const titleField = (title) => {
  return (
    <Title level={1} style={{ alignSelf: "center" }}>
      {title}
    </Title>
  );
};

export const nameField = (
  <Item
    name="name"
    label="Full Name"
    rules={[
      {
        required: true,
        message: "Please enter you name",
      },
      { whitespace: true, message: "Name can not be a white space" },
      {
        min: 3,
        message: "Name should be at least 3 characters",
      },
    ]}
    hasFeedback
  >
    <Input name="name" placeholder="Type your name" />
  </Item>
);
export const emailField = (
  <Item
    label="Email"
    name="email"
    rules={[
      { type: "email", message: "Please enter a valid password." },
      { required: true, message: "Please enter an email" },
      {
        min: 3,
        max: 30,
        message: "The email must be 3 to 30 characters long",
      },
    ]}
    hasFeedback
  >
    <Input name="email" placeholder="Enter email" type="email" />
  </Item>
);

export const passwordField = (
  <Item
    name="password"
    label="Password"
    rules={[
      { required: true, message: "Please enter a password" },
      {
        min: 10,
        max: 16,
        message: "The password must be 10 to 16 characters long",
      },
      {
        validator: (_, value) => {
          const re =
            /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]/;
          if (!re.test(value)) return Promise.reject("Error");
          return Promise.resolve();
        },
        message:
          "Atleast one uppercase, lowercase,character and a number No ? or `",
      },
    ]}
    hasFeedback
  >
    <Input.Password name="password" placeholder="Type password" />
  </Item>
);

export const confirmPasswordField = (
  <Item
    name="confirmPassword"
    label="Confirm Password"
    rules={[
      { required: true, message: "Please confirm password" },
      ({ getFieldValue }) => ({
        validator: (_, value) => {
          if (!(value && getFieldValue("password") === value))
            return Promise.reject("The two passwords must be the same");
          else return Promise.resolve();
        },
      }),
    ]}
    hasFeedback
  >
    <Input.Password placeholder="Confirm password" />
  </Item>
);

export const agreementField = (
  <Item
    name="agreement"
    valuePropName="checked"
    rules={[
      {
        validator: (_, value) => {
          return value
            ? Promise.resolve()
            : Promise.reject(
                "To proceed you must agree to the terms and conditions"
              );
        },
      },
    ]}
  >
    <Checkbox>
      Agree to our <a href="#"> Terms and Conditions</a>
    </Checkbox>
  </Item>
);

export const submitButton = (text) => {
  return (
    <Item wrapperCol={{ span: 24 }}>
      <Button block type="primary" htmlType="submit">
        {text}
      </Button>
    </Item>
  );
};

export const signInPrompt = (
  <Item>
    <p>
      <span>Already has an account </span>
      <Space size="large" />
      <Link to="/log-in">Sign In </Link>
    </p>
  </Item>
);

export const signUpPagePrompts = (
  <Item>
    <span>
      <span> Doesn't have an account </span>
      <Space size="large" />
      <Link to="/sign-up"> Sign Up </Link>
    </span>
    <span>
      Forgot Password
      <Space />
      <Link to="/reset"> Reset Password </Link>
    </span>
  </Item>
);
