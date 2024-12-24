import React, { useState } from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import "./css/authpage.css";
import { loginUser, registerUser } from "../services/authServices";

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null); // Initialize error state to null

  const handleChangeTab = (tab) => setActiveTab(tab);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear any previous errors before submission

    if (activeTab === "signin") {
      try {
        const result = await loginUser(email, password);
        console.log("Successfully Logged In", result);
        // Handle successful login (e.g., redirect to dashboard)
      } catch (err) {
        setError(err.message );
      }
    } else {
      if (password !== confirmPassword) {
        setError("Passwords do not match");
        return;
      }
      try {
        const result = await registerUser(email, password);
        console.log("Successfully Registered", result);
        // Handle successful registration (e.g., redirect to login page)
      } catch (err) {
        setError(err.message);
      }
    }
  };

  return (
    <div className="authpage">
      <Header />
      <div className="content">
        <div className="auth-form">
          <button
            onClick={() => handleChangeTab("signin")}
            className={activeTab === "signin" ? "active auth-btn" : "auth-btn"}
          >
            Sign-In
          </button>
          <button
            onClick={() => handleChangeTab("signup")}
            className={activeTab === "signup" ? "active auth-btn" : "auth-btn"}
          >
            Sign-Up
          </button>
          <form onSubmit={handleSubmit}>
            {error && <div className="error">{error}</div>} {/* Display error if present */}
            <div className="email form-content">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="password form-content">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {activeTab === "signup" && (
              <div className="confirm-pass form-content">
                <label htmlFor="confirm-password">Confirm Password</label>
                <input
                  type="password"
                  id="confirm-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            )}
            <button type="submit">Let's Go</button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}