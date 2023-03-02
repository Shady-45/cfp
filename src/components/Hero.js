import React, { useEffect, useState, useRef } from "react";
import "../Cascading-Style-Sheets/Hero.css";
/* import MusicNote from "../assets/music-icon.png"; */
import script1 from "../assets/script-base.jpg";
/* import script2 from "../assets/script2.jpg";
import script3 from "../assets/script3.jpg"; */
import "../Cascading-Style-Sheets/Movie.css";
import movie1 from "../assets/movie1.mp4";
import movieAvatar1 from "../assets/movie1.png";
/* import movie2 from "../assets/movie2.mp4";
import movieAvatar2 from "../assets/movie2.jpg";
import movie3 from "../assets/movie3.mp4";
import movieAvatar3 from "../assets/movie3.jpg"; */
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

import { BsHeartFill } from "react-icons/bs";
import { FaPause, FaPlay } from "react-icons/fa";

import { Link } from "react-router-dom";
import axios from "../api/axios";

const Hero = () => {
  const [like, setLike] = useState(false);
  const [getMusic, setgetMusic] = useState([]);
  const [getScript, setgetScript] = useState([]);
  const [getNft, setgetNft] = useState([]);

  const GET_MUSIC_URL = "music/all";
  const GET_NFT_URL = "nft/all";
  const GET_SCRIPT_URL = "script/all";

  /* const GET_NFT_URL = "nft/all"; */

  useEffect(() => {
    axios.get(GET_MUSIC_URL).then((res) => setgetMusic(res.data));
  }, []);
  useEffect(() => {
    axios.get(GET_SCRIPT_URL).then((res) => setgetScript(res.data));
  }, []);
  useEffect(() => {
    axios.get(GET_NFT_URL).then((res) => setgetNft(res.data));
  }, []);
  const musicData = getMusic.slice(0, 3);
  const scriptData = getScript.slice(0, 3);
  const nftData = getNft.slice(0, 3);
  /*   const selectAudio = (index) => {
    setAudioFileIndex(getMusic[index]);
  };
  const handlePause = () => {
    setIsPlaying(false);
  }; */
  const deleteNft = () => {
    /* useEffect(() => {
      axios.post(DELETE_NFT);
    }); */
  };

  return (
    <>
      <section className="section section-hero">
        <div className="left-text">
          <h1 className="main-heading">
            Discover a New Era of Crypto Currency
          </h1>
          <p className="sub-text">
            met nft the primier marketplace for NFT, which are digital items you
            can truly own. Digital items have existed for a long time, but never
            like this. eg: movies,musics,scripts etc..
          </p>
          <a href="#music">
            {" "}
            <button className="hero-btn">Get Started</button>
          </a>
        </div>
        <div className="right-img"></div>
      </section>

      <section id="music" className="section section-music">
        <div className="heading-script-music">
          <h2 className="section-heading">MUSIC</h2>
          <Link to="/music">
            <button className="btn-nav btn-script-music">View More</button>
          </Link>
        </div>

        <div className="cards">
          {musicData.map((item, index) => (
            <div key={index} className="card card-1">
              <img
                className="card-img"
                src={`https://fundingportal.fly.dev/uploads/${item.image}`}
                alt=""
              />

              <AudioPlayer
                className="audio"
                src={`https://fundingportal.fly.dev/uploads/${item.audio}`}
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
      </section>
      <section className="section section-script">
        <div className="heading-script-music">
          <h2 className="section-heading">SCRIPT</h2>
          <Link to="script">
            {" "}
            <button className="btn-nav btn-script-music">View More</button>
          </Link>
        </div>
        <div className="cards">
          {scriptData.map((item, index) => (
            <div key={index} className="card card-1">
              <img
                className="card-img"
                src={`https://fundingportal.fly.dev/uploads/${item.image}`}
                alt=""
              />
              <div className="text-details">
                <div className="firstrow">
                  <p className="name">{item.name}</p>
                  <p className="currency">Current eth</p>
                </div>
                <div className="secondrow">
                  <p className="author">
                    <img className="avatar author-img" src={script1} />
                    <p className="author-name">{item.user.name}</p>
                  </p>
                  <p className="price">{item.price}</p>
                </div>
              </div>
              <div className="btns-script">
                {/*   <BsHeartFill
                  className={`${like ? "heart-red" : "heart-white"}`}
                  onClick={() => setLike(!like)}
                />

 */}
                <button className="btn-script-music-buy  hero-btn">Buy</button>
                <a href={`https://fundingportal.fly.dev/uploads/${item.text}`}>
                  {" "}
                  <button className="btn-script-music-buy  hero-btn">
                    View
                  </button>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="section section-movie">
        <div className="heading-script-music">
          <h2 className="section-heading">HOT NFTS</h2>
          <Link to="nfts">
            {" "}
            <button className="btn-nav btn-script-music">View More</button>
          </Link>
        </div>

        <div className="cards">
          {nftData.map((item, index) => (
            <div key={index} className="card card-1">
              <img
                className="card-img"
                src={`https://fundingportal.fly.dev/uploads/${item.image}`}
              ></img>
              <img src="" alt="" />
              <div className="text-details">
                <div className="firstrow">
                  <p className="name">{item.name}</p>
                  <p className="currency">Current eth</p>
                </div>
                <div className="secondrow">
                  <p className="author">
                    <img className="avatar author-img" src={movieAvatar1} />
                    <p className="author-name">{item.user.name}</p>
                  </p>
                  <p className="price">{item.price}</p>
                </div>
              </div>
              <div className="btnss">
                <button className="btn-movie  hero-btn">Contribute</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Hero;
