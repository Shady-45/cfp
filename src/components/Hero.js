import React, { useEffect, useState, useRef, useContext } from "react";
import "../Cascading-Style-Sheets/Hero.css";

import script1 from "../assets/script-base.jpg";

import "../Cascading-Style-Sheets/Movie.css";
import movie1 from "../assets/movie1.mp4";
import movieAvatar1 from "../assets/movie1.png";

import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

import { AiOutlineHeart } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";

import { Link } from "react-router-dom";
import axios from "../api/axios";
import MusicItem from "./pages/page-items/MusicItem";
import ScriptItem from "./pages/page-items/ScriptItem";
import NftItem from "./pages/page-items/NftItem";
import payments from "./payments/payment.service";

const Hero = () => {
  console.log(<MusicItem />);
  const [alertMessage, setAlertMessage] = useState(" ");
  const [likes, setLikes] = useState([]);
  const [musicData, setMusicData] = useState([]);
  const [scriptData, setScriptData] = useState([]);
  const [nftData, setNftData] = useState([]);
  const [isMusicLike, setIsMusicLike] = useState(0);
  const GET_HOME_URL = "home?limit=3";

  const [showMessage, setShowMessage] = useState(false);
  const baseURL = "https://www.fundingportal.site";

  /* const GET_NFT_URL = "nft/all"; */
  const token = localStorage.getItem("user-details");
  const getObj = {};
  if (token) {
    getObj["headers"] = {
      Authorization: token,
    };
  }
  useEffect(() => {
    axios
      .get(GET_HOME_URL, getObj)
      .then((res) => {
        setMusicData(res.data.music);
        setScriptData(res.data.script);
        setNftData(res.data.nft);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleLike = (item) => {
    const liked = item.count + 1;
    console.log(liked);
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
          .get(`${baseURL}/${GET_HOME_URL}`, getObj)
          .then((res) => setMusicData(res.data.music))
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
          .get(`${baseURL}/${GET_HOME_URL}`, getObj)
          .then((res) => setScriptData(res.data.script))
          .catch((err) => console.log(err));
      })

      .catch((err) => console.log(err, "🔥🔥"));
  };
  const handleLikeNft = (item) => {
    const liked = item.count + 1;
    console.log(liked);
    fetch(`${baseURL}/favorites/${item.id}?type=nft`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
      .then((data) => data.json())
      .then((data) => {
        axios
          .get(`${baseURL}/${GET_HOME_URL}`, getObj)
          .then((res) => setNftData(res.data.nft))
          .catch((err) => console.log(err));
      })

      .catch((err) => console.log(err, "🔥🔥"));
  };
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
          .get(`${baseURL}/${GET_HOME_URL}`, getObj)
          .then((res) => setMusicData(res.data.music))
          .catch((err) => console.log(err));
      })

      .catch((err) => console.log(err, "🔥🔥"));
  };
  const handleDisLikeScript = (item) => {
    fetch(`https://www.fundingportal.site/favorites/${item.id}?type=script`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
      .then((data) => data.json())
      .then((data) => {
        axios
          .get(`${baseURL}/${GET_HOME_URL}`, getObj)
          .then((res) => setScriptData(res.data.script))
          .catch((err) => console.log(err));
      })

      .catch((err) => console.log(err, "🔥🔥"));
  };
  const handleDisLikeNft = (item) => {
    fetch(`https://www.fundingportal.site/favorites/${item.id}?type=nft`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
      .then((data) => data.json())
      .then((data) => {
        axios
          .get(`${baseURL}/${GET_HOME_URL}`, getObj)
          .then((res) => setNftData(res.data.nft))
          .catch((err) => console.log(err));
      })

      .catch((err) => console.log(err, "🔥🔥"));
  };

  const handleScriptLike = (id) => {
    fetch(`https://www.fundingportal.site/favorites/${id}?type=script`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
      .then((data) => data.json())
      .then((data) => {
        axios
          .get(`${baseURL}/${GET_HOME_URL}`, getObj)
          .then((res) => setScriptData(res.data.script))
          .catch((err) => console.log(err));
      })

      .catch((err) => console.log(err, "🔥🔥"));
  };

  const handleNftLike = (id) => {
    fetch(`https://www.fundingportal.site/favorites/${id}?type=nft`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
      .then((data) => data.json())
      .then((data) => {
        axios
          .get(`${baseURL}/${GET_HOME_URL}`, getObj)
          .then((res) => setNftData(res.data.nft))
          .catch((err) => console.log(err));
      })

      .catch((err) => console.log(err, "🔥🔥"));
  };

  const handleMusicChange = () => {
    /*      */
  };
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
  /* likes and dislikes */
  /* const handleLike = (id) => {
    setLike(!like);
    /* axios
      .post(`${baseURL}/${id}?type=music`)
      .then((res) => console.log(res.data))
      .catch((error) => console.log(error)); 
    console.log(id);
  }; */

  return (
    <>
      <main>
        {window.ethereum ? null : (
          <a className="meta" href="https://metamask.io/download/">
            <span>Install MetaMask 🦉👀 </span>
          </a>
        )}
        <section className="section section-hero">
          <div className="left-text">
            <h1 className="main-heading">
              Discover a New Era of Crypto Currency
            </h1>
            <p className="sub-text">
              met nft the primier marketplace for NFT, which are digital items
              you can truly own. Digital items have existed for a long time, but
              never like this. eg: movies,musics,scripts etc..
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
              <div
                data-account={item.user.account}
                data-price={item.price}
                data-id={item.id}
                data-type={item.type}
                key={index}
                className="card card-1 payment"
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
                <div>
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
                {localStorage.getItem("user-details") ? (
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
                    {item.isPaid ? null : (
                      <button
                        onClick={payments.manageTransactionFlow}
                        className="btn-script-music-buy  hero-btn btn-pay"
                      >
                        Buy
                      </button>
                    )}
                  </div>
                ) : null}
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
            {scriptData.map((item) => (
              <div
                data-account={item.user.account}
                data-price={item.price}
                data-id={item.id}
                data-type={item.type}
                className="card-script payment"
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
                {localStorage.getItem("user-details") ? (
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
                    {item.isPaid ? null : (
                      <button
                        onClick={payments.manageTransactionFlow}
                        className="btn-script-music-buy  hero-btn btn-pay"
                      >
                        Buy
                      </button>
                    )}
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </section>
        <section className="section section-movie">
          <div className="heading-script-music">
            <h2 className="section-heading">Graphic Designs</h2>
            <Link to="nfts">
              {" "}
              <button className="btn-nav btn-script-music">View More</button>
            </Link>
          </div>

          <div className="cards">
            {nftData.map((item, index) => (
              <div
                data-account={item.user.account}
                data-price={item.price}
                data-id={item.id}
                data-type={item.type}
                key={index}
                className="card-nft payment"
              >
                <Link
                  to={`/nfts/${item.id}`}
                  element={<NftItem />}
                  key={item.id}
                >
                  <img
                    className="card-img"
                    src={`${baseURL}/uploads/${item.image}`}
                  ></img>
                </Link>

                <img src="" alt="" />
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
                {localStorage.getItem("user-details") ? (
                  <div className="btnss">
                    <div className="hearts-contain">
                      <button>
                        {item.isLiked ? (
                          <AiFillHeart
                            onClick={() => handleDisLikeNft(item)}
                            className="heart-btns-red"
                          />
                        ) : (
                          <AiOutlineHeart
                            onClick={() => handleLikeNft(item)}
                            className="heart-btns"
                          />
                        )}
                      </button>
                    </div>
                    {item.isPaid ? null : (
                      <button
                        onClick={payments.manageTransactionFlow}
                        className="btn-movie  hero-btn btn-pay"
                      >
                        Buy
                      </button>
                    )}
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
};

export default Hero;
