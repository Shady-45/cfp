import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import payments from "../payments/payment.service";
import { AiOutlineHeart } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";
import { Link } from "react-router-dom";
import NftItem from "./page-items/NftItem";
const MoviePage = () => {
  const baseURL = "https://api.indiecrypt.site";
  const [nftData, setNftData] = useState([]);
  useEffect(() => {
    axios.get(`nft/all`).then((res) => setNftData(res.data));
  });
  const token = localStorage.getItem("user-details");
  const getObj = {};
  if (token) {
    getObj["headers"] = {
      Authorization: token,
    };
  }
  const handleLikeNft = (item) => {
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
          .get(`${baseURL}/nft/all`, getObj)
          .then((res) => setNftData(res.data))
          .catch((err) => console.log(err));
      })

      .catch((err) => console.log(err, "🔥🔥"));
  };
  const handleDisLikeNft = (item) => {
    fetch(`https://api.indiecrypt.site/favorites/${item.id}?type=nft`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
      .then((data) => data.json())
      .then((data) => {
        axios
          .get(`${baseURL}/nft/all`, getObj)
          .then((res) => setNftData(res.data))
          .catch((err) => console.log(err));
      })

      .catch((err) => console.log(err, "🔥🔥"));
  };

  return (
    <div>
      {" "}
      <h1 className="title-card">Graphic Designs</h1>
      <ul className="url-items-page">
        <Link className="path" to="/">
          <li>
            <p>Home/</p>
          </li>
        </Link>
        <Link className="path" to="/nft">
          <li>
            <p>Designs/</p>
          </li>
        </Link>
      </ul>
      {localStorage.getItem("user-details") ? (
        <div className="cards-music">
          {nftData.map((item, index) => (
            <div
              data-account={item.user.account}
              data-price={item.price}
              data-id={item.id}
              data-type={item.type}
              key={index}
              className="card-nft-token payment"
            >
              <Link to={`/nfts/${item.id}`} element={<NftItem />} key={item.id}>
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
      ) : (
        <div className="cards-music">
          {nftData.map((item, index) => (
            <div
              data-account={item.user.account}
              data-price={item.price}
              data-id={item.id}
              data-type={item.type}
              key={index}
              className="card-nft"
            >
              <Link to={`/nfts/${item.id}`} element={<NftItem />} key={item.id}>
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
      )}
    </div>
  );
};

export default MoviePage;
