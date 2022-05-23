import React from "react";
import { Form } from "antd";

import {
  emailField,
  passwordField,
  submitButton,
  signUpPagePrompts,
} from "./fields";

function LogIn() {
  return (
    <div className="container">
      <h1> Sign In</h1>
      <Form className="form" labelCol={{ span: 10 }} wrapperCol={{ span: 14 }}>
        {emailField}
        {passwordField}
        {submitButton("Log In")}
        {signUpPagePrompts}
      </Form>
    </div>
  );
}

export default LogIn;
