import React, { useRef, useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import "../../../Cascading-Style-Sheets/Navbar.css";
import axios from "../../../api/axios";
import baseURL from "../../../api/axios";

const MusicForm = ({ musicForm, setMusicForm }) => {
  const [image, setImage] = useState("");
  const [audio, setAudio] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const url = "https://www.fundingportal.site";
  const MUSIC_UPLOAD_URL = "music/create";
  const clickRef = useRef(null);
  const toggle = () => {
    setMusicForm(!musicForm);
  };
  const item = localStorage.getItem("user-details");
  const submitMusicform = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);
    formData.append("audio", audio);
    formData.append("name", name);
    formData.append("price", price);
    console.log(formData);
    axios
      .post(`${url}/music/create`, formData, {
        headers: {
          Authorization: item,
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));

    setAudio(" ");
    setName(" ");
    setPrice(" ");
    setImage("");
  };

  return (
    <div>
      <form
        ref={clickRef}
        onSubmit={(e) => submitMusicform(e)}
        className="sign-in-form"
      >
        <AiOutlineCloseCircle onClick={toggle} className="closeForm" />
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
          accept=".jpeg,.jpg"
          onChange={(e) => setImage(e.target.files[0])}
          id=""
        />

        <input
          className="inpt"
          type="file"
          placeholder="Artist"
          name="audio"
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
  );
};

export default MusicForm;
