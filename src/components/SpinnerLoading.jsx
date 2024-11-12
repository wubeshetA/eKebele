// src/components/SpinnerOverlay.jsx
import React from 'react';

const SpinnerLoading = () => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="w-12 h-12 border-4 border-primary-light border-t-transparent border-solid rounded-full animate-spin"></div>
    </div>
  );
};

export default SpinnerLoading;
