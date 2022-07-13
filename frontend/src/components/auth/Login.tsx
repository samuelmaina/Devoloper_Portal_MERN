import React, { useEffect } from "react";

import { useNavigate, useLocation } from "react-router-dom";
import { Form, Card } from "antd";

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

  const location:any = useLocation();

  let successRedirect:string = location.state?.from?.pathname || "/";

    //@ts-ignore
  const onSubmit = (data:any) => dispatch(loginUser(data));

  const feedback = useSelector((state:any) => state.feedback);

  const auth = useSelector((state:any) => state.auth);

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
        spellCheck
        scrollToFirstError
      >
        <Card>
          {titleField("Sign In")}
          {emailField}
          {passwordField}
          {submitButton("Log In")}
          {signUpPagePrompts}
        </Card>
      </Form>
    </div>
  );
}

export default LogIn;
