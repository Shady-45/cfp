import React, { useRef, useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import "../../../Cascading-Style-Sheets/Navbar.css";
import axios from "../../../api/axios";

const MusicForm = () => {
  const [musicData, setMusicData] = useState({
    nameOfMusic: "",
    image: "",
    text: "",
    price: "",
  });
  const MUSIC_UPLOAD_URL = "music/create";
  const clickRef = useRef(null);
  const toggle = () => {
    clickRef.current.style.display = "none";
  };
  const item = localStorage.getItem("user-details");
  const submitMusicform = async (e) => {
    e.preventDefault();
    try {
      /*   axios
        .post(
          MOVIE_UPLOAD_URL,
          {
            name: movieData.name,
            image: movieData.image,
            text: movieData.text,
            price: movieData.price,
          },
          {
            headers: {
              authorization: item,
            },
          }
        )
        .then((res) => console.log(res.data)); */
      axios
        .post(
          MUSIC_UPLOAD_URL,
          {
            body: {
              name: musicData.name,
              image: musicData.image,
              text: musicData.text,
              price: musicData.price,
            },
          },
          {
            headers: {
              authorization: item,
            },
          }
        )
        .then((res) => console.log(res));

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
    setMusicData({
      nameOfMusic: "",
      image: "",
      text: "",
      price: "",
    });
  };

  const submitForm = (e) => {
    const postMusicData = { ...musicData };
    postMusicData[e.target.name] = e.target.value;
    setMusicData(postMusicData);
    console.log(postMusicData);
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
          value={musicData.nameOfMusic}
          onChange={(e) => submitForm(e)}
          className="inpt"
          type="text"
          name="nameOfMusic"
          placeholder="name"
          id=""
        />

        <input
          className="inpt"
          type="file"
          placeholder="Script"
          name="image"
          accept=".mp3"
          value={musicData.image}
          onChange={(e) => submitForm(e)}
          id=""
        />

        <input
          className="inpt"
          type="text"
          placeholder="Password"
          name="text"
          value={musicData.text}
          onChange={(e) => submitForm(e)}
          id=""
        />
        <input
          className="inpt"
          type="text"
          placeholder="Price"
          name="price"
          value={musicData.price}
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

export default MusicForm;
