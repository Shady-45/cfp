import Navbar from "./components/Navbar";
import Hero from "./components/Hero";

import MusicPage from "../src/components/pages/MusicPage";
import MoviePage from "../src/components/pages/MoviePage";

import { Routes, Route } from "react-router-dom";
import ScriptPage from "./components/pages/ScriptPage";
import Profile from "./components/pages/Profile";
import { useState } from "react";

/* import Footer from "./components/Footer"; */

function App() {
  const [count, setCount] = useState(0);
  return (
    <>
      <Navbar count={count} setCount={setCount} />
      {/* 
      <Footer/> */}
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/music" element={<MusicPage />} />
        <Route path="/script" element={<ScriptPage />} />
        <Route path="/nfts" element={<MoviePage />} />
        <Route path="/profile" element={<Profile count={count} />} />
      </Routes>
    </>
  );
}

export default App;
