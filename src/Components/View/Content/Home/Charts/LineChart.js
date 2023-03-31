//imports
import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

const BarChart = ({ chartData }) => {
  return (
    <div className="line-chart-con chart">
      <Line data={chartData} />
    </div>
  );
};

export default BarChart;
