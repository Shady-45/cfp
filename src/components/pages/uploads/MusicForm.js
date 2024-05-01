import React, { useRef, useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import "../../../Cascading-Style-Sheets/Navbar.css";
import axios from "../../../api/axios";
import baseURL from "../../../api/axios";

const MusicForm = ({
  musicForm,
  setMusicForm,
  showUpload,
  setShowUpload,
  uploadMess,
  setUploadMess,
  showError,
  setShowError,
  uploadError,
  setUploadError,
}) => {
  const [image, setImage] = useState(null);
  const [audio, setAudio] = useState(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const url = "https://api.indiecrypt.online";
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

        setShowUpload(!showUpload);
        if (res.status === 201 || 202) {
          setUploadMess("Music Added Sucessfully");
          setMusicForm(!musicForm);
        } else {
        }
      })
      .catch((err) => {
        console.log(err);
        setShowError(!showError);
        setMusicForm(!musicForm);
        setUploadError("Incorrect Body Format");
      });

    setAudio(null);
    setName(" ");
    setPrice(" ");
    setImage(null);
  };

  return (
    <div>
      <form
        ref={clickRef}
        onSubmit={(e) => submitMusicform(e)}
        className="sign-in-form"
      >
        <AiOutlineCloseCircle onClick={toggle} className="closeForm" />
        <div className="form-elements">
          <label htmlFor="Name">Name: </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="inpt"
            type="text"
            id="Name"
          />
        </div>
        <div className="form-elements">
          <label htmlFor="Script">Image </label>
          <input
            className="inpt"
            type="file"
            name="image"
            accept=".jpeg,.jpg"
            onChange={(e) => setImage(e.target.files[0])}
            id="Script"
          />
        </div>
        <div className="form-elements">
          {" "}
          <label htmlFor="Audio">Audio </label>
          <input
            className="inpt"
            type="file"
            placeholder="Artist"
            name="audio"
            accept=".mp3"
            onChange={(e) => setAudio(e.target.files[0])}
            id="Audio"
          />
        </div>
        <div className="form-elements">
          {" "}
          <label htmlFor="Price">Price </label>
          <input
            className="inpt"
            type="text"
            name="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            id="Price"
          />
        </div>

        <button type="submit" className="btn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default MusicForm;
