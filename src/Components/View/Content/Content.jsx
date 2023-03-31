import React, { useEffect, useRef } from "react";
import "./Content.css";
import Routers from "../../Routers/Routers";
import Header from "./Header/Header";

const Content = (props) => {
  //ref
  const contentConRef = useRef();
  
  //this function send the data to parent
  const sendDataToParent = () => {
    props.sendData(contentConRef);
  };

  //useeffects
  useEffect(() => {
    sendDataToParent();
  });

  return (
    <main ref={contentConRef} className="">
      <Header headerTitle={props.headerTitle} />
      <Routers />
    </main>
  );
};

export default Content;
