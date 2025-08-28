import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Homepage from "./components/HomePage";
import RegisterModal from "./components/RegisterModal"; // import your modal
import BookingModal from "./components/BookingModal";
import "./App.css";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="page-container">
        <Routes>
          {/* Default route for homepage */}
          <Route path="/" element={<Homepage />} />

          {/* New route for invastor page */}
          <Route path="/investor" element={<RegisterModal />} />
          <Route path="/brand" element={<BookingModal />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
