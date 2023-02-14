import React from "react";
import music1 from "../../assets/music1.mp4";
import musicAvatar1 from "../../assets/music1.png";
import "../../Cascading-Style-Sheets/musicPage.css";

const MusicPage = () => {
  return (
    <>
      <h1 className="title-card">Music</h1>
      <div className="cards namecards">
        <div className="card card-1">
          <video
            className="card-img"
            src={music1}
            autoPlay="autoplay"
            loop="loop"
            muted="muted"
            type="video/mp4"
          ></video>
          <div className="text-details">
            <div className="firstrow">
              <p className="name">Dao Vinci</p>
              <p className="currency">Current eth</p>
            </div>
            <div className="secondrow">
              <p className="author">
                <img className="avatar author-img" src={musicAvatar1} />
                <p className="author-name">Johnson</p>
              </p>
              <p className="price">40.89 eTH</p>
            </div>
          </div>
          <button className="btn-script-music-buy  hero-btn">Buy</button>
        </div>{" "}
        <div className="card card-1">
          <video
            className="card-img"
            src={music1}
            autoPlay="autoplay"
            loop="loop"
            muted="muted"
            type="video/mp4"
          ></video>
          <div className="text-details">
            <div className="firstrow">
              <p className="name">Dao Vinci</p>
              <p className="currency">Current eth</p>
            </div>
            <div className="secondrow">
              <p className="author">
                <img className="avatar author-img" src={musicAvatar1} />
                <p className="author-name">Johnson</p>
              </p>
              <p className="price">40.89 eTH</p>
            </div>
          </div>
          <button className="btn-script-music-buy  hero-btn">Buy</button>
        </div>{" "}
        <div className="card card-1">
          <video
            className="card-img"
            src={music1}
            autoPlay="autoplay"
            loop="loop"
            muted="muted"
            type="video/mp4"
          ></video>
          <div className="text-details">
            <div className="firstrow">
              <p className="name">Dao Vinci</p>
              <p className="currency">Current eth</p>
            </div>
            <div className="secondrow">
              <p className="author">
                <img className="avatar author-img" src={musicAvatar1} />
                <p className="author-name">Johnson</p>
              </p>
              <p className="price">40.89 eTH</p>
            </div>
          </div>
          <button className="btn-script-music-buy  hero-btn">Buy</button>
        </div>
      </div>
    </>
  );
};

export default MusicPage;
