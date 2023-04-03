//imports
import React, { useEffect } from "react";
import { Button, Form, Input, message } from "antd";
import "./Login.css";

//fetch the API fromthe given address and convert it to json function
const LoginUser = async (arg) => {
  return fetch("http://localhost:8000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/josn",
    },
    body: JSON.stringify(arg),
  }).then((data) => data.json());
};

const Login = (props) => {
  //states
  const [messageApi, contextHolder] = message.useMessage();

  //recieve the token and send the token to app component
  const handleLogin = async (username, password) => {
    const token = await LoginUser({
      username,
      password,
    });

    props.setToken(token);
  };

  //when the form validation finished this function will invoce
  const onFinish = (values) => {
    handleLogin(values.username, values.password);
  };

  // this function show message when user first enter to page
  const info = () => {
    messageApi.info("نام کاربری و رمز عبور را admin وارد کنید");
  };

  //useeffect
  useEffect(() => {
    info();
    return () => {};
  }, []);

  return (
    <div className="login-con">
      {contextHolder}
      <h3>ورود</h3>
      <Form
        className="frmLogin"
        name="basic"
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          className="loginItem"
          hasFeedback
          label="نام کاربری"
          name="username"
          rules={[
            {
              required: true,
              message: "لظفا نام کاربری را وارد کنید",
            },
            {
              validator: (rule, value, callback) => {
                if (value !== "admin") {
                  callback(`نام کاربری اشتباه وارد شد`);
                } else {
                  callback();
                }
              },
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          className="loginItem"
          hasFeedback
          label="رمز عبور"
          name="رمز عبور"
          rules={[
            {
              required: true,
              message: "لظفا رمز عبور را وارد کتید",
            },
            {
              validator: (rule, value, callback) => {
                if (value !== "admin") {
                  callback(`رمز عبور اشتباه وارد شد`);
                } else {
                  callback();
                }
              },
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item className="loginItem">
          <Button className="btnSubmit" type="primary" htmlType="submit">
            ورود
          </Button>
        </Form.Item>
      </Form>
      <div className="login-img-con">
        <img
          src="https://cdni.iconscout.com/illustration/premium/thumb/login-3305943-2757111.png"
          alt="login-img"
        />
      </div>
    </div>
  );
};

export default Login;
