import React, { useEffect, useContext, useRef } from "react";
import { useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import "../../Cascading-Style-Sheets/Navbar.css";
import AuthContext from "../../context/AuthProvider";
import jwt_decode from "jwt-decode";
import axios from "axios";

const SignInuser = ({
  click,
  setClick,
  showSucessMessage,
  setShowSucessMessage,
  showErrorMessage,
  setShowErrorMessage,
  message,
  setMessage,
}) => {
  const SIGNIN_URL = "auth/signIn";
  const { auth, setAuth } = useContext(AuthContext);

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const submitData = (e) => {
    const postUserData = { ...userData };
    postUserData[e.target.name] = e.target.value;
    setUserData(postUserData);
    console.log(postUserData);
  };

  const clickRef = useRef(null);
  const toggle = () => {
    setClick(!click);
  };
  const SubmitUserData = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://www.fundingportal.site/auth/signIn",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );
      const data = await response.json();
      setClick(!click);
      if (response.status !== 200) {
        throw new Error(data.message);
      }

      localStorage.setItem("user-details", data.token);
      const token = localStorage.getItem("user-details");
      const token_res = jwt_decode(token);
      const { name } = token_res;
      // setAuth({ name, email, userToken: token });
      setMessage(`Welcome ${name}`);
      setShowSucessMessage(!showSucessMessage);
    } catch (error) {
      setShowErrorMessage(!showErrorMessage);
      setClick(!click);
      setMessage(error.message);
      console.log(message);
    }

    setUserData({
      email: "",
      password: "",
    });
  };

  return (
    <div>
      <form
        ref={clickRef}
        onSubmit={(e) => SubmitUserData(e)}
        className="sign-in-form"
      >
        <AiOutlineCloseCircle onClick={toggle} className="close" />

        <input
          type="email"
          name="email"
          className="inpt"
          placeholder="Email"
          value={userData.email}
          onChange={(e) => submitData(e)}
          id=""
        />
        <input
          className="inpt"
          type="password"
          placeholder="Password"
          name="password"
          id=""
          value={userData.password}
          onChange={(e) => submitData(e)}
        />
        <button className="btn">Submit</button>
      </form>
    </div>
  );
};

export default SignInuser;
