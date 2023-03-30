import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import movie1 from "../../assets/movie1.mp4";
import movieAvatar1 from "../../assets/avatar.webp";
import payments from "../payments/payment.service";

const MoviePage = () => {
  const baseURL = "https://www.fundingportal.site";
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get(`nft/all`).then((res) => setData(res.data));
  });

  return (
    <div>
      {" "}
      <h1 className="title-card">Hot nfts</h1>
      <div className="cards">
        {data.map((item, index) => (
          <div
            data-account={item.user.account}
            data-price={item.price}
            key={index}
            className="card card-1"
          >
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
            <button
              onClick={payments.manageTransactionFlow}
              className="btn-movie  hero-btn btn-pay"
            >
              Contribute
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoviePage;
