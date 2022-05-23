import React, { useEffect, useRef } from "react";

import { useDispatch, useSelector } from "react-redux";

import { useNavigate, useParams } from "react-router-dom";

import { verifyEmail } from "../../redux/actions/auth";

import { renderErrorMessage, renderSuccessMessage } from "../message";

function EmailVerifier() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token } = useParams();

  let output = useRef(null);

  useEffect(() => {
    dispatch(verifyEmail(token));
  }, [dispatch, token]);

  const feedback = useSelector((state) => state.feedback);

  useEffect(() => {
    const { error, message } = feedback;
    if (error) {
      renderErrorMessage(error);
      output.current = error;
    } else if (message) {
      renderSuccessMessage(message);
      output.current = message;
      navigate("/log-in");
    }
  }, [feedback, navigate, dispatch]);

  return <div>{output.current}</div>;
}

export default EmailVerifier;
