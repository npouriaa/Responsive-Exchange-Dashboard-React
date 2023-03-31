// imports
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCreditCard } from "@fortawesome/free-regular-svg-icons";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { faMoneyBills } from "@fortawesome/free-solid-svg-icons";
import { faReceipt } from "@fortawesome/free-solid-svg-icons";
import "./Cards.css";
import { faBitcoin } from "@fortawesome/free-brands-svg-icons";

const Cards = () => {
  return (
    <div className="cards">
      <div className="card">
        <div className="f-sec">
          <div className="options">
            <span>
              <FontAwesomeIcon icon={faEllipsisVertical} />
            </span>
          </div>
          <div className="icon">
            <FontAwesomeIcon icon={faReceipt} />
          </div>
        </div>
        <div className="s-sec">
          <div className="amount">
            <h2>$۱۴۳,۵۴۶</h2>
          </div>
          <div className="balance">
            <h4>موجودی حساب</h4>
          </div>
          <div className="badge increase">+ ۱۵ درصد افزایش</div>
        </div>
      </div>
      <div className="card">
        <div className="f-sec">
          <div className="options">
            <span>
              <FontAwesomeIcon icon={faEllipsisVertical} />
            </span>
          </div>
          <div className="icon">
            <FontAwesomeIcon icon={faMoneyBills} />
          </div>
        </div>
        <div className="s-sec">
          <div className="amount">
            <h2>$۵۶,۵۴۶</h2>
          </div>
          <div className="balance">
            <h4>مبلغ کسب شده از ارجاع</h4>
          </div>
          <div className="badge decrease">- ۴۵ درصد کاهش</div>
        </div>
      </div>
      <div className="card">
        <div className="f-sec">
          <div className="options">
            <span>
              <FontAwesomeIcon icon={faEllipsisVertical} />
            </span>
          </div>
          <div className="icon">
            <FontAwesomeIcon icon={faBitcoin} />
          </div>
        </div>
        <div className="s-sec">
          <div className="amount">
            <h2>$۲۷,۴۷۵.۳۰</h2>
          </div>
          <div className="balance">
            <h4>بیتکوین</h4>
          </div>
          <div className="badge increase">+ ۲۳ درصد افزایش</div>
        </div>
      </div>
      <div className="card">
        <div className="f-sec">
          <div className="options">
            <span>
              <FontAwesomeIcon icon={faEllipsisVertical} />
            </span>
          </div>
          <div className="icon">
            <FontAwesomeIcon icon={faCreditCard} />
          </div>
        </div>
        <div className="s-sec">
          <div className="amount">
            <h2>$۱۵,۸۹۴</h2>
          </div>
          <div className="balance">
            <h4>هزینه معاملات این هفته</h4>
          </div>
          <div className="badge decrease">- ۲۰ درصد کاهش</div>
        </div>
      </div>
    </div>
  );
};

export default Cards;
