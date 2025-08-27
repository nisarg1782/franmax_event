import React, { useEffect, useRef, useState } from "react";
import "./OurPartners.css";
import venueLogo from "../assets/logo/venue_partner.jpeg";
import franmaxLogo from "../assets/logo/franmax_logo.png";
import BrandVolLogo from '../assets/logo/brand _vol.png';
import RealEstateLogo from '../assets/logo/real_estate.jpg';
// import DivayLogo from '../assets/logo/divay_bhaskar.png';
// import TimesLogo from '../assets/logo/times_of.jpeg';

const OurPartners = () => {
  const partners = [
    // { name: "Print Media Partner", logo: GujaratLogo,company_name:"Gujarat Samachar"},
    // { name: "Print Media Partner", logo: DivayLogo,company_name:"Divya Bhaskar"},
    // { name: "Print Media Partner", logo: TimesLogo,company_name:"Times Of India"}, // change when real logo available
    // { name: "Venue", logo: venueLogo,company_name:"Taj Skyline"},
    { name: "Franchise Partner", logo: franmaxLogo, company_name: "FRANMAX INDIA" },
    { name: "Digital Media Partner", logo: BrandVolLogo, company_name: "BRANDVOL" }, // change when real logo available
    { name: "Leasing Partner", logo: RealEstateLogo,company_name:"FRANMAX INDIA"}, // change when real logo available
  ];

  const scrollRef = useRef(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % partners.length);
    }, 3000); // 3 seconds auto-scroll

    return () => clearInterval(interval);
  }, [partners.length]);

  useEffect(() => {
    if (scrollRef.current) {
      const scrollWidth = scrollRef.current.scrollWidth / partners.length;
      scrollRef.current.scrollTo({
        left: index * scrollWidth,
        behavior: "smooth",
      });
    }
  }, [index, partners.length]);
  return (
    <section className="partners-section">
      <div className="partners-container">
        <h2 className="partners-title">Our Partners</h2>
        <p className="partners-subtitle">
          We’re proud to collaborate with leading brands who make this event possible.
        </p>

        <div className="partners-scroll-wrapper" ref={scrollRef}>
          <div className="partners-grid">
            {partners.map((partner, idx) => (
              <div className="partner-card" key={idx}>
                <div className="partner-logo">
                  <img src={partner.logo} alt={partner.name} />
                  <h3 className="company-name">{partner.company_name}</h3>
                </div>
                <h3 className="partner-name">{partner.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurPartners;
