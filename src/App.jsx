//imports
import React, { useState } from "react";
import "./App.css";
import Content from "./Components/View/Content/Content";
import SideMenu from "./Components/View/SideMenu/SideMenu";

const App = () => {
  //states
  const [contentConRef, setContentConRef] = useState();
  const [headerTitle , setHeaderTitle] = useState('داشبورد')

  const handleDataFromChild = (data) => {
    setContentConRef(data);
  };

  //this function show page title
  const shwoHeaderTitle = (data) => {
    let title = data.textContent
    setHeaderTitle(title)
  };

  return (
    <div className="container">
      <SideMenu shwoHeaderTitle={shwoHeaderTitle} contentConRef={contentConRef} />
      <Content headerTitle ={headerTitle} sendData={handleDataFromChild} />
    </div>
  );
};

export default App;
