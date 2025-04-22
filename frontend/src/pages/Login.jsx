import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../services/api";
import "./Login.css";

import slide1 from "../assets/slide1.jpg";
import image2 from "../assets/image2.jpg";
import image3 from "../assets/image3.jpg";
import logo from "../assets/logo.png"; // Logo image
import { FaEye, FaEyeSlash } from "react-icons/fa"; // FontAwesome Icons

function Login() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [slide1, image2, image3];

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
    try {
      const response = await login(formData);
      alert(response.data.message);
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Error logging in");
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="login-page">
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

      {/* Right column: login form */}
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

          <h2>Login</h2>
          <p className="subtitle">
            Welcome back! Please log in to your account
          </p>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
            />
            <div className="password-wrapper">
              <input
                type={passwordVisible ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
              <div
                className="password-toggle-icon"
                onClick={togglePasswordVisibility}
              >
                {passwordVisible ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
            <button type="submit">Login</button>
          </form>
          <p className="link-text">
            Don’t have an account? <Link to="/registeruser">Register here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
