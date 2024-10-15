import React, { useState } from 'react';
import { FiSearch, FiChevronDown, FiChevronUp } from 'react-icons/fi'; // Importing icons

const BannerSection = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Toggle the expanded state for "Read More"
  const handleToggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="relative w-full bg-primary-dark h-[40vh] flex flex-col justify-center items-center text-white">
      
      {/* <h1 className="text-3xl font-bold z-2">EKEBELE</h1> */}
      <h1 className="font-bold text-3xl md:text-3xl lg:text-4xl tracking-widest">E K B E L E</h1>
        <p className="text-sm md:text-base lg:text-lg mb-20">Driving Digital Governance!</p>

      {/* About Us Section */}
      <div className="absolute w-[90%] md:w-[60%] bg-white rounded-lg shadow-lg p-8 transform translate-y-[70%]"> {/* Pushed further down */}
        <h2 className="text-2xl font-bold text-primary-dark mb-4 text-center">About Us</h2>
        <p className="text-gray-600 text-justify">
          eKebele is a platform designed to streamline access to essential government services. 
          We aim to simplify administrative processes and empower citizens by offering convenient digital solutions 
          that improve efficiency, and accessibility.
          {isExpanded && (
            <span>
              {' '}With eKebele, citizens can easily access a range of services such as birth registration, business permits, 
              and tax filings. Our goal is to bridge the gap between the government and its people, making it easier for 
              individuals and businesses to thrive in an ever-evolving digital landscape. The platform is secure, easy to use, 
              and designed to cater to the diverse needs of the population.
            </span>
          )}
        </p>

        {/* Read More Button with Arrow */}
        <div className="flex justify-center mt-4">
          <button
            onClick={handleToggleReadMore}
            className="text-green-500 font-medium flex items-center hover:underline focus:outline-none"
          >
            {isExpanded ? 'Read Less' : 'Read More'}
            {isExpanded ? (
              <FiChevronUp className="ml-2 text-green-500" />
            ) : (
              <FiChevronDown className="ml-2 text-green-500" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BannerSection;
