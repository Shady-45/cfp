import React, { useContext, useEffect, useState, useRef } from "react";
import AuthContext from "../../context/AuthProvider";

import "../../Cascading-Style-Sheets/Profile.css";
import axios from "../../api/axios";

const Profile = ({
  count,
  getCreatorMusicData,
  getCreatorScriptData,
  getCreatorNftData,
}) => {
  const { auth } = useContext(AuthContext);
  const item = localStorage.getItem("user-details");
  const token = localStorage.getItem("user-details");

  const config = {
    headers: { Authorization: token },
  };
  const USER_UPLOAD_URL = "home/uploads/me";

  const [userScriptData, setUserScriptData] = useState([]);
  const [userMusicData, setUserMusicData] = useState([]);
  const [userNftData, setUserNftData] = useState([]);

  const clickRef = useRef(null);

  const deleteScript = (id) => {
    axios
      .delete(`script/delete/${id}`, config)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err.data));
  };
  const deleteMusic = (id) => {
    axios
      .delete(`music/delete/${id}`, config)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err.data));
  };

  const deleteNft = (id) => {
    axios
      .delete(`nft/delete/${id}`, config)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err.data));
  };
  useEffect(() => {
    axios
      .get(USER_UPLOAD_URL, config)
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
            <div className="works">
              <h1 className="work">Your Works</h1>
            </div>
            <div className="cards namecards">
              {userScriptData.map((item, index) => (
                <div key={index} className="card card-1">
                  <img
                    className="card-img"
                    src={`https://fundingportal-gs8ns.ondigitalocean.app/uploads/${item.image}`}
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
                          src={`https://fundingportal-gs8ns.ondigitalocean.app/uploads/${item.image}`}
                        />
                        <p className="author-name">{item.name}</p>
                      </p>
                      <p className="price">{item.price}</p>
                    </div>
                  </div>

                  <button
                    className="btn-script-music-buy  hero-btn"
                    onClick={() => handleDeleteScript(item.id)}
                  >
                    Delete
                  </button>
                </div>
              ))}
              {userMusicData.map((item, index) => (
                <div key={index} className="card card-1">
                  <img
                    className="card-img"
                    src={`https://fundingportal-gs8ns.ondigitalocean.app/uploads/${item.image}`}
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
                          src={`https://fundingportal-gs8ns.ondigitalocean.app/uploads/${item.image}`}
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
                  </div>
                </div>
              ))}
              {userNftData.map((item, index) => (
                <div key={index} className="card card-1">
                  <img
                    className="card-img"
                    src={`https://fundingportal-gs8ns.ondigitalocean.app/uploads/${item.image}`}
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
                          src={`https://fundingportal-gs8ns.ondigitalocean.app/uploads/${item.image}`}
                        />
                        <p className="author-name">{item.name}</p>
                      </p>
                      <p className="price">{item.price}</p>
                    </div>
                  </div>
                  <div></div>
                  <button
                    className="btn-script-music-buy  hero-btn"
                    onClick={() => handleDeleteNft(item.id)}
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
              ))}
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
