import React, { useState, useEffect } from "react";

import axios from "../../api/axios";

import "../../Cascading-Style-Sheets/musicPage.css";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

const MusicPage = () => {
  const [musicData, setgetMusicData] = useState([]);
  const GET_MUSIC_URL = "music/all";
  useEffect(() => {
    axios.get(GET_MUSIC_URL).then((res) => setgetMusicData(res.data));
  }, []);
  return (
    <>
      <h1 className="title-card">Music</h1>
      <div className="cards namecards">
        {musicData.map((item, index) => (
          <div key={index} className="card card-1">
            <img
              className="card-img"
              src={`https://fundingportal-gs8ns.ondigitalocean.app/uploads/${item.image}`}
              alt=""
            />

            <AudioPlayer
              className="audio"
              src={`https://fundingportal-gs8ns.ondigitalocean.app/uploads/${item.audio}`}
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

            <button className="btn-script-music-buy  hero-btn">Buy</button>
          </div>
        ))}
      </div>
    </>
  );
};

export default MusicPage;
