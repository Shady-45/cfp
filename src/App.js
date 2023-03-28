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

/* import Footer from "./components/Footer"; */

function App() {
  const [count, setCount] = useState(0);
  const [signUp, setSignUp] = useState(false);
  const [click, setClick] = useState(false);
  const [movieForm, setMovieForm] = useState(false);
  const [nftForm, setNftForm] = useState(false);
  const [musicForm, setMusicForm] = useState(false);
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
      />
      {/* 
      <Footer/> */}
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/music" element={<MusicPage />} />
        <Route path="/script" element={<ScriptPage />} />
        <Route path="/nfts" element={<MoviePage />} />

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
