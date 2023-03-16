import React, { useContext, useEffect, useState, useRef } from "react";
import AuthContext from "../../context/AuthProvider";
import { AiOutlineCloseCircle } from "react-icons/ai";
import "../../Cascading-Style-Sheets/Profile.css";
import axios from "../../api/axios";
import { Link } from "react-router-dom";

const Profile = ({ count }) => {
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

  const toggle = () => {
    clickRef.current.style.display = "none";
  };
  const { auth } = useContext(AuthContext);
  const [updateM, setUpdateM] = useState(false);
  const [updateS, setUpdateS] = useState(false);
  const [updateN, setUpdateN] = useState(false);

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
  const handleUpdateNft = (item) => {
    setUpdateScriptId(item.id);
    setUpdateS(!updateS);
  };
  console.log(updateScriptId);
  const USER_UPLOAD_URL = "home/uploads/me";

  const clickRef = useRef(null);

  const deleteScript = (id) => {
    axios
      .delete(`http://144.126.252.25:8080/script/delete/${id}`, config)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err.data));
  };
  const deleteMusic = (id) => {
    axios
      .delete(`http://144.126.252.25:8080/music/delete/${id}`, config)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err.data));
  };
  console.log(updateMusicId);
  const UpdateMusic = (e) => {
    e.preventDefault();
    let MUSIC_UPDATE_URL = `http://144.126.252.25:8080/music/update/${updateMusicId}`;
    const UpdateFormData = new FormData();
    UpdateFormData.append(image, "image");
    UpdateFormData.append(audio, "audio");
    UpdateFormData.append(name, "name");
    UpdateFormData.append(price, "price");
    console.log(UpdateFormData);

    /* axios
      .put(
        MUSIC_UPDATE_URL,
        { body: UpdateFormData },

        {
          headers: {
            Authorization: token,
            "Content-Type": "multipart/form-data",
          },
        }
      ) */

    fetch(MUSIC_UPDATE_URL, {
      method: "PUT",
      headers: {
        Authorization: token,
      },
      body: UpdateFormData,
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err, "🚨🚨"));
    setAudio(" ");
    setImage(" ");
    setName(" ");
    setPrice(" ");
  };
  const UpdateScript = (e) => {
    e.preventDefault();
    let SCRIPT_UPDATE_URL = `http://144.126.252.25:8080/music/update/${updateScriptId}`;
    const UpdateFormData = new FormData();
    UpdateFormData.append(image, "image");

    UpdateFormData.append(name, "name");
    UpdateFormData.append(price, "price");
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
  const UpdateNft = (e) => {
    e.preventDefault();
    let SCRIPT_UPDATE_URL = `http://144.126.252.25:8080/music/update/${updateScriptId}`;
    const UpdateFormData = new FormData();
    UpdateFormData.append(image, "image");

    UpdateFormData.append(name, "name");
    UpdateFormData.append(price, "price");
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
      .delete(`http://144.126.252.25:8080/nft/delete/${id}`, config)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err.data));
  };
  useEffect(() => {
    axios
      .get("http://144.126.252.25:8080/home/uploads/me", config)
      .then((res) => {
        console.log(res.data);
        setUserScriptData(res.data.script);
        setUserMusicData(res.data.music);
        setUserNftData(res.data.nft);
      })
      .catch((err) => console.log(err));
  }, []);
  const userData = [...userScriptData, ...userMusicData, ...userNftData];
  console.log(userData);
  const handleDeleteMusic = (id) => {
    deleteMusic(id);
  };

  const handleDeleteNft = (id) => {
    deleteNft(id);
  };
  const handleDeleteScript = (id) => {
    deleteScript(id);
  };

  return (
    <div>
      {auth.role === "creator" ? (
        <div className="main-container">
          <h1>{`Welcome ${auth.email.split("@")[0].toUpperCase()}!`}</h1>
          <div className="analytics">
            <h1 className="analytics">Your Analytics!</h1>
            <h2>{`Total Imperssions: ${count} Views`}</h2>
            <div className="works-container">
              <div className="works">
                <h1 className="work">Your Works</h1>
              </div>
              <div className="cards namecards">
                {userScriptData.map((item, index) => (
                  <div key={index} className="card card-1">
                    <img
                      className="card-img"
                      src={`http://144.126.252.25:8080/uploads/${item.image}`}
                      alt={item.name}
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
                            alt={item.name}
                            src={`http://144.126.252.25:8080/uploads/${item.image}`}
                          />
                          <p className="author-name">{item.name}</p>
                        </p>
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
                  <div key={index} className="card card-1">
                    <img
                      className="card-img"
                      src={`http://144.126.252.25:8080/uploads/${item.image}`}
                      alt={item.name}
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
                            alt={item.name}
                            src={`http://144.126.252.25:8080/uploads/${item.image}`}
                          />
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
                  <div key={index} className="card card-1">
                    <img
                      className="card-img"
                      src={`http://144.126.252.25:8080/uploads/${item.image}`}
                      alt={item.name}
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
                            alt={item.name}
                            src={`http://144.126.252.25:8080/uploads/${item.image}`}
                          />
                          <p className="author-name">{item.name}</p>
                        </p>
                        <p className="price">{item.price}</p>
                      </div>
                    </div>
                    <div></div>
                    <button
                      className="btn-script-music-buy  hero-btn"
                      onClick={() =>
                        handleDeleteNft(item.id) && setUpdateM(!updateM)
                      }
                    >
                      Update
                    </button>
                    <button
                      className="btn-script-music-buy  hero-btn"
                      onClick={() => handleDeleteNft(item.id)}
                    >
                      Delete
                    </button>
                    <button
                      className="btn-script-music-buy  hero-btn"
                      onClick={() => handleUpdateNft(item.id)}
                    >
                      Delete
                    </button>
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
                      onClick={toggle}
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
                      onClick={toggle}
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
                    onSubmit={(e) => UpdateScript(e)}
                    className="sign-in-form"
                  >
                    <AiOutlineCloseCircle
                      onClick={toggle}
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
      ) : (
        <div className="main-container">
          <h1>{`Welcome ${auth.email.split("@")[0].toUpperCase()}!`}</h1>
          <div className="analytics">
            <h1 className="analytics">Your Favourites!</h1>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
