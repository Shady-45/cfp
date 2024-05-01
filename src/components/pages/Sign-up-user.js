import React, { useRef, useEffect } from "react";
import { useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import "../../Cascading-Style-Sheets/Navbar.css";
import axios from "../../api/axios";

const SignUpuser = ({
  signUp,
  setSignUp,
  showSucessMessage,
  setShowSucessMessage,
  showErrorMessage,
  setShowErrorMessage,
  message,
  setMessage,
  SignUpMess,
  setSignUpMess,
  showSignUp,
  setShowSignUp,
  signUpMessage,
  errorMessage,
  setErrorMessage,
  setShowSignUpError,
  showSignUpError,
}) => {
  const [userEthAccount, setUserEthAccount] = useState(" ");
  const [userId, setUserId] = useState(1e9);
  const [otpForm, setOtpForm] = useState(false);
  const SIGNUP_URL = "auth/signUp";
  const [showForm, setShowForm] = useState(true);
  const role = "creator";
  const [otp, setOtp] = useState("");
  useEffect(() => {
    let timeout;
    if (otpForm) {
      timeout = setTimeout(() => {
        setOtpForm(false);
      }, 120000); // 5000 milliseconds = 5 seconds
    }
    return () => clearTimeout(timeout);
  }, [showSucessMessage]);
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
    setShowForm(!setShowForm);
    setSignUp(!signUp);
  };
  const toggleOtp = () => {
    setOtpForm(!otpForm);
  };
  const submitOtpForm = async (e) => {
    e.preventDefault();
    try {
      const otpData = await axios.post(
        "https://api.indiecrypt.online/auth/verify",
        JSON.stringify({
          userId: userId,
          otp: otp,
        }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      let otpResponse = otpData.data;

      if (otpResponse.message === "otp verified successfully") {
        setOtpForm(!otpForm);
        setShowSignUp(!showSignUp);
        setSignUpMess(otpResponse.message);
        setShowForm(false);
        setSignUp(false);
      }
    } catch (err) {
      console.log(err);
      setShowSignUpError(!showSignUpError);
      setErrorMessage(err.response.data.message);
      setOtpForm(!otpForm);
      setShowForm(false);
      setSignUp(false);
    }
  };
  const submitUserForm = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `https://api.indiecrypt.online/auth/signUp`,
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
      setUserId(messageData.userId);
      if (messageData.message === "otp sent successfully, please verify") {
        setOtpForm(!otpForm);
        setShowForm(false);
      }
    } catch (err) {
      console.log(err);
      setShowSignUpError(!showSignUpError);
      setErrorMessage(err.response.data.message);
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
    const postUserData = { ...userData };
    postUserData[e.target.name] = e.target.value;
    setUserData(postUserData);
  };

  const clickRef = useRef(null);

  return (
    <div>
      {otpForm ? (
        <form className="sign-in-form" onSubmit={(e) => submitOtpForm(e)}>
          <AiOutlineCloseCircle onClick={toggleOtp} className="close-otp" />
          <h3>Please Enter the Otp </h3>
          <input
            type="text"
            name="num"
            placeholder="Enter Otp"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            id=""
          />
          <button type="submit" className="btn">
            Submit
          </button>
        </form>
      ) : null}
      {showForm ? (
        <form className="sign-in-form">
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

          <button
            onClick={(e) => submitUserForm(e)}
            ref={clickRef}
            className="btn"
          >
            Submit
          </button>
          <button
            onClick={(e) => {
              setOtpForm(!otpForm);
              setShowForm(false);
            }}
            ref={clickRef}
            className="btn"
          >
            verify OTP
          </button>
        </form>
      ) : null}
    </div>
  );
};

export default SignUpuser;
