import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
import { Spinner } from "..";
import { getCurrentProfile } from "../../redux/actions/profile";

import { renderErrorMessage } from "../message";

import { Button } from "antd";

function Dashboard() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [currentProfile, setCurrentProfile] = useState({});

  const profile = useSelector((state) => state.profile);

  const feedback = useSelector((state) => state.feedback);
  useEffect(() => {
    dispatch(getCurrentProfile());
  }, []);

  useEffect(() => {
    const { error } = feedback;
    if (error) {
      renderErrorMessage(error);
    }
  }, [feedback]);

  useEffect(() => {
    const { isLoading } = profile;
    if (profile.profile) {
      setCurrentProfile(profile.profile);
    }
    setIsLoading(isLoading);
  }, [profile]);

  if (isLoading) return <Spinner />;

  if (Object.keys(currentProfile).length === 0) {
    return (
      <Link to={"/create-profile"}>
        <Button size="large" type="primary" style={{ left: "33%" }}>
          Create Profile
        </Button>
      </Link>
    );
  } else return <div>Dashboard</div>;
}

export default Dashboard;
