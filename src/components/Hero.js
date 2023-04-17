import React, { useEffect, useState, useRef, useContext } from "react";
import "../Cascading-Style-Sheets/Hero.css";

import "../Cascading-Style-Sheets/Movie.css";

import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

import { AiOutlineHeart } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";
import { paymentSucess } from "./payments/payment.service";
import { Link } from "react-router-dom";
import axios from "../api/axios";
import MusicItem from "./pages/page-items/MusicItem";
import ScriptItem from "./pages/page-items/ScriptItem";
import NftItem from "./pages/page-items/NftItem";
import payments from "./payments/payment.service";
import Footer from "./Footer";
import RotateLoader from "react-spinners/RotateLoader";
const Hero = ({
  musicData,
  setMusicData,
  showSucessMessage,
  setShowSucessMessage,
  showErrorMessage,
  setShowErrorMessage,
  message,
  setMessage,
}) => {
  console.log(<MusicItem />);
  const [alertMessage, setAlertMessage] = useState(" ");
  const [likes, setLikes] = useState([]);

  const [scriptData, setScriptData] = useState([]);
  const [nftData, setNftData] = useState([]);
  const [isMusicLike, setIsMusicLike] = useState(0);
  const GET_HOME_URL = "home?limit=3";

  const [showMessage, setShowMessage] = useState(false);
  const baseURL = "https://www.fundingportal.site";

  /* const GET_NFT_URL = "nft/all"; */
  useEffect(() => {
    let timeout;
    if (showSucessMessage) {
      timeout = setTimeout(() => {
        setShowSucessMessage(false);
      }, 3000); // 5000 milliseconds = 5 seconds
    }
    return () => clearTimeout(timeout);
  }, [showSucessMessage]);
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

  return (
    <>
      <main className={`${paymentSucess ? "rotate-white" : "rotate-black"}`}>
        <span className="rotate">
          {paymentSucess ? (
            <RotateLoader color={"#1a1aff"} loading={paymentSucess} size={15} />
          ) : null}
        </span>
        {window.ethereum ? null : (
          <a className="meta" href="https://metamask.io/download/">
            <span>Install MetaMask 🦉👀 </span>
          </a>
        )}
        {localStorage.getItem("user-details") ? (
          <>
            <section className="hero-section">
              <div className="left-text-section">
                <h1 className="main-heading-section">
                  Discover a New Era of Crypto Currency
                </h1>
                <p className="sub-text-section">
                  met nft the primier marketplace for NFT, which are digital
                  items you can truly own. Digital items have existed for a long
                  time, but never like this. eg: movies,musics,scripts etc..
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
                {musicData.length > 3 ? (
                  <Link to="/music">
                    <button className="btn-nav btn-script-music">
                      View More
                    </button>
                  </Link>
                ) : null}
              </div>

              <div className="cards">
                {musicData.map((item, index) => (
                  <div
                    data-account={item.user.account}
                    data-price={item.price}
                    data-id={item.id}
                    data-type={item.type}
                    key={index}
                    className="card-music card-1 payment"
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
                    {item.isPaid ? null : (
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
            </section>
            <section className="section section-script">
              <div className="heading-script-music">
                <h2 className="section-heading">SCRIPT</h2>
                {scriptData.length > 3 ? (
                  <Link to="script">
                    {" "}
                    <button className="btn-nav btn-script-music">
                      View More
                    </button>
                  </Link>
                ) : null}
              </div>
              <div className="cards">
                {scriptData.map((item) => (
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
            </section>
            <section className="section section-movie">
              <div className="heading-script-music">
                <h2 className="section-heading">GRAPHIC DESIGNS</h2>
                {nftData.length > 3 ? (
                  <Link to="nfts">
                    {" "}
                    <button className="btn-nav btn-script-music">
                      View More
                    </button>
                  </Link>
                ) : null}
              </div>

              <div className="cards">
                {nftData.map((item, index) => (
                  <div
                    data-account={item.user.account}
                    data-price={item.price}
                    data-id={item.id}
                    data-type={item.type}
                    key={index}
                    className="card-nft-token payment"
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
                    {item.isPaid ? null : (
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

                        <button
                          onClick={payments.manageTransactionFlow}
                          className="btn-movie  hero-btn btn-pay"
                        >
                          Buy
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          </>
        ) : (
          <>
            <section className="hero-section">
              <div className="left-text-section">
                <h1 className="main-heading-section">
                  Discover a New Era of Crypto Currency
                </h1>
                <p className="sub-text-section">
                  met nft the primier marketplace for NFT, which are digital
                  items you can truly own. Digital items have existed for a long
                  time, but never like this. eg: movies,musics,scripts etc..
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
                {musicData.length > 3 ? (
                  <Link to="/music">
                    <button className="btn-nav btn-script-music">
                      View More
                    </button>
                  </Link>
                ) : null}
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
                  </div>
                ))}
              </div>
            </section>
            <section className="section section-script">
              <div className="heading-script-music">
                <h2 className="section-heading">SCRIPT</h2>
                {scriptData.length > 3 ? (
                  <Link to="script">
                    {" "}
                    <button className="btn-nav btn-script-music">
                      View More
                    </button>
                  </Link>
                ) : null}
              </div>
              <div className="cards">
                {scriptData.map((item) => (
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
            </section>
            <section className="section section-movie">
              <div className="heading-script-music">
                <h2 className="section-heading">GRAPHIC DESIGNS</h2>
                {nftData.length > 3 ? (
                  <Link to="nfts">
                    {" "}
                    <button className="btn-nav btn-script-music">
                      View More
                    </button>
                  </Link>
                ) : null}
              </div>

              <div className="cards">
                {nftData.map((item, index) => (
                  <div
                    data-account={item.user.account}
                    data-price={item.price}
                    data-id={item.id}
                    data-type={item.type}
                    key={index}
                    className="card-nft"
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
                  </div>
                ))}
              </div>
            </section>
          </>
        )}
      </main>
    </>
  );
};

export default Hero;
