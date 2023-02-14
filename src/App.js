import Navbar from "./components/Navbar";
import Hero from "./components/Hero";

import MusicPage from "../src/components/pages/MusicPage";
import MoviePage from "../src/components/pages/MoviePage";

import { Routes, Route } from "react-router-dom";
import ScriptPage from "./components/pages/ScriptPage";

/* import Footer from "./components/Footer"; */

function App() {
  return (
    <>
      <Navbar />
      {/* 
      <Footer/> */}
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/music" element={<MusicPage />} />
        <Route path="/script" element={<ScriptPage />} />
        <Route path="/nfts" element={<MoviePage />} />
      </Routes>
    </>
  );
}

export default App;
