import React from "react";
import { Routes, Route } from "react-router-dom";
import Landingpage from "./components/LandingPage";


function App() {
  return (
    <div className="wrapper">
      <Routes>
        <Route path="/" element={<Landingpage />} />
      </Routes>
    </div>
  );
}

export default App;
