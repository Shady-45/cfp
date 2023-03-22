import React, { useRef, useState, useContext } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import "../../Cascading-Style-Sheets/Navbar.css";
import axios from "../../api/axios";
import jwt_decode from "jwt-decode";
import AuthContext from "../../context/AuthProvider";

const SignInCreator = () => {
  const SIGNIN_URL = "auth/signIn";

  const { auth, setAuth } = useContext(AuthContext);
  const [response, setResponse] = useState({});
  const [creatorToken, setCreatorToken] = useState("");
  const [creatorData, setCreatorData] = useState({
    name: "",
    email: "",
    password: "",
    role: "creator",
  });
  const clickRef = useRef(null);
  const toggle = () => {
    clickRef.current.style.display = "none";
  };
  const submitUserForm = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(SIGNIN_URL, creatorData);
      console.log(response.data); // handle response data
      setCreatorToken(response.data.token);
    } catch (error) {
      console.error(error);
    }
    localStorage.setItem("user-details", creatorToken);
    const token_response = jwt_decode(creatorToken);
    /* localStorage.setItem("user-details", token_response.email); */
    /* const tokenC = jwt_decode(result.token); */
    const { role, email } = token_response;
    alert(`Welcome ${email.split("@")[0]}`);

    setAuth({ role, email, creatorToken: creatorToken });

    setCreatorData({
      name: "",
      email: "",
      password: "",
    });
  };

  const submitForm = (e) => {
    const postCreatorData = { ...creatorData };
    postCreatorData[e.target.name] = e.target.value;
    setCreatorData(postCreatorData);
    console.log(postCreatorData);
  };
  return (
    <div>
      <form
        ref={clickRef}
        onSubmit={(e) => submitUserForm(e)}
        className="sign-in-form"
      >
        <AiOutlineCloseCircle onClick={toggle} className="close" />
        <input
          type="text"
          name="name"
          className="inpt"
          placeholder="Name"
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

export default SignInCreator;
