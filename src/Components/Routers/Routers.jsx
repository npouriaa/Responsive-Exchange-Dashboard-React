//imports
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../View/Content/Home/Home";
import Accounts from "../View/Content/Accounts/Accounts";
import Deposit from "../View/Content/Deposit/Deposit";
import Withdraw from "../View/Content/Withdraw/Withdraw";
import Transfer from "../View/Content/Transfer/Transfer";
import Reports from "../View/Content/Reports/Reports";
import Support from "../View/Content/Support/Support";

//Routes
const Routers = () => {
  return (
    <Routes>
      <Route path="home" element={<Home />} />
      <Route path="accounts" element={<Accounts />}>
        <Route path="create-account" element={<></>} />
        <Route path="demo-account" element={<></>} />
      </Route>
      <Route path="deposit" element={<Deposit />}>
        <Route path="paypal" element={<></>} />
        <Route path="master-card" element={<></>} />
        <Route path="bank-transfer" element={<></>} />
        <Route path="crypto" element={<></>} />
      </Route>
      <Route path="withdraw" element={<Withdraw />} />
      <Route path="transfer" element={<Transfer />} />
      <Route path="reports" element={<Reports />}>
        <Route path="accounts-report" element={<></>} />
        <Route path="deposits-report" element={<></>} />
        <Route path="withdraws-report" element={<></>} />
        <Route path="transfers-report" element={<></>} />
      </Route>
      <Route path="support" element={<Support/>}></Route>
      <Route path="*" element={<Home />} />
    </Routes>
  );
};

export default Routers;
