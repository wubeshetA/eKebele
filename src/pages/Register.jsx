import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link for routing
import api from "../api/api";

import { useNavigate } from "react-router-dom"; // Import useNavigate



const Register = () => {
  const navigate = useNavigate(); 
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);

    console.log(firstName, lastName, phoneNumber, email, password);

    // Validate required fields
    if (!firstName || !lastName || !phoneNumber || !password) {
      setErrorMessage("Please fill out all required fields.");
      setLoading(false);
      return;
    }

    // Simple validation for phone number format
    const phonePattern = /^[0-9]{10}$/;
    if (!phonePattern.test(phoneNumber)) {
      setErrorMessage("Please enter a valid 10-digit phone number.");
      setLoading(false);
      return;
    }

    // Password validation (e.g., minimum length)
    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters long.");
      setLoading(false);
      return;
    }


    try {
      const res = await api.post("/auth/users/", {
        "first_name": firstName,
        "last_name": lastName,
        "phone_number": phoneNumber,
        "email": email,
        "password": password
      });
      if (res.status === 201) {
        navigate("/verify-email", { state: { email } });
      } else {
        setErrorMessage("An error occurred. Please try again later.");
      }

    } catch (error) {
      setErrorMessage("An error occurred. Please try again later.");
    }
    finally {
      setLoading(false);
    }

    

  };

  return (
    <div className="min-h-screen bg-background-light flex items-center justify-center my-20">
      <div className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-lg">
        <h2 className="text-3xl font-bold text-center text-primary-dark mb-6">Create Your Account</h2>

        {errorMessage && (
          <div className="mb-4 text-red-500 text-center">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* First Name Input */}
          <div>
            <label htmlFor="firstName" className="block text-sm font-semibold text-gray-700">
              First Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-primary focus:border-primary"
              placeholder="Enter your first name"
              required
            />
          </div>

          {/* Last Name Input */}
          <div>
            <label htmlFor="lastName" className="block text-sm font-semibold text-gray-700">
              Last Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-primary focus:border-primary"
              placeholder="Enter your last name"
              required
            />
          </div>

          {/* Phone Number Input */}
          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-semibold text-gray-700">
              Phone Number <span className="text-red-500">*</span>
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

          {/* Email Input */}
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
              placeholder="Enter your email address (optional)"
            />
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
              Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-primary focus:border-primary"
              placeholder="Enter your password"
              required
            />
          </div>



          <button 
            type="submit" 
            className={`w-full bg-primary text-white py-3 px-4 rounded-lg flex items-center justify-center hover:bg-primary-dark ${loading ? 'opacity-50' : ''}`}
            disabled={loading}
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-4 border-white border-t-transparent border-solid rounded-full animate-spin mr-2"></div>
                Registering
              </>
            ) : (
              "Register"
            )}
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
            Need help? <Link to="/support-center" className="text-primary hover:underline">Contact Support</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
