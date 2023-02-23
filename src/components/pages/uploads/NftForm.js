import React, { useRef, useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import "../../../Cascading-Style-Sheets/Navbar.css";
import axios from "../../../api/axios";

const NftForm = () => {
  const [nftData, setNftData] = useState({
    nameOfNft: "",
    image: "",
    text: "",
    price: "",
  });
  const NFT_UPLOAD_URL = "nft/create";
  const clickRef = useRef(null);
  const toggle = () => {
    clickRef.current.style.display = "none";
  };
  const submitScriptform = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        NFT_UPLOAD_URL,
        JSON.stringify({
          nameOfNft: nftData.nameOfNft,
          image: nftData.image,
          text: nftData.text,
          price: nftData.price,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(response.data);
      alert(response.data);

      /* const result_token = JSON.stringify(response?.data?.token?.split(" ")[1]);
  
        const token_response = jwt_decode(result_token);
        localStorage.setItem("user-details", token_response.email);
        /* const tokenC = jwt_decode(result.token); */
      /* const { role, email } = token_response; */
      /*    alert(`Welcome ${email.split("@")[0]}`);
  
        setAuth({ role, email });
        console.log(auth.role);
        console.log(auth.email);  */
    } catch (err) {
      console.log(err);
    }
    setNftData({
      nameOfNft: "",
      image: "",
      text: "",
      price: "",
    });
  };

  const submitForm = (e) => {
    const postNftData = { ...nftData };
    postNftData[e.target.name] = e.target.value;
    setNftData(postNftData);
    console.log(postNftData);
  };
  return (
    <div>
      <form
        ref={clickRef}
        onSubmit={(e) => submitScriptform(e)}
        className="sign-in-form"
      >
        <AiOutlineCloseCircle onClick={toggle} className="closeForm" />
        <input
          value={nftData.nameOfNft}
          onChange={(e) => submitForm(e)}
          className="inpt"
          type="text"
          name="nameOfMovie"
          placeholder="name"
          id=""
        />

        <input
          className="inpt"
          type="file"
          placeholder="Script"
          name="image"
          accept=".jpeg,.png"
          value={nftData.image}
          onChange={(e) => submitForm(e)}
          id=""
        />

        <input
          className="inpt"
          type="text"
          placeholder="Password"
          name="text"
          value={nftData.text}
          onChange={(e) => submitForm(e)}
          id=""
        />
        <input
          className="inpt"
          type="text"
          placeholder="Price"
          name="price"
          value={nftData.price}
          onChange={(e) => submitForm(e)}
          id=""
        />
        <button type="submit" className="btn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default NftForm;
