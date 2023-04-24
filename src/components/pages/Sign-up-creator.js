import React, { useRef, useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import "../../Cascading-Style-Sheets/Navbar.css";

import axios from "axios";
import baseURL from "../../api/axios";
const SignUpCreator = () => {
  const SIGNUP_URL = "auth/signUp";

  const [creatorData, setCreatorData] = useState({
    name: "",
    email: "",
    password: "",
    role: "creator",
  });

  const submitUserForm = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${baseURL}/auth/signUp`,
        JSON.stringify({
          name: creatorData.name,
          email: creatorData.email,
          password: creatorData.password,
          role: "creator",
        }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      alert(response.data.message);
      localStorage.setItem("user-details", response.data.userToken);

      /* console.log(response.accessToken); */
    } catch (err) {
      console.log(err);
    }
    setCreatorData({
      name: " ",
      email: "",
      password: "",
    });
  };
  const submitForm = (e) => {
    /*   fetch(`${host}/auth/signUp`)
      .then((res) => res.json)
      .then((result) => console.log(result));
      
 */

    const postCreatorData = { ...creatorData };
    postCreatorData[e.target.name] = e.target.value;
    setCreatorData(postCreatorData);
  };

  const clickRef = useRef(null);
  const toggle = () => {
    clickRef.current.style.display = "none";
  };
  return (
    <div>
      <form
        onSubmit={(e) => submitUserForm(e)}
        ref={clickRef}
        className="sign-in-form"
      >
        <AiOutlineCloseCircle onClick={toggle} className="close" />

        <input
          className="inpt"
          type="text"
          placeholder="Naame"
          name="name"
          value={creatorData.name}
          onChange={(e) => submitForm(e)}
          id=""
        />
        <input
          className="inpt"
          type="email"
          placeholder="Email"
          name="email"
          value={creatorData.email}
          onChange={(e) => submitForm(e)}
          id=""
        />

        <input
          className="inpt"
          type="password"
          placeholder="Password"
          name="password"
          value={creatorData.password}
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

export default SignUpCreator;
