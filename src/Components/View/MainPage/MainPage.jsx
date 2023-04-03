import React, { useState } from "react";
import SideMenu from "../SideMenu/SideMenu";
import Content from "../Content/Content";
import "./MainPage.css";

const MainPage = () => {
  //states
  const [contentConRef, setContentConRef] = useState();
  const [headerTitle, setHeaderTitle] = useState("داشبورد");

  const handleDataFromChild = (data) => {
    setContentConRef(data);
  };

  //this function show page title
  const shwoHeaderTitle = (data) => {
    let title = data.textContent;
    setHeaderTitle(title);
  };

  return (
    <div className="main-page-con">
      <SideMenu
        shwoHeaderTitle={shwoHeaderTitle}
        contentConRef={contentConRef}
      />
      <Content headerTitle={headerTitle} sendData={handleDataFromChild} />
    </div>
  );
};

export default MainPage;
