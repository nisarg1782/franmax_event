import React, { useState, useEffect } from "react";
import Select from "react-select";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./BookingModal.css";
import logo from "../assets/logo/logo.png";
import { getApiUrl } from "../utils/api";

const BookingModal = ({ onClose, type = "stall" }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    state: null,
    city: null,
    description: "",
    sponsorship: null,
  });

  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [loadingStates, setLoadingStates] = useState(false);
  const [loadingCities, setLoadingCities] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [termsModalOpen, setTermsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // Fetch states
  useEffect(() => {
    const fetchStates = async () => {
      setLoadingStates(true);
      try {
        const res = await fetch(getApiUrl("get-indian-states.php"));
        const data = await res.json();
        setStates(data.map((s) => ({ value: s.id, label: s.name })));
      } catch {
        toast.error("Failed to load states.");
      } finally {
        setLoadingStates(false);
      }
    };
    fetchStates();
  }, []);

  // Fetch cities on state change
  useEffect(() => {
    const fetchCities = async () => {
      if (!formData.state) {
        setCities([]);
        return;
      }
      setLoadingCities(true);
      try {
        const res = await fetch(
          getApiUrl(`get-cities.php?state_id=${formData.state.value}`)
        );
        const data = await res.json();
        setCities(data.map((c) => ({ value: c.id, label: c.name })));
      } catch {
        toast.error("Failed to load cities.");
      } finally {
        setLoadingCities(false);
      }
    };
    fetchCities();
  }, [formData.state]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleStateChange = (selected) =>
    setFormData({ ...formData, state: selected, city: null });
  const handleCityChange = (selected) =>
    setFormData({ ...formData, city: selected });
  const handleSponsorshipChange = (selected) =>
    setFormData({ ...formData, sponsorship: selected });

  const validateForm = () => {
    if (!formData.name.trim()) return "Name is required";
    if (!formData.email.trim()) return "Email is required";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) return "Email is invalid";
    if (!formData.contact.trim()) return "Contact number is required";
    const contactRegex = /^[0-9]{10}$/;
    if (!contactRegex.test(formData.contact))
      return "Contact number must be 10 digits";
    if (!formData.state) return "State is required";
    if (!formData.city) return "City is required";
    if (!formData.description.trim()) return "Description is required";
    if (formData.description.length < 0)
      return "Description must be at least 1 characters";
    if (!formData.sponsorship) return "Sponsorship selection is required";
    if (!termsAccepted) return "You must accept Terms and Conditions";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const error = validateForm();
    if (error) {
      toast.error(error);
      return;
    }

    setLoading(true);
    const payload = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      contact: formData.contact.trim(),
      state_id: formData.state.value,
      city_id: formData.city.value,
      description: formData.description.trim(),
      sponsorship: formData.sponsorship.value,
    };

    try {
      const res = await fetch(getApiUrl("submit-booking.php"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      setLoading(false);

      if (data.success) {
        toast.success("Your request has been submitted!");
        if (onClose) {
          window.location.href = "https://franxpo.com/"; // Redirect to homepage
        }
      } else {
        toast.error(data.message || "Something went wrong");
      }
    } catch (err) {
      setLoading(false);
      toast.error("Network error. Please try again.");
      console.error(err);
    }
  };

  const sponsorshipOptions = [
    { value: "yes", label: "Yes" },
    { value: "no", label: "No" },
  ];

  const termsText = [
    "All bookings are subject to approval by the Franmax Expo team.",
    "Payment must be completed within 7 days of confirmation.",
    "Exhibitors must follow the event guidelines strictly.",
    "Cancellation fees may apply as per the policy.",
    "Franmax Expo reserves the right to modify terms at any time.",
  ];
  const handleClose = () => {
    if (onClose) {
      window.location.href = "https://franxpo.com/"; // Redirect to homepage
    }
    else window.history.back();
  };
  
  return (
    <>
      <div className="modal-overlay">
        <div className="modal booking-modal">
          <button className="close-btn" onClick={handleClose}>
            &times;
          </button>

          <div className="modal-header">
            <img src={logo} alt="Franmax Expo Logo" className="company-logo" />
            <h2>{type === "stall" ? "Book Your Stall" : "Investor Registration"}</h2>
            <p className="subtitle">Secure your spot at Franmax Expo 2025</p>
          </div>

          <div className="benefits-section">
            <h3>Why Participate?</h3>
            <ul>
              <li>Connect with top investors and franchise owners</li>
              <li>Showcase your brand to 2000+ visitors</li>
              <li>Expand your business across India</li>
              <li>Get exclusive media coverage & leads</li>
            </ul>
          </div>

          <form onSubmit={handleSubmit} className="booking-form">
            <div className="form-row">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-row">
              <input
                type="tel"
                name="contact"
                placeholder="Contact Number"
                value={formData.contact}
                onChange={handleChange}
                required
              />
              <textarea
                name="description"
                placeholder="Description"
                rows="2"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-row">
              <Select
                options={states}
                value={formData.state}
                onChange={handleStateChange}
                isLoading={loadingStates}
                placeholder="Select State"
              />
              <Select
                options={cities}
                value={formData.city}
                onChange={handleCityChange}
                isLoading={loadingCities}
                placeholder="Select City"
                isDisabled={!formData.state}
              />
            </div>

            <div className="form-row">
              <Select
                options={sponsorshipOptions}
                value={formData.sponsorship}
                onChange={handleSponsorshipChange}
                placeholder="Interested in Sponsorship?"
              />
            </div>

            <div className="form-row terms">
              <label>
                <input
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                />
                I agree to the{" "}
                <span
                  style={{
                    color: "#ff6b00",
                    cursor: "pointer",
                    textDecoration: "underline",
                  }}
                  onClick={() => setTermsModalOpen(true)}
                >
                  Terms and Conditions
                </span>
              </label>
            </div>

            <button type="submit" className="submit-btn" disabled={loading}>
              Submit
            </button>
          </form>
        </div>
      </div>

      {termsModalOpen && (
        <div className="modal-overlay">
          <div className="modal terms-modal">
            <button
              className="close-btn"
              onClick={() => setTermsModalOpen(false)}
            >
              &times;
            </button>
            <h2>Terms & Conditions</h2>
            <div className="terms-content">
              <ul>
                {termsText.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      <ToastContainer
        position="top-left"
        autoClose={3000}
        hideProgressBar
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
      />
    </>
  );
};

export default BookingModal;
