import React, { useRef, useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import "../../Cascading-Style-Sheets/Navbar.css";
import axios from "../../api/axios";
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
        SIGNUP_URL,
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
      console.log(response.data);
      alert(response.data.message);
      /* console.log(response.accessToken); */
    } catch (err) {
      console.log(err);
    }
    setCreatorData({
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

    const postCreatorData = { ...creatorData };
    postCreatorData[e.target.name] = e.target.value;
    setCreatorData(postCreatorData);
    console.log(postCreatorData);
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
          value={creatorData.name}
          onChange={(e) => submitForm(e)}
          className="inpt"
          type="text"
          name="name"
          placeholder="Name"
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
