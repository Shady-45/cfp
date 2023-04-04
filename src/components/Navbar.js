import React, { useEffect, useState, useRef } from "react";
import "../Cascading-Style-Sheets/Navbar.css";
import { BsSearch } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import wallet from "../assets/wallet.png";
import metemask from "../assets/metamask.png";
import SignInuser from "./pages/Sign-in-user";
import SignInCreator from "./pages/Sign-in-creator";
import SignUpuser from "./pages/Sign-up-user";
import SignUpCreator from "./pages/Sign-up-creator";

import Movieform from "./pages/uploads/Movieform";
import NftForm from "./pages/uploads/NftForm";
import jwt_decode from "jwt-decode";
import MusicForm from "./pages/uploads/MusicForm";
import Web3 from "web3";
import { SiBlockchaindotcom } from "react-icons/si";
import { CgProfile } from "react-icons/cg";

const Navbar = ({
  count,
  setCount,
  signUp,
  setSignUp,
  click,
  setClick,
  movieForm,
  setMovieForm,
  musicForm,
  setMusicForm,
  nftForm,
  setNftForm,
  showSucessMessage,
  setShowSucessMessage,
  showErrorMessage,
  setShowErrorMessage,
  message,
  setMessage,
  userEthAccount,
  setUserEthAccount,
}) => {
  useEffect(() => {
    let timeout;
    if (showSucessMessage) {
      timeout = setTimeout(() => {
        setShowSucessMessage(false);
      }, 3000); // 5000 milliseconds = 5 seconds
    }
    return () => clearTimeout(timeout);
  }, [showSucessMessage]);
  useEffect(() => {
    let timeout_error;
    if (showErrorMessage) {
      timeout_error = setTimeout(() => {
        setShowErrorMessage(false);
      }, 3000); // 5000 milliseconds = 5 seconds
    }
    return () => clearTimeout(timeout_error);
  }, [showErrorMessage]);

  const navigate = useNavigate();

  const handleCount = () => {
    setCount(count + 1);
    setProfile(!profile);
    console.log(count);
  };

  const closeref = useRef(null);
  const [openWallet, setOpenWWallet] = useState(false);

  const [upload, setUpload] = useState(false);
  const [click2, setClick2] = useState(false);
  const [signIn, setSignIn] = useState(false);

  const [signInCreator, setSignInCreator] = useState(false);
  const [signUpCreator, setSignUpCreator] = useState(false);
  const [profile, setProfile] = useState(false);

  const logOut = () => {
    localStorage.removeItem("user-details");
    navigate("/");
  };

  return (
    <>
      {showSucessMessage ? (
        <span className="sucess-message">{message}</span>
      ) : null}
      {showErrorMessage ? (
        <span className="error-message">{message}</span>
      ) : null}
      {/*      {openWallet ? (
        <div className="wallet-container" ref={closeref}>
          <AiOutlineClose className="close-wallet" onClick={close} />
          <div className="meta-mask">
            <p className="meta-text">Connect to Meta Mask Wallet</p>
            <img className="meta" src={metemask} alt="" />
          </div>
        </div>
      ) : null} */}

      {signIn ? (
        <SignUpuser
          showSucessMessage={showSucessMessage}
          setShowSucessMessage={setShowSucessMessage}
          showErrorMessage={showErrorMessage}
          setShowErrorMessage={setShowErrorMessage}
          message={message}
          setMessage={setMessage}
        />
      ) : null}
      {signInCreator ? <SignInCreator /> : null}
      {signUp ? <SignUpuser signUp={signUp} setSignUp={setSignUp} /> : null}
      {signUpCreator ? <SignUpCreator /> : null}
      {movieForm ? (
        <Movieform movieForm={movieForm} setMovieForm={setMovieForm} />
      ) : null}
      {nftForm ? <NftForm nftForm={nftForm} setNftForm={setNftForm} /> : null}
      {musicForm ? (
        <MusicForm musicForm={musicForm} setMusicForm={setMusicForm} />
      ) : null}
      {upload ? (
        <div>
          <ul className="upload-container">
            <li
              onClick={() => {
                setMusicForm(!musicForm);
                setUpload(!upload);
              }}
            >
              Music
            </li>
            <hr />
            <li
              onClick={() => {
                setMovieForm(!movieForm);
                setUpload(!upload);
              }}
            >
              Script
            </li>
            <hr />
            <li
              onClick={() => {
                setNftForm(!nftForm);
                setUpload(!upload);
              }}
            >
              NFTs
            </li>
          </ul>
        </div>
      ) : null}
      {!localStorage.getItem("user-details") &&
      localStorage.getItem("user-details") !== undefined ? (
        <div className="nav-main">
          <Link to="/">
            {" "}
            <div className="logo-main-new">
              <SiBlockchaindotcom />
              <h3>IndieCrypt</h3>
            </div>
          </Link>

          <div className="search-logo-main">
            <input
              type="search"
              className="search-inpt"
              name=""
              id=""
              placeholder="Search"
            />
            {/*  <BsSearch className="search-img-main" /> */}
          </div>

          <div>
            <div className="buttonns">
              <button className="btn-nav" onClick={() => setClick(!click)}>
                Sign In
              </button>
              {click ? (
                /*  <ul className="sign-in">
                  <li
                    className="sign-in-user"
                    onClick={() => {
                      setSignIn(!signIn);
                      setClick(!click);
                    }}
                  >
                    Users
                  </li>
                  <li
                    className="sign-in-creators"
                    onClick={() => setSignInCreator(!signInCreator)}
                  >
                    Creators
                  </li>
                </ul> */
                <SignInuser
                  showSucessMessage={showSucessMessage}
                  setShowSucessMessage={setShowSucessMessage}
                  showErrorMessage={showErrorMessage}
                  setShowErrorMessage={setShowErrorMessage}
                  message={message}
                  setMessage={setMessage}
                  click={click}
                  setClick={setClick}
                />
              ) : null}
              <button className="btn-nav" onClick={() => setSignUp(!signUp)}>
                Sign Up
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="nav-main">
          {" "}
          <Link to="/">
            <div className="logo-main-new">
              <SiBlockchaindotcom />
              <h3>IndieCrypt</h3>
            </div>
          </Link>
          <div className="search-logo-main">
            <input type="search-main" name="" id="" placeholder="Search" />
            <BsSearch className="search-img-main" />
          </div>
          <button onClick={() => setUpload(!upload)} className="btn-nav">
            Upload
          </button>
          {profile && localStorage.getItem("user-details") ? (
            <ul className="avatar-container-new">
              <Link to="/favourites" className="class">
                <li onClick={handleCount} className="point">
                  Favourites
                </li>
              </Link>
              <hr />
              <Link to="/works" className="class">
                <li onClick={handleCount} className="point">
                  Works
                </li>
              </Link>
              <hr />

              <li className="point" onClick={logOut}>
                Log Out
              </li>
            </ul>
          ) : null}
          <CgProfile
            className="profile-icon"
            onClick={() => setProfile(!profile)}
          />
          {/* <div>
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
      </div> */}
        </div>
      )}
    </>
  );
};

export default Navbar;
