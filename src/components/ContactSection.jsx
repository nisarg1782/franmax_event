import React from "react";
import "./ContactSection.css";
import { FaPhoneAlt, FaEnvelope, FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

const ContactSection = () => {
  return (
    <section className="contact-section" id="contact">
      <div className="contact-container">
        {/* Heading */}
        <h2 className="contact-title">Contact Us</h2>
        <p className="contact-subtitle">
          For any queries or assistance, we’re just a call or email away!
        </p>

        {/* Contact Info */}
        <div className="contact-info">
          <div className="contact-item">
            <FaPhoneAlt className="contact-icon" />
            <div>
              <h4>Call Us</h4>
              <a href="tel:+918140058080" className="no-link-style">
                +91 81400 58080
              </a>
              <br />
              <a href="tel:+918140073030" className="no-link-style">
                +91 81400 73030
              </a>
            </div>
          </div>

          <div className="contact-item">
            <FaEnvelope className="contact-icon" />
            <div>
              <h4>Email Us</h4>
              <ul>
                <li>
                  <a href="mailto:events@franmaxindia.com" className="no-link-style">
                    events@franmaxindia.com
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="social-links">
          <a href="https://www.facebook.com/@franmaxindia/?mibextid=ZbWKwL" target="_blank" rel="noopener noreferrer" className="no-link-style">
            <FaFacebook />
          </a>
          <a href="https://www.instagram.com/franmax_india/?igsh=MWo2YjhteXRqazR6ZQ%3D%3D#" target="_blank" rel="noopener noreferrer" className="no-link-style">
            <FaInstagram />
          </a>
          <a href="https://www.linkedin.com/company/franmaxindia/posts/?feedView=all" target="_blank" rel="noopener noreferrer" className="no-link-style">
            <FaLinkedin />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="no-link-style">
            <FaTwitter />
          </a>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
