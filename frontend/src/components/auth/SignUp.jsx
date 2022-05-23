import React from "react";

import { Link } from "react-router-dom";

import { Form } from "antd";

import { registerUser } from "../../redux/actions/auth";

import { useDispatch, useSelector } from "react-redux";
import "../../css/auth-form.css";
import {
  emailField,
  passwordField,
  confirmPasswordField,
  agreementField,
  submitButton,
  nameField,
} from "./fields";
const { Item } = Form;

function SignUp({ history }) {
  const dispatch = useDispatch();
  const onSubmit = (data) => {
    dispatch(registerUser(data, history));
  };

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
        <Item>
          <p>
            Already has an account
            <Link to="/log-in">Sign In </Link>
          </p>
        </Item>
      </Form>
    </div>
  );
}

export default SignUp;
