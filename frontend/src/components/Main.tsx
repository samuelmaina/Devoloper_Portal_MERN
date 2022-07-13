import React from "react";

import { Layout } from "antd";

import { Routes } from "./index";

function Main() {
  return (
    <div className="main">
      <Layout>
        <Routes />
      </Layout>
    </div>
  );
}

export default Main;
