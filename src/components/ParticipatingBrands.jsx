import React, { useEffect, useRef, useState } from "react";
import "./ParticipatingBrands.css";

import Nadiyad from '../assets/logo/Nadiyad Puff.jpg';
import Aamchi from '../assets/logo/Aamchi.jpg'
import Baby from '../assets/logo/All Rice.jpg'
import Chinese from '../assets/logo/chinese.jpg'
import Crazy from '../assets/logo/Crispy Crazy.jpg'
import Desi from '../assets/logo/Desi.jpg'
import Frankistan from '../assets/logo/frankiestan.jpg'
import Ghee from '../assets/logo/ghee dosa.jpg'
import Lakhnavi from '../assets/logo/lakhnavi.jpg'
import Magic from '../assets/logo/Megic.jpg'
import Mexi from '../assets/logo/mexi.jpg';
import minoling from '../assets/logo/minoling.jpg'
import Samocha from '../assets/logo/samocha.png';



const OurPartners = () => {
  const partners = [
    // { name: "Print Media Partner", logo: GujaratLogo,company_name:"Gujarat Samachar"},
    // change when real logo available
    { name: "", logo: Nadiyad,company_name:"Nadiad Special Puff"},
    { name: "", logo: Aamchi,company_name:"Aamchi Tumchi Mumbai"}, // change when real logo available
     { name: "", logo: Baby,company_name:"ALL Rice Baby"},  
    { name: "", logo: Chinese,company_name:"Chinese Nonsense"},
    { name: "", logo: Crazy,company_name:"Crispy Crazy Starters"},
    { name: "", logo: Desi,company_name:"Dilli Heart"},
    { name: "", logo: Frankistan,company_name:"Frankiestaan"},
    { name: "", logo: Ghee,company_name:"Ghee Dosa"},
    { name: "", logo: Lakhnavi,company_name:"Lakhnawi Chaatpati"},
    { name: "", logo: Magic,company_name:"Magic Of Momos"},
    { name: "", logo: Mexi,company_name:"Mexi Culture"},
    { name: "", logo: minoling,company_name:"Mingling Bread"},
    { name: "", logo: Samocha,company_name:"Samocha"},
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
    <section className="partners-section" id="particpiating-brands">
      <div className="partners-container">
        <h2 className="partners-title">Participating Brands </h2>
        <p className="partners-subtitle">
       Showcasing the presence of top brands that help shape this event.
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
