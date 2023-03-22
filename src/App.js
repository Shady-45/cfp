import Navbar from "./components/Navbar";
import Hero from "./components/Hero";

import MusicPage from "../src/components/pages/MusicPage";
import MoviePage from "../src/components/pages/MoviePage";

import { Routes, Route } from "react-router-dom";
import ScriptPage from "./components/pages/ScriptPage";
import Profile from "./components/pages/Profile";
import { useState, useEffect } from "react";
import axios from "./api/axios";

/* import Footer from "./components/Footer"; */

function App() {
  const [count, setCount] = useState(0);
  const [userToken, setUserToken] = useState(null);
  const [getCreatorMusicData, setgetCreatorMusicData] = useState([]);
  const [getCreatorScriptData, setgetCreatorScriptData] = useState([]);
  const [getCreatorNftData, setgetCreatorNftData] = useState([]);

  const GET_MUSIC_URL = "music/all";
  const GET_NFT_URL = "nft/all";
  const GET_SCRIPT_URL = "script/all";

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
      <Navbar
        userToken={userToken}
        setUserToken={setUserToken}
        count={count}
        setCount={setCount}
      />
      {/* 
      <Footer/> */}
      <Routes>
        <Route
          path="/"
          element={<Hero userToken={userToken} setUserToken={setUserToken} />}
        />
        <Route path="/music" element={<MusicPage />} />
        <Route path="/script" element={<ScriptPage />} />
        <Route path="/nfts" element={<MoviePage />} />

        <Route
          path="/profile"
          element={
            <Profile
              handleUpdateMusicData={(id) => handleUpdateMusicData(id)}
              count={count}
            />
          }
        />
      </Routes>
    </>
  );
}

export default App;
