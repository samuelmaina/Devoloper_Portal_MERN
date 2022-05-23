import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";

import { Form } from "antd";

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
      <h1> Register </h1>
      <Form
        className="form"
        labelCol={{ span: 10 }}
        wrapperCol={{ span: 14 }}
        onFinish={onSubmit}
      >
        {nameField}
        {emailField}
        {passwordField}
        {confirmPasswordField}
        {agreementField}
        {submitButton("Register")}
        {signInPrompt}
      </Form>
    </div>
  );
}

export default SignUp;
