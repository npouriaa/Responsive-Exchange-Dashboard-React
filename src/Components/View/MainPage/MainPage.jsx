import React, { useState } from "react";
import SideMenu from "../SideMenu/SideMenu";
import Content from "../Content/Content";
import "./MainPage.css";

const MainPage = () => {
  //states
  const [contentConRef, setContentConRef] = useState();
  const [headerTitle, setHeaderTitle] = useState("داشبورد");
  const [sideMenu, setSideMenu] = useState();
  const [asideRef, setAsideRef] = useState();

  const handleDataFromChild = (data) => {
    setContentConRef(data);
  };

  //this function show page title
  const shwoHeaderTitle = (data) => {
    let title = data.textContent;
    setHeaderTitle(title);
  };

  //set the given argument to selected state
  const sideMenuHandler = (data) => {
    setSideMenu(data);
  };

  //set the given argument to selected state
  const getAsideRef = (data) => {
    setAsideRef(data);
  };

  return (
    <div className="main-page-con">
      <SideMenu
        sideMenu={sideMenu}
        shwoHeaderTitle={shwoHeaderTitle}
        contentConRef={contentConRef}
        getAsideRef={getAsideRef}
      />
      <Content
        sideMenuHandler={sideMenuHandler}
        sideMenu={sideMenu}
        headerTitle={headerTitle}
        sendData={handleDataFromChild}
        asideRef={asideRef}
      />
    </div>
  );
};

export default MainPage;
