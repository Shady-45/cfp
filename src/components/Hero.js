import React, { useEffect, useState, useRef, useContext } from "react";
import "../Cascading-Style-Sheets/Hero.css";

import script1 from "../assets/script-base.jpg";
import baseURL from "../api/axios";

import "../Cascading-Style-Sheets/Movie.css";
import movie1 from "../assets/movie1.mp4";
import movieAvatar1 from "../assets/movie1.png";

import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import AuthContext from "../../src/context/AuthProvider";
import { AiOutlineHeart } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";

import { Link } from "react-router-dom";
import axios from "axios";

const Hero = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const [alertMessage, setAlertMessage] = useState(" ");
  const [likes, setLikes] = useState([]);
  const [getMusic, setgetMusic] = useState([]);
  const [getScript, setgetScript] = useState([]);
  const [getNft, setgetNft] = useState([]);
  const [isMusicLike, setIsMusicLike] = useState(0);
  const GET_MUSIC_URL = "music/all";
  const GET_NFT_URL = "nft/all";
  const GET_SCRIPT_URL = "script/all";
  const [showMessage, setShowMessage] = useState(false);

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
      .get(`${baseURL}/music/all`, getObj)
      .then((res) => setgetMusic(res.data))
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    axios
      .get(`${baseURL}/script/all`, getObj)
      .then((res) => setgetScript(res.data));
  }, []);
  useEffect(() => {
    axios.get(`${baseURL}/nft/all`, getObj).then((res) => setgetNft(res.data));
  }, []);
  const musicData = getMusic.slice(0, 3);

  const scriptData = getScript.slice(0, 3);
  const nftData = getNft.slice(0, 3);

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
          .get(`${baseURL}/music/all`, getObj)
          .then((res) => setgetMusic(res.data))
          .catch((err) => console.log(err));
      })

      .catch((err) => console.log(err, "🔥🔥"));
  };
  const handleDisLike = (item) => {
    fetch(`http://144.126.252.25:8080/favorites/${item.id}?type=music`, {
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
          .then((res) => setgetMusic(res.data))
          .catch((err) => console.log(err));
      })

      .catch((err) => console.log(err, "🔥🔥"));
  };
  const handleDisLike = (item) => {
    fetch(`http://144.126.252.25:8080/favorites/${item.id}?type=music`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
      .then((data) => data.json())
      .then((data) => {
        axios
          .get("http://144.126.252.25:8080/music/all", getObj)
          .then((res) => setgetMusic(res.data))
          .catch((err) => console.log(err));
      })

      .catch((err) => console.log(err, "🔥🔥"));
  };

  const handleScriptLike = (id) => {
    fetch(`${baseURL}/favorites/${id}?type=script`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
      .then((data) => data.json())
      .then((data) => {
        axios
          .get(`${baseURL}/script/all`, getObj)
          .then((res) => setgetScript(res.data))
          .catch((err) => console.log(err));
      })

      .catch((err) => console.log(err, "🔥🔥"));
  };

  const handleNftLike = (id) => {
    fetch(`${baseURL}/favorites/${id}?type=nft`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
      .then((data) => data.json())
      .then((data) => {
        axios
          .get(`${baseURL}/nft/all`, getObj)
          .then((res) => setgetNft(res.data))
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
      {auth.role === "user" ? (
        <main>
          <section className="section section-hero">
            <div className="left-text">
              <h1 className="main-heading">
                Discover a New Era of Crypto Currency
              </h1>
              <p className="sub-text">
                met nft the primier marketplace for NFT, which are digital items
                you can truly own. Digital items have existed for a long time,
                but never like this. eg: movies,musics,scripts etc..
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
                        <p className="author-name">{item.user.name}</p>
                      </p>
                      <p className="price">{item.price}</p>
                    </div>
                  </div>

                  <div className="hearts-contain">
                    <button onClick={() => handleLike(item)}>
                      {item.isLiked ? (
                        <AiFillHeart
                          onClick={() => handleDisLike(item)}
                          className="heart-btns-red"
                        />
                      ) : (
                        <AiOutlineHeart className="heart-btns" />
                      )}
                    </button>
                    <button className="btn-script-music-buy  hero-btn">
                      Buy
                    </button>
                  </div>
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
                    src={`${baseURL}/uploads/${item.image}`}
                    alt=""
                  />
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
                  <div className="btns-script">
                    {/*   <AiOutlineHeart
                  className={`${like ? "heart-red" : "heart-white"}`}
                  onClick={() => setLike(!like)}
                />

 */}
                    <button className="btn-script-music-buy  hero-btn">
                      Buy
                    </button>
                    <a href={`${baseURL}/uploads/${item.text}`}>
                      {" "}
                      <button className="btn-script-music-buy  hero-btn">
                        View
                      </button>
                    </a>
                  </div>
                  <div className="hearts-contain">
                    <button onClick={() => handleScriptLike(item.id)}>
                      {item.isLiked ? (
                        <AiFillHeart className="heart-btns-red" />
                      ) : (
                        <AiOutlineHeart className="heart-btns" />
                      )}
                    </button>
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
                    src={`${baseURL}/uploads/${item.image}`}
                  ></img>
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
                      <button onClick={() => handleNftLike(item.id)}>
                        {item.isLiked ? (
                          <AiFillHeart className="heart-btns-red" />
                        ) : (
                          <AiOutlineHeart className="heart-btns" />
                        )}
                      </button>
                    </div>
                    <button className="btn-movie  hero-btn">Buy</button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      ) : (
        <main>
          <section className="section section-hero">
            <div className="left-text">
              <h1 className="main-heading">
                Discover a New Era of Crypto Currency
              </h1>
              <p className="sub-text">
                met nft the primier marketplace for NFT, which are digital items
                you can truly own. Digital items have existed for a long time,
                but never like this. eg: movies,musics,scripts etc..
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
                    src={`${baseURL}/uploads/${item.image}`}
                    alt=""
                  />

                  <AudioPlayer
                    className="audio"
                    src={`${baseURL}/uploads/${item.audio}`}
                    volume={0.5}
                  />
                  <div className="text-details">
                    {}
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

                  <button className="btn-script-music-buy  hero-btn">
                    Buy
                  </button>
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
                    src={`${baseURL}/uploads/${item.image}`}
                    alt=""
                  />
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
                  <div className="btns-script">
                    {/*   <AiOutlineHeart
                       className={`${like ? "heart-red" : "heart-white"}`}
                       onClick={() => setLike(!like)}
                     />
     
      */}
                    <button className="btn-script-music-buy  hero-btn">
                      Buy
                    </button>
                    <a href={`${baseURL}/uploads/${item.text}`}>
                      {" "}
                      <button className="btn-script-music-buy  hero-btn">
                        View
                      </button>
                    </a>
                  </div>
                  <button onClick={() => handleLike(item.id)}>
                    {item.isLiked ? (
                      <AiFillHeart className="heart-btns-red" />
                    ) : (
                      <AiOutlineHeart className="heart-btns" />
                    )}
                  </button>
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
                    src={`${baseURL}/uploads/${item.image}`}
                  ></img>
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
                      <button onClick={() => handleLike(item.id)}>
                        {item.isLiked ? (
                          <AiFillHeart className="heart-btns-red" />
                        ) : (
                          <AiOutlineHeart className="heart-btns" />
                        )}
                      </button>
                    </div>
                    <button className="btn-movie  hero-btn">Buy</button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      )}
    </>
  );
};

export default Hero;
