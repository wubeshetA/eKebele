import React from 'react';
import { FiSearch } from 'react-icons/fi'; // Importing the search icon

const BannerSection = () => {
  return (
    <div className="w-full bg-primary-dark h-[40vh] flex flex-col justify-center items-center text-white">
      {/* Welcome Text */}
      <h1 className="text-3xl font-bold mb-4 mt-20">Welcome</h1>
      
      {/* Search Bar Container */}
      <div className="relative w-[90%] md:w-[60%] ">
        <FiSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" /> {/* Search Icon */}
        <input
          type="text"
          placeholder="Search for services"
          className="w-full px-10 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 shadow-sm"
        />
      </div>
    </div>
  );
};

export default BannerSection;
