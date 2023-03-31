//imports
import React, { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { faCircleArrowDown } from "@fortawesome/free-solid-svg-icons";
import { faCircleArrowUp } from "@fortawesome/free-solid-svg-icons";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faChartSimple } from "@fortawesome/free-solid-svg-icons";
import { faMoneyBillTransfer } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "./SideMenu.css";

const SideMenu = (props) => {
  //state
  const [asideWidth, setAsideWidth] = useState(true);
  
  //refs
  const liRefs = useRef([]);
  const asideRef = useRef();
  const lineRef = useRef();
  const dashboard = useRef();
  const accounts = useRef();
  const deposit = useRef();
  const withdraw = useRef();
  const transfer = useRef();
  const reports = useRef();

  //this function open and close the side menu (trigger)
  const triggerHandler = (e) => {
    e.target.classList.toggle("close");
    if (e.target.classList.contains("close")) {
      props.contentConRef.current.classList.add("main-r");
      asideRef.current.style.width = "80px";
      setAsideWidth(false);
    } else {
      props.contentConRef.current.classList.remove("main-r");
      asideRef.current.style.width = "220px";
      setAsideWidth(true);
    }
  };

  //this function handle the items green underline width and position
  const lineHandler = (index) => {
    let li_top = liRefs.current[index].offsetTop;
    lineRef.current.style.top = `${li_top}px`;
  };

  return (
    <aside ref={asideRef}>
      <ul>
        <li
          ref={(el) => (liRefs.current[0] = el)}
          onClick={() => {
            lineHandler(0);
            props.shwoHeaderTitle(dashboard.current);
          }}
        >
          <Link className="link side-link" to="/">
            <FontAwesomeIcon className="icon" icon={faHome} />
            <p ref={dashboard}>داشبورد</p>
          </Link>
        </li>
        <li
          ref={(el) => (liRefs.current[1] = el)}
          onClick={() => {
            lineHandler(1);
            props.shwoHeaderTitle(accounts.current);
          }}
        >
          <Link className="link side-link" to="/accounts">
            <FontAwesomeIcon className="icon" icon={faUsers} />
            <p ref={accounts}>حساب ها</p>
          </Link>
        </li>
        <li
          ref={(el) => (liRefs.current[2] = el)}
          onClick={(e) => {
            lineHandler(2);
            props.shwoHeaderTitle(deposit.current);
          }}
        >
          <Link className="link side-link" to="/deposit">
            <FontAwesomeIcon className="icon" icon={faCircleArrowDown} />
            <p ref={deposit}>واریز</p>
          </Link>
        </li>
        <li
          ref={(el) => (liRefs.current[3] = el)}
          onClick={() => {
            lineHandler(3);
            props.shwoHeaderTitle(withdraw.current);
          }}
        >
          <Link to="/withdraw" className="link side-link">
            <FontAwesomeIcon className="icon" icon={faCircleArrowUp} />
            <p ref={withdraw}>برداشت</p>
          </Link>
        </li>
        <li
          ref={(el) => (liRefs.current[4] = el)}
          onClick={() => {
            lineHandler(4);
            props.shwoHeaderTitle(transfer.current);
          }}
        >
          <Link to="/transfer" className="link side-link">
            <FontAwesomeIcon className="icon" icon={faMoneyBillTransfer} />
            <p ref={transfer}>انتقال</p>
          </Link>
        </li>
        <li
          ref={(el) => (liRefs.current[5] = el)}
          onClick={() => {
            lineHandler(5);
            props.shwoHeaderTitle(reports.current);
          }}
        >
          <Link to='/reports' className="link side-link">
            <FontAwesomeIcon className="icon" icon={faChartSimple} />
            <p ref={reports}>گزارشات</p>
          </Link>
        </li>
      </ul>
      <span ref={lineRef} className="li-line"></span>
      <button onClick={triggerHandler} className="trigger close">
        <span>
          <div className="layer"></div>
          {asideWidth ? (
            <FontAwesomeIcon onClick={triggerHandler} icon={faArrowRight} />
          ) : (
            <FontAwesomeIcon onClick={triggerHandler} icon={faArrowLeft} />
          )}
        </span>
      </button>
    </aside>
  );
};
export default SideMenu;
