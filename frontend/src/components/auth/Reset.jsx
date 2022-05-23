import React from "react";
import { Form } from "antd";

import "../../css/auth-form.css";

import { emailField, submitButton } from "./fields";

function Reset() {
  return (
    <div className="container">
      <h1> Reset Password</h1>
      <Form className="form" labelCol={{ span: 10 }} wrapperCol={{ span: 14 }}>
        {emailField}
        {submitButton("Reset Password")}
      </Form>
    </div>
  );
}

export default Reset;
