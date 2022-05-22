import React from "react";
import { Form } from "antd";

import "../../css/sign-up.css";
import { email, submitButton } from "./fields";

function Reset() {
  return (
    <div className="container">
      <h1> Reset Password</h1>
      <Form className="form" labelCol={{ span: 10 }} wrapperCol={{ span: 14 }}>
        {email}
        {submitButton("Reset Password")}
      </Form>
    </div>
  );
}

export default Reset;
