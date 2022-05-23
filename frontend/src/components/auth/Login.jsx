import React from "react";
import { Form } from "antd";

import { Link } from "react-router-dom";

import "../../css/auth-form.css";

import { emailField, passwordField, submitButton } from "./fields";
const { Item } = Form;

function LogIn() {
  return (
    <div className="container">
      <h1> Sign In</h1>

      <Form className="form" labelCol={{ span: 10 }} wrapperCol={{ span: 14 }}>
        {emailField}
        {passwordField}

        {submitButton("Log In")}
        <Item>
          <span>
            Doesn't have an account
            <Link to="/sign-up"> Sign Up </Link>
          </span>
          <span>
            Forgot Password
            <Link to="/reset"> Reset Password </Link>
          </span>
        </Item>
      </Form>
    </div>
  );
}

export default LogIn;
