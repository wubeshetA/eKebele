import React from 'react';
import { FiHome } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom'; 

const PageNotFound = () => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate('/'); 
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-900">
      <div className="text-center">
        <h1 className="text-9xl font-extrabold text-primary-dark">404</h1>
        <h2 className="text-3xl font-semibold mt-4">Page Not Found</h2>
        <p className="text-lg text-gray-500 mt-2">Oops! The page you're looking for doesn't exist.</p>

        
      </div>
      
    </div>
  );
};

export default PageNotFound;
