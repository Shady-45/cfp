import React, { useEffect, useState, useRef, useContext } from "react";
import "../Cascading-Style-Sheets/Hero.css";

import "../Cascading-Style-Sheets/Movie.css";

import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

import { AiOutlineHeart } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";
import { paymentSucess } from "./payments/payment.service";
import { BsExclamationTriangleFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import Metamask from "../assets/metamask.png";
import axios from "../api/axios";
import MusicItem from "./pages/page-items/MusicItem";
import ScriptItem from "./pages/page-items/ScriptItem";
import NftItem from "./pages/page-items/NftItem";
import payments from "./payments/payment.service";
import Footer from "./Footer";
import { AiFillCloseCircle } from "react-icons/ai";
import { loadingFun } from "../loading";

import RotateLoader from "react-spinners/RotateLoader";
import SuccessfulAuth from "../successModals/SuccessfulAuth";
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
  const navigate = useNavigate();
  const [openTask, setOpenTask] = useState(true);
  const [scriptData, setScriptData] = useState([]);
  const [nftData, setNftData] = useState([]);

  const GET_HOME_URL = "home?limit=3";
  const redirect = (item) => {
    navigate(`/${item.type + "s"}/${item.id}`);
  };

  const baseURL = "https://api.indiecrypt.online";
  useEffect(() => {
    if (window.ethereum) setOpenTask(false);
  }, []);
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
    fetch(`${baseURL}/favorites/${item.id}?type=${item.type}`, {
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
          .then((res) => {
            if (item.type === "music") {
              setMusicData(res.data.music);
            } else if (item.type === "script") {
              setScriptData(res.data.script);
            } else {
              setNftData(res.data.nft);
            }
          })
          .catch((err) => console.log(err));
      })

      .catch((err) => console.log(err, "🔥🔥"));
  };

  const handleDisLike = (item) => {
    fetch(
      `https://api.indiecrypt.online/favorites/${item.id}?type=${item.type}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }
    )
      .then((data) => data.json())
      .then((data) => {
        axios
          .get(`${baseURL}/${GET_HOME_URL}`, getObj)
          .then((res) => {
            if (item.type === "music") {
              setMusicData(res.data.music);
            } else if (item.type === "script") {
              setScriptData(res.data.script);
            } else {
              setNftData(res.data.nft);
            }
          })
          .catch((err) => console.log(err));
      })

      .catch((err) => console.log(err, "🔥🔥"));
  };

  return (
    <>
      <main
        className={`${loadingFun.loading ? "rotate-white" : "rotate-black"}`}
      >
        <span className="rotate">
          {paymentSucess ? (
            <RotateLoader
              color={"#1a1aff"}
              loading={loadingFun.loading}
              size={15}
            />
          ) : null}
        </span>

        {localStorage.getItem("user-details") ? (
          <>
            <main>
              <section className="hero-section">
                <div className="left-text-section">
                  <h1 className="main-heading-section">
                    Discover a New Era of Crypto Currency
                  </h1>
                  <p className="sub-text-section">
                    met nft the primier marketplace for NFT, which are digital
                    items you can truly own. Digital items have existed for a
                    long time, but never like this. eg: movies,musics,scripts
                    etc..
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
                  {musicData.length >= 3 ? (
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
              </section>
              <section className="section section-script">
                <div className="heading-script-music">
                  <h2 className="section-heading">SCRIPT</h2>
                  {scriptData.length >= 3 ? (
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
                      className="card-script-token card payment"
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

                      <div className="btnss">
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
                    </div>
                  ))}
                </div>
              </section>
              <section className="section section-movie">
                <div className="heading-script-music">
                  <h2 className="section-heading">GRAPHIC DESIGNS</h2>
                  {nftData.length >= 3 ? (
                    <Link to="/nfts">
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
                      className="card-nft-token card payment"
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

                      <div className="btnss">
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
                    </div>
                  ))}
                </div>
              </section>
            </main>
          </>
        ) : (
          <>
            {window.ethereum ? null : (
              <div>
                {openTask ? (
                  <div
                    className="meta-mask-container
          "
                  >
                    <div className="meta-mask">
                      <AiFillCloseCircle
                        className="toggle-metaclose"
                        onClick={() => setOpenTask()}
                      />
                      <img className="metamask-png" src={Metamask} alt="" />
                      <div className="meta-text">
                        <h2 className="container-heading">
                          Meta Mask is required
                        </h2>
                        <p className="container-text">
                          Install Metamask to buy and download assets
                        </p>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            )}
            <main className={`${openTask ? "opac" : "non-opac"}`}>
              <section className="hero-section">
                <div className="left-text-section">
                  <h1 className="main-heading-section">
                    Discover a New Era of Crypto Currency
                  </h1>
                  <p className="sub-text-section">
                    met nft the primier marketplace for NFT, which are digital
                    items you can truly own. Digital items have existed for a
                    long time, but never like this. eg: movies,musics,scripts
                    etc..
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
                      className="card-script card card-1 payment"
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
                      className="card-nft card card-1 payment"
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
            </main>
          </>
        )}
      </main>
    </>
  );
};

export default Hero;
