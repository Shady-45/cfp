import React, { useEffect, useState } from "react";
import script1 from "../../assets/script1.jpg";
import axios from "../../api/axios";
import "../../Cascading-Style-Sheets/Hero.css";
import payments from "../payments/payment.service";

const ScriptPage = () => {
  const SCRIPT_URL = "script/all";
  const baseURL = "https://www.fundingportal.site";
  const [getScript, setGetScript] = useState([]);
  useEffect(() => {
    axios.get(SCRIPT_URL).then((res) => setGetScript(res.data));
  }, []);
  return (
    <>
      <h1 className="title-card">Script</h1>

      <div className="cards namecards">
        {getScript.map((item, index) => (
          <div
            data-account={item.user.account}
            data-price={item.price}
            key={index}
            className="card card-1"
          >
            <img
              className="card-img"
              src={`${baseURL}/uploads/${item.image}`}
              alt={item.name}
            />
            <div className="text-details">
              <div className="firstrow">
                <p className="name">{item.name}</p>
                <p className="currency">Current eth</p>
              </div>
              <div className="secondrow">
                <p className="author">
                  <p className="author-name">{item.name}</p>
                </p>
                <p className="price">{item.price}</p>
              </div>
            </div>
            <button
              onClick={payments.manageTransactionFlow}
              className="btn-script-music-buy  hero-btn btn-pay"
            >
              Buy
            </button>
          </div>
        ))}
      </div>
    </>
  );
};
/*    */
export default ScriptPage;
