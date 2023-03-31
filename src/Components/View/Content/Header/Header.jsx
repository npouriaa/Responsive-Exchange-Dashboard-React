//imports
import React, { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Modal, Tooltip, notification } from "antd";
import { faUserCircle } from "@fortawesome/free-regular-svg-icons";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { faBell } from "@fortawesome/free-regular-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faShop } from "@fortawesome/free-solid-svg-icons";
import { faHeadset } from "@fortawesome/free-solid-svg-icons";
import { faCloudArrowDown } from "@fortawesome/free-solid-svg-icons";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { Input, Form, Select } from "antd";
import "./Header.css";
const { Option } = Select;

//change password modal component
const LocalizedModal = (props) => {
  const passwordRef = useRef();
  const selectRef = useRef();
  const frmRef = useRef();
  const users = JSON.parse(localStorage.getItem("Users"));

  const changePassword = (values) => {
    let usersArrayLS = JSON.parse(localStorage.getItem("Users"));
    let user = values.account;
    usersArrayLS.map((item) => {
      if (item.account === user) {
        let userIndex = usersArrayLS.indexOf(item);
        usersArrayLS[userIndex].password = values.confrim;
        usersArrayLS[userIndex].confrim = values.confrim;
        localStorage.setItem("Users", JSON.stringify(usersArrayLS));
      }
    });
    frmRef.current?.resetFields();
    props.hideModal();
    props.openNotification("top");
  };

  return (
    <Modal
      title="حساب من"
      open={props.open}
      onCancel={props.hideModal}
      okText="تایید"
      cancelText="انصراف"
      footer={[]}
    >
      <div className="changepassfrm">
        <Form onFinish={changePassword} ref={frmRef}>
          <div className="myAccount-frm">
            <Form.Item
              className="acc-input frm-item-deposit"
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
              <Select
                ref={selectRef}
                className="select"
                placeholder="انتخاب کنید"
              >
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
              name="password"
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
              <Input.Password ref={passwordRef} />
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
          </div>
        </Form>
      </div>
    </Modal>
  );
};

const Header = (props) => {
  //states
  const [openMyAccount, setOpenMyAccount] = useState(false);
  const [open, setOpen] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  
  //Refs
  const tabRefsNotif = useRef([]);
  const tabLineRefNotif = useRef(null);
  const tabRefsMessages = useRef([]);
  const tabLineRefMessages = useRef(null);
  
  //Variables
  const { Search } = Input;
  
  // this function handle the tabs green underline width and position
  const tabLineHandler = (index, tabRefs, lineRef) => {
    let tabLineWidth = tabRefs.current[index].clientWidth;
    let tabLineLeft = tabRefs.current[index].offsetLeft;
    lineRef.current.style.width = `${tabLineWidth}px`;
    lineRef.current.style.left = `${tabLineLeft}px`;
  };

  // open notification function
  const openNotification = (placement) => {
    api.success({
      message: `موفق`,
      description: "رمز عبور با موفقیت تغییر کرد",
      placement,
    });
  };

  //Modal functions
  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setTimeout(() => {
      setOpen(false);
    }, 3000);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const showModalMyAccount = () => {
    setOpenMyAccount(true);
  };
  const handleOkMyAccount = () => {
    setTimeout(() => {
      setOpenMyAccount(false);
    }, 3000);
  };
  const handleCancelMyAccount = () => {
    setOpenMyAccount(false);
  };

  return (
    <div className="header">
      {contextHolder}
      <LocalizedModal
        showModal={showModalMyAccount}
        open={openMyAccount}
        handleCancel={handleCancelMyAccount}
        handleOk={handleOkMyAccount}
        hideModal={handleCancelMyAccount}
        openNotification={openNotification}
      />
      <div className="icons">
        <Tooltip title="حساب شما">
          <button className="hBtn usersBtn">
            <FontAwesomeIcon icon={faUserCircle} />
            <FontAwesomeIcon className="a-d" icon={faAngleDown} />
            <span className="i-badge"></span>
            <div className="ac-drop-drown header-items-modal">
              <div className="header">
                <div className="header-username">
                  <p>نام کاربری</p>
                </div>
                <div className="header-status">
                  <span></span>
                  <p>فعال</p>
                </div>
              </div>
              <ul className="my-acc">
                <li onClick={() => showModalMyAccount()}>
                  <FontAwesomeIcon className="icon" icon={faUser} />
                  حساب من
                </li>
              </ul>
              <ul className="others">
                <li>
                  <FontAwesomeIcon className="icon" icon={faShop} />
                  شروع کسب کار جدید
                </li>
                <li>
                  <FontAwesomeIcon className="icon" icon={faHeadset} />
                  پشتیبانی
                </li>
                <li>
                  <FontAwesomeIcon className="icon" icon={faCloudArrowDown} />
                  دانلود اپلیکیشن دسکتاپ
                </li>
                <li>
                  <FontAwesomeIcon
                    className="icon"
                    icon={faArrowRightFromBracket}
                  />
                  خروج از حساب
                </li>
              </ul>
            </div>
          </button>
        </Tooltip>
        <Tooltip title="اعلان ها">
          <button className="hBtn notif-btn">
            <FontAwesomeIcon className="" icon={faBell} />
            <div className="notif-drop-down header-items-modal mnModal">
              <div className="header">
                <div className="title">
                  <h3>اعلان ها</h3>
                </div>
              </div>
              <div className="content">
                <ul className="tabs">
                  <li
                    ref={(el) => (tabRefsNotif.current[0] = el)}
                    onClick={() =>
                      tabLineHandler(0, tabRefsNotif, tabLineRefNotif)
                    }
                  >
                    همه اعلان ها
                  </li>
                  <li
                    ref={(el) => (tabRefsNotif.current[1] = el)}
                    onClick={() =>
                      tabLineHandler(1, tabRefsNotif, tabLineRefNotif)
                    }
                  >
                    خوانده شده
                  </li>
                  <li
                    ref={(el) => (tabRefsNotif.current[2] = el)}
                    onClick={() =>
                      tabLineHandler(2, tabRefsNotif, tabLineRefNotif)
                    }
                  >
                    خوانده نشده
                  </li>
                  <span ref={tabLineRefNotif} className="tab-line"></span>
                </ul>
                <div className="tab-content">
                  <img
                    src="https://dappr-app.cdn.bubble.io/f1666904179233x269901650869163170/notifications-unread.svg"
                    alt=""
                  />
                  <div className="text">
                    <p>اعلانی برای نمایش ندارید .....</p>
                  </div>
                </div>
              </div>
            </div>
          </button>
        </Tooltip>
        <Tooltip title="پیام ها">
          <button className="hBtn messages-btn">
            <FontAwesomeIcon className="" icon={faEnvelope} />
            <div className="messages-drop-down header-items-modal mnModal">
              <div className="header">
                <div className="title">
                  <h3>پیام ها</h3>
                </div>
              </div>
              <div className="content">
                <ul className="tabs">
                  <li
                    ref={(el) => (tabRefsMessages.current[0] = el)}
                    onClick={() =>
                      tabLineHandler(0, tabRefsMessages, tabLineRefMessages)
                    }
                  >
                    همه پیام ها
                  </li>
                  <li
                    ref={(el) => (tabRefsMessages.current[1] = el)}
                    onClick={() =>
                      tabLineHandler(1, tabRefsMessages, tabLineRefMessages)
                    }
                  >
                    خوانده شده
                  </li>
                  <li
                    ref={(el) => (tabRefsMessages.current[2] = el)}
                    onClick={() =>
                      tabLineHandler(2, tabRefsMessages, tabLineRefMessages)
                    }
                  >
                    خوانده نشده
                  </li>
                  <span ref={tabLineRefMessages} className="tab-line"></span>
                </ul>
                <div className="tab-content">
                  <img
                    src="https://dappr-app.cdn.bubble.io/f1669023602245x686033068801437800/no-chat-conversations.svg"
                    alt=""
                  />
                  <div className="text">
                    <p>پیام برای نمایش ندارید .....</p>
                  </div>
                </div>
              </div>
            </div>
          </button>
        </Tooltip>
        <Tooltip title="جستجو">
          <button className="hBtn" onClick={showModal}>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </Tooltip>
        <Modal
          className="modal"
          open={open}
          title="جستجو"
          onOk={handleOk}
          onCancel={handleCancel}
          footer={[
            <Button key="back" onClick={handleCancel}>
              انصراف
            </Button>,
          ]}
        >
          <Search
            placeholder="تایپ کنید ...."
            allowClear
            style={{
              width: "100%",
            }}
          />
        </Modal>
      </div>
      <div className="page-title">
        <h3>{props.headerTitle}</h3>
      </div>
    </div>
  );
};

export default Header;
