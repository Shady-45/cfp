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
  const baseURL = "https://www.fundingportal.site";
  const config = {
    headers: { Authorization: token },
  };

  const [updateM, setUpdateM] = useState(false);
  const [updateS, setUpdateS] = useState(false);
  const [updateN, setUpdateN] = useState(false);

  console.log(updateScriptId);
  const USER_UPLOAD_URL = "home/uploads/me";

  const clickRef = useRef(null);

  const deleteScript = (id) => {
    axios
      .delete(`${baseURL}/script/delete/${id}`, config)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err.data));
  };
  const deleteMusic = (id) => {
    axios
      .delete(`${baseURL}/music/delete/${id}`, config)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err.data));
  };
  console.log(updateMusicId);
  const handleRemoveMusic = (id) => {
    fetch(`https://www.fundingportal.site/favorites/${id}?type=music`, {
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
          .then((res) => setFavourites(res.data.music))
          .catch((err) => console.log(err));
      })

      .catch((err) => console.log(err, "🔥🔥"));
  };

  const handleRemoveScript = (id) => {
    fetch(`https://www.fundingportal.site/favorites/${id}?type=script`, {
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
          .then((res) => setFavouritesScript(res.data.script))
          .catch((err) => console.log(err));
      })

      .catch((err) => console.log(err, "🔥🔥"));
  };
  const handleRemoveNft = (id) => {
    fetch(`https://www.fundingportal.site/favorites/${id}?type=nft`, {
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
          .then((res) => setFavouritesNft(res.data.nft))
          .catch((err) => console.log(err));
      })

      .catch((err) => console.log(err, "🔥🔥"));
  };
  const UpdateMusic = (e) => {
    e.preventDefault();
    let MUSIC_UPDATE_URL = `${baseURL}/music/update/${updateMusicId}`;
    const UpdateFormData = new FormData();
    image && UpdateFormData.append("image", image);
    audio && UpdateFormData.append("audio", audio);
    name && UpdateFormData.append("name", name);
    price && UpdateFormData.append("price", price);

    axios
      .put(MUSIC_UPDATE_URL, UpdateFormData, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
    setAudio(" ");
    setImage(" ");
    setName(" ");
    setPrice(" ");
  };
  const UpdateScript = (e) => {
    e.preventDefault();
    let SCRIPT_UPDATE_URL = `${baseURL}/music/update/${updateNftId}`;
    const UpdateFormData = new FormData();
    image && UpdateFormData.append("image", image);

    name && UpdateFormData.append("name", name);
    price && UpdateFormData.append("price", price);
    axios
      .put(SCRIPT_UPDATE_URL, UpdateFormData, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));

    setImage(" ");
    setName(" ");
    setPrice(" ");
  };
  const UpdateNft = (e) => {
    e.preventDefault();
    let SCRIPT_UPDATE_URL = `${baseURL}/music/update/${updateScriptId}`;
    const UpdateFormData = new FormData();
    image && UpdateFormData.append("image", image);

    name && UpdateFormData.append("name", name);
    price && UpdateFormData.append("price", price);
    axios
      .put(SCRIPT_UPDATE_URL, UpdateFormData, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
    setAudio(" ");
    setImage(" ");
    setName(" ");
    setPrice(" ");
  };

  const deleteNft = (id) => {
    axios
      .delete(`/nft/delete/${id}`, config)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err.data));
  };
  useEffect(() => {
    axios
      .get(`https://www.fundingportal.site/home/uploads/me`, config)
      .then((res) => {
        console.log(res.data);
        setUserScriptData(res.data.script);
        setUserMusicData(res.data.music);
        setUserNftData(res.data.nft);
      })
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    axios
      .get(`https://www.fundingportal.site/favorites/me`, config)
      .then((res) => {
        console.log(res.data);
        setFavourites(res.data.music);
        setFavouritesScript(res.data.script);
        setFavouritesNft(res.data.nft);
      })
      .catch((err) => console.log(err));
  }, []);
  const userData = [...userScriptData, ...userMusicData, ...userNftData];
  console.log(userData);

  const details = jwt_decode(localStorage.getItem("user-details"));

  return (
    <div>
      <div className="main-container">
        <h1 className="analytic">{`Welcome ${details.name}!`}</h1>
        <div className="analytics">
          <h1 className="analytic">
            You Haven't Added any Favourites, Add to see Here
          </h1>
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
