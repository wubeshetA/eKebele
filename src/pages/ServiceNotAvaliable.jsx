// ServiceNotAvailable.js
import React from "react";
import { Link } from "react-router-dom";

const ServiceNotAvailable = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-lg text-center">
        <h1 className="text-3xl font-semibold text-red-600 mb-4">
          Service Not Available
        </h1>
        <p className="text-lg text-gray-700 mb-6">
          The service you are trying to access is not yet onboarded.
        </p>
        <Link
          to="/"
          className="text-primary-dark hover:text-blue-700 underline"
        >
          Go back to Services
        </Link>
      </div>
    </div>
  );
};

export default ServiceNotAvailable;
