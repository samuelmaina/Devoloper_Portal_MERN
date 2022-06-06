import React from "react";

import { Input, Card, Form } from "antd";
import { UserOutlined, HomeOutlined, GlobalOutlined } from "@ant-design/icons";

const { Item } = Form;

function CreateProfile() {
  const onSubmit = (e) => {
    console.log(e.data);
  };
  return (
    <Form
      className="form"
      labelCol={{ span: 10 }}
      wrapperCol={{ span: 14 }}
      onFinish={onSubmit}
      style={{ left: "50%", width: "50%" }}
    >
      <Card>
        <Item
          name="hanlde"
          label="Your Handle"
          rules={[
            {
              required: true,
              message: "Please enter you name",
            },
            { whitespace: true, message: "Name can not be a white space" },
            {
              min: 3,
              message: "Name should be at least 3 characters",
            },
          ]}
          hasFeedback
        >
          <Input
            name="name"
            placeholder="Type your handle name"
            prefix={<UserOutlined />}
          />
        </Item>

        <Item
          name="company"
          label="Current Company"
          rules={[
            { whitespace: true, message: "Name can not be a white space" },
            {
              min: 3,
              message: "Name should be at least 3 characters",
            },
          ]}
          hasFeedback
        >
          <Input
            name="company"
            placeholder="Your current company"
            prefix={<HomeOutlined />}
          />
        </Item>

        <Item
          name="website"
          label="Personal Website"
          rules={[
            { whitespace: true, message: "Name can not be a white space" },
            {
              min: 3,
              message: "Name should be at least 3 characters",
            },
          ]}
          hasFeedback
        >
          <Input
            name="website"
            placeholder="http:://personal-website.com"
            prefix={<GlobalOutlined />}
          />
        </Item>

        <Item
          name="location"
          label="Current Location"
          rules={[
            { whitespace: true, message: "Name can not be a white space" },
            {
              min: 3,
              message: "Name should be at least 3 characters",
            },
          ]}
          hasFeedback
        >
          <Input
            name="location"
            placeholder="where can people find you?"
            prefix={<GlobalOutlined />}
          />
        </Item>
      </Card>
    </Form>
  );
}

export default CreateProfile;
