import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../services/api";
import "./Register.css";

import slide1 from "../assets/slide1.jpg";
import image2 from "../assets/image2.jpg";
import image3 from "../assets/image3.jpg";
import logo from "../assets/logo.png"; // Logo image
import { FaEye, FaEyeSlash } from "react-icons/fa"; // FontAwesome Icons

function Register() {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const images = [slide1, image2, image3];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      const response = await register(formData);
      alert(response.data.message);
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Error registering user");
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  return (
    <div className="register-page">
      {/* Left column: image slider */}
      <div className="left-column">
        <div
          className="slider-wrapper"
          style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
        >
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Slide ${index}`}
              className="slide-image"
            />
          ))}
        </div>

        {/* Arrows and Dots */}
        <div className="slider-controls">
          <button
            className="arrow left-arrow"
            onClick={() =>
              setCurrentImageIndex(
                (currentImageIndex - 1 + images.length) % images.length
              )
            }
          >
            &#10094;
          </button>
          <button
            className="arrow right-arrow"
            onClick={() =>
              setCurrentImageIndex((currentImageIndex + 1) % images.length)
            }
          >
            &#10095;
          </button>

          <div className="dots-container">
            {images.map((_, index) => (
              <span
                key={index}
                className={`dot ${index === currentImageIndex ? "active" : ""}`}
                onClick={() => setCurrentImageIndex(index)}
              ></span>
            ))}
          </div>
        </div>
      </div>

      {/* Right column: form */}
      <div className="right-column">
        <div className="form-box">
          {/* Logo Section */}
          <div className="logo-wrapper">
            <img
              src={logo}
              alt="Logo"
              className="logo"
              onError={(e) => {
                e.target.style.display = "none";
                e.target.nextSibling.style.display = "block";
              }}
            />
            <span className="logo-fallback">YourLogo</span>
          </div>

          <h2>Register</h2>
          <p className="subtitle">
            Let’s get started with your 30-day free trial
          </p>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
            />
            <div className="password-wrapper">
              <input
                type={passwordVisible ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <div
                className="password-toggle-icon"
                onClick={togglePasswordVisibility}
              >
                {passwordVisible ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
            <div className="password-wrapper">
              <input
                type={confirmPasswordVisible ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              <div
                className="password-toggle-icon"
                onClick={toggleConfirmPasswordVisibility}
              >
                {confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
            <button type="submit">Register</button>
          </form>
          <p className="link-text">
            Already have an account? <Link to="/login">Login here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
