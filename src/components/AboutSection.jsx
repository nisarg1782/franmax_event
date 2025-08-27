import React, { useEffect, useState } from "react";
import { FaBuilding, FaUsers, FaMapMarkerAlt } from "react-icons/fa";
import './AboutSection.css';

const AboutSection = () => {
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        // Trigger animation after component mounts
        const timer = setTimeout(() => setAnimate(true), 200);
        return () => clearTimeout(timer);
    }, []);

    return (
        <section id="about" className="about-section">
            <div className={`about-content ${animate ? "animate" : ""}`}>
                <h2 className="about-title">Welcome to <span>FRANEXPO 2025</span></h2>
                <p className="about-quote">
                    "Where industry-leading brands meet 2000+ passionate visitors under one roof!"
                </p>
                <p className="about-description">
                    Franchise Expo 2025 will be hosted at the luxurious <strong>Taj Skyline, Ahmedabad on Sunday,14 September 2025</strong>.
                    A unique platform where multiple top brands across industries will showcase their offerings,
                    network with professionals, and connect with entrepreneurs eager to explore new opportunities.
                </p>

                <div className="about-highlights">
                    <div className="highlight-card">
                        <a
                            href="https://www.google.com/maps?rlz=1C1VDKB_enIN1120IN1121&gs_lcrp=EgZjaHJvbWUqGwgBEC4YDRivARjHARixAxiABBiYBRiZBRieBTIGCAAQRRg5MhsIARAuGA0YrwEYxwEYsQMYgAQYmAUYmQUYngUyDwgCEC4YDRivARjHARiABDIJCAMQABgNGIAEMgkIBBAAGA0YgAQyCQgFEAAYDRiABDIJCAYQABgNGIAEMgkIBxAAGA0YgAQyCQgIEAAYDRiABNIBCTM3NjRqMGoxNagCCLACAfEFGF9ljQhtHqs&um=1&ie=UTF-8&fb=1&gl=in&sa=X&geocode=KZHa6Bhjm145MT-VzGEktEuG&daddr=Taj+Skyline+Ahmedabad,+Sankalp+Square+III,+Opp.+Saket+3,+Sindhubhavan+Road,+nr.+Neelkanth+Green,+Shilaj,+Gujarat+380059"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="highlight-link"
                        >
                            <FaMapMarkerAlt className="highlight-icon" />
                            <h3>Taj Skyline, Ahmedabad</h3>
                            <p>Experience Franchise Expo at one of the most premium venues in the city.</p>
                        </a>
                    </div>

                    <div className="highlight-card">
                        <FaBuilding className="highlight-icon" />
                        <h3>Multiple Industry Brands</h3>
                        <p>Meet and engage with leading franchise brands from diverse sectors.</p>
                    </div>
                    <div className="highlight-card">
                        <FaUsers className="highlight-icon" />
                        <h3>2000+ Visitors</h3>
                        <p>Connect with a massive audience of business owners and investors.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
