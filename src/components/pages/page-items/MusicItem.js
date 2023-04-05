import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { getFile } from "../../../getFile";
import "../../../Cascading-Style-Sheets/musicPage.css";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { SiBlockchaindotcom } from "react-icons/si";
import { Link } from "react-router-dom";

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
          console.log(fileUrl, "💙💙");
          setAudioItem(fileUrl);
        }
      };

      fetchFiles(data.image, "img");
      fetchFiles(data.audio);
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
      {musicItem ? (
        <div className="music-item">
          <div className="img-container">
            <img src={`${imageItem}`} alt={musicItem.name} />
          </div>
          <div className="music-info">
            <h1 className="analytic">{`Song Name : ${musicItem?.name}`}</h1>
            <h1 className="analytic">{`Artist Name: ${musicItem?.user?.name}`}</h1>
            <h1 className="analytic">{`Price: ${musicItem?.price}`}</h1>
            <audio
              className="audio-player"
              controls="controls"
              src={audioItem}
              type="audio/mp3"
            />
            {/*  <AudioPlayer
              className="audio-player"
              src={audioItem}
              volume={0.5}
            /> */}
            {musicItem.isPaid ? null : (
              <button className="btn-script-music-buy  hero-btn">Buy</button>
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

/* const getData = async function (musicId) {
  try {
    const headersObj = {};
    if (token) {
      headersObj["authorization"] = token;
    }

    const response = await fetch(
      `https://www.fundingportal.site/music/${musicId}`,
      { headersObj }
    );

    let data = await response.json();
    if (response.status !== 200) {
      throw new Error(data.message);
    }

    const image = await getFile(data.image);
    const audio = await getFile(data.audio);
    data.image = URL.createObjectURL(image);
    data.audio = URL.createObjectURL(audio);

    return data;
  } catch (error) {
    console.log(error, "💙💙💙");
  }
}; */
