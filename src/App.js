import Navbar from "./components/Navbar";
import Hero from "./components/Hero";

import MusicPage from "../src/components/pages/MusicPage";
import MoviePage from "../src/components/pages/MoviePage";

import { Routes, Route } from "react-router-dom";
import ScriptPage from "./components/pages/ScriptPage";

import { useState, useEffect } from "react";
import axios from "./api/axios";
import Favourites from "./components/pages/Favourites";
import Works from "./components/pages/Works";
import MusicItem from "./components/pages/page-items/MusicItem";
import { useLocation } from "react-router-dom";
import ScriptItem from "./components/pages/page-items/ScriptItem";
import NftItem from "./components/pages/page-items/NftItem";
import Buys from "./components/pages/Buys";

/* import MusicItem from "./components/pages/page-items/MusicItem"; */

/* import Footer from "./components/Footer"; */

function App() {
  const location = useLocation();
  const regex_music = /\/musics\/(\d+)/;
  const regex_script = /\/scripts\/(\d+)/;
  const regex_nft = /\/nfts\/(\d+)/;
  const match_music = location.pathname.match(regex_music);
  const match_script = location.pathname.match(regex_script);
  const match_nft = location.pathname.match(regex_nft);
  const match_buy = location.pathname.match("/buys");
  const [count, setCount] = useState(0);
  const [signUp, setSignUp] = useState(false);
  const [click, setClick] = useState(false);
  const [movieForm, setMovieForm] = useState(false);
  const [nftForm, setNftForm] = useState(false);
  const [musicForm, setMusicForm] = useState(false);
  const [showSignUpError, setShowSignUpError] = useState(false);
  const [getCreatorMusicData, setgetCreatorMusicData] = useState([]);
  const [getCreatorScriptData, setgetCreatorScriptData] = useState([]);
  const [getCreatorNftData, setgetCreatorNftData] = useState([]);
  const [musicData, setMusicData] = useState([]);
  const GET_MUSIC_URL = "music/all";
  const GET_NFT_URL = "nft/all";
  const GET_SCRIPT_URL = "script/all";
  const [showSucessMessage, setShowSucessMessage] = useState(false);
  const [message, setMessage] = useState(" ");
  const [isDownloading, setIsDownloading] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [SignUpMess, setSignUpMess] = useState("");
  const [showSignUp, setShowSignUp] = useState(false);
  const signUpMessage = "";
  const [showUpload, setShowUpload] = useState(false);
  const [uploadMess, setUploadMess] = useState(" ");
  const [showError, setShowError] = useState(false);
  const [uploadError, setUploadError] = useState("");

  /* const GET_NFT_URL = "nft/all"; */
  const handleUpdateMusicData = (id) => {
    console.log(id);
  };
  useEffect(() => {
    axios.get(GET_MUSIC_URL).then((res) => setgetCreatorMusicData(res.data));
  }, []);
  useEffect(() => {
    axios.get(GET_SCRIPT_URL).then((res) => setgetCreatorScriptData(res.data));
  }, []);
  useEffect(() => {
    axios.get(GET_NFT_URL).then((res) => setgetCreatorNftData(res.data));
  }, []);

  return (
    <>
      {match_music || match_nft || match_script || match_buy ? null : (
        <Navbar
          signUp={signUp}
          setSignUp={setSignUp}
          count={count}
          setCount={setCount}
          click={click}
          setClick={setClick}
          movieForm={movieForm}
          setMovieForm={setMovieForm}
          musicForm={musicForm}
          setMusicForm={setMusicForm}
          nftForm={nftForm}
          setNftForm={setNftForm}
          SignUpMess={SignUpMess}
          setSignUpMess={setSignUpMess}
          showSignUp={showSignUp}
          setShowSignUp={setShowSignUp}
          showSucessMessage={showSucessMessage}
          signUpMessage={signUpMessage}
          setShowSucessMessage={setShowSucessMessage}
          showErrorMessage={showErrorMessage}
          setShowErrorMessage={setShowErrorMessage}
          message={message}
          setMessage={setMessage}
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
          showSignUpError={showSignUpError}
          setShowSignUpError={setShowSignUpError}
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
      )}

      {/* 
      <Footer/> */}
      <Routes>
        <Route
          path="/"
          element={
            <Hero
              musicData={musicData}
              setMusicData={setMusicData}
              setMessage={setMessage}
              message={message}
              setShowErrorMessage={setShowErrorMessage}
              showErrorMessage={showErrorMessage}
              setShowSucessMessage={setShowSucessMessage}
              showSucessMessage={showSucessMessage}
            />
          }
        />
        <Route path="/music" element={<MusicPage />} />
        <Route path="/script" element={<ScriptPage />} />
        <Route path="/nfts" element={<MoviePage />} />
        <Route
          path="/buys"
          element={
            <Buys
              isDownloading={isDownloading}
              setIsDownloading={setIsDownloading}
            />
          }
        />
        <Route path="/musics/:musicId" element={<MusicItem />} />
        <Route path="/scripts/:scriptId" element={<ScriptItem />} />
        <Route path="/nfts/:nftId" element={<NftItem />} />
        {/*   <Route path=":musicId" element={<MusicItem />} /> */}
        <Route
          path="/favourites"
          element={
            <Favourites
              handleUpdateMusicData={(id) => handleUpdateMusicData(id)}
              count={count}
            />
          }
        />
        <Route path="/works" element={<Works />} />
      </Routes>
    </>
  );
}

export default App;
