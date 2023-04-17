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
import { RiCloseLine } from "react-icons/ri";
import { ImMenu } from "react-icons/im";
import Movieform from "./pages/uploads/Movieform";
import NftForm from "./pages/uploads/NftForm";
import jwt_decode from "jwt-decode";
import MusicForm from "./pages/uploads/MusicForm";
import Web3 from "web3";
import { SiBlockchaindotcom } from "react-icons/si";
import { CgProfile } from "react-icons/cg";
import { RiCloseFill } from "react-icons/ri";
import { BsCheckCircleFill } from "react-icons/bs";
import { FiMenu } from "react-icons/fi";

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
  signUpMessage,
  SignUpMess,
  setSignUpMess,
  showSignUp,
  setShowSignUp,
  errorMessage,
  setErrorMessage,
  showSignUpError,
  setShowSignUpError,
  showUpload,
  setShowUpload,
  uploadMess,
  setUploadMess,
  showError,
  setShowError,
  uploadError,
  setUploadError,
  musicData,
  setMusicData,
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
    let timeout;
    if (SignUpMess) {
      timeout = setTimeout(() => {
        setShowSignUp(false);
      }, 3000); //
    }
    return () => clearTimeout(timeout);
  }, [showSignUp]);
  useEffect(() => {
    let timeout;
    if (uploadMess) {
      timeout = setTimeout(() => {
        setShowUpload(false);
      }, 3000); //
    }
    return () => clearTimeout(timeout);
  }, [showUpload]);
  useEffect(() => {
    let timeout;
    if (uploadError) {
      timeout = setTimeout(() => {
        setShowError(false);
      }, 3000); //
    }
    return () => clearTimeout(timeout);
  }, [uploadError]);
  useEffect(() => {
    let timeout_error;
    if (showErrorMessage) {
      timeout_error = setTimeout(() => {
        setShowErrorMessage(false);
      }, 3000); // 5000 milliseconds = 5 seconds
    }
    return () => clearTimeout(timeout_error);
  }, [showErrorMessage]);
  useEffect(() => {
    let timeout_signUp_error;
    if (showSignUpError) {
      timeout_signUp_error = setTimeout(() => {
        setShowSignUpError(false);
      }, 3000); // 5000 milliseconds = 5 seconds
    }
    return () => clearTimeout(timeout_signUp_error);
  }, [showSignUpError]);

  const navigate = useNavigate();
  const [openNavbar, setOpenNavBar] = useState(false);
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
  console.log(SignUpMess);
  console.log(setShowSignUp);
  return (
    <>
      {showSucessMessage ? (
        <span className="sucess-message">{message}</span>
      ) : null}
      {showUpload ? <span className="sucess-message">{uploadMess}</span> : null}
      {showError ? <span className="error-message">{uploadError}</span> : null}
      {showSignUp ? (
        <span className="sucess-message-signup">{SignUpMess}</span>
      ) : null}
      {showErrorMessage ? (
        <span className="error-message">{message}</span>
      ) : null}
      {showSignUpError ? (
        <span className="error-message">{errorMessage}</span>
      ) : null}
      {signIn ? (
        <SignUpuser
          showSucessMessage={showSucessMessage}
          setShowSucessMessage={setShowSucessMessage}
          message={message}
          setMessage={setMessage}
        />
      ) : null}
      {signInCreator ? <SignInCreator /> : null}
      {signUp ? (
        <SignUpuser
          signUp={signUp}
          setSignUp={setSignUp}
          signUpMessage={signUpMessage}
          SignUpMess={SignUpMess}
          setSignUpMess={setSignUpMess}
          showSignUp={showSignUp}
          setShowSignUp={setShowSignUp}
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
          showErrorMessage={showErrorMessage}
          setShowErrorMessage={setShowErrorMessage}
          showSignUpError={showSignUpError}
          setShowSignUpError={setShowSignUpError}
        />
      ) : null}
      {signUpCreator ? <SignUpCreator /> : null}
      {movieForm ? (
        <Movieform
          movieForm={movieForm}
          setMovieForm={setMovieForm}
          uploadMess={uploadMess}
          setUploadMess={setUploadMess}
          showError={showError}
          setShowError={setShowError}
          uploadError={uploadError}
          setUploadError={setUploadError}
        />
      ) : null}
      {nftForm ? (
        <NftForm
          nftForm={nftForm}
          setNftForm={setNftForm}
          uploadMess={uploadMess}
          setUploadMess={setUploadMess}
          showError={showError}
          setShowError={setShowError}
          uploadError={uploadError}
          setUploadError={setUploadError}
        />
      ) : null}
      {musicForm ? (
        <MusicForm
          musicForm={musicForm}
          setMusicForm={setMusicForm}
          showUpload={showUpload}
          setShowUpload={setShowUpload}
          uploadMess={uploadMess}
          setUploadMess={setUploadMess}
          showError={showError}
          setShowError={setShowError}
          uploadError={uploadError}
          setUploadError={setUploadError}
          musicData={musicData}
          setMusicData={setMusicData}
        />
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
        <div>
          {window.ethereum ? (
            <div className="nav-main">
              <Link to="/">
                {" "}
                <div className="logo-main-new">
                  <SiBlockchaindotcom />
                  <h3>IndieCrypt</h3>
                </div>
              </Link>
              <div
                className={`${openNavbar ? "nav-items" : "nav-items-mobile"}`}
              >
                <div className="search-logo-main">
                  <input
                    type="search"
                    className="search-inpt"
                    name=""
                    id=""
                    placeholder="Search"
                  />
                </div>

                <div>
                  <div className="buttonns">
                    <button
                      className="btn-nav"
                      onClick={() => setClick(!click)}
                    >
                      Sign In
                    </button>
                    {click ? (
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
                    <button
                      className="btn-nav"
                      onClick={() => setSignUp(!signUp)}
                    >
                      Sign Up
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
          {window.ethereum ? (
            <div onClick={() => setOpenNavBar(!openNavbar)} className="icons">
              {openNavbar ? <RiCloseLine /> : <ImMenu />}
            </div>
          ) : null}
        </div>
      ) : (
        <main>
          {window.ethereum ? (
            <div className="nav-main">
              <div className="nav-mobilee">
                <Link to="/">
                  <div className="logo-main-new">
                    <SiBlockchaindotcom />
                    <h3>IndieCrypt</h3>
                  </div>
                </Link>
                <div onClick={() => setClick2(!click2)} className="menu-close">
                  {click2 ? <RiCloseFill className="close-form" /> : <FiMenu />}
                </div>
              </div>

              <div
                className={`${click2 ? "container-nav" : "container-close"}`}
              >
                <div className="search-logo-main">
                  <input
                    type="search-main"
                    name=""
                    id=""
                    placeholder="Search"
                  />
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
                    <Link to="/buys" className="class">
                      <li className="point">Buys</li>
                    </Link>
                    <hr />
                    <li className="point" onClick={logOut}>
                      Log Out
                    </li>
                  </ul>
                ) : null}
                <ul className="avatar-container-mobile">
                  <Link to="/favourites" className="class">
                    <li onClick={handleCount} className="point">
                      Favourites
                    </li>
                  </Link>

                  <Link to="/works" className="class">
                    <li onClick={handleCount} className="point">
                      Works
                    </li>
                  </Link>

                  <li className="point" onClick={logOut}>
                    Log Out
                  </li>
                </ul>
              </div>

              <CgProfile
                className="profile-icon"
                onClick={() => setProfile(!profile)}
              />
            </div>
          ) : null}
        </main>
      )}
    </>
  );
};

export default Navbar;
