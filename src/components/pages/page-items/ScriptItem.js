import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../../api/axios";
import "../../../Cascading-Style-Sheets/musicPage.css";
import { SiBlockchaindotcom } from "react-icons/si";
import { Link } from "react-router-dom";
const ScriptItem = () => {
  const { scriptId } = useParams();

  const [scriptItem, setScriptItem] = useState({});

  useEffect(() => {
    fetch(`https://www.fundingportal.site/script/${scriptId}`)
      .then((response) => response.json())
      .then((data) => setScriptItem(data));
  }, [scriptId]);
  console.log(scriptItem);

  /*  useEffect(() => {
    fetch(`https://www.fundingportal.site/uploads/${scriptItem?.text}`)
      .then((res) => res.json())
      .then((data) => setScriptText(data));
  }); */
  return (
    <>
      <Link to="/">
        {" "}
        <div className="logo-main-new-item">
          <SiBlockchaindotcom />
          <h3>IndieCrypt</h3>
        </div>
      </Link>
      <div className="script-container">
        <div className="img-script">
          <img
            src={`https://www.fundingportal.site/uploads/${scriptItem?.image}`}
            alt=""
          />
        </div>
        <div className="container-2">
          <div className="author">
            <h1 className="analytic">{`Name : ${scriptItem?.name}`}</h1>
            <h1 className="analytic">{`Author : ${scriptItem?.user?.name}`}</h1>
            <h1 className="analytic">{`Price : ${scriptItem?.price}`}</h1>
          </div>
          <div className="script-bts">
            <a
              href={`https://www.fundingportal.site/uploads/${scriptItem?.image}`}
            >
              {" "}
              <button className="btn-script-music-buy  hero-btn">View</button>
            </a>
            <button className="btn-script-music-buy  hero-btn">Buy</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ScriptItem;
