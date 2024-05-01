import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../../api/axios";
import "../../../Cascading-Style-Sheets/musicPage.css";
import { SiBlockchaindotcom } from "react-icons/si";
import { Link } from "react-router-dom";
import payments from "../../payments/payment.service";
const ScriptItem = () => {
  const { scriptId } = useParams();

  const [scriptItem, setScriptItem] = useState({});
  const [imageItem, setImageItem] = useState("");
  const [textItem, setTextItem] = useState(" ");
  const token = localStorage.getItem("user-details");

  useEffect(() => {
    const headersObj = {};
    if (token) {
      headersObj["authorization"] = token;
    }
    const fetchData = async function () {
      const response = await fetch(
        `https://api.indiecrypt.online/script/${scriptId}`,
        {
          headers: headersObj,
        }
      );
      const data = await response.json();
      setScriptItem(data);

      const fetchFiles = async function (filename, type, isPaid = false) {
        const headersObj = {};
        if (token) {
          headersObj["authorization"] = token;
        }
        const response = await fetch(
          `https://api.indiecrypt.online/uploads/${filename}${
            type !== "img" || !isPaid ? "" : "?cache=" + new Date().getTime()
          }`,
          { headers: headersObj }
        );
        const fileBuffer = await response.blob();
        const fileUrl = window.URL.createObjectURL(fileBuffer);
        if (type === "img") {
          setImageItem(fileUrl);
        } else {
          setTextItem(fileUrl);
        }
      };

      await fetchFiles(data.image, "img", data.isPaid);
      await fetchFiles(data.text);
    };
    fetchData();
  }, []);

  return (
    <>
      <Link to="/">
        {" "}
        <div className="logo-main-new-item">
          <SiBlockchaindotcom />
          <h3>IndieCrypt</h3>
        </div>
      </Link>
      <ul className="url-items">
        <Link className="path" to="/">
          <li>
            <p>Home/</p>
          </li>
        </Link>
        <Link className="path" to="/script">
          <li>
            <p>Script/</p>
          </li>
        </Link>

        <li>
          {" "}
          <p>{`${scriptId}`}</p>
        </li>
      </ul>
      <div
        className="script-container payment"
        data-account={scriptItem?.user?.account}
        data-price={scriptItem?.price}
        data-id={scriptItem?.id}
        data-type={scriptItem?.type}
      >
        <div className="img-script">
          <img src={`${imageItem}`} alt="" />
        </div>
        <div className="container-2">
          <div className="author">
            <h1 className="analytic">{`Name : ${scriptItem?.name}`}</h1>
            <h1 className="analytic">{`Author : ${scriptItem?.user?.name}`}</h1>
            <h1 className="analytic">{`Price : ${scriptItem?.price}`}</h1>
          </div>
          <div className="script-bts">
            <a href={`${textItem}`}>
              {" "}
              <button className="btn-script-music-buy  hero-btn">View</button>
            </a>
            {scriptItem.isPaid ? null : (
              <button
                onClick={payments.manageTransactionFlow}
                className="btn-script-music-buy  hero-btn"
              >
                Buy
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ScriptItem;
