import React, { useState } from "react";
import api from "../api/api";
import { useLocation, useNavigate } from "react-router-dom";

const EmailVerification = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState(location.state?.email || ""); // Set email from state or empty if not provided
  const [verificationCode, setVerificationCode] = useState(["", "", "", "", "", ""]);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (value, index) => {
    if (value.length > 6) return; // Prevent excessive input

    const updatedCode = [...verificationCode];
    if (value.length === 6) {
      // Handle full paste scenario
      for (let i = 0; i < 6; i++) {
        updatedCode[i] = value[i] || "";
      }
      setVerificationCode(updatedCode);

      // Auto-submit if all boxes are filled
      if (value.length === 6) {
        autoVerify(updatedCode.join(""));
      }
    } else {
      updatedCode[index] = value;
      setVerificationCode(updatedCode);

      // Automatically move to the next input
      if (value && index < 5) {
        document.getElementById(`digit-${index + 1}`).focus();
      }
    }
  };

  const autoVerify = async (code) => {
    setErrorMessage("");
    setLoading(true);

    try {
      const response = await api.post("/auth/verify-email/", {
        email,
        verification_code: code,
      });

      if (response.status === 200) {
        setSuccessMessage("Email verified successfully!");
        setTimeout(() => navigate("/login"), 1500); // Navigate to login after success
      } else {
        setErrorMessage(response.data.message || "Verification failed. Please try again.");
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const code = verificationCode.join("");

    if (!email) {
      setErrorMessage("Please enter your email.");
      return;
    }

    if (code.length !== 6) {
      setErrorMessage("Please enter a 6-digit code.");
      return;
    }

    autoVerify(code);
  };

  return (
    <div className="min-h-screen bg-background-light flex items-center justify-center">
      <div className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-primary-dark mb-4">
          Verify Your Email
        </h2>

        {!email && (
          <p className="text-center text-gray-600 mb-4">
            Please enter your email to receive the verification code.
          </p>
        )}

        {email && (
          <p className="text-center text-gray-600 mb-6">
            We’ve sent a 6-digit verification code to <strong>{email}</strong>. Please enter it below to verify your email.
          </p>
        )}

        {errorMessage && (
          <div className="mb-4 text-red-500 text-center">{errorMessage}</div>
        )}
        {successMessage && (
          <div className="mb-4 text-green-500 text-center">{successMessage}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Input (Visible if email is not passed) */}
          {!email && (
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-primary focus:border-primary"
                placeholder="Enter your email"
                required
              />
            </div>
          )}

          {/* Verification Code Inputs */}
          <div className="flex justify-between gap-2">
            {verificationCode.map((digit, index) => (
              <input
                key={index}
                id={`digit-${index}`}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
                onPaste={(e) => handleChange(e.clipboardData.getData("Text"), index)}
                className="w-12 h-12 text-center border border-gray-300 rounded-lg shadow-sm focus:ring-primary focus:border-primary text-xl font-medium"
              />
            ))}
          </div>

          <button
            type="submit"
            className={`w-full bg-primary text-white py-3 px-4 rounded-lg flex items-center justify-center hover:bg-primary-dark ${
              loading ? "opacity-50" : ""
            }`}
            disabled={loading}
          >
            {loading ? (
              <div className="w-5 h-5 border-4 border-white border-t-transparent border-solid rounded-full animate-spin mr-2"></div>
            ) : (
              "Verify Email"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmailVerification;
