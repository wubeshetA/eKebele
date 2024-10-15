// src/pages/ApplicationSuccess.jsx
import React from 'react';
import { useParams } from 'react-router-dom';  // Import useParams to get the application number from the URL

const ApplicationSuccess = () => {
  const { applicationNumber } = useParams();  // Extract application number from the URL

  return (
    <div className="bg-background-light min-h-screen p-6 flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-2xl text-center">
        <h1 className="text-3xl font-semibold mb-6 text-center text-green-600">
          Application Submitted Successfully!
        </h1>
        <p className="text-lg mb-4">
          Your application for a birth certificate has been successfully submitted.
        </p>
        <p className="text-lg font-bold mb-6">
          Your Application Tracking Number is: <span className="text-primary">{applicationNumber}</span>
        </p>
        <p className="text-gray-700">Please save this number for future reference.</p>
      </div>
    </div>
  );
};

export default ApplicationSuccess;
