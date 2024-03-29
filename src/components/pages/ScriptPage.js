import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import "../../Cascading-Style-Sheets/Hero.css";
import payments from "../payments/payment.service";
import { AiOutlineHeart } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";
import { Link } from "react-router-dom";

const ScriptPage = () => {
  const token = localStorage.getItem("user-details");
  const getObj = {};
  if (token) {
    getObj["headers"] = {
      Authorization: token,
    };
  }
  const SCRIPT_URL = "script/all";
  const handleDisLikeScript = (item) => {
    fetch(`https://api.indiecrypt.site/favorites/${item.id}?type=script`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
      .then((data) => data.json())
      .then((data) => {
        axios
          .get(`${baseURL}/script/all`, getObj)
          .then((res) => setGetScript(res.data))
          .catch((err) => console.log(err));
      })

      .catch((err) => console.log(err, "🔥🔥"));
  };
  const handleLikeScript = (item) => {
    fetch(`${baseURL}/favorites/${item.id}?type=script`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
      .then((data) => data.json())
      .then((data) => {
        axios
          .get(`${baseURL}/script/all`, getObj)
          .then((res) => setGetScript(res.data))
          .catch((err) => console.log(err));
      })

      .catch((err) => console.log(err, "🔥🔥"));
  };
  const baseURL = "https://api.indiecrypt.site";
  const [getScript, setGetScript] = useState([]);
  useEffect(() => {
    axios.get(SCRIPT_URL).then((res) => setGetScript(res.data));
  }, []);
  return (
    <>
      <h1 className="title-card">Script</h1>
      <ul className="url-items-page">
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
      </ul>
      <div>
        {localStorage.getItem("user-details") ? (
          <div className="cards-music">
            {getScript.map((item) => (
              <div
                data-account={item.user.account}
                data-price={item.price}
                data-id={item.id}
                data-type={item.type}
                className="card-script-token payment"
                key={item.id}
              >
                <Link to={`/scripts/${item.id}`}>
                  <img
                    className="card-img"
                    src={`${baseURL}/uploads/${item.image}`}
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
                      <p className="author-name">{item.user.name}</p>
                    </p>
                    <p className="price">{item.price}</p>
                  </div>
                </div>
                {item.isPaid ? null : (
                  <div className="btns-script">
                    <div className="hearts-contain">
                      <button>
                        {item.isLiked ? (
                          <AiFillHeart
                            onClick={() => handleDisLikeScript(item)}
                            className="heart-btns-red"
                          />
                        ) : (
                          <AiOutlineHeart
                            onClick={() => handleLikeScript(item)}
                            className="heart-btns"
                          />
                        )}
                      </button>
                    </div>

                    <button
                      onClick={payments.manageTransactionFlow}
                      className="btn-script-music-buy  hero-btn btn-pay"
                    >
                      Buy
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="cards-music">
            {getScript.map((item) => (
              <div
                data-account={item.user.account}
                data-price={item.price}
                data-id={item.id}
                data-type={item.type}
                className="card-script"
                key={item.id}
              >
                <Link to={`/scripts/${item.id}`}>
                  <img
                    className="card-img"
                    src={`${baseURL}/uploads/${item.image}`}
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
                      <p className="author-name">{item.user.name}</p>
                    </p>
                    <p className="price">{item.price}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};
/*    */
export default ScriptPage;
