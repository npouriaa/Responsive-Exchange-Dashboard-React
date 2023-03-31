//imports
import React from "react";
import { Table, Tag } from "antd";
import "./TradesTable.css";

const TradesTable = () => {
  //columns array
  const columns = [
    {
      title: "نام سهام",
      dataIndex: "stockName",
      key: "stockName",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "جایگاه",
      key: "position",
      dataIndex: "position",
      render: (_, { position }) => (
        <>
          {position.map((tag) => {
            let color = "green";
            if (tag === "فروش") {
              color = "volcano";
            }
            return (
              <Tag color={color} key={tag}>
                {tag}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "PNL",
      dataIndex: "pnl",
      key: "pnl",
    },
    {
      title: "تاریخ",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "شماره حساب",
      key: "number",
      dataIndex: "number",
    },
  ];

  //datas array
  const data = [
    {
      key: "1",
      stockName: "بیتکوین",
      position: ["فروش"],
      date: "۱۴۰۱/۱۰/۲۵",
      pnl: "۱",
      number: "۶۰۳۷۸۹۸۹۱۲۴۵۱۰۱۲",
    },
    {
      key: "2",
      stockName: "دوج کوین",
      position: ["خرید"],
      date: "۱۴۰۰/۰۵/۰۱",
      pnl: "۱۲",
      number: "۶۰۳۷۸۹۸۹۱۲۴۵۱۰۱۲",
    },
    {
      key: "3",
      stockName: "تتر",
      position: ["خرید"],
      date: "۱۴۰۱/۰۶/۱۲",
      pnl: "۳۲۱",
      number: "۶۰۳۷۸۹۸۹۱۲۴۵۱۰۱۲",
    },
  ];

  return (
    <div className="table-con">
      <div className="table-header">
        <h3>معاملات اخیر</h3>
      </div>
      <Table columns={columns} dataSource={data}/>
    </div>
  );
};

export default TradesTable;
