import React, { useState } from "react";
import "./Banner.css";
import ActionModal from "./ActionModal";
// import BannerVideo from "../assets/logo/banner_video.mov"; // Make sure this file exists and is imported correctly

const Banner = () => {
  const bannerTexts = [
    {
      title: "Where Ambitious Brands Meet Smart Investors",
      subtitle: "Unlock partnerships and growth opportunities",
      button: "Register Here"
    }
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const { title, subtitle, button } = bannerTexts[0];

  const handleButtonClick = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <div id="home" className="banner">
        {/* Fullscreen video background */}
        <video
          className="banner-video"
          src="https://franmaxindia.com/event_video/banner_video.mov"
          autoPlay
          muted
          loop
          playsInline
        />

        {/* Overlay content */}
        <div className="overlay">
          <h1>{title}</h1>
          <p>{subtitle}</p>
          <button className="banner-btn" onClick={handleButtonClick}>
            {button}
          </button>
        </div>
      </div>

      {isModalOpen && <ActionModal onClose={() => setIsModalOpen(false)} />}
    </>
  );
};

export default Banner;
