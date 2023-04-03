//imports
import React, { useRef } from "react";
import { Form, Input, Select, Button, notification } from "antd";
import "./CreateAccount.css";
const { Option } = Select;

const CreateAccount = () => {
  //Refs
  const frmRef = useRef();

  //States
  const [api, contextHolder] = notification.useNotification();

  //Functions
  //open notification function
  const openNotification = (placement) => {
    api.success({
      message: "موفق",
      description: "کاربر با موفقیت اضافه شد",
      placement,
    });
  };

  //when the form validation finished this function will invoce
  const onFinish = (values) => {
    openNotification("top");
    let usersArray = [];
    let userFromLS = localStorage.getItem("Users");
    if (userFromLS) {
      usersArray = JSON.parse(userFromLS);
    } else {
      usersArray = [];
    }
    usersArray.push(values);
    localStorage.setItem("Users", JSON.stringify(usersArray));
    frmRef.current?.resetFields();
  };

  // this function force user to enter only number in selected input
  const validateNumber = (rule, value, callback) => {
    if (value && !/^[0-9]+$/.test(value)) {
      callback("لطفا فقط عدد وارد کنید");
    } else {
      callback();
    }
  };

  // prefix selector function
  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        className="num-select"
        style={{
          width: 70,
        }}
      >
        <Option value="98">۹۸+</Option>
      </Select>
    </Form.Item>
  );

  return (
    <div className="accounts-con">
      {contextHolder}
      <div className="content">
        <Form ref={frmRef} onFinish={onFinish} className="add-user-form">
          <div className="frm-f">
            <Form.Item
              className="frm-item-cr"
              label="نام و نام خانوادگی"
              name="account"
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "لطفا نام و نام خانوادگی را وارد کنید",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="email"
              label="ایمیل"
              className="frm-item-cr"
              hasFeedback
              rules={[
                {
                  type: "email",
                  message: "ایمیل وارد شده معتبر نیست",
                },
                {
                  required: true,
                  message: "لطفا ایمیل را وارد کنید",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              className="frm-item-cr"
              name="phone"
              label="شماره تلفن"
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "لطفا شماره تلفن خود را وارد کنید",
                },
                {
                  validator: validateNumber,
                },
              ]}
            >
              <Input
                addonAfter={prefixSelector}
                style={{
                  width: "100%",
                }}
              />
            </Form.Item>
            <Form.Item
              name="password"
              className="frm-item-cr"
              label="رمز عبور"
              rules={[
                {
                  required: true,
                  message: "لطفا رمز عبور را وارد کنید",
                },
              ]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              className="frm-item-cr"
              name="confrim"
              label="تایید رمز عبور"
              dependencies={["password"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "لظفا رمز عبور را تایید کنید",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("رمز عبور ها با هم همخوانی ندارد !")
                    );
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>
          </div>
          <div className="frm-s">
            <Form.Item
              className="frm-item-cr"
              hasFeedback
              name="platform"
              label="پلتفرم معامله"
              rules={[
                {
                  required: true,
                  message: "لطفا پلتفرم معامله را وارد کنید !",
                },
              ]}
            >
              <Select className="select" placeholder="انتخاب کنید">
                <Option value="cTrader">cTrader</Option>
                <Option value="MT4">MT4</Option>
                <Option value="MT5">MT5</Option>
              </Select>
            </Form.Item>

            <Form.Item
              className="frm-item-cr"
              hasFeedback
              name="userType"
              label="نوع حساب"
              rules={[
                {
                  required: true,
                  message: "لطفا نوع حساب را وارد کنید !",
                },
              ]}
            >
              <Select className="select" placeholder="انتخاب کنید">
                <Option value="standard">استاندارد</Option>
              </Select>
            </Form.Item>

            <Form.Item
              className="frm-item-cr"
              hasFeedback
              name="currency"
              label="نوع ارز"
              rules={[
                {
                  required: true,
                  message: "لطفا نوع ارز را وارد کنید !",
                },
              ]}
            >
              <Select className="select" placeholder="انتخاب کنید">
                <Option value="BTC">BTC</Option>
                <Option value="ETH">ETH</Option>
                <Option value="USDT">USDT</Option>
                <Option value="DOGE">DOGE</Option>
                <Option value="XRP">XRP</Option>
              </Select>
            </Form.Item>

            <Form.Item
              className="frm-item-cr"
              hasFeedback
              name="initial-deposite"
              label="سپرده اولیه"
              rules={[
                {
                  required: true,
                  message: "لطفا نوع سپرده اولیه را وارد کنید !",
                },
              ]}
            >
              <Select className="select" placeholder="انتخاب کنید">
                <Option value="۱۰۰۰۰۰$">۱۰۰۰۰۰$</Option>
                <Option value="۲۰۰۰۰۰$">۲۰۰۰۰۰$</Option>
                <Option value="۳۰۰۰۰۰$">۳۰۰۰۰۰$</Option>
              </Select>
            </Form.Item>
            <Form.Item
            className="frm-item-cr"
              hasFeedback
              name="address"
              label="آدرس"
              rules={[
                {
                  required: true,
                  message: "لطفا آدرس خود را وارد کنید",
                },
              ]}
            >
              <Input.TextArea />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" className="submit-btn">
                افزودن کاربر +
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default CreateAccount;
