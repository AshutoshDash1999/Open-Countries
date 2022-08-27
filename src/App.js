import React, { useState } from "react";
import {
  Routes,
  Route,
} from "react-router-dom";
import AboutCountry from "./Pages/AboutCountry/AboutCountry";
import Home from "./Pages/Home/Home";

function App() {
  
  return (
    <>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/aboutCountry/:countryName" element={<AboutCountry/>} />
    </Routes>
    </>
  );
}

export default App;
