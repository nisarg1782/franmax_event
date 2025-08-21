import React, { useState } from "react";
import "./ActionModal.css";
import { FaHandshake, FaChartLine, FaBuilding } from "react-icons/fa";
import logo from '../assets/logo/logo.png';

// Import your existing modals
import StallBookingModal from "./BookingModal";
import InvestorRegistrationModal from "./RegisterModal";

const ActionModal = ({ onClose }) => {
  const [activeModal, setActiveModal] = useState("main"); 
  // 'main' | 'stall' | 'investor'

  const handleBack = () => {
    setActiveModal("main");
  };

  return (
    <>
      {/* Main Modal */}
      {activeModal === "main" && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="modal-close" onClick={onClose}>
              &times;
            </button>

            {/* Logo */}
            <div className="modal-logo">
              <img src={logo} alt="FranExpo Logo" />
            </div>

            {/* Heading */}
            <h2 className="modal-title">Join Franchise Expo 2025</h2>
            <p className="modal-subtitle">
              Explore endless opportunities, connect with industry leaders, and grow your network.
            </p>

            {/* Benefits Section */}
            <div className="modal-benefits">
              <div className="benefit-card">
                <FaHandshake className="benefit-icon" />
                <p>Connect with 100+ Brands</p>
              </div>
              <div className="benefit-card">
                <FaChartLine className="benefit-icon" />
                <p>Learn from Industry Experts</p>
              </div>
              <div className="benefit-card">
                <FaBuilding className="benefit-icon" />
                <p>1000+ Business Visitors</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="modal-buttons">
              <button 
                className="modal-btn stall" 
                onClick={() => setActiveModal("stall")}
              >
                Stall Booking
              </button>
              {/* <button className="modal-btn sponsor">
                Sponsor Registration
              </button> */}
              <button 
                className="modal-btn investor" 
                onClick={() => setActiveModal("investor")}
              >
                Investor Registration
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Stall Booking Modal */}
      {activeModal === "stall" && (
        <StallBookingModal 
          onClose={onClose} 
          onBack={handleBack} 
        />
      )}

      {/* Investor Registration Modal */}
      {activeModal === "investor" && (
        <InvestorRegistrationModal 
          onClose={onClose} 
          onBack={handleBack} 
        />
      )}
    </>
  );
};

export default ActionModal;
