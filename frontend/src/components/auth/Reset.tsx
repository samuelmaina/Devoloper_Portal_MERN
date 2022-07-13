import React from "react";
import { Form, Card } from "antd";

import "../../css/auth-form.css";

import { emailField, submitButton, titleField } from "./fields";

function Reset() {
  return (
    <div className="container">
      <Form className="form" labelCol={{ span: 10 }} wrapperCol={{ span: 14 }}>
        <Card>
          {titleField("Reset Password")}
          {emailField}
          {submitButton("Reset Password")}
        </Card>
      </Form>
    </div>
  );
}

export default Reset;
