//imports
import React, { useState } from "react";
import { lineChartData } from "./ChartData";
import LineChart from "./LineChart";
import "./Charts.css";
import BarChart from "./BarChart";

const Chart = () => {
  //states
  const [userData, setUseraData] = useState({
    labels: lineChartData.map((data) => data.month),
    datasets: [
      {
        label: ["Dataset 1"],
        data: lineChartData.map((data) => data.userGain),
        backgroundColor: "#059862",
        borderColor: "#059862",
        borderWidth: "1",
      },
      {
        label: ["Dataset 2"],
        data: lineChartData.map((data) => data.userLost),
        backgroundColor: "red",
        borderColor: "red",
        borderWidth: "1",
      },
    ],
  });
  
  return (
    <div className="charts-con">
      <LineChart chartData={userData} />
      <BarChart chartData={userData} />
    </div>
  );
};

export default Chart;
