// src/pages/BirthCertificateForm.jsx
import React, { useState } from 'react';
import api from '../../api/api';

const BirthCertificateForm = () => {
  const [formData, setFormData] = useState({
    applicant_name: '',
    first_name: '',
    middle_name: '',
    last_name: '',
    nationality: '',
    father_fullname: '',
    father_nationality: '',
    mother_fullname: '',
    mother_nationality: '',
    dob: '',
    country_of_birth: '',
    region_of_birth: '',
    place_of_birth: '',
    gender: '',
    applicant_email_address: '',
    phone_number: '',
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successData, setSuccessData] = useState(null);

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

    try {
      const res = await api.post('/api/vital-events/birth-certificate/', formData);
      if (res.status === 201 && res.data.application_number) {
        setSuccessData({ applicationNumber: res.data.application_number });
      } else {
        setErrorMessage('Something went wrong. Please try again later.');
      }
    } catch (error) {
      setErrorMessage('An error occurred while submitting the form. Please try again.');
    } finally {
      setLoading(false);
    }

    console.log(formData);
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
              <label className="block text-text font-medium mb-2" htmlFor="applicant_name">
                Applicant Name
              </label>
              <input
                type="text"
                id="applicant_name"
                name="applicant_name"
                value={formData.applicant_name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            {/* First Name */}
            <div className="mb-4">
              <label className="block text-text font-medium mb-2" htmlFor="first_name">
                 First Name
              </label>
              <input
                type="text"
                id="first_name"
                name="first_name"
                value={formData.first_name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            {/* Middle Name */}
            <div className="mb-4">
              <label className="block text-text font-medium mb-2" htmlFor="middle_name">
                 Middle Name
              </label>
              <input
                type="text"
                id="middle_name"
                name="middle_name"
                value={formData.middle_name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Last Name */}
            <div className="mb-4">
              <label className="block text-text font-medium mb-2" htmlFor="last_name">
                 Last Name
              </label>
              <input
                type="text"
                id="last_name"
                name="last_name"
                value={formData.last_name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            {/* Nationality */}
            <div className="mb-4">
              <label className="block text-text font-medium mb-2" htmlFor="nationality">
                 Nationality
              </label>
              <input
                type="text"
                id="nationality"
                name="nationality"
                value={formData.nationality}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            {/* Father's Full Name */}
            <div className="mb-4">
              <label className="block text-text font-medium mb-2" htmlFor="father_fullname">
                Father's Full Name
              </label>
              <input
                type="text"
                id="father_fullname"
                name="father_fullname"
                value={formData.father_fullname}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            {/* Father's Nationality */}
            <div className="mb-4">
              <label className="block text-text font-medium mb-2" htmlFor="father_nationality">
                Father's Nationality
              </label>
              <input
                type="text"
                id="father_nationality"
                name="father_nationality"
                value={formData.father_nationality}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Mother's Full Name */}
            <div className="mb-4">
              <label className="block text-text font-medium mb-2" htmlFor="mother_fullname">
                Mother's Full Name
              </label>
              <input
                type="text"
                id="mother_fullname"
                name="mother_fullname"
                value={formData.mother_fullname}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            {/* Mother's Nationality */}
            <div className="mb-4">
              <label className="block text-text font-medium mb-2" htmlFor="mother_nationality">
                Mother's Nationality
              </label>
              <input
                type="text"
                id="mother_nationality"
                name="mother_nationality"
                value={formData.mother_nationality}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* dob */}
            <div className="mb-4">
              <label className="block text-text font-medium mb-2" htmlFor="dob">
                Date of Birth
              </label>
              <input
                type="date"
                id="dob"
                name="dob"
                value={formData.dob}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
            

            {/* Country of Birth */}
            <div className="mb-4">
              <label className="block text-text font-medium mb-2" htmlFor="country_of_birth">
                Country of Birth
              </label>
              <input
                type="text"
                id="country_of_birth"
                name="country_of_birth"
                value={formData.country_of_birth}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            {/* Region of Birth */}
            <div className="mb-4">
              <label className="block text-text font-medium mb-2" htmlFor="region_of_birth">
                Region of Birth
              </label>
              <input
                type="text"
                id="region_of_birth"
                name="region_of_birth"
                value={formData.region_of_birth}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            {/* Place of Birth */}
            <div className="mb-4">
              <label className="block text-text font-medium mb-2" htmlFor="place_of_birth">
                Place of Birth
              </label>
              <input
                type="text"
                id="place_of_birth"
                name="place_of_birth"
                value={formData.place_of_birth}
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
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            {/* Applicant Email */}
            <div className="mb-4">
              <label className="block text-text font-medium mb-2" htmlFor="applicant_email_address">
                Applicant's Email Address
              </label>
              <input
                type="email"
                id="applicant_email_address"
                name="applicant_email_address"
                value={formData.applicant_email_address}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Phone Number */}
            <div className="mb-4">
              <label className="block text-text font-medium mb-2" htmlFor="phone_number">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone_number"
                name="phone_number"
                value={formData.phone_number}
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