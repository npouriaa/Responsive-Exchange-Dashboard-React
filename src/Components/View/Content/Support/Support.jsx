import React, { useRef } from "react";
import { Form, Input, Select, Button, notification } from "antd";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "./Support.css";
const { Option } = Select;

const Support = () => {
  //refs
  const frmRef = useRef();

  //variables
  const users = JSON.parse(localStorage.getItem("Users"));

  //states
  const [api, contextHolder] = notification.useNotification();

  //open notification function
  const openNotification = (placement) => {
    api.success({
      message: `موفق`,
      description: "پیام با موفقیت ارسال شد",
      placement,
    });
  };

  //when the form validation finished this function will invoce
  const onFinish = () => {
    openNotification("top");
    frmRef.current?.resetFields();
  };

  return (
    <div className="support-con">
      {contextHolder}
      <div className="support-content">
        <Form ref={frmRef} onFinish={onFinish} className="transfer-frm">
          <Form.Item
            className="acc-input frm-item"
            hasFeedback
            name="from_account"
            label="حساب"
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
            className="frm-item"
            label="عنوان پیام"
            name="title"
            hasFeedback
            rules={[
              {
                required: true,
                message: "لطفا عنوان پیام را وارد کنید!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            className="frm-item"
            label="موضوع پیام"
            name="subject"
            hasFeedback
            rules={[
              {
                required: true,
                message: "لطفا موضوع پیام را وارد کنید!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            className=""
            label="متن پیام"
            name="editor"
            hasFeedback
            rules={[
              {
                required: true,
                message: "لطفا متن پیام را وارد کنید!",
              },
            ]}
          >
            <CKEditor editor={ClassicEditor} data="" />
          </Form.Item>
          {/* <div className="editor-con">
            <CKEditor editor={ClassicEditor} data="" />
          </div> */}
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

export default Support;
