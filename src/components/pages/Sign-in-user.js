import React, { useContext, useRef } from "react";
import { useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import "../../Cascading-Style-Sheets/Navbar.css";
import axios from "../../api/axios";
import AuthContext from "../../context/AuthProvider";
import jwt_decode from "jwt-decode";

const SignInuser = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const SIGNIN_URL = "auth/signIn";

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });
  const submitData = (e) => {
    const postUserData = { ...userData };
    postUserData[e.target.name] = e.target.value;
    setUserData(postUserData);
    console.log(postUserData);
  };

  const clickRef = useRef(null);
  const toggle = () => {
    clickRef.current.style.display = "none";
  };
  const SubmitUserData = async (e) => {
    e.preventDefault();
    fetch("http://144.126.252.25:8080/auth/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Invalid credentials");
      })
      .then((data) => {
        // Save the token to local storage or session storage
        localStorage.setItem("user-details", data.token);
        console.log("Sign-in successful");
        console.log(data.token);
      })
      .catch((error) => {
        console.error("Sign-in failed", error);
      });
    const result_token = localStorage.getItem("user-details");

    const token_response = jwt_decode(result_token);
    /* localStorage.setItem("user-details", token_response.email); */
    /* const tokenC = jwt_decode(result.token); */
    const { role, email } = token_response;
    alert(`Welcome ${email.split("@")[0]}`);

    setAuth({ role, email, result_token: result_token });

    console.log(auth.result_token);
    setUserData({
      name: "",
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
          className="inpt"
          type="text"
          name="name"
          value={userData.name}
          placeholder="Name"
          onChange={(e) => submitData(e)}
          id=""
        />
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
