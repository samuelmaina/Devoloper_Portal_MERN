import {
  Form,
  Button,
  Checkbox,
  Typography,
  DatePicker,
  Input,
  Select,
} from "antd";

const { Item } = Form;

export const name = (
  <Item
    name="fullName"
    label="Full Name"
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
    <Input placeholder="Type your name" />
  </Item>
);
export const email = (
  <Item
    name="email"
    label="Email"
    rules={[
      { type: "email", message: "Please enter a valid password." },
      { required: true, message: "Please enter an email" },
      {
        min: 3,
        max: 30,
        message: "The email must be 3 to 30 characters long",
      },
    ]}
    hasFeedback
  >
    <Input placeholder="Enter email" type="email" />
  </Item>
);

export const password = (
  <Item
    name="password"
    label="Password"
    rules={[
      { required: true, message: "Please enter a password" },
      {
        min: 10,
        max: 16,
        message: "The password must be 10 to 16 characters long",
      },
      {
        validator: (_, value, cb) => {
          const re =
            /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]/;
          if (!re.test(value)) cb("Error");
          else cb();
        },
        message:
          "Atleast one uppercase, lowercase,character and a number No ? or `",
      },
    ]}
    hasFeedback
  >
    <Input.Password placeholder="Type password" />
  </Item>
);

export const confirmPassword = (
  <Item
    name="confirmPassword"
    label="Confirm Password"
    rules={[
      { required: true, message: "Please confirm password" },
      ({ getFieldValue }) => ({
        validator: (_, value) => {
          if (!(value && getFieldValue("password") === value))
            return Promise.reject("The two passwords must be the same");
          else return Promise.resolve();
        },
      }),
    ]}
    hasFeedback
  >
    <Input.Password placeholder="Confirm password" />
  </Item>
);

export const agreement = (
  <Item
    name="agreement"
    valuePropName="checked"
    rules={[
      {
        validator: (_, value, cb) => {
          return value
            ? Promise.resolve()
            : Promise.reject(
                "To proceed you must agree to the terms and conditions"
              );
        },
      },
    ]}
  >
    <Checkbox>
      Agree to our <a href="#"> Terms and Conditions</a>
    </Checkbox>
  </Item>
);

export const submitButton = (text) => {
  return (
    <Item wrapperCol={{ span: 24 }}>
      <Button block type="primary" htmlType="submit">
        {text}
      </Button>
    </Item>
  );
};
