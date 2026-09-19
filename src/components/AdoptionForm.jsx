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

  // 1. Auth check, Admin check & missing petId check
  useEffect(() => {
    const token = localStorage.getItem("token");

    let user = {};
    try {
      user = JSON.parse(localStorage.getItem("user") || "{}");
    } catch (e) {
      user = {};
    }

    // if the token is not there
    if (!token) {
      alert("Please log in to apply for adoption.");
      return;
    }

    // if admin then can't apply for adoption
    if (user.role === "admin") {
      alert(
        "Admins are not allowed to submit adoption applications! You must be a general user.",
      );
      navigate("/");
      return;
    }

    // if there is no petID
    if (!petId) {
      alert("No pet selected. Redirecting to home page.");
      navigate("/");
    }
  }, [navigate, petId]);

  // 2. Client-side Form Validation Rules
  const validateForm = () => {
    let newErrors = {};

    // Full Name: Only letters, spaces, and dots allowed
    const nameRegex = /^[a-zA-Z\s.]+$/;
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    } else if (!nameRegex.test(formData.fullName)) {
      newErrors.fullName = "Name can only contain alphabets and spaces";
    }

    // Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Phone Validation (BD Standard Example: +88017... or 017...)
    const phoneRegex = /^(?:\+88|88)?(01[3-9]\d{8})$/;
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = "Enter a valid BD phone number (e.g., 01712345678)";
    }

    // Address & Reason
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.reason.trim()) {
      newErrors.reason = "Please state your reason for adoption";
    } else if (formData.reason.trim().length < 10) {
      newErrors.reason = "Reason must be at least 10 characters long";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Clear field-specific error as user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");

    if (!validateForm()) return;

    setLoading(true);
    const token = localStorage.getItem("token");
    const API_BASE_URL =
      import.meta.env?.VITE_API_URL || "http://localhost:4000";

    try {
      const response = await fetch(`${API_BASE_URL}/api/adoptions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
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

            {/* Has Other Pets */}
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
            ></textarea>
            {errors.reason && (
              <span className="field-error">{errors.reason}</span>
            )}
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Submitting..." : "Submit Application"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdoptionForm;
