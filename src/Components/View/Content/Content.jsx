import React from "react";
import "./Content.css";
import Routers from "../../Routers/Routers";
import Header from "./Header/Header";

const Content = (props) => {
  // sending the functions which are comes from the MainPage Component (parent)
  return (
    <main className="main-r">
      <Header
        sideMenuHandler={props.sideMenuHandler}
        headerTitle={props.headerTitle}
        asideRef={props.asideRef}
      />
      <Routers />
    </main>
  );
};

export default Content;
