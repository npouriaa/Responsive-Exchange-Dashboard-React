//imports
import { useState } from "react";

const UseToken = () => {
  //this function send a request to session storage ane get the token key name , convert it to parse and return it
  const getToken = () => {
    let tokenFromSS = JSON.parse(sessionStorage.getItem("token"));
    return tokenFromSS?.token;
  };

  //states
  const [token, setToken] = useState(getToken());

  //this function set the given argument to session storage and the token to state
  const saveToken = (userToken) => {
    sessionStorage.setItem("token", JSON.stringify(userToken));
    setToken(userToken.token);
  };

  //returning the token and save token function
  return {
    token,
    setToken: saveToken,
  };
};

export default UseToken;
