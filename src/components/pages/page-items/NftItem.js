import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../../api/axios";
import "../../../Cascading-Style-Sheets/musicPage.css";
import { SiBlockchaindotcom } from "react-icons/si";
import { Link } from "react-router-dom";
import payments from "../../payments/payment.service";
const NftItem = () => {
  const { nftId } = useParams();
  const [nftItem, setNftItem] = useState([]);
  const [imageItem, setImageItem] = useState(" ");
  let token = localStorage.getItem("user-details");
  const nft_url = `/nft/${nftId}`;

  useEffect(() => {
    const headersObj = {};
    if (token) {
      headersObj["authorization"] = token;
    }
    const fetchData = async function () {
      const response = await fetch(
        `https://api.indiecrypt.online/nft/${nftId}`,
        {
          headers: headersObj,
        }
      );
      const data = await response.json();
      setNftItem(data);

      const fetchFiles = async function (filename, isPaid = false) {
        const response = await fetch(
          `https://api.indiecrypt.online/uploads/${filename}${
            !isPaid ? "" : "?cache=" + new Date().getTime()
          }`,
          { headers: headersObj }
        );
        const fileBuffer = await response.blob();
        const fileUrl = window.URL.createObjectURL(fileBuffer);
        setImageItem(fileUrl);
      };

      await fetchFiles(data?.image, data.isPaid);
    };
    fetchData();
  }, []);

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
      <ul className="url-items">
        <Link className="path" to="/">
          <li>
            <p>Home/</p>
          </li>
        </Link>
        <Link className="path" to="/nft">
          <li>
            <p>Nft/</p>
          </li>
        </Link>

        <li>
          {" "}
          <p>{`${nftId}`}</p>
        </li>
      </ul>
      <div
        className="nft-container payment"
        data-account={nftItem?.user?.account}
        data-price={nftItem?.price}
        data-id={nftItem?.id}
        data-type={nftItem?.type}
      >
        <img src={`${imageItem}`} alt="" />
        <div className="nft-details">
          <h1 className="analytic">{`Nft : ${name}`}</h1>
          <h1 className="analytic">{`Price : ${price}`}</h1>

          <h1 className="analytic">{`Artist : ${user?.name}`}</h1>
          <div className="btn-nft">
            {!nftItem.isPaid ? (
              <button
                onClick={payments.manageTransactionFlow}
                className="btn-script-music-buy   hero-btn "
              >
                Buy
              </button>
            ) : (
              <button className="btn-script-music-buy   hero-btn ">View</button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default NftItem;
