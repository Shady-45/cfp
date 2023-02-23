import React, { useContext, useRef, useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import "../../../Cascading-Style-Sheets/Navbar.css";
import AuthContext from "../../../context/AuthProvider";
import axios from "../../../api/axios";

const Movieform = () => {
  const { auth } = useContext(AuthContext);
  const [movieData, setMovieData] = useState({
    name: "",
    image: "",
    text: "",
    price: "",
  });
  const MOVIE_UPLOAD_URL = "script/create";
  const clickRef = useRef(null);
  const toggle = () => {
    clickRef.current.style.display = "none";
  };
  const item = localStorage.getItem("user-details");
  console.log(item);
  const submitMovieForm = (e) => {
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
      let formData = new FormData(); //formdata object

      formData.append("name", movieData.name); //append the values with key, value pair
      formData.append("image", movieData.image);
      formData.append("text", movieData.text);
      formData.append("price", movieData.price);

      const config = {
        headers: {
          authorization: item,
        },
      };
      console.log(config);
      axios
        .post(MOVIE_UPLOAD_URL, formData, config)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });

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
    setMovieData({
      name: "",
      image: "",
      text: "",
      price: "",
    });
  };

  const submitForm = (e) => {
    const postMovieData = { ...movieData };
    postMovieData[e.target.name] = e.target.value;
    setMovieData(postMovieData);
    console.log(postMovieData);
  };
  return (
    <div>
      <form
        ref={clickRef}
        onSubmit={(e) => submitMovieForm(e)}
        className="sign-in-form"
      >
        <AiOutlineCloseCircle onClick={toggle} className="closeForm" />
        <input
          value={movieData.name}
          onChange={(e) => submitForm(e)}
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
          accept=".docx"
          value={movieData.image}
          onChange={(e) => submitForm(e)}
          id=""
        />

        <input
          className="inpt"
          type="file"
          placeholder="Text"
          accept=""
          name="text"
          value={movieData.text}
          onChange={(e) => submitForm(e)}
          id=""
        />
        <input
          className="inpt"
          type="text"
          placeholder="Price"
          name="price"
          value={movieData.price}
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

export default Movieform;
