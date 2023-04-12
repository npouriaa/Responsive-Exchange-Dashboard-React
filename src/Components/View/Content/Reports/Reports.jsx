//imports
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Table, Modal, notification, message } from "antd";
import {
  faArrowCircleDown,
  faArrowCircleUp,
  faMoneyBillTransfer,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { QuestionOutlined } from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Reports.css";

const Reports = () => {
  //states
  const [messageApi, contextHolder3] = message.useMessage();
  const [tableData, setTableData] = useState([]);
  const [tableColumns, setTableColumns] = useState([]);
  const [api, contextHolder2] = notification.useNotification();
  const [modal, contextHolder] = Modal.useModal();

  //refs
  const tableConRef = useRef();
  const btnRefs = useRef([]);
  const tabLineRef = useRef();

  // this function show message when user first enter to page
  const info = () => {
    messageApi.info("لطفا نوع گزارش را انتخاب کنید");
  };

  //open notification function
  const openNotification = (placement) => {
    api.success({
      message: `موفق`,
      description: "داده با موفقیت حدف شد",
      placement,
    });
  };

  //this function remove the item from the local storage array according to the given arguments and user selection
  const deleteItem = (e, LSkey) => {
    let arrayItem;
    let id =
      e.target.parentElement.parentElement.parentElement.children[0]
        .textContent;
    let array = JSON.parse(localStorage.getItem(`${LSkey}`));
    array.map((item) => {
      if (item.account === id) {
        arrayItem = item;
      }
    });

    let index = array.indexOf(arrayItem);
    array.splice(index, 1);
    localStorage.setItem(`${LSkey}`, JSON.stringify(array));
    setTableData(array);
  };

  // this function show the confrim modal when user wants to delete item
  const confirm = (e, LsKey) => {
    modal.confirm({
      title: "حذف",
      icon: <QuestionOutlined />,
      content: "ایا از حذف داده اطمینان  دارید؟",
      okText: "تایید",
      cancelText: "انصراف",
      onOk: () => {
        deleteItem(e, LsKey);
        openNotification("top");
      },
    });
  };

  // this function fill the table data acccording to given local storage key
  const fillTableData = (LSKey) => {
    let array = JSON.parse(localStorage.getItem(`${LSKey}`));
    setTableData(array);
  };

  //  this function fill the table data acccording to given argument
  const setTableColumnsHandler = (cName) => {
    let cArray = [...tableColumns];

    if (cName === "accounts") {
      cArray = [
        {
          title: "id",
          dataIndex: "id",
          key: "id",
        },
        {
          title: "نام و نام خانوادگی",
          dataIndex: "account",
          key: "account",
        },
        {
          title: "شماره همراه",
          dataIndex: "phone",
          key: "phone",
        },
        {
          title: "ایمیل",
          dataIndex: "email",
          key: "email",
        },

        {
          title: "نوع حساب",
          dataIndex: "userType",
          key: "userType",
        },
        {
          title: "ارز",
          dataIndex: "currency",
          key: "currency",
        },
        {
          title: "پلتفرم معامله",
          dataIndex: "platform",
          key: "platform",
        },
        {
          title: "عملیات",
          dataIndex: "",
          key: "",
          render: () => {
            return (
              <div className="deleteCon">
                <a onClick={(e) => confirm(e, "Users")}>حذف</a>
              </div>
            );
          },
        },
      ];
    } else if (cName === "deposits") {
      cArray = [
        {
          title: "id",
          dataIndex: "id",
          key: "id",
        },
        {
          title: "حساب",
          dataIndex: "account",
          key: "account",
        },
        {
          title: "روش واریز",
          dataIndex: "depositMethod",
          key: "depositMethod",
        },
        {
          title: "مبلغ",
          dataIndex: "amount",
          key: "amount",
        },
        {
          title: "عملیات",
          dataIndex: "",
          key: "",
          render: () => {
            return (
              <div className="deleteCon">
                <a onClick={(e) => confirm(e, "Deposit")}>حذف</a>
              </div>
            );
          },
        },
      ];
    } else if (cName === "withdraws") {
      cArray = [
        {
          title: "id",
          dataIndex: "id",
          key: "id",
        },
        {
          title: "حساب",
          dataIndex: "account",
          key: "account",
        },
        {
          title: "روش برداشت",
          dataIndex: "withdraw_method",
          key: "withdraw_method",
        },
        {
          title: "شبکه",
          dataIndex: "network",
          key: "network",
        },
        {
          title: "ارز",
          dataIndex: "currency",
          key: "currency",
        },
        {
          title: "مبلغ",
          dataIndex: "amount",
          key: "amount",
        },
        {
          title: "عملیات",
          dataIndex: "",
          key: "",
          render: () => {
            return (
              <div className="deleteCon">
                <a onClick={(e) => confirm(e, "Withdraw")}>حذف</a>
              </div>
            );
          },
        },
      ];
    } else {
      cArray = [
        {
          title: "id",
          dataIndex: "id",
          key: "id",
        },
        {
          title: "از حساب",
          dataIndex: "from_acc",
          key: "from_acc",
        },

        {
          title: "به حساب",
          dataIndex: "to_acc",
          key: "to_acc",
        },
        {
          title: "مبلغ",
          dataIndex: "amount",
          key: "amount",
        },
        {
          title: "عملیات",
          dataIndex: "",
          key: "",
          render: () => {
            return (
              <div className="deleteCon">
                <a onClick={(e) => confirm(e, "Transfer")}>حذف</a>
              </div>
            );
          },
        },
      ];
    }

    setTableColumns(cArray);
  };

  //this function handle the tabs green underline width and position
  const btnLineHandler = (index) => {
    let btn_left = btnRefs.current[index].offsetLeft;
    let btn_width = btnRefs.current[index].clientWidth;
    tabLineRef.current.style.left = `${btn_left}px`;
    tabLineRef.current.style.width = `${btn_width}px`;
  };

  //useeffect
  useEffect(() => {
    info();
    return () => {};
  }, []);

  return (
    <div className="reports-con">
      {contextHolder}
      {contextHolder2}
      {contextHolder3}
      <div className="reports-content">
        <div className="reports-type-con">
          <Link className="link" to="accounts-report">
            <button
              ref={(el) => (btnRefs.current[0] = el)}
              onClick={() => {
                btnLineHandler(0);
                fillTableData("Users");
                setTableColumnsHandler("accounts", tableData);
                tableConRef.current.style.display = "block";
              }}
              className="reports-type"
            >
              حساب ها
              <FontAwesomeIcon icon={faUsers} />
            </button>
          </Link>
          <Link className="link" to="deposits-report">
            <button
              ref={(el) => (btnRefs.current[1] = el)}
              onClick={() => {
                btnLineHandler(1);
                fillTableData("Deposit");
                tableConRef.current.style.display = "block";
                setTableColumnsHandler("deposits", tableData);
              }}
              className="reports-type"
            >
              واریزی ها
              <FontAwesomeIcon icon={faArrowCircleDown} />
            </button>
          </Link>
          <Link className="link" to="withdraws-report">
            <button
              ref={(el) => (btnRefs.current[2] = el)}
              onClick={() => {
                btnLineHandler(2);
                fillTableData("Withdraw");
                tableConRef.current.style.display = "block";
                setTableColumnsHandler("withdraws", tableData);
              }}
              className="reports-type"
            >
              برداشت ها
              <FontAwesomeIcon icon={faArrowCircleUp} />
            </button>
          </Link>
          <Link className="link" to="transfers-report">
            <button
              ref={(el) => (btnRefs.current[3] = el)}
              onClick={() => {
                btnLineHandler(3);
                tableConRef.current.style.display = "block";
                fillTableData("Transfer");
                setTableColumnsHandler("transfers", tableData);
              }}
              className="reports-type"
            >
              انتقالات
              <FontAwesomeIcon icon={faMoneyBillTransfer} />
            </button>
          </Link>
          <span ref={tabLineRef} className="reports-tab-line"></span>
        </div>
        <div ref={tableConRef} className="table-con table-con-reports">
          <Table columns={tableColumns} dataSource={tableData} />
        </div>
      </div>
    </div>
  );
};

export default Reports;
