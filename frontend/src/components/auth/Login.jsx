import React, { useEffect } from "react";

import { useNavigate, useLocation } from "react-router-dom";
import { Form } from "antd";

import { useDispatch, useSelector } from "react-redux";

import { loginUser } from "../../redux/actions/auth";

import { renderErrorMessage } from "../message";

import {
  emailField,
  passwordField,
  submitButton,
  signUpPagePrompts,
  titleField,
} from "./fields";

function LogIn() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const location = useLocation();

  let successRedirect = location.state?.from?.pathname || "/";

  const onSubmit = (data) => dispatch(loginUser(data));

  const feedback = useSelector((state) => state.feedback);

  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    const error = feedback.error;
    if (error) {
      renderErrorMessage(error);
    } else if (auth.isAuth) {
      navigate(successRedirect);
    }
  }, [feedback, auth, navigate, successRedirect, dispatch]);

  return (
    <div className="container">
      <Form
        className="form"
        labelCol={{ span: 10 }}
        wrapperCol={{ span: 14 }}
        onFinish={(data) => {
          onSubmit(data);
        }}
      >
        {titleField("Sign In")}
        {emailField}
        {passwordField}
        {submitButton("Log In")}
        {signUpPagePrompts}
      </Form>
    </div>
  );
}

export default LogIn;
