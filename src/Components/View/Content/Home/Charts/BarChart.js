//imports
import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

const BarChart = ({ chartData , dataOpts}) => {
  return (
    <div className="bar-chart-con chart">
      <Bar data={chartData} options={dataOpts}/>
    </div>
  );
};

export default BarChart;
