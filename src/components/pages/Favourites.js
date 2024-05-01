import React, { useContext, useEffect, useState, useRef } from "react";
import AuthContext from "../../context/AuthProvider";

import "../../Cascading-Style-Sheets/Profile.css";
import axios from "../../api/axios";

import jwt_decode from "jwt-decode";

const Favourites = ({ count }) => {
  const token = localStorage.getItem("user-details");
  const [image, setImage] = useState("");
  const [audio, setAudio] = useState("");
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [price, setPrice] = useState("");
  const [updateMusicId, setUpdateMusicId] = useState(0);
  const [updateScriptId, setUpdateScriptId] = useState(0);
  const [updateNftId, setUpdateNftId] = useState(0);
  const [userScriptData, setUserScriptData] = useState([]);
  const [userMusicData, setUserMusicData] = useState([]);
  const [userNftData, setUserNftData] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [favouritesScript, setFavouritesScript] = useState([]);
  const [favouritesNft, setFavouritesNft] = useState([]);

  const toggle = () => {
    clickRef.current.style.display = "none";
  };
  const getObj = {};
  if (token) {
    getObj["headers"] = {
      Authorization: token,
    };
  }
  const baseURL = "https://api.indiecrypt.online";
  const config = {
    headers: { Authorization: token },
  };

  const USER_UPLOAD_URL = "home/uploads/me";

  const clickRef = useRef(null);

  const handleRemoveMusic = (id) => {
    fetch(`https://api.indiecrypt.online/favorites/${id}?type=music`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
      .then((data) => data.json())
      .then((data) => {
        axios
          .get("/favorites/me", getObj)
          .then((res) =>
            setFavourites(res.data.filter((item) => item.type === "music"))
          )
          .catch((err) => console.log(err));
      })

      .catch((err) => console.log(err, "🔥🔥"));
  };

  const handleRemoveScript = (id) => {
    fetch(`https://api.indiecrypt.online/favorites/${id}?type=script`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
      .then((data) => data.json())
      .then((data) => {
        axios
          .get("/favorites/me", getObj)
          .then((res) =>
            setFavouritesScript(
              res.data.filter((item) => item.type === "script")
            )
          )
          .catch((err) => console.log(err));
      })

      .catch((err) => console.log(err, "🔥🔥"));
  };
  const handleRemoveNft = (id) => {
    fetch(`https://api.indiecrypt.online/favorites/${id}?type=nft`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
      .then((data) => data.json())
      .then((data) => {
        axios
          .get("/favorites/me", getObj)
          .then((res) =>
            setFavouritesNft(res.data.filter((item) => item.type === "nft"))
          )
          .catch((err) => console.log(err));
      })

      .catch((err) => console.log(err, "🔥🔥"));
  };

  useEffect(() => {
    axios
      .get(`https://api.indiecrypt.online/home/uploads/me`, config)
      .then((res) => {
        setUserScriptData(res.data.filter((item) => item.type === "script"));
        setUserMusicData(res.data.filter((item) => item.type === "music"));
        setUserNftData(res.data.filter((item) => item.type === "nft"));
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get(`https://api.indiecrypt.online/favorites/me`, config)
      .then((res) => {
        setFavourites(res.data.filter((item) => item.type === "music"));
        setFavouritesScript(res.data.filter((item) => item.type === "script"));
        setFavouritesNft(res.data.filter((item) => item.type === "nft"));
      })
      .catch((err) => console.log(err));
  }, []);

  const details = jwt_decode(localStorage.getItem("user-details"));
  const data = [...userScriptData, ...userNftData, ...userMusicData];

  return (
    <div>
      <div className="main-container">
        <h1 className="analytic">{`Welcome ${details.name}!`}</h1>
        <div className="analytics">
          {favourites.length === 0 &&
          favouritesScript.length === 0 &&
          favouritesNft.length === 0 ? (
            <h1>You Haven't added any favourites!!</h1>
          ) : (
            <h1>Your Favourites</h1>
          )}
        </div>

        <div className="cards namecards">
          {favourites.map((item, index) => (
            <div
              data-account={item.user.account}
              data-price={item.price}
              data-id={item.id}
              data-type={item.type}
              key={index}
              className="card card-1"
            >
              <img
                className="card-img"
                src={`${baseURL}/uploads/${item.image}`}
                alt={item.name}
              />
              <div className="text-details">
                <div className="firstrow">
                  <p className="name">{item.name}</p>
                  <p className="currency">Current eth</p>
                </div>
                <div className="secondrow">
                  <p className="author">
                    {/*  <img
                        className="avatar author-img"
                        alt={item.name}
                        src={`${baseURL}/uploads/${item.image}`}
                      /> */}
                    <p className="author-name">{item.name}</p>
                  </p>
                  <p className="price">{item.price}</p>
                </div>
              </div>
              <div>
                <button
                  className="btn-script-music-buy  hero-btn"
                  onClick={() => handleRemoveMusic(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          {favouritesScript.map((item, index) => (
            <div
              data-account={item.user.account}
              data-price={item.price}
              data-id={item.id}
              data-type={item.type}
              key={index}
              className="card card-1"
            >
              <img
                className="card-img"
                src={`${baseURL}/uploads/${item.image}`}
                alt={item.name}
              />
              <div className="text-details">
                <div className="firstrow">
                  <p className="name">{item.name}</p>
                  <p className="currency">Current eth</p>
                </div>
                <div className="secondrow">
                  <p className="author">
                    {/*   <img
                        className="avatar author-img"
                        alt={item.name}
                        src={`${baseURL}/uploads/${item.image}`}
                      /> */}
                    <p className="author-name">{item.name}</p>
                  </p>
                  <p className="price">{item.price}</p>
                </div>
              </div>
              <div>
                <button
                  className="btn-script-music-buy  hero-btn"
                  onClick={() => handleRemoveScript(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          {favouritesNft.map((item, index) => (
            <div
              data-account={item.user.account}
              data-price={item.price}
              data-id={item.id}
              data-type={item.type}
              key={index}
              className="card card-1"
            >
              <img
                className="card-img"
                src={`${baseURL}/uploads/${item.image}`}
                alt={item.name}
              />
              <div className="text-details">
                <div className="firstrow">
                  <p className="name">{item.name}</p>
                  <p className="currency">Current eth</p>
                </div>
                <div className="secondrow">
                  <p className="author">
                    {/*  <img
                        className="avatar author-img"
                        alt={item.name}
                        src={`${baseURL}/uploads/${item.image}`}
                      /> */}
                    <p className="author-name">{item.name}</p>
                  </p>
                  <p className="price">{item.price}</p>
                </div>
              </div>
              <div>
                <button
                  className="btn-script-music-buy  hero-btn"
                  onClick={() => handleRemoveNft(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Favourites;
