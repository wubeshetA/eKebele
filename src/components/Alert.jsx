import React from 'react';

const Alert = ({ title, message, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div
        onClick={onClose}
        className="absolute inset-0 cursor-pointer"
      ></div>
      <div className="bg-white rounded-lg shadow-lg max-w-sm w-full relative z-10">
        <div className="flex justify-between items-center border-b p-4">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button
            className="text-gray-400 hover:text-gray-600"
            onClick={onClose}
          >
            &#10005;
          </button>
        </div>
        <div className="p-4">
          <p>{message}</p>
        </div>
        <div className="p-4 text-right">
          <button
            onClick={onClose}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default Alert;
