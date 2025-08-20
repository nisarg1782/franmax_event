import React, { useState, useEffect } from "react";
import Select from "react-select";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./RegisterModal.css";
import logo from "../assets/logo/logo.png";
import { getApiUrl } from "../utils/api";

const RegisterModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    state: null,
    city: null,
  });
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch states on load
  useEffect(() => {
    fetch(getApiUrl("get-indian-states.php"))
      .then((res) => res.json())
      .then((data) => {
        const stateOptions = data.map((s) => ({ value: s.id, label: s.name }));
        setStates(stateOptions);
      })
      .catch((err) => {
        console.error("Error fetching states:", err);
        toast.error("Failed to load states.");
      });
  }, []);

  const handleStateChange = (selectedState) => {
    setFormData({ ...formData, state: selectedState, city: null });
    if (selectedState) {
      fetch(getApiUrl(`get-cities.php?state_id=${selectedState.value}`))
        .then((res) => res.json())
        .then((data) => {
          const cityOptions = data.map((c) => ({ value: c.id, label: c.name }));
          setCities(cityOptions);
        })
        .catch((err) => {
          console.error("Error fetching cities:", err);
          toast.error("Failed to load cities.");
        });
    } else {
      setCities([]);
    }
  };

  const handleCityChange = (selectedCity) => {
    setFormData({ ...formData, city: selectedCity });
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!formData.name.trim()) return "Name is required";
    if (!formData.email.trim()) return "Email is required";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) return "Invalid email address";
    if (!formData.contact.trim()) return "Contact number is required";
    const contactRegex = /^[6-9][0-9]{9}$/;
    if (!contactRegex.test(formData.contact))
      return "Contact must start with 6, 7, 8, or 9 and be 10 digits";
    if (!formData.state) return "Please select a state";
    if (!formData.city) return "Please select a city";
    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const error = validateForm();
    if (error) {
      toast.error(error);
      return;
    }

    setLoading(true);
    fetch(getApiUrl("validate-user.php"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: formData.email.trim(),
        contact: formData.contact.trim(),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        if (data.exists) {
          toast.error(data.message);
        } else {
          toast.success(data.message);
          startPayment();
        }
      })
      .catch((err) => {
        setLoading(false);
        console.error("Validation error:", err);
        toast.error("Server error while validating user.");
      });
  };

  const startPayment = () => {
    const amount = 499;
    const apiKey = "rzp_live_R6nEN2n0JyWlrV"; // Replace with your Razorpay key

    const options = {
      key: apiKey,
      amount: amount * 100,
      currency: "INR",
      name: "FRANMAX INDIA",
      description: "Registration Payment",
      image: "http://franmaxindia.com/images/icon.png",
      theme: { color: "#156beb" },
      handler: function (response) {
        saveRegistration(response.razorpay_payment_id);
      },
      prefill: {
        name: formData.name,
        email: formData.email,
        contact: formData.contact,
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const saveRegistration = (paymentId) => {
    const payload = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      contact: formData.contact.trim(),
      state_id: formData.state.value,
      city_id: formData.city.value,
      fee: 499,
      payment_id: paymentId,
    };

    fetch(getApiUrl("register-user.php"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          toast.success("Registration successful!");
          setTimeout(() => onClose(), 2000);
        } else {
          toast.error(data.message || "Registration failed");
        }
      })
      .catch((err) => {
        console.error("Save registration error:", err);
        toast.error("Failed to save registration.");
      });
  };

  return (
    <div className="register-modal-backdrop">
      <div className="register-modal">
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>

        <div className="register-header">
          <img src={logo} alt="Franmax Expo Logo" />
          <h2>Register for Franmax Expo 2025</h2>
        </div>

        {loading && <p className="loading-text">Checking your details...</p>}

        <div className="register-benefits">
          <h3>Why Attend?</h3>
          <ul>
            <li>Discover top franchise opportunities</li>
            <li>Meet investors and industry experts</li>
            <li>Learn from keynote speakers and workshops</li>
            <li>Network with decision makers</li>
          </ul>
        </div>

        <div className="registration-fee-note">
          <p>
            <strong>Registration Fee: ₹499</strong> (No refund will be given)
          </p>
        </div>

        <form onSubmit={handleSubmit} className="register-form">
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
          <input
            type="tel"
            name="contact"
            placeholder="Contact Number"
            value={formData.contact}
            onChange={handleInputChange}
            required
          />

          <Select
            options={states}
            value={formData.state}
            onChange={handleStateChange}
            placeholder="Select State"
            className="react-select"
            isClearable
            required
          />

          <Select
            options={cities}
            value={formData.city}
            onChange={handleCityChange}
            placeholder="Select City"
            className="react-select"
            isClearable
            isDisabled={!formData.state}
            required
          />

          <button type="submit" className="register-submit-btn">
            Submit & Pay
          </button>
        </form>
      </div>
      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
};

export default RegisterModal;
