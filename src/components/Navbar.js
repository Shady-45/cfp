import React, { useContext, useState, useRef } from "react";
import "../Cascading-Style-Sheets/Navbar.css";
import { BsSearch } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import wallet from "../assets/wallet.png";
import metemask from "../assets/metamask.png";
import SignInuser from "./pages/Sign-in-user";
import SignInCreator from "./pages/Sign-in-creator";
import SignUpuser from "./pages/Sign-up-user";
import SignUpCreator from "./pages/Sign-up-creator";
import AuthContext from "../context/AuthProvider";

const Navbar = () => {
  const closeref = useRef(null);
  const [openWallet, setOpenWWallet] = useState(false);
  const { auth } = useContext(AuthContext);
  const [click, setClick] = useState(false);
  const [click2, setClick2] = useState(false);
  const [signIn, setSignIn] = useState(false);
  const [signUp, setSignUp] = useState(false);
  const [signInCreator, setSignInCreator] = useState(false);
  const [signUpCreator, setSignUpCreator] = useState(false);
  const [profile, setProfile] = useState(false);
  let user = localStorage.getItem("user-details");
  console.log(user);
  const navigate = useNavigate();
  const logOut = () => {
    localStorage.clear();
    navigate("/");
  };
  const close = () => {
    closeref.current.style.display = "none";
  };
  return (
    <>
      {/*      {openWallet ? (
        <div className="wallet-container" ref={closeref}>
          <AiOutlineClose className="close-wallet" onClick={close} />
          <div className="meta-mask">
            <p className="meta-text">Connect to Meta Mask Wallet</p>
            <img className="meta" src={metemask} alt="" />
          </div>
        </div>
      ) : null} */}

      {signIn ? <SignInuser /> : null}
      {signInCreator ? <SignInCreator /> : null}
      {signUp ? <SignUpuser /> : null}
      {signUpCreator ? <SignUpCreator /> : null}
      {auth.role === "creator" ? (
        <div className="nav">
          <input type="search" name="" id="" placeholder="Search" />
          <div className="search-logo">
            <BsSearch className="search-img" />
          </div>
          {!localStorage.getItem("user-details") ? (
            <div className="buttonns">
              <button className="btn-nav" onClick={() => setClick(!click)}>
                Sign In
              </button>
              {click ? (
                <ul className="sign-in">
                  <li
                    className="sign-in-user"
                    onClick={() => setSignIn(!signIn)}
                  >
                    Users
                  </li>
                  <li
                    className="sign-in-creators"
                    onClick={() => setSignInCreator(!signInCreator)}
                  >
                    Creators
                  </li>
                </ul>
              ) : null}
              <button className="btn-nav" onClick={() => setClick2(!click2)}>
                Sign Up
              </button>
              {click2 ? (
                <ul className="sign-up">
                  <li
                    className="sign-up-user"
                    onClick={() => setSignUp(!signUp)}
                  >
                    {" "}
                    Users
                  </li>
                  <li
                    className="sign-up-creators"
                    onClick={() => setSignUpCreator(!signUpCreator)}
                  >
                    Creators
                  </li>
                </ul>
              ) : null}
            </div>
          ) : null}

          <img
            src={wallet}
            onClick={() => setOpenWWallet(!openWallet)}
            height={45}
            width={45}
            alt=""
          />
          <span onClick={() => setProfile(!profile)} className="avatar"></span>
          {profile ? (
            <ul className="avatar-container">
              <li className="point">Upload</li>
              <hr />
              <li className="point">Favourites</li>
              <hr />
              <li className="point">Settings</li>
              <hr />
              <li className="point" onClick={logOut}>
                Log Out
              </li>
            </ul>
          ) : null}
        </div>
      ) : (
        <div className="nav">
          <input type="search" name="" id="" placeholder="Search" />
          <div className="search-logo">
            <BsSearch className="search-img" />
          </div>
          {!localStorage.getItem("user-details") ? (
            <div className="buttonns">
              <button className="btn-nav" onClick={() => setClick(!click)}>
                Sign In
              </button>
              {click ? (
                <ul className="sign-in">
                  <li
                    className="sign-in-user"
                    onClick={() => setSignIn(!signIn)}
                  >
                    Users
                  </li>
                  <li
                    className="sign-in-creators"
                    onClick={() => setSignInCreator(!signInCreator)}
                  >
                    Creators
                  </li>
                </ul>
              ) : null}
              <button className="btn-nav" onClick={() => setClick2(!click2)}>
                Sign Up
              </button>
              {click2 ? (
                <ul className="sign-up">
                  <li
                    className="sign-up-user"
                    onClick={() => setSignUp(!signUp)}
                  >
                    {" "}
                    Users
                  </li>
                  <li
                    className="sign-up-creators"
                    onClick={() => setSignUpCreator(!signUpCreator)}
                  >
                    Creators
                  </li>
                </ul>
              ) : null}
            </div>
          ) : null}

          <img
            src={wallet}
            onClick={() => setOpenWWallet(!openWallet)}
            height={45}
            width={45}
            alt=""
          />
          {profile ? (
            <ul className="avatar-container">
              <hr />
              <li className="point">Favourites</li>
              <hr />
              <li className="point">Settings</li>
              <hr />
              <li className="point" onClick={logOut}>
                Log Out
              </li>
            </ul>
          ) : null}
          <span onClick={() => setProfile(!profile)} className="avatar"></span>
        </div>
      )}
    </>
  );
};

export default Navbar;
