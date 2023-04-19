import React, { useRef, useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import "../../../Cascading-Style-Sheets/Navbar.css";
import axios from "../../../api/axios";

const NftForm = ({
  nftForm,
  setNftForm,
  showUpload,
  setShowUpload,
  uploadMess,
  setUploadMess,
  showError,
  setShowError,
  uploadError,
  setUploadError,
}) => {
  const url = "https://www.fundingportal.site";
  const [image, setImage] = useState("");
  const [text, setText] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const item = localStorage.getItem("user-details");
  const NFT_UPLOAD_URL = "nft/create";
  const clickRef = useRef(null);
  const toggle = () => {
    setNftForm(!nftForm);
  };
  const submitScriptform = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);
    formData.append("text", text);
    formData.append("name", name);
    formData.append("price", price);
    axios
      .post(`${url}/${NFT_UPLOAD_URL}`, formData, {
        headers: {
          Authorization: item,
        },
      })
      .then((res) => {
        console.log(res);
        setShowUpload(!showUpload);
        setNftForm(!nftForm);
        setUploadMess("Nft Added Sucessfully");
      })
      .catch((err) => {
        console.log(err);
        setShowError(!showError);
        setNftForm(!nftForm);
        setUploadError("Error in adding data");
      });
    setText(" ");
    setImage(null);
    setName("");
    setPrice(" ");
  };
  return (
    <div>
      <form
        ref={clickRef}
        onSubmit={(e) => submitScriptform(e)}
        className="sign-in-form"
      >
        <AiOutlineCloseCircle onClick={toggle} className="closeForm" />
        <div className="form-elements">
          <label htmlFor="Name">Name</label>
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
          <label htmlFor="Image">Image</label>
          <input
            className="inpt"
            type="file"
            name="image"
            accept=".jpeg,.jpg,.png"
            onChange={(e) => setImage(e.target.files[0])}
            id="Image"
          />
        </div>

        <div className="form-elements">
          <label htmlFor="Price">Price</label>
          <input
            className="inpt"
            type="text"
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

export default NftForm;
