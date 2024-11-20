import React, { useState } from 'react';
import { FiMail, FiLock } from 'react-icons/fi';
import api from '../api/api'; // Import your API call module
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);

    // Validate required fields
    if (!emailOrPhone || !password) {
      setErrorMessage("Please enter your email/phone number and password.");
      setLoading(false);
      return;
    }

    try {
      const res = await api.post("/auth/jwt/create/", {
        "email": emailOrPhone,
        "password": password
      });

      if (res.status === 200) {
        console.log("Login successful!");
        console.log(res.data.access);
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
        navigate("/dashboard");

      } else {
        // handle differt status code
        if (res.status === 401) {
          setErrorMessage("Invalid login credentials. Please try again.");
        }
        else if (res.status === 400) {
          setErrorMessage("Invalid login credentials. Please try again.");
        }
        else if (res.status === 404) {
          setErrorMessage("Invalid login credentials. Please try again.");
        }
        else if (res.status >= 500) {
          setErrorMessage("Server error occurred. Please try again later.");
        }
        else {
          setErrorMessage("An error occurred. Please try again later.");
        }
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background-light">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        {/* Login Form */}
        <div className="text-center mb-4">
          <h2 className="text-3xl font-bold text-primary-dark">Login</h2>
        </div>
        
        {errorMessage && (
          <div className="mb-4 text-red-500 text-center">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700">Phone number or email</label>
            <div className="relative mt-1">
              <FiMail className="absolute left-3 top-3 text-gray-400" />
              <input
              id="email"
                type="text"
                className="text-gray-900 block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-primary focus:border-primary"
                placeholder="Enter phone number or email"
                value={emailOrPhone}
                onChange={(e) => setEmailOrPhone(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700">Password</label>
            <div className="relative mt-1">
              <FiLock className="absolute left-3 top-3 text-gray-400" />
              <input
                id="password"
                type="password"
                className="text-gray-900 block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-primary focus:border-primary"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="text-right text-sm">
            <a href="/forgot-password" className="text-primary hover:underline">
              Forgot password?
            </a>
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            className={`w-full bg-primary text-white py-3 px-4 rounded-lg flex items-center justify-center hover:bg-primary-dark ${loading ? 'opacity-50' : ''}`}
            disabled={loading}
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-4 border-white border-t-transparent border-solid rounded-full animate-spin mr-2"></div>
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </button>

        </form>
        
        <div className="mt-4 text-center text-sm text-gray-500">
          <p>
            Don't have an account?{' '}
            <a href="/sign-up" className="text-primary hover:underline">
              Create one
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
