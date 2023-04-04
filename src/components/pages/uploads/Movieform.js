import React, { useContext, useRef, useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import "../../../Cascading-Style-Sheets/Navbar.css";
import AuthContext from "../../../context/AuthProvider";
import axios from "../../../api/axios";

const Movieform = ({ movieForm, setMovieForm }) => {
  const url = "https://www.fundingportal.site";
  const [image, setImage] = useState("");
  const [text, setText] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const MOVIE_UPLOAD_URL = "script/create";
  const clickRef = useRef(null);
  const toggle = () => {
    setMovieForm(!movieForm);
  };
  const item = localStorage.getItem("user-details");

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);
    formData.append("text", text);
    formData.append("name", name);
    formData.append("price", price);
    axios
      .post(`${url}/script/create`, formData, {
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
    setName("");
    setPrice(" ");
  };
  return (
    <div>
      <form ref={clickRef} onSubmit={handleSubmit} className="sign-in-form">
        <AiOutlineCloseCircle onClick={toggle} className="closeForm" />
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="inpt"
          type="text"
          name="name"
          placeholder="name"
          id=""
        />

        <input
          className="inpt"
          type="file"
          placeholder="Script"
          name="image"
          accept=".txt"
          onChange={(e) => setText(e.target.files[0])}
          id=""
        />

        <input
          className="inpt"
          type="file"
          placeholder="Text"
          accept=".jpeg,.png,.jpg"
          name="text"
          onChange={(e) => setImage(e.target.files[0])}
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

export default Movieform;
