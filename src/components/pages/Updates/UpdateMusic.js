import React, { useState } from "react";
import "../../../Cascading-Style-Sheets/Updates.css";
import axios from "../../../api/axios";

const UpdateMusic = ({ userMusicData, handleUpdateMusicData }) => {
  const [image, setImage] = useState("");
  const [audio, setAudio] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const item = localStorage.getItem("user-details");

  /*  console.log(handleUpdateMusicData()); */
  const MUSIC_UPDATE_URL = `music/update/id`;
  const SubmitUpdateMusicData = (e) => {
    e.preventDefault();
    const UpdateFormData = new FormData();
    UpdateFormData.append(image, "image");
    UpdateFormData.append(audio, "audio");
    UpdateFormData.append(name, "name");
    UpdateFormData.append(price, "price");
    axios
      .post(MUSIC_UPDATE_URL, UpdateFormData, {
        headers: {
          Authorization: item,
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
  return (
    <div>
      <form
        onSubmit={(e) => SubmitUpdateMusicData(e)}
        className="form-update"
        action=""
      >
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Song Name"
        />
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          placeholder="Song Image"
        />
        <input
          type="file"
          onChange={(e) => setAudio(e.target.files[0])}
          placeholder="Audio File"
        />
        <input
          type="text"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default UpdateMusic;
