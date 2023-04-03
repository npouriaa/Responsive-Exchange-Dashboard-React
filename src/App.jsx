//imports
import React from "react";
import Login from "./Components/View/Login/Login";
import MainPage from "./Components/View/MainPage/MainPage";
import UseToken from "./Components/App/UseToken";
import "./App.css";


const App = () => {
  //destructuring
  const {token , setToken} = UseToken()
  
  // if the token doesn't exist this function wil invoke an render the login component and other components are no able to see and use
  if (!token) {
    return <Login setToken={setToken} />;
  }

  return (
    <div className="container">
      <MainPage />
    </div>
  );
};

export default App;
