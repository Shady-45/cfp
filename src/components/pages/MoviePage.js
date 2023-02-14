import React from "react";
import movie1 from "../../assets/movie1.mp4";
import movieAvatar1 from "../../assets/movie1.png";
const MoviePage = () => {
  return (
    <div>
      {" "}
      <h1 className="title-card">Hot nfts</h1>
      <div className="cards">
        <div className="card card-1">
          <video
            className="card-img"
            src={movie1}
            autoplay="autoplay"
            muted="muted"
            loop="loop"
            playsinline=""
            type="video/mp4"
          ></video>
          <div className="text-details">
            <div className="firstrow">
              <p className="name">Dao Vinci</p>
              <p className="currency">Current eth</p>
            </div>
            <div className="secondrow">
              <p className="author">
                <img className="avatar author-img" src={movieAvatar1} />
                <p className="author-name">austin</p>
              </p>
              <p className="price">40.89 eTH</p>
            </div>
          </div>
          <button className="btn-movie  hero-btn">Contribute</button>
        </div>{" "}
        <div className="card card-1">
          <video
            className="card-img"
            src={movie1}
            autoplay="autoplay"
            muted="muted"
            loop="loop"
            playsinline=""
            type="video/mp4"
          ></video>
          <div className="text-details">
            <div className="firstrow">
              <p className="name">Dao Vinci</p>
              <p className="currency">Current eth</p>
            </div>
            <div className="secondrow">
              <p className="author">
                <img className="avatar author-img" src={movieAvatar1} />
                <p className="author-name">austin</p>
              </p>
              <p className="price">40.89 eTH</p>
            </div>
          </div>
          <button className="btn-movie  hero-btn">Contribute</button>
        </div>
      </div>
    </div>
  );
};

export default MoviePage;
