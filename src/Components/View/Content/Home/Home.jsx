//imports
import React from "react";
import Cards from "./Cards/Cards";
import Charts from "./Charts/Charts";
import "./Home.css";
import TradesTable from "./TradesTable/TradesTable";

const Home = () => {
  return (
    <div className="home-con">
      <Cards />
      <Charts />
      <TradesTable/>
    </div>
  );
};

export default Home;
