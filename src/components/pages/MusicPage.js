import React, { useState, useEffect } from "react";

import axios from "../../api/axios";

import "../../Cascading-Style-Sheets/musicPage.css";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import baseURL from "../../api/axios";
import payments from "../payments/payment.service";

const MusicPage = () => {
  const [musicData, setgetMusicData] = useState([]);
  const baseURL = "https://www.fundingportal.site";

  useEffect(() => {
    axios.get(`/music/all`).then((res) => setgetMusicData(res.data));
  }, []);
  console.log(musicData);
  return (
    <>
      <h1 className="title-card">Music</h1>
      <div className="cards namecards">
        {musicData.map((item, index) => (
          <div
            data-account={item.user.account}
            data-price={item.price}
            key={index}
            className="card card-1"
          >
            <img
              className="card-img"
              src={`${baseURL}/uploads/${item.image}`}
              alt=""
            />

            <AudioPlayer
              className="audio"
              src={`${baseURL}/uploads/${item.audio}`}
              volume={0.5}
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
                    src={item.image}
                    alt={item.name}
                  />
                  <p className="author-name">{item.user.name}</p>
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

export default MusicPage;
