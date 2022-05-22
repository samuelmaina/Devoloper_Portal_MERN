import React from "react";
import { Form } from "antd";

import "../../css/auth-form.css";
import {
  name,
  email,
  password,
  confirmPassword,
  submitButton,
  agreement,
} from "./fields";
const { Item } = Form;

function SignUp() {
  return (
    <div className="container">
      <h1> Register </h1>

      <Form className="form" labelCol={{ span: 10 }} wrapperCol={{ span: 14 }}>
        {name}
        {email}
        {password}
        {confirmPassword}
        {agreement}
        {submitButton("Register")}
        <Item>
          <p>
            Already has an account
            <a href="/log-in"> Sign In</a>
          </p>
        </Item>
      </Form>
    </div>
  );
}

export default SignUp;
