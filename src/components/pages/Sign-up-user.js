import React, { useRef } from "react";
import { useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import "../../Cascading-Style-Sheets/Navbar.css";
import axios from "../../api/axios";
import { useNavigate } from "react-router-dom";

const SignUpuser = ({
  signUp,
  setSignUp,
  showSucessMessage,
  setShowSucessMessage,
  showErrorMessage,
  setShowErrorMessage,
  message,
  setMessage,
}) => {
  const navigate = useNavigate();
  const [userEthAccount, setUserEthAccount] = useState(" ");
  const [errorMessage, setErrorMessage] = useState(false);
  const [sucessMessage, setSucessMessage] = useState(false);

  const SIGNUP_URL = "auth/signUp";
  const [showForm, setShowForm] = useState(true);
  const role = "creator";

  window.ethereum.request({ method: "eth_requestAccounts" }).then((res) => {
    // Return the address of the wallet
    setUserEthAccount(res[0]);
  });

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    role: role,
    account: userEthAccount,
  });

  const toggle = () => {
    setSignUp(!signUp);
  };
  const submitUserForm = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `https://www.fundingportal.site/auth/signUp`,
        JSON.stringify({
          name: userData.name,
          email: userData.email,
          password: userData.password,
          role: role,
          account: userEthAccount,
        }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      let messageData = response.data;
      console.log(messageData);
      setShowSucessMessage(!showSucessMessage);
      setMessage(messageData);
    } catch (err) {
      console.log(err);
      setShowErrorMessage(!setErrorMessage);
      setMessage("Check");
    }
    setUserData({
      name: "",
      email: "",
      password: "",
      role: role,
      account: userEthAccount,
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

  return (
    <div>
      {sucessMessage ? (
        <div>
          <h2 className="analytic">User SucessFully Signed In</h2>
        </div>
      ) : null}
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
