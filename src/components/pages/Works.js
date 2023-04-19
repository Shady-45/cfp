import React, { useState, useEffect, useRef, useContext } from "react";
import { Link } from "react-router-dom";
import baseURL from "../../api/axios";
import axios from "../../api/axios";
import "../../Cascading-Style-Sheets/Profile.css";
import { AiOutlineCloseCircle } from "react-icons/ai";
import jwt_decode from "jwt-decode";
import AuthContext from "../../context/AuthProvider";

const Works = () => {
  const { auth } = useContext(AuthContext);
  const token = localStorage.getItem("user-details");
  const details = jwt_decode(token);
  const [image, setImage] = useState("");
  const [audio, setAudio] = useState("");
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [price, setPrice] = useState("");
  const [updateMusicId, setUpdateMusicId] = useState(0);
  const [updateScriptId, setUpdateScriptId] = useState(0);
  const [updateNftId, setUpdateNftId] = useState(0);
  const [updateM, setUpdateM] = useState(false);
  const [updateS, setUpdateS] = useState(false);
  const [updateN, setUpdateN] = useState(false);
  const [userScriptData, setUserScriptData] = useState([]);
  const [userMusicData, setUserMusicData] = useState([]);
  const [userNftData, setUserNftData] = useState([]);
  const baseURL = "https://www.fundingportal.site";
  const config = {
    headers: { Authorization: token },
  };
  const handleUpdateMusicData = (item) => {
    console.log(item);
    setUpdateMusicId(item.id);
    setUpdateM(!updateM);
  };
  const handleUpdateScript = (item) => {
    setUpdateScriptId(item.id);
    setUpdateS(!updateS);
  };
  const getObj = {};
  if (token) {
    getObj["headers"] = {
      Authorization: token,
    };
  }
  const handleUpdateNft = (item) => {
    setUpdateNftId(item.id);
    setUpdateS(!updateS);
  };
  const handleDeleteMusic = (id) => {
    deleteMusic(id);
  };

  const handleDeleteNft = (id) => {
    deleteNft(id);
  };
  const handleDeleteScript = (id) => {
    deleteScript(id);
  };
  const deleteScript = (id) => {
    axios
      .delete(`${baseURL}/script/delete/${id}`, config)
      .then((res) =>
        console.log(res.data.filter((item) => item.type === "script"))
      )
      .catch((err) => console.log(err.data));
  };
  const deleteMusic = (id) => {
    axios
      .delete(`${baseURL}/music/delete/${id}`, config)
      .then((res) =>
        console.log(res.data.filter((item) => item.type === "music"))
      )
      .catch((err) => console.log(err.data));
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
  const toggle = () => {
    clickRef.current.style.display = "none";
  };

  const clickRef = useRef(null);
  const deleteNft = (id) => {
    fetch(`https://www.fundingportal.site/nft/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
      .then((data) => data.json())
      .then((data) => {
        axios
          .get("www.fundingportal.site/nft/all", getObj)
          .then((res) => console.log(res))
          .catch((err) => console.log(err));
      })

      .catch((err) => console.log(err, "🔥🔥"));
  };
  useEffect(() => {
    axios
      .get(`${baseURL}/home/uploads/me`, config)
      .then((res) => {
        console.log(res.data);
        setUserScriptData(res.data.filter((item) => item.type === "script"));
        setUserMusicData(res.data.filter((item) => item.type === "music"));
        setUserNftData(res.data.filter((item) => item.type === "nft"));
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div>
      <div className="main-container">
        <h1 className="analytic">{`Welcome ${details.name}!`}</h1>
        <div className="analytics">
          <h1 className="analytics">Your Analytics!</h1>

          <div className="works-container">
            <div className="works">
              {userMusicData.length === 0 &&
              userScriptData.length === 0 &&
              userNftData.length === 0 ? (
                <h1>You haven't Added any works yet..</h1>
              ) : (
                <h1 className="analytics">Your Works</h1>
              )}
            </div>

            <div className="cards namecards">
              {userScriptData.map((item, index) => (
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
                      <p className="price">{item.price}</p>
                    </div>
                  </div>
                  <div>
                    <button
                      className="btn-script-music-buy  hero-btn"
                      onClick={() => handleDeleteScript(item.id)}
                    >
                      Delete
                    </button>
                    <button
                      className="btn-script-music-buy  hero-btn"
                      onClick={() => handleUpdateScript(item)}
                    >
                      Update
                    </button>
                  </div>
                </div>
              ))}
              {userMusicData.map((item, index) => (
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
                      onClick={() => handleDeleteMusic(item.id)}
                    >
                      Delete
                    </button>

                    <button
                      onClick={() => handleUpdateMusicData(item)}
                      className="btn-script-music-buy  hero-btn"
                    >
                      Update
                    </button>
                  </div>
                </div>
              ))}
              {userNftData.map((item, index) => (
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
                    {" "}
                    <button
                      className="btn-script-music-buy  hero-btn"
                      onClick={() => handleUpdateNft(item.id)}
                    >
                      Update
                    </button>
                    <button
                      className="btn-script-music-buy  hero-btn"
                      onClick={() => handleDeleteNft(item.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
            {updateM ? (
              <div>
                <form
                  ref={clickRef}
                  onSubmit={(e) => UpdateMusic(e)}
                  className="sign-in-form"
                >
                  <AiOutlineCloseCircle
                    onClick={() => {
                      setUpdateM(!updateM);
                    }}
                    className="closeForm"
                  />
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="inpt"
                    type="text"
                    placeholder="name"
                    id=""
                  />

                  <input
                    className="inpt"
                    type="file"
                    placeholder="Script"
                    name="image"
                    accept=".jpeg,.jpg,.png"
                    onChange={(e) => setImage(e.target.files[0])}
                    id=""
                  />

                  <input
                    className="inpt"
                    type="file"
                    placeholder="Artist"
                    name="text"
                    accept=".mp3"
                    onChange={(e) => setAudio(e.target.files[0])}
                    id=""
                  />
                  <input
                    className="inpt"
                    type="text"
                    placeholder="Price"
                    name="price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    id=""
                  />
                  <button type="submit" className="btn">
                    Submit
                  </button>
                </form>
              </div>
            ) : null}
            {updateS ? (
              <div>
                <form
                  ref={clickRef}
                  onSubmit={(e) => UpdateScript(e)}
                  className="sign-in-form"
                >
                  <AiOutlineCloseCircle
                    onClick={() => {
                      setUpdateS(!updateS);
                    }}
                    className="closeForm"
                  />
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="inpt"
                    type="text"
                    placeholder="name"
                    id=""
                  />

                  <input
                    className="inpt"
                    type="file"
                    placeholder="Poster"
                    name="image"
                    accept=".jpeg,.jpg,.png"
                    onChange={(e) => setImage(e.target.files[0])}
                    id=""
                  />

                  <input
                    className="inpt"
                    type="file"
                    placeholder="Script"
                    name="text"
                    accept=".txt"
                    onChange={(e) => setAudio(e.target.files[0])}
                    id=""
                  />
                  <input
                    className="inpt"
                    type="text"
                    placeholder="Price"
                    name="price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    id=""
                  />
                  <button type="submit" className="btn">
                    Submit
                  </button>
                </form>
              </div>
            ) : null}
            {updateN ? (
              <div>
                <form
                  ref={clickRef}
                  onSubmit={(e) => UpdateNft(e)}
                  className="sign-in-form"
                >
                  <AiOutlineCloseCircle
                    onClick={() => {
                      setUpdateN(!updateN);
                    }}
                    className="closeForm"
                  />
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="inpt"
                    type="text"
                    placeholder="name"
                    id=""
                  />

                  <input
                    className="inpt"
                    type="file"
                    placeholder="Poster"
                    name="image"
                    accept=".jpeg,.jpg,.png"
                    onChange={(e) => setImage(e.target.files[0])}
                    id=""
                  />

                  <input
                    className="inpt"
                    type="text"
                    placeholder="Price"
                    name="price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    id=""
                  />
                  <button type="submit" className="btn">
                    Submit
                  </button>
                </form>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Works;
