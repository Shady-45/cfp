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
    try {
      const response = await axios.post(
        SIGNIN_URL,
        JSON.stringify({
          name: userData.name,
          email: userData.email,
          password: userData.password,
          role: "user",
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      const result_token = JSON.stringify(response?.data?.token?.split(" ")[1]);

      const token_response = jwt_decode(result_token);
      localStorage.setItem("user-details", token_response);
      /* const tokenC = jwt_decode(result.token); */
      const { role, email } = token_response;
      alert(`Welcome ${email.split("@")[0]}`);

      setAuth({ role, email, result_token });
      console.log(auth.role);
      console.log(auth.email);
      console.log(result_token);

      /* console.log(response.accessToken); */
    } catch (err) {
      console.log(err);
      alert(err);
    }
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
