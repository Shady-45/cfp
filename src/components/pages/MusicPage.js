import React, { useState, useEffect } from "react";

import axios from "axios";
import MusicItem from "../pages/page-items/MusicItem";
import { Link } from "react-router-dom";
import "../../Cascading-Style-Sheets/musicPage.css";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import baseURL from "../../api/axios";
import payments from "../payments/payment.service";
import { AiOutlineHeart } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { RiArrowGoBackFill } from "react-icons/ri";

const MusicPage = () => {
  const navigate = useNavigate();
  const [musicData, setgetMusicData] = useState([]);
  const baseURL = "https://www.fundingportal.site";
  const token = localStorage.getItem("user-details");
  const redirect = (item) => {
    navigate(`/${item.type + "s"}/${item.id}`);
  };
  const getObj = {};
  if (token) {
    getObj["headers"] = {
      Authorization: token,
    };
  }
  const handleDisLike = (item) => {
    fetch(`https://www.fundingportal.site/favorites/${item.id}?type=music`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
      .then((data) => data.json())
      .then((data) => {
        axios
          .get(`${baseURL}/music/all`, getObj)
          .then((res) => setgetMusicData(res.data))
          .catch((err) => console.log(err));
      })

      .catch((err) => console.log(err, "🔥🔥"));
  };
  useEffect(() => {
    axios
      .get(`${baseURL}/music/all`, getObj)
      .then((res) => setgetMusicData(res.data));
  }, []);

  const handleLike = (item) => {
    fetch(`${baseURL}/favorites/${item.id}?type=music`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
      .then((data) => data.json())
      .then((data) => {
        axios
          .get(`${baseURL}/music/all`, getObj)
          .then((res) => setgetMusicData(res.data))
          .catch((err) => console.log(err));
      })

      .catch((err) => console.log(err, "🔥🔥"));
  };
  return (
    <>
      <h1 className="title-card">Music</h1>
      <ul className="url-items-page">
        <Link className="path" to="/">
          <li>
            <p>Home/</p>
          </li>
        </Link>
        <Link className="path" to="/music">
          <li>
            <p>Music/</p>
          </li>
        </Link>
      </ul>
      {localStorage.getItem("user-details") ? (
        <div className="cards-music">
          {musicData.map((item, index) => (
            <div
              data-account={item.user.account}
              data-price={item.price}
              data-id={item.id}
              data-type={item.type}
              key={index}
              className="card-music card card-1 payment"
            >
              <Link
                to={`/musics/${item.id}`}
                element={<MusicItem />}
                key={item.id}
              >
                <img
                  className="card-img"
                  src={`${baseURL}/uploads/${item.image}`}
                  alt=""
                />
              </Link>
              <div className="music-play">
                <AudioPlayer
                  className="music-player"
                  src={`${baseURL}/uploads/${item.audio}`}
                  volume={0.5}
                />
              </div>
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
              <div className="hearts-contain">
                <button className="button">
                  {item.isLiked ? (
                    <AiFillHeart
                      onClick={() => handleDisLike(item)}
                      className="heart-btns-red"
                    />
                  ) : (
                    <AiOutlineHeart
                      onClick={() => handleLike(item)}
                      className="heart-btns"
                    />
                  )}
                </button>

                {item.isPaid ? (
                  <button
                    className="btn-script-music-buy  hero-btn btn-pay"
                    onClick={() => redirect(item)}
                  >
                    View
                  </button>
                ) : (
                  <button
                    onClick={payments.manageTransactionFlow}
                    className="btn-script-music-buy  hero-btn btn-pay"
                  >
                    Buy
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="cards-music">
          {musicData.map((item, index) => (
            <div
              data-account={item.user.account}
              data-price={item.price}
              data-id={item.id}
              data-type={item.type}
              key={index}
              className="card-music card card-1 payment"
            >
              <Link
                to={`/musics/${item.id}`}
                element={<MusicItem />}
                key={item.id}
              >
                <img
                  className="card-img"
                  src={`${baseURL}/uploads/${item.image}`}
                  alt=""
                />
              </Link>
              <div className="music-play">
                <AudioPlayer
                  className="music-player"
                  src={`${baseURL}/uploads/${item.audio}`}
                  volume={0.5}
                />
              </div>
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
    </>
  );
};

export default MusicPage;
