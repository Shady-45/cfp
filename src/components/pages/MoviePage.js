import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import movie1 from "../../assets/movie1.mp4";
import movieAvatar1 from "../../assets/avatar.webp";
import baseURL from "../../api/axios";

const MoviePage = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get(`${baseURL}/nft/all`).then((res) => setData(res.data));
  });

  return (
    <div>
      {" "}
      <h1 className="title-card">Hot nfts</h1>
      <div className="cards">
        {data.map((item, index) => (
          <div key={index} className="card card-1">
            <img
              className="card-img"
              src={`${baseURL}/uploads/${item.image}`}
            ></img>
            <div className="text-details">
              <div className="firstrow">
                <p className="name">{item.name}</p>
                <p className="currency">Current eth</p>
              </div>
              <div className="secondrow">
                <p className="author">
                  {/*  <img className="avatar author-img" src={movieAvatar1} /> */}
                  <p className="author-name">{item.user.name}</p>
                </p>
                <p className="price">{item.price}</p>
              </div>
            </div>
            <button className="btn-movie  hero-btn">Contribute</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoviePage;
