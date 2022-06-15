import React, { useState, useEffect } from "react";

import { Input, Card, Form, Typography, Button, Grid } from "antd";

import { submitButton } from "../auth/fields";

import { renderErrorMessage, renderSuccessMessage } from "../message";
import { UserOutlined, HomeOutlined, GlobalOutlined } from "@ant-design/icons";

import { Steps } from "antd";
import { getCoordinates } from "../../services/profile";

const { Step } = Steps;

const { Item } = Form;

const { Text } = Typography;

const mapper = {
  personalInfo: 0,
  education: 1,
  skills: 2,
  experience: 3,
};

function CreateProfile() {
  const [currentStep, setStep] = useState("personalInfo");
  const [hasError, setHasErrors] = useState(false);
  const [coordinates, setCoordinates] = useState([]);

  const [form] = Form.useForm();

  const [currentIndex, setIndex] = useState(0);

  const sections = {
    personalInfo: (
      <>
        <Item
          name="handle"
          label="Your Handle"
          rules={[
            {
              required: true,
              message: "Please select a handle for your Account",
            },
            {
              whitespace: true,
              message: "Handle can't not be made up of Empty Spaces.",
            },
            {
              min: 3,
              message: "Handle can't not be shorter than 3 characters",
            },
            {
              max: 21,
              message: "Handle can't be more than 21 characters.",
            },
          ]}
          hasFeedback
        >
          <Input
            name="handle"
            placeholder="Type your handle name"
            prefix={<UserOutlined />}
          />
        </Item>

        <Item
          name="website"
          label="Personal Professional Website"
          rules={[
            {
              whitespace: true,
              message: "Website can't not be made up of Empty Spaces.",
            },
            {
              type: "url",
              message: "Please Enter a valid Url",
            },
            {
              min: 3,
              message: "Website can't not be shorter than 3 characters",
            },
            {
              max: 50,
              message: "Website can't be more than 50 characters.",
            },
          ]}
          hasFeedback
        >
          <Input
            name="Personal Website"
            placeholder="Type your website"
            prefix={<UserOutlined />}
          />
        </Item>

        <Item
          name="location"
          label="Select Your Location"
          rules={[
            {
              whitespace: true,
              message: "Website can't not be made up of Empty Spaces.",
            },
          ]}
          hasFeedback
        >
          <Button
            icon={<UserOutlined />}
            onClick={async () => {
              try {
                const result = await getLocation();
                renderSuccessMessage("Fetched the location sucessfully.");

                const { coords } = result;
                const { latitude, longitude } = coords;
                const res = [latitude, longitude];
                console.log(res);

                setCoordinates(res);
              } catch (err) {
                console.log(err);
              }
            }}
          >
            Select Your Location
          </Button>
        </Item>
      </>
    ),
    skills: (
      <>
        <Item
          name="skills"
          label="Your Current Skills"
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
      </>
    ),
    education: (
      <>
        <Item
          name="education"
          label="Your education Level"
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
      </>
    ),
    experience: (
      <>
        <Item
          name="Experence"
          label="Your "
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
      </>
    ),
  };

  function setCurrentStep(step) {
    setStep(step);
    setIndex(mapper[step]);
  }

  const [sectionToDisplay, setSectionToDisplay] = useState(sections[0]);

  useEffect(() => {
    setSectionToDisplay(sections[currentStep]);
  }, [currentStep]);

  const onSubmit = (e) => {
    console.log(e);
  };
  return (
    <>
      <Steps
        direction="vertical"
        current={currentIndex}
        status={"process"}
        onChange={(e) => {
          setCurrentStep(e);
        }}
      >
        <Step
          stepIndex={"personalInfo"}
          title="Personal Information"
          description="Enter Personal details."
        />
        <Step
          stepIndex={"education"}
          title="Education"
          description="Enter your details about your education journey."
          disabled={hasError && currentIndex < 1}
        />
        <Step
          stepIndex={"skills"}
          title="Skills"
          description="Enter the skills that you have accured and the level of experience."
          disabled={hasError && currentIndex < 2}
        />
        <Step
          stepIndex={"experience"}
          title="Experience"
          description="Enter your work history."
          disabled={hasError && currentIndex < 3}
        />
      </Steps>
      <Card>
        <Form
          form={form}
          className="form"
          labelCol={{ span: 10 }}
          wrapperCol={{ span: 14 }}
          onFinish={onSubmit}
          onFinishFailed={() => {
            setHasErrors(true);
          }}
          onChange={() => {
            form
              .validateFields()
              .then((done) => {
                setHasErrors(false);
              })
              .catch((err) => {
                setHasErrors(true);
              });
          }}
          style={{ left: "50%", width: "50%" }}
          scrollToFirstError
        >
          <>
            {sectionToDisplay}
            {currentIndex > 0 ? (
              <Button
                type="primary"
                onClick={() => {
                  setCurrentStep(getKeyByValue(mapper, currentIndex - 1));
                }}
              >
                Previous
              </Button>
            ) : null}

            {currentIndex <= 2 ? (
              <Button
                id="next"
                type="primary"
                htmlType="submit"
                onClick={() => {
                  let hasEmptyFields = false;
                  const data = form.getFieldsValue();
                  for (const field in data) {
                    if (typeof data[field] === "undefined") {
                      hasEmptyFields = true;
                      break;
                    }
                  }
                  if (hasEmptyFields) {
                    const next = document.getElementById("next");
                    next.disabled = true;
                    renderErrorMessage("All the Required Fields must be field");
                    setHasErrors(true);
                  } else
                    setCurrentStep(getKeyByValue(mapper, currentIndex + 1));
                }}
                disabled={hasError}
              >
                Next
              </Button>
            ) : null}
          </>
          <Form.Item>
            {currentIndex === 3 ? submitButton("Create Profile") : null}
          </Form.Item>
        </Form>
      </Card>
    </>
  );
}

function getKeyByValue(object, value) {
  return Object.keys(object).find((key) => object[key] === value);
}

export default CreateProfile;

function getLocation() {
  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };
  return new Promise((resolve, reject) => {
    const cb = (pos) => {
      resolve(pos);
    };
    const error = (err) => {
      reject(Error);
    };
    navigator.geolocation.getCurrentPosition(cb, error, options);
  });
}
