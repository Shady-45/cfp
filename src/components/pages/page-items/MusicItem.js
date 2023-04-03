import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../../../Cascading-Style-Sheets/musicPage.css";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { SiBlockchaindotcom } from "react-icons/si";
import { Link } from "react-router-dom";

const MusicItem = () => {
  const { musicId } = useParams();

  const musicURL = `/music/${musicId}`;
  const [musicItem, setMusicItem] = useState({});
  console.log(musicId);
  async function fetchData() {
    const response = await fetch(`https://www.fundingportal.site${musicURL}`);
    const data = await response.json();
    setMusicItem(data);
  }

  useEffect(() => {
    fetchData();
  }, [musicId]);
  /*   useEffect(() => {
    fetch()
      .then((data) => data.json())
      .then((res) => setMusicItem(res.data));
  }, [musicId]); */
  console.log(musicItem);
  return (
    <>
      <Link to="/">
        {" "}
        <div className="logo-main-new-item">
          <SiBlockchaindotcom />
          <h3>IndieCrypt</h3>
        </div>
      </Link>
      {musicItem ? (
        <div className="music-item">
          <div className="img-container">
            <img
              src={`https://www.fundingportal.site/uploads/${musicItem?.image}`}
              alt={musicItem.name}
            />
          </div>
          <div className="music-info">
            <h1 className="analytic">{`Song Name : ${musicItem?.name}`}</h1>
            <h1 className="analytic">{`Artist Name: ${musicItem?.user?.name}`}</h1>
            <h1 className="analytic">{`Price: ${musicItem?.price}`}</h1>
            <AudioPlayer
              className="audio-player"
              src={`https://www.fundingportal.site/uploads/${musicItem?.audio}`}
              volume={0.5}
            />
            <button className="btn-script-music-buy  hero-btn">Buy</button>
          </div>
        </div>
      ) : (
        <h1 className="analytic">Loading....</h1>
      )}
    </>
  );
};

export default MusicItem;
