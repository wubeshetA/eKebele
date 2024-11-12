// ServiceNotAvailable.js
import React from "react";
import { useNavigate } from "react-router-dom";

const ServiceNotAvailable = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-lg text-center">
        <h1 className="text-3xl font-semibold text-red-600 mb-4">
          Service Not Onboarded!
        </h1>
        <p className="text-lg text-gray-700 mb-6">
          The service you are trying to access is not yet onboarded.
        </p>
        <button
          onClick={() => navigate(-1)} // Go back to the previous page
          className="text-primary-dark hover:text-blue-700 underline"
        >
          Go back
        </button>
      </div>
    </div>
  );
};

export default ServiceNotAvailable;
