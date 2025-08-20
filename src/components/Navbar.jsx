import React from "react";
import "./Navbar.css";
import logo from "../assets/logo/logo.png";

const Navbar = () => {
  return (
    <nav className="top-navbar">
      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>
      <ul className="nav-links">
        <li><a href="#home">Home</a></li>
        <li><a href="#about">About Us</a></li>
        <li><a href="#exclusive-rights">Exclusivity</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;
