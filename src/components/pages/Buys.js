import React, { useState } from "react";
import { Link } from "react-router-dom";
import { SiBlockchaindotcom } from "react-icons/si";
import "../../Cascading-Style-Sheets/Updates.css";
import { useEffect } from "react";
import RotateLoader from "react-spinners/RotateLoader";
import axios from "axios";

const Buys = ({ isDownloading, setIsDownloading }) => {
  const [getUserBuys, setGetUserBuys] = useState([]);

  const token = localStorage.getItem("user-details");
  const headersObj = {};
  if (token) {
    headersObj["authorization"] = token;
  }

  const downloadFile = (filename) => {
    setIsDownloading(true);
    axios
      .get(`https://www.fundingportal.site/uploads/${filename}`, {
        responseType: "arraybuffer",
        headers: headersObj,
      })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;

        link.setAttribute("download", filename);
        document.body.appendChild(link);
        link.click();
        setIsDownloading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsDownloading(false);
      });
  };

  useEffect(() => {
    axios
      .get("https://www.fundingportal.site/payments/getAll", {
        headers: headersObj,
      })
      .then((res) => {
        setGetUserBuys(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      <main className={`${isDownloading ? "rotate-white" : "rotate-black"}`}>
        <span className="rotate">
          <RotateLoader color={"#1a1aff"} loading={isDownloading} size={15} />
        </span>
        <Link to="/">
          <div className="logo-main-new-item">
            <SiBlockchaindotcom />
            <h3>IndieCrypt</h3>
          </div>
        </Link>
        <h1 className="buys">Your Buys</h1>

        {getUserBuys.length === 0 ? (
          <h1 className="buys">You Haven't Bought any item</h1>
        ) : (
          <div className="cards namecards">
            {getUserBuys.map((item) => (
              <div className="card-script-token payment" key={item.id}>
                <Link to={`https://www.fundingportal.site/scripts/${item.id}`}>
                  <img
                    className="card-img"
                    src={`https://www.fundingportal.site/uploads/${item.image}`}
                    alt=""
                  />
                </Link>

                <div className="text-details">
                  <div className="firstrow">
                    <p className="name">{item.name}</p>
                    <p className="currency">Current eth</p>
                  </div>
                  <div className="secondrow">
                    <p className="author">
                      {/*       <p className="author-name">{item.user.name}</p> */}
                    </p>
                    <p className="price">{item.price}</p>
                  </div>
                </div>
                {item.type === "music" ? (
                  <button
                    className="btn-nav"
                    onClick={() => downloadFile(item.audio)}
                  >
                    Download
                  </button>
                ) : null}
                {item.type === "script" ? (
                  <button
                    className="btn-nav"
                    onClick={() => downloadFile(item.text)}
                  >
                    Download
                  </button>
                ) : null}
                {item.type === "nft" ? (
                  <button
                    className="btn-nav"
                    onClick={() => downloadFile(item.image)}
                  >
                    Download
                  </button>
                ) : null}
              </div>
            ))}
          </div>
        )}
      </main>
    </>
  );
};

export default Buys;
