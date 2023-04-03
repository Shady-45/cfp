import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../../api/axios";
import "../../../Cascading-Style-Sheets/musicPage.css";
import { SiBlockchaindotcom } from "react-icons/si";
import { Link } from "react-router-dom";
const NftItem = () => {
  const { nftId } = useParams();
  const [nftItem, setNftItem] = useState([]);
  const nft_url = `/nft/${nftId}`;
  console.log(nftId);

  useEffect(() => {
    axios
      .get(nft_url)
      .then((res) => setNftItem(res.data))
      .catch((err) => console.log(err));
  }, []);
  console.log(nftItem);
  const { name, image, price, user } = nftItem;
  return (
    <>
      <Link to="/">
        {" "}
        <div className="logo-main-new-item">
          <SiBlockchaindotcom />
          <h3>IndieCrypt</h3>
        </div>
      </Link>
      <div className="nft-container">
        <img src={`https://www.fundingportal.site/uploads/${image}`} alt="" />
        <div className="nft-details">
          <h1 className="analytic">{`Nft : ${name}`}</h1>
          <h1 className="analytic">{`Price : ${price}`}</h1>

          <h1 className="analytic">{`Artist : ${user?.name}`}</h1>
          <div className="btn-nft">
            <button className="btn-script-music-buy  hero-btn">Buy</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NftItem;
