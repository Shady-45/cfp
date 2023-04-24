import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { getFile } from "../../../getFile";
import "../../../Cascading-Style-Sheets/musicPage.css";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { SiBlockchaindotcom } from "react-icons/si";
import { Link } from "react-router-dom";
import payments from "../../payments/payment.service";

const MusicItem = () => {
  const { musicId } = useParams();
  const token = localStorage.getItem("user-details");
  const musicURL = `/music/${musicId}`;
  const [musicImage, setMusicImage] = useState("");
  const [musicItem, setMusicItem] = useState({});
  const [imageItem, setImageItem] = useState("");
  const [audioItem, setAudioItem] = useState("");

  useEffect(() => {
    const headersObj = {};
    if (token) {
      headersObj["authorization"] = token;
    }
    const fetchData = async function () {
      const response = await fetch(
        `https://www.fundingportal.site/music/${musicId}`,
        {
          headers: headersObj,
        }
      );
      const data = await response.json();
      setMusicItem(data);

      const fetchFiles = async function (filename, type) {
        const headersObj = {};
        if (token) {
          headersObj["authorization"] = token;
        }
        const response = await fetch(
          `https://www.fundingportal.site/uploads/${filename}`,
          { headers: headersObj }
        );
        const fileBuffer = await response.blob();
        const fileUrl = window.URL.createObjectURL(fileBuffer);
        if (type === "img") {
          setImageItem(fileUrl);
        } else {
          setAudioItem(fileUrl);
        }
      };

      await fetchFiles(data.image, "img");
      await fetchFiles(data.audio);
    };
    fetchData();
  }, []);

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
        <Link className="path" to="/music">
          <li>
            <p>Music/</p>
          </li>
        </Link>

        <li>
          {" "}
          <p>{`${musicId}`}</p>
        </li>
      </ul>

      {musicItem ? (
        <div
          data-account={musicItem?.user?.account}
          data-price={musicItem?.price}
          data-id={musicItem?.id}
          data-type={musicItem?.type}
          className="music-item payment"
        >
          <div className="img-container">
            <img src={`${imageItem}`} alt={musicItem.name} />
          </div>
          <div className="music-info">
            <h1 className="analytic">{`Song : ${musicItem?.name}`}</h1>
            <h1 className="analytic">{`Artist : ${musicItem?.user?.name}`}</h1>
            <h1 className="analytic">{`Price: ${musicItem?.price}`}</h1>
            <audio
              className="audio-player"
              controls="controls"
              src={audioItem}
              type="audio/mp3"
            />
            {musicItem?.isPaid ? null : (
              <button
                onClick={payments.manageTransactionFlow}
                className="btn-script-music-buy  hero-btn"
              >
                Buy
              </button>
            )}
          </div>
        </div>
      ) : (
        <h1 className="analytic">Loading....</h1>
      )}
    </>
  );
};

export default MusicItem;
