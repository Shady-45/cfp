import React, { useEffect, useState } from "react";
import script1 from "../../assets/script1.jpg";
import axios from "../../api/axios";
import "../../Cascading-Style-Sheets/Hero.css";
import baseURL from "../../api/axios";

const ScriptPage = () => {
  const SCRIPT_URL = "script/all";
  const [getScript, setGetScript] = useState([]);
  useEffect(() => {
    axios
      .get(`${baseURL}/script/all`)
      .then((res) => setGetScript(res.data) && console.log(res.data));
  }, []);
  return (
    <>
      <h1 className="title-card">Script</h1>

      <div className="cards namecards">
        {getScript.map((item, index) => (
          <div key={index} className="card card-1">
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
                  <img
                    className="avatar author-img"
                    alt={item.name}
                    src={`${baseURL}/uploads/${item.image}`}
                  />
                  <p className="author-name">{item.name}</p>
                </p>
                <p className="price">{item.price}</p>
              </div>
            </div>
            <button className="btn-script-music-buy  hero-btn">Buy</button>
          </div>
        ))}
      </div>
    </>
  );
};
/*    */
export default ScriptPage;
