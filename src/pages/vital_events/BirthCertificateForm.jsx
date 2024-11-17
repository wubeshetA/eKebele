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

  const [currentStage, setCurrentStage] = useState(1);
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
    console.log(formData);
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
  };

  const nextStage = () => setCurrentStage((prev) => Math.min(prev + 1, 3));
  const previousStage = () => setCurrentStage((prev) => Math.max(prev - 1, 1));

  const renderStage = () => {
    switch (currentStage) {
      case 1:
        return (
          <>
            <h2 className="text-lg font-bold mb-4">Applicant Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-2 font-medium" htmlFor="applicant_name">
                  Your Name
                </label>
                <input
                  type="text"
                  id="applicant_name"
                  name="applicant_name"
                  value={formData.applicant_name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 font-medium" htmlFor="applicant_email_address">
                  Your Email Address
                </label>
                <input
                  type="email"
                  id="applicant_email_address"
                  name="applicant_email_address"
                  value={formData.applicant_email_address}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block mb-2 font-medium" htmlFor="phone_number">
                  Your Phone Number
                </label>
                <input
                  type="tel"
                  id="phone_number"
                  name="phone_number"
                  value={formData.phone_number}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                />
              </div>
            </div>
          </>
        );
      case 2:
        return (
          <>
            <h2 className="text-lg font-bold mb-10">Birth Record Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-2 font-medium" htmlFor="first_name">
                  First Name
                </label>
                <input
                  type="text"
                  id="first_name"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 font-medium" htmlFor="middle_name">
                  Middle Name
                </label>
                <input
                  type="text"
                  id="middle_name"
                  name="middle_name"
                  value={formData.middle_name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block mb-2 font-medium" htmlFor="last_name">
                Last Name
                </label>
                <input
                  type="text"
                  id="last_name"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 font-medium" htmlFor="nationality">
                  Nationality
                </label>
                <input
                  type="text"
                  id="nationality"
                  name="nationality"
                  value={formData.nationality}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 font-medium" htmlFor="gender">
                  Gender
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                >
                  <option value="" disabled>
                    Select Gender
                  </option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
            </div>
            <h3 className="text-md font-bold mt-20">Parent Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block mb-2 font-medium" htmlFor="father_fullname">
                  Father's Full Name
                </label>
                <input
                  type="text"
                  id="father_fullname"
                  name="father_fullname"
                  value={formData.father_fullname}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 font-medium" htmlFor="father_nationality">
                  Father's Nationality
                </label>
                <input
                  type="text"
                  id="father_nationality"
                  name="father_nationality"
                  value={formData.father_nationality}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block mb-2 font-medium" htmlFor="mother_fullname">
                  Mother's Full Name
                </label>
                <input
                  type="text"
                  id="mother_fullname"
                  name="mother_fullname"
                  value={formData.mother_fullname}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 font-medium" htmlFor="mother_nationality">
                  Mother's Nationality
                </label>
                <input
                  type="text"
                  id="mother_nationality"
                  name="mother_nationality"
                  value={formData.mother_nationality}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
            </div>
          </>
        );
      case 3:
        return (
          <>
            <h2 className="text-lg font-bold mb-4">Birth Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-2 font-medium" htmlFor="dob">
                  Date of Birth
                </label>
                <input
                  type="date"
                  id="dob"
                  name="dob"
                  value={formData.dob}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 font-medium" htmlFor="country_of_birth">
                  Country of Birth
                </label>
                <input
                  type="text"
                  id="country_of_birth"
                  name="country_of_birth"
                  value={formData.country_of_birth}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 font-medium" htmlFor="region_of_birth">
                  Region of Birth
                </label>
                <input
                  type="text"
                  id="region_of_birth"
                  name="region_of_birth"
                  value={formData.region_of_birth}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 font-medium" htmlFor="place_of_birth">
                  Place of Birth
                </label>
                <input
                  type="text"
                  id="place_of_birth"
                  name="place_of_birth"
                  value={formData.place_of_birth}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                />
              </div>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen py-10 px-4 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl">
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
            <h1 className="text-2xl font-bold mb-6 text-center">Birth Certificate Form</h1>
            {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
            {renderStage()}
            <div className="flex justify-between mt-6">
              {currentStage > 1 && (
                <button
                  type="button"
                  onClick={previousStage}
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg"
                >
                  Previous
                </button>
              )}
              {currentStage < 3 ? (
                <button
                  type="button"
                  onClick={nextStage}
                  className="bg-primary text-white px-4 py-2 rounded-lg"
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  className={`bg-green-500 text-white px-4 py-2 rounded-lg ${loading ? 'opacity-50' : ''}`}
                  disabled={loading}
                >
                  {loading ? 'Submitting...' : 'Submit'}
                </button>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default BirthCertificateForm;
