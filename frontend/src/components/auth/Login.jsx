import React from "react";
import { Form } from "antd";

import "../../css/auth-form.css";

import { email, password, submitButton } from "./fields";
const { Item } = Form;

function LogIn() {
  return (
    <div className="container">
      <h1> Sign In</h1>

      <Form className="form" labelCol={{ span: 10 }} wrapperCol={{ span: 14 }}>
        {email}
        {password}

        {submitButton("Log In")}
        <Item>
          <span>
            Doesn't have an account
            <a href="/sign-up"> Sign UP</a>
          </span>
          <span>
            Forgot Password
            <a href="/reset"> Reset</a>
          </span>
        </Item>
      </Form>
    </div>
  );
}

export default LogIn;
