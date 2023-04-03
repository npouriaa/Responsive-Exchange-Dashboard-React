import React from "react";
import "./Content.css";
import Routers from "../../Routers/Routers";
import Header from "./Header/Header";

const Content = (props) => {
  return (
    <main className="main-r">
      <Header headerTitle={props.headerTitle} />
      <Routers />
    </main>
  );
};

export default Content;
