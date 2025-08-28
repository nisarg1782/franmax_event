// import React, { useState, useEffect } from "react";
// import Select from "react-select";
// import { ToastContainer, toast } from "react-toastify";
// import { FaEnvelope, FaPhone } from "react-icons/fa";
// import "react-toastify/dist/ReactToastify.css";
// import "./RegisterModal.css";
// import logo from "../assets/logo/logo.png";
// import { getApiUrl } from "../utils/api";

// const RegisterModal = ({ onClose }) => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     state: null,
//     city: null,
//   });
//   const [states, setStates] = useState([]);
//   const [cities, setCities] = useState([]);
//   const [loadingStates, setLoadingStates] = useState(false);
//   const [loadingCities, setLoadingCities] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [termsAccepted, setTermsAccepted] = useState(false);
//   const [termsModalOpen, setTermsModalOpen] = useState(false);

//   useEffect(() => {
//     document.body.style.overflow = "hidden";
//     return () => { document.body.style.overflow = ""; };
//   }, []);

//   // Fetch states
//   useEffect(() => {
//     const fetchStates = async () => {
//       setLoadingStates(true);
//       try {
//         const res = await fetch(getApiUrl("get-indian-states.php"));
//         const data = await res.json();
//         setStates(data.map((s) => ({ value: s.id, label: s.name })));
//       } catch {
//         toast.error("Failed to load states.");
//       } finally {
//         setLoadingStates(false);
//       }
//     };
//     fetchStates();
//   }, []);

//   // Fetch cities when state changes
//   useEffect(() => {
//     const fetchCities = async () => {
//       if (!formData.state) {
//         setCities([]);
//         return;
//       }
//       setLoadingCities(true);
//       try {
//         const res = await fetch(getApiUrl(`get-cities.php?state_id=${formData.state.value}`));
//         const data = await res.json();
//         setCities(data.map((c) => ({ value: c.id, label: c.name })));
//       } catch {
//         toast.error("Failed to load cities.");
//       } finally {
//         setLoadingCities(false);
//       }
//     };
//     fetchCities();
//   }, [formData.state]);

//   const handleInputChange = (e) =>
//     setFormData({ ...formData, [e.target.name]: e.target.value.trim() });

//   const handleStateChange = (selected) =>
//     setFormData({ ...formData, state: selected, city: null });
//   const handleCityChange = (selected) =>
//     setFormData({ ...formData, city: selected });

//   const validateForm = () => {
//     if (!formData.name.trim()) return "Name is required";
//     if (!formData.email.trim()) return "Email is required";
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(formData.email)) return "Invalid email address";
//     if (!formData.phone.trim()) return "Contact number is required";
//     const phoneRegex = /^[6-9][0-9]{9}$/;
//     if (!phoneRegex.test(formData.phone))
//       return "Contact must start with 6-9 and be 10 digits";
//     if (!formData.state) return "Please select a state";
//     if (!formData.city) return "Please select a city";
//     return null;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!termsAccepted) {
//       toast.error("You must accept Terms and Conditions.");
//       return;
//     }
//     const error = validateForm();
//     if (error) {
//       toast.error(error);
//       return;
//     }
//     saveRegistration();
//   };

//   const saveRegistration = async () => {
//     setLoading(true);
//     try {
//       const payload = {
//         name: formData.name,
//         email: formData.email,
//         phone: formData.phone,
//         state_id: formData.state.value,
//         city_id: formData.city.value,
//       };
//       console.log("Sending payload:", payload);

//       const res = await fetch(getApiUrl("register-user.php"), {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       const data = await res.json();
//       setLoading(false);
//       if (data.success) {
//         toast.success("Registration successful!");
//         setTimeout(() => onClose(), 2000);
//       } else {
//         toast.error(data.message || "Registration failed");
//       }
//     } catch (err) {
//       setLoading(false);
//       toast.error("Network error while saving registration.");
//       console.error("Fetch error:", err);
//     }
//   };

//   const termsText = [
//     "Payment covers only visiting charges. Food, travel, stay excluded.",
//     "Non-refundable unless specified in writing.",
//     "Booking confirmed only after Razorpay payment.",
//     "Additional costs borne by customer.",
//     "Payments secure via Razorpay. No card details stored.",
//     <>
//       Dispute Resolution: Contact <FaEnvelope />{" "}
//       <a href="mailto:events@franmaxindia.com">events@franmaxindia.com</a>{" "}
//       or <FaPhone /> +91 81400 58080
//     </>,
//     "We may update terms without prior notice.",
//   ];

//   return (
//     <>
//       <div className="modal-overlay">
//         <div className="modal register-modal">
//           <button className="close-btn" onClick={onClose}>&times;</button>

//           <div className="modal-header">
//             <img src={logo} alt="Franmax Expo Logo" className="company-logo" />
//             <h2>Register for Franchise Expo 2025</h2>
//             <p className="subtitle">Secure your spot today</p>
//           </div>

//           {loading && <p className="loading-text">Processing...</p>}

//           <form onSubmit={handleSubmit} className="booking-form">
//             <div className="form-row">
//               <input
//                 type="text"
//                 name="name"
//                 placeholder="Full Name"
//                 value={formData.name}
//                 onChange={handleInputChange}
//                 required
//               />
//               <input
//                 type="email"
//                 name="email"
//                 placeholder="Email Address"
//                 value={formData.email}
//                 onChange={handleInputChange}
//                 required
//               />
//             </div>

//             <div className="form-row">
//               <input
//                 type="tel"
//                 name="phone"
//                 placeholder="Contact Number"
//                 value={formData.phone}
//                 onChange={handleInputChange}
//                 required
//               />
//             </div>

//             <div className="form-row">
//               <Select
//                 options={states}
//                 value={formData.state}
//                 onChange={handleStateChange}
//                 isLoading={loadingStates}
//                 placeholder="Select State"
//               />
//               <Select
//                 options={cities}
//                 value={formData.city}
//                 onChange={handleCityChange}
//                 isLoading={loadingCities}
//                 placeholder="Select City"
//                 isDisabled={!formData.state}
//               />
//             </div>

//             <div className="form-row terms">
//               <label>
//                 <input
//                   type="checkbox"
//                   checked={termsAccepted}
//                   onChange={(e) => setTermsAccepted(e.target.checked)}
//                 />
//                 I agree to the{" "}
//                 <span
//                   onClick={() => setTermsModalOpen(true)}
//                   style={{ color: "#ff6b00", cursor: "pointer", textDecoration: "underline" }}
//                 >
//                   Terms and Conditions
//                 </span>
//               </label>
//             </div>

//             <button type="submit" className="submit-btn" disabled={!termsAccepted || loading}>
//               Book Seat
//             </button>
//           </form>
//         </div>
//       </div>

//       {termsModalOpen && (
//         <div className="modal-overlay">
//           <div className="modal terms-modal">
//             <button className="close-btn" onClick={() => setTermsModalOpen(false)}>&times;</button>
//             <h2>Terms & Conditions</h2>
//             <div className="terms-content">
//               <ul>{termsText.map((item, idx) => <li key={idx}>{item}</li>)}</ul>
//             </div>
//           </div>
//         </div>
//       )}

//       <ToastContainer position="top-left" autoClose={3000} hideProgressBar />
//     </>
//   );
// };

// export default RegisterModal;






import React, { useState, useEffect } from "react";
import Select from "react-select";
import { ToastContainer, toast } from "react-toastify";
import { FaEnvelope, FaPhone } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import "./RegisterModal.css";
import logo from "../assets/logo/logo.png";
import { getApiUrl } from "../utils/api";

const RegisterModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    state: null,
    city: null,
  });
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [loadingStates, setLoadingStates] = useState(false);
  const [loadingCities, setLoadingCities] = useState(false);
  const [loading, setLoading] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [termsModalOpen, setTermsModalOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
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

  // Fetch cities when state changes
  useEffect(() => {
    const fetchCities = async () => {
      if (!formData.state) {
        setCities([]);
        return;
      }
      setLoadingCities(true);
      try {
        const res = await fetch(getApiUrl(`get-cities.php?state_id=${formData.state.value}`));
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

  const handleInputChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value.trim() });

  const handleStateChange = (selected) =>
    setFormData({ ...formData, state: selected, city: null });
  const handleCityChange = (selected) =>
    setFormData({ ...formData, city: selected });

  const validateForm = () => {
    if (!formData.name.trim()) return "Name is required";
    if (!formData.email.trim()) return "Email is required";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) return "Invalid email address";
    if (!formData.phone.trim()) return "Contact number is required";
    const phoneRegex = /^[6-9][0-9]{9}$/;
    if (!phoneRegex.test(formData.phone))
      return "Contact must start with 6-9 and be 10 digits";
    if (!formData.state) return "Please select a state";
    if (!formData.city) return "Please select a city";
    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!termsAccepted) {
      toast.error("You must accept Terms and Conditions.");
      return;
    }
    const error = validateForm();
    if (error) {
      toast.error(error);
      return;
    }
    saveRegistration();
  };

  const saveRegistration = async () => {
    setLoading(true);
    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        state_id: formData.state.value,
        city_id: formData.city.value,
      };
      console.log("Sending payload:", payload);

      const res = await fetch(getApiUrl("register-user.php"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      setLoading(false);
      if (data.success) {
        toast.success("Registration successful!");
        setTimeout(() => onClose(), 2000);
      } else {
        toast.error(data.message || "Registration failed");
      }
    } catch (err) {
      setLoading(false);
      toast.error("Network error while saving registration.");
      console.error("Fetch error:", err);
    }
  };

  const termsText = [
    "Payment covers only visiting charges. Food, travel, stay excluded.",
    "Non-refundable unless specified in writing.",
    "Booking confirmed only after Razorpay payment.",
    "Additional costs borne by customer.",
    "Payments secure via Razorpay. No card details stored.",
    <>
      Dispute Resolution: Contact <FaEnvelope />{" "}
      <a href="mailto:events@franmaxindia.com">events@franmaxindia.com</a>{" "}
      or <FaPhone /> +91 81400 58080
    </>,
    "We may update terms without prior notice.",
  ];

  // --- WhatsApp share link (Always Live Website) ---
  const liveDomain = "https://franxpo.com";
  const investorLink = `${liveDomain}/?type=investor`;
  const shareMessage = `Join as an Investor at Franchise Expo 2025! Book your spot here: ${investorLink}`;
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareMessage)}`;
  // --- End WhatsApp Section ---

  return (
    <>
      <div className="modal-overlay">
        <div className="modal register-modal">
          <button className="close-btn" onClick={onClose}>&times;</button>

          <div className="modal-header">
            <img src={logo} alt="Franmax Expo Logo" className="company-logo" />
            <h2>Register for Franchise Expo 2025</h2>
            <p className="subtitle">Secure your spot today</p>
          </div>

          {loading && <p className="loading-text">Processing...</p>}

          <form onSubmit={handleSubmit} className="booking-form">
            <div className="form-row">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-row">
              <input
                type="tel"
                name="phone"
                placeholder="Contact Number"
                value={formData.phone}
                onChange={handleInputChange}
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

            <div className="form-row terms">
              <label>
                <input
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                />
                I agree to the{" "}
                <span
                  onClick={() => setTermsModalOpen(true)}
                  style={{ color: "#ff6b00", cursor: "pointer", textDecoration: "underline" }}
                >
                  Terms and Conditions
                </span>
              </label>
            </div>

            <button type="submit" className="submit-btn" disabled={!termsAccepted || loading}>
              Book Seat
            </button>
          </form>

          {/* --- WhatsApp Share Button --- */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-block",
              marginTop: "15px",
              backgroundColor: "#25D366",
              color: "white",
              padding: "10px 15px",
              borderRadius: "6px",
              textDecoration: "none",
              fontWeight: "bold",
              fontSize: "14px"
            }}
          >
            Share on WhatsApp
          </a>
          {/* --- End WhatsApp Button --- */}

        </div>
      </div>

      {termsModalOpen && (
        <div className="modal-overlay">
          <div className="modal terms-modal">
            <button className="close-btn" onClick={() => setTermsModalOpen(false)}>&times;</button>
            <h2>Terms & Conditions</h2>
            <div className="terms-content">
              <ul>{termsText.map((item, idx) => <li key={idx}>{item}</li>)}</ul>
            </div>
          </div>
        </div>
      )}

      <ToastContainer position="top-left" autoClose={3000} hideProgressBar />
    </>
  );
};

export default RegisterModal;
