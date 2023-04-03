//imports
import React, { useRef, useState } from "react";
import { Form, Input, Select, Button, notification } from "antd";
import "./Withdraw.css";
const { Option } = Select;

const Withdraw = () => {
  //states
  const [networkItem, setNetworkItem] = useState("main");
  const [withdrawMethod, setWithdrawMethod] = useState("others");
  const [api, contextHolder] = notification.useNotification();

  //refs
  const frmRef = useRef();

  //variacles
  const users = JSON.parse(localStorage.getItem("Users"));

  //open notification function
  const openNotification = (placement) => {
    api.success({
      message: `موفق`,
      description: "عملیات برداشت با موفقیت انجام شد",
      placement,
    });
  };

  //this function force user to enter only number in selected input
  const validateNumber = (rule, value, callback) => {
    if (value && !/^[0-9]+$/.test(value)) {
      callback("لطفا فقط عدد وارد کنید");
    } else {
      callback();
    }
  };

  //this function change the inputs according to user selected method
  const setWithdrawMethodHandler = (e) => {
    if (e === "crypto") {
      setWithdrawMethod("Crypto");
    } else {
      setWithdrawMethod("others");
    }
  };
  
  //this function change the crypto deposit method network according to user selected currency
  const changeNetworkItems = (e) => {
    if (e === "BTC") {
      setNetworkItem("main");
    } else {
      setNetworkItem("bep");
    }
  };

  //when the form validation finished this function will shown
  const onFinish = (values) => {
    let withdrawsArray = [];
    let withdrawFromLS = localStorage.getItem("Withdraw");
    if (withdrawFromLS) {
      withdrawsArray = JSON.parse(withdrawFromLS);
    } else {
      withdrawsArray = [];
    }
    withdrawsArray.push(values);
    localStorage.setItem("Withdraw", JSON.stringify(withdrawsArray));
    openNotification("top");
    frmRef.current?.resetFields();
  };

  return (
    <div className="withdraw-con">
      {contextHolder}
      <div className="withdraw-content">
        <Form ref={frmRef} onFinish={onFinish} className="withdraw-frm">
          <Form.Item
            className="acc-input frm-item"
            hasFeedback
            name="account"
            label="انتخاب حساب"
            rules={[
              {
                required: true,
                message: "لطفا حساب را انتخاب کنید !",
              },
            ]}
          >
            <Select className="select" placeholder="انتخاب کنید">
              {users ? (
                users.map((item, index) => (
                  <Option key={index} value={item.account}>
                    {item.account}
                  </Option>
                ))
              ) : (
                <></>
              )}
            </Select>
          </Form.Item>
          <Form.Item
            className="acc-input frm-item"
            hasFeedback
            name="withdraw_method"
            label="روش واریز"
            rules={[
              {
                required: true,
                message: "لطفا روش واریز انتخاب کنید !",
              },
            ]}
          >
            <Select
              className="select"
              onChange={(e) => setWithdrawMethodHandler(e)}
              placeholder="انتخاب کنید"
            >
              <Option value="others">Others</Option>
              <Option value="crypto">Crypto</Option>
            </Select>
          </Form.Item>
          {withdrawMethod === "others" ? (
            <></>
          ) : (
            <>
              <Form.Item
                className="frm-item"
                hasFeedback
                name="currency"
                label="ارز"
                rules={[
                  {
                    required: true,
                    message: "لطفا ارز را انتخاب کنید !",
                  },
                ]}
              >
                <Select
                  onChange={(e) => changeNetworkItems(e)}
                  className="select"
                  placeholder="انتخاب کنید"
                >
                  <Option value="BTC">BTC</Option>
                  <Option value="BUSD">BUSD</Option>
                </Select>
              </Form.Item>
              <Form.Item
                className="frm-item"
                hasFeedback
                name="network"
                label="شبکه"
                rules={[
                  {
                    required: true,
                    message: "لطفا شبکه را انتخاب کنید !",
                  },
                ]}
              >
                {networkItem === "main" ? (
                  <Select className="select" placeholder="انتخاب کنید">
                    <Option value="Main-Network">Main Network</Option>
                  </Select>
                ) : (
                  <Select className="select" placeholder="انتخاب کنید">
                    <Option value="BEP2">BEP2</Option>
                    <Option value="BEP20">BEP20</Option>
                  </Select>
                )}
              </Form.Item>
            </>
          )}
          <Form.Item
            className="frm-item"
            label="مبلغ"
            name="amount"
            hasFeedback
            rules={[
              {
                required: true,
                message: "لطفا مبلغ را وارد کنید!",
              },
              {
                validator: validateNumber,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item className="frm-item">
            <Button
              type="primary"
              htmlType="submit"
              className="submit-btn-deposit"
            >
              تایید
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Withdraw;
