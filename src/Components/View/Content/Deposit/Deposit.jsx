//imports
import React, { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";
import { Form, Input, Select, Button, notification, message } from "antd";
import { PoundCircleOutlined } from "@ant-design/icons";
import "./Deposit.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCcVisa } from "@fortawesome/free-brands-svg-icons";
const { Option } = Select;

const Deposit = () => {
  //states
  const [depositMethod, setDepositMethod] = useState();
  const [showContent, setShowContent] = useState();
  const [api, contextHolder] = notification.useNotification();
  const [messageApi, contextHolder2] = message.useMessage();
  const [networkItem, setNetworkItem] = useState("main");

  //variables
  const users = JSON.parse(localStorage.getItem("Users"));

  //refs
  const tabLineRef = useRef();
  const btnRefs = useRef([]);
  const cardNumberRef1 = useRef();
  const cardNumberRef2 = useRef();
  const cardNumberRef3 = useRef();
  const cardNumberRef4 = useRef();
  const expireRef = useRef();
  const cardInnerRef = useRef();
  const cardHolderRef = useRef();
  const cvcNumRef = useRef();
  const frmRef = useRef();

  //this function show the message when you first enter to page
  const info = () => {
    messageApi.info("لطفا روش  واریز را انتخاب کنید");
  };

  //this function force user to enter only number in selected input
  const validateNumber = (rule, value, callback) => {
    if (value && !/^[0-9]+$/.test(value)) {
      callback("لطفا فقط عدد وارد کنید");
    } else {
      callback();
    }
  };

  //open notification function
  const openNotification = (placement) => {
    api.success({
      message: `موفق`,
      description: "عملیات واریز با موفقیت انجام شد",
      placement,
    });
  };

  //this function handle the tabs green underline width and position
  const btnLineHandler = (index) => {
    let btn_left = btnRefs.current[index].offsetLeft;
    let btn_width = btnRefs.current[index].clientWidth;
    tabLineRef.current.style.left = `${btn_left}px`;
    tabLineRef.current.style.width = `${btn_width}px`;
  };

  // this function change the page content according to user selected deposit method
  const showContentHandler = (method) => {
    setShowContent(method);
  };

  //this network change the crypto deposit network according to user selected currency
  const changeNetworkItems = (e) => {
    if (e === "BTC") {
      setNetworkItem("main");
    } else {
      setNetworkItem("bep");
    }
  };

  //this function fill the credit card element card number
  const fillCardNumber = (e) => {
    cardNumberRef1.current.textContent = e.target.value.slice(0, 4);
    cardNumberRef2.current.textContent = e.target.value.slice(4, 8);
    cardNumberRef3.current.textContent = e.target.value.slice(8, 12);
    cardNumberRef4.current.textContent = e.target.value.slice(12, 16);
  };

  //this function fill the credit card element expire date and card holder
  const fillCardDetails = (e, ref, sNum) => {
    ref.current.textContent = e.target.value.slice(0, sNum);
  };

  // when the form validation finished this function will invoce
  const onFinish = (values) => {
    let depositArray = [];
    let depositFromLS = localStorage.getItem("Deposit");
    let depositObj = {
      id: uuidv4(),
      account: `${values.account}`,
      amount: `${values.amount}`,
      depositMethod: `${depositMethod}`,
    };
    if (depositFromLS) {
      depositArray = JSON.parse(depositFromLS);
    } else {
      depositArray = [];
    }
    depositArray.push(depositObj);
    localStorage.setItem("Deposit", JSON.stringify(depositArray));
    openNotification("top");
    frmRef.current?.resetFields();
  };

  //this function set the deposit method state
  const setDepositMethodHandler = (method) => {
    setDepositMethod(`${method}`);
  };

  //useeffect
  useEffect(() => {
    info();
    return () => {};
  }, []);

  return (
    <div className="deposit-con">
      {contextHolder}
      {contextHolder2}
      <div className="deposit-content">
        <div className="deposit-type-con">
          <Link to="paypal" className="link">
            <button
              onClick={() => {
                btnLineHandler(0);
                showContentHandler("amount-input");
                setDepositMethodHandler("paypal");
              }}
              ref={(el) => (btnRefs.current[0] = el)}
              className="deposit-type"
            >
              Paypal
              <img
                src="https://logos-marques.com/wp-content/uploads/2020/01/Paypal-logo.png"
                alt=""
              />
            </button>
          </Link>
          <Link to="master-card" className="link">
            <button
              onClick={() => {
                btnLineHandler(1);
                showContentHandler("master-card");
                setDepositMethodHandler("Master Card");
              }}
              ref={(el) => (btnRefs.current[1] = el)}
              className="deposit-type"
            >
              Mastercard
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png"
                alt=""
              />
            </button>
          </Link>
          <Link to="bank-transfer" className="link">
            <button
              onClick={() => {
                btnLineHandler(2);
                showContentHandler("amount-input");
                setDepositMethodHandler("Bank Transfer");
              }}
              ref={(el) => (btnRefs.current[2] = el)}
              className="deposit-type"
            >
              Bank transfer
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/1/1e/Ria_Main_Logo_Descriptor_Color_RGB.png"
                alt=""
              />
            </button>
          </Link>
          <Link to="crypto" className="link">
            <button
              onClick={() => {
                btnLineHandler(3);
                showContentHandler("crypto");
                setDepositMethodHandler("Crypto");
              }}
              ref={(el) => (btnRefs.current[3] = el)}
              className="deposit-type"
            >
              Crypto
              <img
                src="https://kryptovaluta.info/wp-content/uploads/2021/10/eth-btc.png"
                alt=""
              />
            </button>
          </Link>
          <span ref={tabLineRef} className="tabLine"></span>
        </div>
        <Form ref={frmRef} onFinish={onFinish} className="deposit-frm">
          <div className="ch-content">
            {showContent === "amount-input" ? (
              <div className="">
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
                  <Input prefix={<PoundCircleOutlined />} />
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
            ) : showContent === "master-card" ? (
              <div className="master-card-frm">
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
                  <Input prefix={<PoundCircleOutlined />} />
                </Form.Item>
                <div className="flip-card-container">
                  <div className="flip-card">
                    <div ref={cardInnerRef} className="flip-card-inner">
                      <div className="flip-card-front">
                        <div className="flip-card-front-header">
                          <img
                            src="https://cdn-icons-png.flaticon.com/512/6404/6404078.png"
                            alt=""
                          />
                          <FontAwesomeIcon
                            className="visaIcon"
                            icon={faCcVisa}
                          />
                        </div>
                        <div className="flip-card-front-card-number">
                          <p ref={cardNumberRef1}>****</p>
                          <p ref={cardNumberRef2}>****</p>
                          <p ref={cardNumberRef3}>****</p>
                          <p ref={cardNumberRef4}>****</p>
                        </div>
                        <div className="flip-card-front-card-details">
                          <div className="card-holder">
                            <p>Card Holder</p>
                            <p ref={cardHolderRef}></p>
                          </div>
                          <div className="card-expire">
                            <p>Expire Year</p>
                            <p ref={expireRef}></p>
                          </div>
                        </div>
                      </div>
                      <div className="flip-card-back">
                        <div className="flip-card-back-line"></div>
                        <div className="cvc-con">
                          <p>cvc</p>
                          <div className="cvc-num-con">
                            <p ref={cvcNumRef}></p>
                          </div>
                          <FontAwesomeIcon
                            className="visaIcon visa-back"
                            icon={faCcVisa}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-number-input">
                  <Form.Item
                    className="frm-item"
                    label="شماره کارت"
                    name="card_number"
                    hasFeedback
                    rules={[
                      {
                        required: true,
                        message: "لطفا شماره کارت را وارد کنید!",
                      },
                      {
                        len: 16,
                        message: "شماره کارت باید ۱۶ رقم باشد",
                      },
                      {
                        validator: validateNumber,
                      },
                    ]}
                  >
                    <Input onChange={(e) => fillCardNumber(e)} />
                  </Form.Item>
                  <Form.Item
                    className="frm-item"
                    label="سال انقضا"
                    name="card_expire"
                    type="number"
                    hasFeedback
                    rules={[
                      {
                        required: true,
                        message: "لطفا سال انقضا را وارد کنید!",
                      },
                      {
                        len: 4,
                        message: "سال انقضا باید ۴ رقم باشد",
                      },
                      {
                        validator: validateNumber,
                      },
                    ]}
                  >
                    <Input onChange={(e) => fillCardDetails(e, expireRef, 4)} />
                  </Form.Item>
                  <Form.Item
                    className="frm-item"
                    label="card holder"
                    name="card_holder"
                    hasFeedback
                    rules={[
                      {
                        required: true,
                        message: "لطفا card holder را وارد کنید!",
                      },
                      {
                        len: 4,
                        message: "card holder باید ۴ رقم باشد",
                      },
                      {
                        validator: validateNumber,
                      },
                    ]}
                  >
                    <Input
                      onChange={(e) => fillCardDetails(e, cardHolderRef, 4)}
                    />
                  </Form.Item>
                  <Form.Item
                    className="frm-item"
                    label="cvc"
                    name="card_cvc"
                    hasFeedback
                    rules={[
                      {
                        required: true,
                        message: "لطفا cvc را وارد کنید!",
                      },
                      {
                        len: 20,
                        message: "cvc باید ۲۰ رقم باشد",
                      },
                      {
                        validator: validateNumber,
                      },
                    ]}
                  >
                    <Input
                      onBlur={() => {
                        cardInnerRef.current.style.transform = "rotateY(0)";
                      }}
                      onFocus={() => {
                        cardInnerRef.current.style.transform =
                          "rotateY(180deg)";
                      }}
                      className="cvc-input"
                      onChange={(e) => fillCardDetails(e, cvcNumRef, 20)}
                    />
                  </Form.Item>
                  <div className="submit-con">
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
                </div>
              </div>
            ) : showContent === "crypto" ? (
              <div>
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
                  <Input prefix={<PoundCircleOutlined />} />
                </Form.Item>
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
                <Form.Item
                  className="frm-item"
                  label="نام و نام خانوادگی"
                  name="name_family"
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: "لطفا نام و نام خانوادگی را وارد کنید!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  className="frm-item"
                  label="آدرس"
                  name="address"
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: "لطفا آدرس را وارد کنید!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="email"
                  label="ایمیل"
                  className="frm-item"
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

                <div className="submit-con">
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
              </div>
            ) : (
              <></>
            )}
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Deposit;
