import React, { useEffect, useContext, useRef } from "react";
import { useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import "../../Cascading-Style-Sheets/Navbar.css";

import AuthContext from "../../context/AuthProvider";
import jwt_decode from "jwt-decode";
import axios from "axios";

const SignInuser = ({ click, setClick }) => {
  const { auth, setAuth } = useContext(AuthContext);
  const SIGNIN_URL = "auth/signIn";
  const [userToken, setUserToken] = useState(" ");
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
      const response = await axios.post(
        `https://www.fundingportal.site/${SIGNIN_URL}`,
        userData
      );
      console.log(response.data); // handle response data
      setUserToken(response.data.token);
    } catch (error) {
      console.log(error);
    }
    localStorage.setItem("user-details", userToken);
    const token_response = jwt_decode(userToken);
    /* localStorage.setItem("user-details", token_response.email); */
    /* const tokenC = jwt_decode(result.token); */
    const { role, email } = token_response;
    alert(`Welcome ${email.split("@")[0]}`);

    setAuth({ role, email, userToken: userToken });

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
