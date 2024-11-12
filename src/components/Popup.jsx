// src/components/Popup.jsx
import React from 'react';

const Popup = ({ data, onClose }) => {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={onClose} // Close popup when background is clicked
    >
      <div
        className="bg-white p-8 shadow-lg rounded-lg max-w-xl w-full relative"
        onClick={(e) => e.stopPropagation()} // Prevent click inside popup from closing it
      >
        <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700" onClick={onClose}>
          ×
        </button>

        {/* Application Number */}
        <h2 className="text-xl font-bold text-center mb-4 text-black">{data.application_number}</h2>

        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-black">

        <div className="col-span-2 font-semibold">Full Name</div>
        <div className="col-span-2 italic">{`${data.first_name} ${data.middle_name} ${data.last_name}`}</div>
        

          <div className="font-semibold">Applicant Name:</div>
          <div className="italic">{data.applicant_name}</div>

          <div className="font-semibold">Nationality:</div>
          <div className="italic">{data.nationality}</div>

          

          <div className="font-semibold">Date of Birth</div>
          <div className="italic">{data.dob}</div>

          <div className="font-semibold">Country of Birth</div>
          <div className="italic">{data.country_of_birth}</div>

          <div className="font-semibold">Region of Birth</div>
          <div className="italic">{data.region_of_birth}</div>

          <div className="font-semibold">Place of Birth</div>
          <div className="italic">{data.place_of_birth}</div>

          <div className="font-semibold">Gender</div>
          <div className="italic">{data.gender}</div>

          <div className="font-semibold">Father's Full Name</div>
          <div className="italic">{data.father_fullname}</div>

          <div className="font-semibold">Father's Nationality</div>
          <div className="italic">{data.father_nationality}</div>

          <div className="font-semibold">Mother's Full Name</div>
          <div className="italic">{data.mother_fullname}</div>

          <div className="font-semibold">Mother's Nationality</div>
          <div className="italic">{data.mother_nationality}</div>

          <div className="font-semibold"> Applicant Email</div>
          <div className="italic">{data.applicant_email_address}</div>

          <div className="font-semibold">Phone Number</div>
          <div className="italic">{data.phone_number}</div>

          <div className="font-semibold">Status</div>
          <div className="italic">{data.status}</div>
        </div>
      </div>
    </div>
  );
};

export default Popup;
