import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import "./AdoptionForm.css";

const AdoptionForm = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const petName = location.state?.petName || "Pet";
  const petId = location.state?.petId || "";

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    housingType: "House",
    hasOtherPets: "No",
    reason: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const API_BASE_URL = import.meta.env?.VITE_API_URL || "http://localhost:4000";

  useEffect(() => {
    if (!petId) {
      alert("No pet selected. Redirecting to home page.");
      navigate("/");
      return;
    }

    // backend chech if the user logged in or not
    const checkAuth = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/users/profile`, {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          alert("Please sign in first to adopt a pet!");
          navigate("/");
        }
      } catch (err) {
        console.error("Auth check failed:", err);
        navigate("/login");
      }
    };

    checkAuth();
  }, [navigate, petId, API_BASE_URL]);

  // Form validation
  const validateForm = () => {
    let newErrors = {};

    // Full Name
    const nameRegex = /^[a-zA-Z\s.]+$/;

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    } else if (!nameRegex.test(formData.fullName)) {
      newErrors.fullName = "Name can only contain alphabets and spaces";
    }

    // Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // BD Phone
    const phoneRegex = /^(?:\+88|88)?(01[3-9]\d{8})$/;

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = "Enter a valid BD phone number (e.g., 01712345678)";
    }

    // Address
    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }

    // Reason
    if (!formData.reason.trim()) {
      newErrors.reason = "Please state your reason for adoption";
    } else if (formData.reason.trim().length < 10) {
      newErrors.reason = "Reason must be at least 10 characters long";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // Submit application
  const handleSubmit = async (e) => {
    e.preventDefault();

    setApiError("");

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/adoptions`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        // Send cookie automatically via browser
        credentials: "include",

        body: JSON.stringify({
          petId,
          petName,
          ...formData,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to submit application.");
      }

      alert("Adoption application submitted successfully!");

      navigate("/");
    } catch (err) {
      setApiError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="adoption-container">
      <div className="adoption-card">
        <h2>
          Adoption Application for <span className="highlight">{petName}</span>
        </h2>

        <p className="subtitle">
          Please fill out the form below to submit your adoption request.
        </p>

        {apiError && <div className="error-msg alert-error">{apiError}</div>}

        <form onSubmit={handleSubmit} className="adoption-form" noValidate>
          {/* Full Name */}
          <div className="form-group">
            <label htmlFor="fullName">Full Name</label>

            <input
              id="fullName"
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="John Doe"
              className={errors.fullName ? "input-error" : ""}
            />

            {errors.fullName && (
              <span className="field-error">{errors.fullName}</span>
            )}
          </div>

          <div className="form-row">
            {/* Email */}
            <div className="form-group">
              <label htmlFor="email">Email Address</label>

              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="example@mail.com"
                className={errors.email ? "input-error" : ""}
              />

              {errors.email && (
                <span className="field-error">{errors.email}</span>
              )}
            </div>

            {/* Phone */}
            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>

              <input
                id="phone"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="017xxxxxxxx"
                className={errors.phone ? "input-error" : ""}
              />

              {errors.phone && (
                <span className="field-error">{errors.phone}</span>
              )}
            </div>
          </div>

          {/* Address */}
          <div className="form-group">
            <label htmlFor="address">Address</label>

            <input
              id="address"
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Street address, City"
              className={errors.address ? "input-error" : ""}
            />

            {errors.address && (
              <span className="field-error">{errors.address}</span>
            )}
          </div>

          <div className="form-row">
            {/* Housing Type */}
            <div className="form-group">
              <label htmlFor="housingType">Housing Type</label>

              <select
                id="housingType"
                name="housingType"
                value={formData.housingType}
                onChange={handleChange}
              >
                <option value="House">House</option>

                <option value="Apartment">Apartment</option>

                <option value="Rented">Rented</option>
              </select>
            </div>

            {/* Other Pets */}
            <div className="form-group">
              <label htmlFor="hasOtherPets">Do you have other pets?</label>

              <select
                id="hasOtherPets"
                name="hasOtherPets"
                value={formData.hasOtherPets}
                onChange={handleChange}
              >
                <option value="No">No</option>

                <option value="Yes">Yes</option>
              </select>
            </div>
          </div>

          {/* Reason */}
          <div className="form-group">
            <label htmlFor="reason">Why do you want to adopt {petName}?</label>

            <textarea
              id="reason"
              name="reason"
              rows="4"
              value={formData.reason}
              onChange={handleChange}
              placeholder="Tell us about your household and experience with pets (minimum 10 characters)..."
              className={errors.reason ? "input-error" : ""}
            />

            {errors.reason && (
              <span className="field-error">{errors.reason}</span>
            )}
          </div>

          <button type="submit" className="submit-btn" logged={loading}>
            {loading ? "Submitting..." : "Submit Application"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdoptionForm;
