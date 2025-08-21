import React from "react";
import Navbar from "./components/Navbar";
import Homepage from "./components/HomePage";

import "./App.css";

function App() {
  return (
    <>
      <Navbar />
      <div className="page-container">
        <Homepage />
      </div>
    </>
  );
}

export default App;
