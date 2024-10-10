import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link for routing

const SignUp = () => {
  const [faydaId, setFaydaId] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!faydaId || !phoneNumber) {
      setErrorMessage("Please fill out both fields.");
      return;
    }

    // Simple validation for phone number format
    const phonePattern = /^[0-9]{10}$/;
    if (!phonePattern.test(phoneNumber)) {
      setErrorMessage("Please enter a valid 10-digit phone number.");
      return;
    }

    // Handle successful signup logic (e.g., API call)
    console.log("Fayda ID:", faydaId);
    console.log("Phone Number:", phoneNumber);
    alert("Signup successful!");
  };

  return (
    <div className="min-h-screen bg-background-light flex items-center justify-center">
      <div className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-lg">
        <h2 className="text-3xl font-bold text-center text-primary-dark mb-6">Create Your Account</h2>

        {errorMessage && (
          <div className="mb-4 text-red-500 text-center">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Fayda ID Input */}
          <div>
            <label htmlFor="faydaId" className="block text-sm font-semibold text-gray-700">
              Fayda Digital ID Number
            </label>
            <input
              type="text"
              id="faydaId"
              value={faydaId}
              onChange={(e) => setFaydaId(e.target.value)}
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-primary focus:border-primary"
              placeholder="Enter your Fayda Digital ID"
              required
            />
          </div>

          {/* Phone Number Input */}
          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-semibold text-gray-700">
              Phone Number
            </label>
            <input
              type="text"
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-primary focus:border-primary"
              placeholder="e.g. 0912345678"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-primary text-white py-3 px-4 rounded-lg hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary-dark focus:ring-offset-2"
          >
            Sign Up
          </button>
        </form>

        {/* Have an account? Log in Section */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Have an account? <Link to="/login" className="text-primary hover:underline">Log in</Link>
          </p>
        </div>

        {/* Help Section */}
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Need help? <a href="/help" className="text-primary hover:underline">Contact Support</a>
          </p>
        </div>

        {/* Footer Section */}
        <footer className="mt-8 text-sm text-gray-500 text-center">
          <p>&copy; 2024 Your Company. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default SignUp;
