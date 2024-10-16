// src/pages/BirthCertificateForm.jsx
import React, { useState } from 'react';
import api from '../api/api';

const BirthCertificateForm = () => {
  const [formData, setFormData] = useState({
    applicantName: '',
    childName: '',
    dateOfBirth: '',
    placeOfBirth: '',
    gender: '',
    relationship: '',
    email: '',
    phoneNumber: '',
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successData, setSuccessData] = useState(null); // State to store success data

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');
    setSuccessData(null);

    const postData = {
      applicant_name: formData.applicantName,
      child_name: formData.childName,
      dob: formData.dateOfBirth,
      phone_number: formData.phoneNumber,
      email_address: formData.email,
      place_of_birth: formData.placeOfBirth,
      gender: formData.gender.toLowerCase(),
      relationship_to_child: formData.relationship,
    };

    try {
      const res = await api.post('/api/apply-birth-certificate/', postData);
      if (res.status === 201 && res.data.application_number) {
        // Store success data
        setSuccessData({
          applicationNumber: res.data.application_number,
        });
      } else {
        setErrorMessage('Something went wrong. Please try again later.');
      }
    } catch (error) {
      setErrorMessage('An error occurred while submitting the form. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-background-light min-h-screen py-10 p-4 flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-2xl">
        {successData ? (
          <div className="text-center">
            <h1 className="text-3xl font-semibold mb-6 text-green-600">
              Application Submitted Successfully!
            </h1>
            <p className="text-lg mb-4">
              Your application for a birth certificate has been successfully submitted.
            </p>
            <p className="text-lg font-bold mb-6">
              Your Application Tracking Number is: <span className="text-primary">{successData.applicationNumber}</span>
            </p>
            <p className="text-gray-700">Please save this number for future reference.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <h1 className="text-3xl font-semibold mb-6 text-center">Apply for Birth Certificate</h1>

            {errorMessage && (
              <div className="mb-4 text-red-500 text-center">
                {errorMessage}
              </div>
            )}

            {/* Applicant Name */}
            <div className="mb-4">
              <label className="block text-text font-medium mb-2" htmlFor="applicantName">
                Applicant Name
              </label>
              <input
                type="text"
                id="applicantName"
                name="applicantName"
                value={formData.applicantName}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            {/* Child Name */}
            <div className="mb-4">
              <label className="block text-text font-medium mb-2" htmlFor="childName">
                Child's Name
              </label>
              <input
                type="text"
                id="childName"
                name="childName"
                value={formData.childName}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            {/* Date of Birth */}
            <div className="mb-4">
              <label className="block text-text font-medium mb-2" htmlFor="dateOfBirth">
                Date of Birth
              </label>
              <input
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            {/* Place of Birth */}
            <div className="mb-4">
              <label className="block text-text font-medium mb-2" htmlFor="placeOfBirth">
                Place of Birth
              </label>
              <input
                type="text"
                id="placeOfBirth"
                name="placeOfBirth"
                value={formData.placeOfBirth}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            {/* Gender */}
            <div className="mb-4">
              <label className="block text-text font-medium mb-2">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                required
              >
                <option value="" disabled>Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Relationship */}
            <div className="mb-4">
              <label className="block text-text font-medium mb-2" htmlFor="relationship">
                Relationship to Child
              </label>
              <input
                type="text"
                id="relationship"
                name="relationship"
                value={formData.relationship}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            {/* Email */}
            <div className="mb-4">
              <label className="block text-text font-medium mb-2" htmlFor="email">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Phone Number */}
            <div className="mb-4">
              <label className="block text-text font-medium mb-2" htmlFor="phoneNumber">
                Phone Number
              </label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            {/* Submit Button */}
            <div className="mt-6">
              <button
                type="submit"
                className={`w-full bg-primary hover:bg-primary-light text-white font-semibold py-3 px-6 rounded-lg transition-colors ${loading ? 'opacity-50' : ''}`}
                disabled={loading}
              >
                {loading ? 'Submitting...' : 'Submit Application'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default BirthCertificateForm;
