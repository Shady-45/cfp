import React, { useRef, useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import "../../../Cascading-Style-Sheets/Navbar.css";
import axios from "../../../api/axios";

const MusicForm = () => {
  const [image, setImage] = useState("");
  const [text, setText] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const MUSIC_UPLOAD_URL = "music/create";
  const clickRef = useRef(null);
  const toggle = () => {
    clickRef.current.style.display = "none";
  };
  const item = localStorage.getItem("user-details");
  const submitMusicform = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);
    formData.append("text", text);
    formData.append("name", name);
    formData.append("price", price);
    axios
      .post(MUSIC_UPLOAD_URL, formData, {
        headers: {
          Authorization: item,
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
    setText(" ");
    setImage(" ");
    setName(" ");
    setPrice(" ");
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
          accept=".jpeg,.jpg,.png"
          onChange={(e) => setImage(e.target.files[0])}
          id=""
        />

        <input
          className="inpt"
          type="file"
          placeholder="Artist"
          name="text"
          accept=".mp3"
          onChange={(e) => setText(e.target.files[0])}
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
