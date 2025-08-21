// import React from "react";
// import "./Navbar.css";
// import logo from "../assets/logo/logo.png";

// const Navbar = () => {
//   return (
//     <nav className="top-navbar">
//       <div className="logo">
//         <img src={logo} alt="Logo" />
//       </div>
//       <ul className="nav-links">
//         <li><a href="#home">Home</a></li>
//         <li><a href="#about">About Us</a></li>
//         <li><a href="#exclusive-rights">Exclusivity</a></li>
//         <li><a href="#contact">Contact</a></li>
//       </ul>
//     </nav>
//   );
// };

// export default Navbar;






import React, { useState } from "react";
import "./Navbar.css";
import logo from "../assets/logo/logo.png";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="top-navbar">
      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>

      {/* Navigation Links */}
      <ul className={`nav-links ${menuOpen ? "show" : ""}`}>
        <li><a href="#home" onClick={() => setMenuOpen(false)}>Home</a></li>
        <li><a href="#about" onClick={() => setMenuOpen(false)}>About Us</a></li>
        <li><a href="#exclusive-rights" onClick={() => setMenuOpen(false)}>Exclusivity</a></li>
        <li><a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a></li>
      </ul>

      {/* Hamburger Menu */}
      <div className="hamburger" onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </nav>
  );
};

export default Navbar;
