import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";

import { Form, Card } from "antd";

import { registerUser } from "../../redux/actions/auth";

import "../../css/auth-form.css";

import {
  emailField,
  passwordField,
  confirmPasswordField,
  agreementField,
  submitButton,
  nameField,
  signInPrompt,
  titleField,
} from "./fields";
import { renderErrorMessage, renderSuccessMessage } from "../message";

function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const feedback = useSelector((state) => state.feedback);

  useEffect(() => {
    const { error, message } = feedback;
    if (error) {
      renderErrorMessage(error);
    } else if (message) {
      renderSuccessMessage(message);
      navigate("/log-in");
    }
  }, [feedback, navigate, dispatch]);

  function onSubmit(data) {
    dispatch(registerUser(data));
  }
  return (
    <div className="container">
      <Form
        className="form"
        labelCol={{ span: 10 }}
        wrapperCol={{ span: 14 }}
        onFinish={onSubmit}
        scrollToFirstError
      >
        <Card>
          {titleField("Sign Up")}
          {nameField}
          {emailField}
          {passwordField}
          {confirmPasswordField}
          {agreementField}
          {submitButton("Register")}
          {signInPrompt}
        </Card>
      </Form>
    </div>
  );
}

export default SignUp;
