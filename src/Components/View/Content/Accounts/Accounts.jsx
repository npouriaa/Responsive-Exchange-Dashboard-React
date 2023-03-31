//imports
import React, { useEffect, useRef, useState } from "react";
import { Modal, notification } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { QuestionOutlined } from "@ant-design/icons";
import {
  faCoins,
  faTrash,
  faList,
  faWallet,
} from "@fortawesome/free-solid-svg-icons";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { faUserSecret } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import CreateAccount from "./CreateAccount/CreateAccount";
import "./Accounts.css";

const Accounts = () => {
  //States
  const [showContent, setShowContent] = useState("");
  const [modal, contextHolder] = Modal.useModal();
  const [api, contextHolder2] = notification.useNotification();
  const [users, setUsers] = useState([]);
  
  //Refs
  const btnRefs = useRef([]);
  const tabLineRef = useRef();

  //Functions

  //open notification function
  const openNotification = (placement) => {
    api.success({
      message: `موفق`,
      description: "حساب با موفقیت حدف شد",
      placement,
    });
  };

  //this function remove the selected user from local storage
  const removeUser = (itemindex) => {
    let mainArray = [...users];
    let item = mainArray[itemindex];
    let index = mainArray.indexOf(item);
    mainArray.splice(index, 1);
    localStorage.setItem("Users", JSON.stringify(mainArray));
    setUsers(mainArray);
  };

  //show confrim modal function 
  const confirm = () => {
    modal.confirm({
      title: "حذف",
      icon: <QuestionOutlined />,
      content: "ایا از حذف حساب اطمینان  دارید؟",
      okText: "تایید",
      cancelText: "انصراف",
      onOk: () => {
        removeUser();
        openNotification("top");
      },
    });
  };

  //this function show the users from local storage 
  const showUsers = () => {
    let usersArray = JSON.parse(localStorage.getItem("Users"));
    setUsers(usersArray);
  };

  //this function handle the tabs green underline width and position
  const btnLineHandler = (index) => {
    let btn_left = btnRefs.current[index].offsetLeft;
    let btn_width = btnRefs.current[index].clientWidth;
    tabLineRef.current.style.left = `${btn_left}px`;
    tabLineRef.current.style.width = `${btn_width}px`;
  };

  //this function change the page content according to user selected tab
  const showContentHandler = (cName) => {
    setShowContent(cName);
  };

  //useeffec
  useEffect(() => {
    showContentHandler("accounts");
    showUsers();
    return () => {};
  }, []);

  return (
    <div className="accounts-con">
      {contextHolder2}
      {contextHolder}
      <div className="accounts-con-header">
        <div className="items">
          <Link to="/accounts" className="link acc-link">
            <button
              onClick={() => {
                showUsers();
                btnLineHandler(0);
                showContentHandler("accounts");
              }}
              ref={(el) => (btnRefs.current[0] = el)}
            >
              <FontAwesomeIcon icon={faList} />
              لیست حساب ها
            </button>
          </Link>
          <Link className="link acc-link" to="demo-account">
            <button
              onClick={() => {
                btnLineHandler(1);
                showContentHandler("demo");
              }}
              ref={(el) => (btnRefs.current[1] = el)}
            >
              <FontAwesomeIcon icon={faUserSecret} />
              حساب دمو
            </button>
          </Link>
          <Link className="link acc-link" to="create-account">
            <button
              className="createBtn"
              onClick={() => {
                btnLineHandler(2);
                showContentHandler("create");
              }}
              ref={(el) => (btnRefs.current[2] = el)}
            >
              <FontAwesomeIcon icon={faUserPlus} />
              ایجاد حساب
            </button>
          </Link>
          <span ref={tabLineRef} className="tabLine"></span>
        </div>
      </div>
      {showContent === "accounts" ? (
        <div className="main-account">
          {users ? (
            users.map((item, index) => (
              <div key={index} className="main-content-card">
                <div className="main-content-card-title">
                  <div className="f-sec">
                    <h4>حساب اصلی</h4>
                    <p>{item.account}</p>
                  </div>
                  <FontAwesomeIcon
                    onClick={() => confirm()}
                    className="main-content-card-icon"
                    icon={faTrash}
                  />
                </div>
                <div className="main-content-card-details">
                  <div className="acc-type">
                    <p>نوع حساب :</p>
                    <p>{item.userType}</p>
                  </div>
                  <div className="acc-rt-platform">
                    <p>پلتفرم معامله :</p>
                    <p>{item.platform}</p>
                  </div>
                </div>
                <div className="main-content-card-others">
                  <div className="item">
                    <span className="">
                      <FontAwesomeIcon icon={faCoins} />
                      ارز :
                    </span>
                    <p>{item.currency}</p>
                  </div>
                  <div className="item">
                    <span className="">
                      <FontAwesomeIcon icon={faWallet} />
                      موجودی :
                    </span>
                    <p>۰$</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <></>
          )}
        </div>
      ) : showContent === "demo" ? (
        <></>
      ) : (
        <CreateAccount />
      )}
    </div>
  );
};

export default Accounts;
