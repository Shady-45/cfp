import React, { useContext, useRef, useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import "../../../Cascading-Style-Sheets/Navbar.css";
import AuthContext from "../../../context/AuthProvider";
import axios from "../../../api/axios";

const Movieform = ({
  movieForm,
  setMovieForm,
  showUpload,
  setShowUpload,
  uploadMess,
  setUploadMess,
  showError,
  setShowError,
  uploadError,
  setUploadError,
}) => {
  const url = "https://api.indiecrypt.site";
  const [image, setImage] = useState(null);
  const [text, setText] = useState(null);
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
        setShowUpload(!showUpload);
        if (res.message === "Script added Sucessfully") {
          setUploadMess("Script added Sucessfully");
          setMovieForm(!movieForm);
        } else {
          setShowError(!showError);
          setUploadError("Error adding Script");
          setMovieForm(!movieForm);
        }
      })
      .catch((err) => {
        console.log(err);
        setShowError(!showError);
        setUploadError("Error adding Script");
        setMovieForm(!movieForm);
      });
    setText(" ");
    setImage(" ");
    setName("");
    setPrice(" ");
  };
  return (
    <div>
      <form ref={clickRef} onSubmit={handleSubmit} className="sign-in-form">
        <AiOutlineCloseCircle onClick={toggle} className="closeForm" />
        <div className="form-elements">
          <label htmlFor="Name">Name </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="inpt"
            type="text"
            name="name"
            id="Name"
          />
        </div>

        <div className="form-elements">
          <label htmlFor="Script">Script</label>
          <input
            className="inpt"
            type="file"
            name="image"
            accept=".txt"
            onChange={(e) => setText(e.target.files[0])}
            id="Script"
          />
        </div>

        <div className="form-elements">
          <label htmlFor="Image">Image</label>
          <input
            className="inpt"
            type="file"
            accept=".jpeg,.png,.jpg"
            name="text"
            onChange={(e) => setImage(e.target.files[0])}
            id="Image"
          />
        </div>
        <div className="form-elements">
          <label htmlFor="Price">Price</label>
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

export default Movieform;
