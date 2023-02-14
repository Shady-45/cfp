import React, { useRef } from "react";
import { useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import "../../Cascading-Style-Sheets/Navbar.css";
import axios from "../../api/axios";

const SignUpuser = () => {
  const SIGNUP_URL = "auth/signUp";
  const [showForm, setShowForm] = useState(true);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });
  const submitUserForm = async (e) => {
    e.preventDefault();
    /*  const rawResponse = await fetch(host, {
      method: "POST",
      headers: {
        Accept: "application/json",

        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: userData.name,
        email: userData.email,
        password: userData.password,
        role: "user",
      }),
    }); */
    try {
      const response = await axios.post(
        SIGNUP_URL,
        JSON.stringify({
          name: userData.name,
          email: userData.email,
          password: userData.password,
          role: "user",
        }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      let messageData = response.data;
      console.log(messageData);
      alert(messageData.message);

      /*  {
        messageData ? alert(messageData.message) : alert("pls check");
      } */

      /* console.log(response.accessToken); */
    } catch (err) {
      console.log(err);
    }
    setUserData({
      name: "",
      email: "",
      password: "",
    });
  };
  const submitForm = (e) => {
    /*   fetch(`${host}/auth/signUp`)
      .then((res) => res.json)
      .then((result) => console.log(result));
      
 */

    const postUserData = { ...userData };
    postUserData[e.target.name] = e.target.value;
    setUserData(postUserData);
    console.log(postUserData);
  };

  const clickRef = useRef(null);
  const toggle = () => {
    clickRef.current.style.display = "none";
  };
  return (
    <div>
      {showForm ? (
        <form
          onSubmit={(e) => submitUserForm(e)}
          ref={clickRef}
          className="sign-in-form"
        >
          <AiOutlineCloseCircle onClick={toggle} className="close" />
          <input
            className="inpt"
            type="text"
            name="name"
            placeholder="Name"
            id=""
            value={userData.name}
            onChange={(e) => submitForm(e)}
          />

          <input
            className="inpt"
            type="email"
            placeholder="Email"
            name="email"
            id=""
            value={userData.email}
            onChange={(e) => submitForm(e)}
          />

          <input
            className="inpt"
            type="password"
            placeholder="Password"
            name="password"
            value={userData.password}
            onChange={(e) => submitForm(e)}
            id=""
          />
          <button className="btn">Submit</button>
        </form>
      ) : null}
    </div>
  );
};

export default SignUpuser;
