//imports
import React, { useRef } from "react";
import { Form, Input, Select, Button, notification } from "antd";
import "./Transfer.css";
const { Option } = Select;

const Transfer = () => {
  //variables
  const users = JSON.parse(localStorage.getItem("Users"));
  
  //refs
  const frmRef = useRef();
  
  //states
  const [api, contextHolder] = notification.useNotification();
  
  //open notification function
  const openNotification = (placement) => {
    api.success({
      message: `موفق`,
      description: "عملیات انتقال با موفقیت انجام شد",
      placement,
    });
  };

  // this function force user to enter only number in selected input
  const validateNumber = (rule, value, callback) => {
    if (value && !/^[0-9]+$/.test(value)) {
      callback("لطفا فقط عدد وارد کنید");
    } else {
      callback();
    }
  };

  //when the form validation finished this function will invoce
  const onFinish = (values) => {
    const transferObj = {
      from_acc: `${values.from_account}`,
      to_acc: `${values.to_account}`,
      amount: `${values.amount}`,
    };
    let tarnsfersArray = [];
    let TranferFrpmLS = localStorage.getItem("Transfer");
    if (TranferFrpmLS) {
      tarnsfersArray = JSON.parse(TranferFrpmLS);
    } else {
      tarnsfersArray = [];
    }
    tarnsfersArray.push(transferObj);
    localStorage.setItem("Transfer", JSON.stringify(tarnsfersArray));
    openNotification("top");
    frmRef.current?.resetFields();
  };


  return (
    <div className="transfer-con">
      {contextHolder}
      <div className="transfer-content">
        <Form ref={frmRef} onFinish={onFinish} className="transfer-frm">
          <Form.Item
            className="acc-input frm-item-withdraw"
            hasFeedback
            name="from_account"
            label="از حساب"
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
            className="acc-input frm-item-withdraw"
            hasFeedback
            name="to_account"
            label="به حساب"
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
            className="frm-item-withdraw"
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
          <Form.Item className="frm-item-withdraw">
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

export default Transfer;
