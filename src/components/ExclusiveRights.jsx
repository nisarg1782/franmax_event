import React from "react";
import "./ExclusiveRights.css";
import { FaCrown, FaBullhorn, FaHandshake } from "react-icons/fa";
import franmaxLogo from "../assets/logo/franmax_logo.png";   // replace with your actual logo
import brandvolLogo from "../assets/logo/brand _vol.png"; // replace with your actual logo
// import commvolLogo from "../assets/logo/commvol.png";   // replace with your actual logo

const ExclusiveRights = () => {
  return (
    <section id="exclusive-rights" className="exclusive-section">
      <div className="exclusive-container">
        {/* Heading */}
        <h2 className="exclusive-title">Exclusive Rights</h2>
        <p className="exclusive-subtitle">
          Franchise Expo 2025 is proudly powered by trusted partners who make this event extraordinary.
        </p>

        {/* Partner Cards */}
        <div className="exclusive-cards">
          <div className="exclusive-card">
            <FaCrown className="exclusive-icon" />
            <img src={franmaxLogo} alt="Franmax India" className="exclusive-logo" />
            <h3>Organised & Managed By</h3>
            <p>Franmax India Pvt Ltd</p>
          </div>

          <div className="exclusive-card">
            <FaBullhorn className="exclusive-icon" />
            <img src={brandvolLogo} alt="BrandVol" className="exclusive-logo" />
            <h3>Digital Media Partner</h3>
            <p>BrandVol</p>
          </div>

          <div className="exclusive-card">
            <FaHandshake className="exclusive-icon" />
            <img src={franmaxLogo} alt="CommVol" className="exclusive-logo" />
            <h3>Leasing Partner</h3>
            <p>Clarify Commercial</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExclusiveRights;
